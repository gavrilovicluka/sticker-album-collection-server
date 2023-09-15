import { ArrayNotEmpty, IsArray, IsNotEmpty } from "@nestjs/class-validator";

export class UserAlbumDto {

    // @IsNotEmpty()
    @IsArray()
    // @ArrayNotEmpty()
    missingStickers: number[];

    // @IsNotEmpty()
    @IsArray()
    // @ArrayNotEmpty()
    duplicatesStickers: number[];
}