import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
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
