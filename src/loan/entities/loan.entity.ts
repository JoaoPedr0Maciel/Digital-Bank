import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoanStatus } from "../enum/status-loan.enum";
import { Customer } from "src/customer/entities/customer.entity";

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

  @Column()
  @ManyToOne(() => Customer)
  @JoinColumn()
  customer: Customer
}
