import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({ name: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ name: 'cpf' })
  @IsString()
  cpf: string;

  @ApiProperty({ name: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ name: 'phone' })
  @IsString()
  phone: string;

  @ApiProperty({ name: 'address' })
  @IsString()
  address: string;

  @ApiProperty({ name: 'birthday' })
  @IsDate()
  birthday: Date;
}
