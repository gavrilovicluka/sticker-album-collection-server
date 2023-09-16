import { ArrayNotEmpty, IsArray, IsNotEmpty } from "@nestjs/class-validator";
import { Album } from "src/modules/album/album.entity";
import { User } from "src/modules/user/user.entity";

export class UserAlbumDto {

    // @IsNotEmpty()
    @IsArray()
    // @ArrayNotEmpty()
    missingStickers: number[];

    // @IsNotEmpty()
    @IsArray()
    // @ArrayNotEmpty()
    duplicatesStickers: number[];

    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    album: Album;
}