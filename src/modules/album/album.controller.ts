import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Get()
    public getAlbums() {
        return this.albumService.getAll();
    }

    @Get(":id")
    public getAlbum(@Param("id", ParseIntPipe) id: number) {
        return this.albumService.getById(id);
    }

    @Post()
    public addAlbum(@Body() dto: AlbumDto) {
        return this.albumService.create(dto);
    }

    @Delete(":id")
    public deleteAlbum(@Param("id", ParseIntPipe) id: number) {
        return this.albumService.delete(id);
    }

    @Put(":id")
    public async updateAlbum(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: AlbumDto
    ) {
        return this.albumService.update(id, dto);
    }
}
