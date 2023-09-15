import { IsNotEmpty } from "@nestjs/class-validator";

export class AlbumDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    year: number;

    @IsNotEmpty()
    stickersNumber: number;

    @IsNotEmpty()
    imageUrl: string;
}