import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserAlbumService } from './user-album.service';
import { UserAlbumDto } from './dto/user-album.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-album')
export class UserAlbumController {
    constructor(private userAlbumService: UserAlbumService) { }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get(":userId")
    public getUserAlbums(@Param("userId", ParseIntPipe) userId: number) {
        return this.userAlbumService.getAllByUserId(userId);
    }
    
    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get("/album/:albumId")
    public getUserAlbumsByAlbumId(@Param("albumId", ParseIntPipe) albumId: number) {
        return this.userAlbumService.getUserAlbumsByAlbumId(albumId);
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get(":userId/:albumId")
    public getUserAlbum(@Param("userId", ParseIntPipe) userId: number, @Param("albumId", ParseIntPipe) albumId: number) {
        return this.userAlbumService.getByUserAndAlbumId(userId, albumId);
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post(":userId/:albumId")
    public addUserAlbum(
        @Param("userId", ParseIntPipe) userId: number,
        @Param("albumId", ParseIntPipe) albumId: number) {

        return this.userAlbumService.create(userId, albumId);
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    public deleteUserAlbum(@Param("id", ParseIntPipe) id: number) {
        return this.userAlbumService.delete(id);
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    public async updateUserAlbum(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UserAlbumDto
    ) {
        return this.userAlbumService.update(id, dto);
    }

}
