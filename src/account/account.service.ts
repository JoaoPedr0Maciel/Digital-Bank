import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) { }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const accountExist = await this.accountRepository.findOne({
      where: {
        customer: { id: createAccountDto.customerId }
      }
    });

    if (accountExist) {
      throw new ConflictException(`account already exist for user with id: ${createAccountDto.customerId}`);
    }

    const customer = await this.customerRepository.findOneBy({ id: createAccountDto.customerId });

    if (!customer) {
      throw new NotFoundException(`user not found for id: (${createAccountDto.customerId})`);
    }

    const account = this.accountRepository.create({
      accNumber: createAccountDto.accountNumber,
      agency: createAccountDto.agency,
      amount: createAccountDto.amount,
      isActive: false,
      type: createAccountDto.type,
      customer: customer
    });

    return await this.accountRepository.save(account)
  }

  async findAll() {
    const accounts = await this.accountRepository.find();

    if (!accounts) {
      throw new NotFoundException('no accounts were found');
    }

    return accounts;
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ id })

    if (!account) {
      throw new NotFoundException('account not found')
    }

    return account;
  }

  async findOneByCustomerId(customerId: number): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        customer: { id: customerId }
      }
    })

    if (!account) {
      throw new NotFoundException(`account not found for customerId: (${customerId})`);
    }

    return account;
  }

  async remove(id: number) {
    // just can remove account where isActive === false
    const account = await this.findOne(id);

    if (account.isActive) {
      throw new BadRequestException('this account is active, so you can\'t remove this')
    }

    this.accountRepository.remove(account);
  }

  async verifyAmount(id: number): Promise<number> {
    const account = await this.findOne(id);
    return account.amount;
  }

  async activeAccount(id: number): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException('account not found');
    }

    if (account.isActive) {
      throw new BadRequestException('this account is already active');
    }

    account.isActive = true;

    return this.accountRepository.save(account);
  }

  async newDeposit(id: number, value: number): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException('account not found');
    }

    if (account.isActive === false) {
      throw new BadRequestException('this account is not active');
    }

    account.amount += value;

    return this.accountRepository.save(account);
  }

  async newWithdraw(id: number, value: number): Promise<Account> {
    const account = await this.findOne(id);

    if (account.isActive === false) {
      throw new BadRequestException('this account is not active');
    }

    if (value <= 0) {
      throw new BadRequestException('value to withdraw should be more than 0 (zero)')
    }

    if (account.amount < value) {
      throw new BadRequestException('you dont have enogth money in your account, check your amount');
    }

    account.amount -= value;

    return this.accountRepository.save(account);
  }
}
