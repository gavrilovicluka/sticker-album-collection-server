import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

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

    @Get("/publisher/:publisherId")
    public getAlbumsByPublisherId(@Param("publisherId", ParseIntPipe) publisherId: number) {
        return this.albumService.getAlbumsByPublisherId(publisherId);
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post(":publisherId")
    public addAlbum(@Param("publisherId", ParseIntPipe) publisherId: number, @Body() dto: AlbumDto) {
        return this.albumService.create(publisherId, dto);
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    public deleteAlbum(@Param("id", ParseIntPipe) id: number) {
        return this.albumService.delete(id);
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    public async updateAlbum(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: AlbumDto
    ) {
        return this.albumService.update(id, dto);
    }
}
