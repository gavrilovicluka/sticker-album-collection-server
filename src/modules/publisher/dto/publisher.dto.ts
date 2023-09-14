import { IsNotEmpty } from "@nestjs/class-validator";

export class PublisherDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    image: string;
}