import { IsDate, IsEnum, IsNumber } from "class-validator";
import { LoanStatus } from "../enum/status-loan.enum";

export class CreateLoanDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  requestedValue: number;

  @IsNumber()
  interestRate: number;

  @IsNumber()
  installments: number;

  @IsEnum(LoanStatus)
  status: LoanStatus;

  @IsDate()
  requestedDate: Date;
}
