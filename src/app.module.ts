import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'postgres',
    username: 'postgres',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    database: 'digital_bank',
    synchronize: true,
    logging: true,
  }), CustomerModule, AccountModule, LoanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
