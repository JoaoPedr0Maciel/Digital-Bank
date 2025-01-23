import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Customer])],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
