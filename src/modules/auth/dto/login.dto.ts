import { IsNotEmpty } from "@nestjs/class-validator";

export class LoginDto {
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}