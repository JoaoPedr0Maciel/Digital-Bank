import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LoanStatus } from "../enum/status-loan.enum";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestedValue: number;

  @Column()
  interestRate: number;

  @Column()
  installments: number;

  @Column()
  status: LoanStatus;

  @Column()
  requestedDate: Date;
}
