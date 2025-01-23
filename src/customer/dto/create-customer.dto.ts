import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsDate()
  birthday: Date;
}
