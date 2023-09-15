import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserAlbumService } from './user-album.service';
import { UserAlbumDto } from './dto/user-album.dto';

@Controller('user-album')
export class UserAlbumController {
    constructor(private userAlbumService: UserAlbumService) { }

    // By User ID
    @Get()
    public getUserAlbums() {
        return this.userAlbumService.getAll();
    }

    // By User ID
    @Get(":id")
    public getUserAlbum(@Param("id", ParseIntPipe) id: number) {
        return this.userAlbumService.getById(id);
    }

    // @Post(":userId/:albumId")
    // public addUserAlbum(
    //     @Param("userId", ParseIntPipe) userId: number,
    //     @Param("albumId", ParseIntPipe) albumId: number,
    //     @Body() dto: UserAlbumDto) {

    //     return this.userAlbumService.create(userId, albumId, dto);
    // }

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
