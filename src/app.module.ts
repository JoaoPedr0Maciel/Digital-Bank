import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { LoanModule } from './loan/loan.module';
import { ConfigModule } from '@nestjs/config'

ConfigModule.forRoot();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
  }), CustomerModule, AccountModule, LoanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
