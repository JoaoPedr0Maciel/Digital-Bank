import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { accountType } from "../enum/account-type.enum";
import { Customer } from "src/customer/entities/customer.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accNumber: string;

  @Column()
  agency: string;

  @Column()
  amount: number;

  @Column()
  isActive: boolean;

  @Column()
  type: accountType;

  @OneToOne(() => Customer, (customer) => customer.account)
  @JoinColumn()
  @Exclude()
  customer: Customer
}
