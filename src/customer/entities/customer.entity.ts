import { Exclude } from "class-transformer";
import { Account } from "src/account/entities/account.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  birthday: Date;

  @OneToOne(() => Account, (account) => account.customer)
  account: Account;
}
