import { IsEmail, IsNotEmpty, Length, Matches } from '@nestjs/class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class UserEditDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phoneNumber: string;

}