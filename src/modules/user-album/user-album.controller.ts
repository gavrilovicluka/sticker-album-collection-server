import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserAlbumService } from './user-album.service';
import { UserAlbumDto } from './dto/user-album.dto';

@Controller('user-album')
export class UserAlbumController {
    constructor(private userAlbumService: UserAlbumService) { }

    @Get(":userId")
    public getUserAlbums(@Param("userId", ParseIntPipe) userId: number) {
        return this.userAlbumService.getAllByUserId(userId);
    }

    @Get(":userId/:albumId")
    public getUserAlbum(@Param("userId", ParseIntPipe) userId: number, @Param("albumId", ParseIntPipe) albumId: number) {
        return this.userAlbumService.getByUserAndAlbumId(userId, albumId);
    }

    @Post(":userId/:albumId")
    public addUserAlbum(
        @Param("userId", ParseIntPipe) userId: number,
        @Param("albumId", ParseIntPipe) albumId: number) {

        return this.userAlbumService.create(userId, albumId);
    }

    @Delete(":id")
    public deleteUserAlbum(@Param("id", ParseIntPipe) id: number) {
        return this.userAlbumService.delete(id);
    }

    @Put(":id")
    public async updateUserAlbum(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UserAlbumDto
    ) {
        return this.userAlbumService.update(id, dto);
    }
}
