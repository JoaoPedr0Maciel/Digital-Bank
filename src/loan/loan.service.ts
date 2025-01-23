import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { LoanStatus } from './enum/status-loan.enum';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>
  ) { }
  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const loan = this.loanRepository.create(createLoanDto);

    return this.loanRepository.save(loan);
  }

  async findAll(): Promise<Loan[]> {
    const loans = await this.loanRepository.find();

    if (!loans) {
      throw new NotFoundException('no loans were found')
    }

    return loans;
  }

  async findAllByCustomerId(customerId: number): Promise<Loan[]> {
    const loans = await this.loanRepository.find({
      where: {
        customer: { id: customerId }
      }
    });

    if (!loans) {
      throw new NotFoundException('no loans were found')
    }

    return loans;
  }

  async findOne(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findOneBy({ id });

    if (!loan) {
      throw new NotFoundException('loan not found')
    }

    return loan;
  }

  async update(id: number, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    const loanToUpdate = await this.findOne(id);

    this.loanRepository.merge(loanToUpdate, updateLoanDto);
    return await this.loanRepository.save(loanToUpdate);
  }

  async cancelLoan(id: number): Promise<Loan> {
    const loan = await this.findOne(id);

    if (loan.status === LoanStatus.COMPLETED) {
      throw new BadRequestException('this loan cant be cancelled because its completed')
    }

    if (loan.status === LoanStatus.IN_PROGRESS) {
      throw new BadRequestException('this loan cant be cancelled because its in progress')
    }

    if (loan.status === LoanStatus.CANCELLED) {
      throw new BadRequestException('this loan has already been cancelled')
    }

    loan.status = LoanStatus.CANCELLED;

    return await this.loanRepository.save(loan);
  }
}
