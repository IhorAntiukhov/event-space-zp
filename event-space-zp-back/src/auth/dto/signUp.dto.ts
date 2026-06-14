import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
