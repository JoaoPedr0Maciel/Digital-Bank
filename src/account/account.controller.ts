import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DepositDto, WithdrawDto } from './dto/deposit-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Get('amount/:id')
  async veridyAmount(@Param('id') id: string) {
    const amount = await this.accountService.verifyAmount(+id);
    return { amount };
  }

  @Patch(':id')
  async activeAccount(@Param('id') id: string) {
    await this.accountService.activeAccount(+id);
    return {
      message: 'account actived successfully'
    }
  }

  @Patch('deposit/:id')
  async newDeposit(@Param('id') id: string, @Body() deposit: DepositDto) {
    const account = await this.accountService.newDeposit(+id, deposit.value);
    return account;
  }

  @Patch('withdraw/:id')
  async newWithdraw(@Param('id') id: string, @Body() withdraw: WithdrawDto) {
    const account = await this.accountService.newWithdraw(+id, withdraw.value);
    return account;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
