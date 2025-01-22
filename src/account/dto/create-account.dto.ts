import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { accountType } from "../enum/account-type.enum";

export class CreateAccountDto {
  @IsNumber()
  customerId: number;

  @IsString()
  accountNumber: string;

  @IsString()
  agency: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(accountType)
  type: accountType;
}
