import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const customerExist = await this.repository.findOne({
      where: [
        { email: createCustomerDto.email },
        { cpf: createCustomerDto.cpf }
      ]
    })

    if (customerExist) {
      throw new ConflictException('user already exist with this email or cpf')
    }

    const customer = this.repository.create(createCustomerDto);
    const passwordHash = await bcrypt.hash(createCustomerDto.password, 12)
    customer.password = passwordHash;
    return this.repository.save(customer);
  }

  findAll() {
    const allCustomers = this.repository.find();
    if (!allCustomers) {
      throw new Error('no user found');
    }

    return allCustomers;
  }

  async findOne(id: number) {
    const customer = await this.repository.findOneBy({ id })

    if (!customer) {
      throw new Error(`user with id: (${id}) not found`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    return this.repository.merge(customer, updateCustomerDto);
  }

  async remove(id: number) {
    const custumer = await this.findOne(id);
    return this.repository.remove(custumer);
  }
}
