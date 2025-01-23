import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoanStatus } from "../enum/status-loan.enum";
import { Customer } from "src/customer/entities/customer.entity";
import { Exclude } from "class-transformer";

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

  @ManyToOne(() => Customer)
  @JoinColumn()
  @Exclude()
  customer: Customer
}
