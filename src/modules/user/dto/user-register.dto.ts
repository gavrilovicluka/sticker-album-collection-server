import { IsEmail, IsNotEmpty, Length, Matches } from '@nestjs/class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class UserRegisterDto {
    
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
//   @Length(8, 24)
//   @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phoneNumber: string;

}