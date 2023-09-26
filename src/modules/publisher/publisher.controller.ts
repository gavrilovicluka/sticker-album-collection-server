import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherDto } from './dto/publisher.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('publisher')
export class PublisherController {
    constructor(private publisherService: PublisherService) { }

    @Get()
    public getPublishers() {
        return this.publisherService.getAll();
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get(":id")
    public getPublisher(@Param("id", ParseIntPipe) id: number) {
        return this.publisherService.getById(id);
    }
    
    @Get(":id/albums")
    public getPublisherByIdWithAlbums(@Param("id", ParseIntPipe) id: number) {
        return this.publisherService.getByIdWithAlbums(id);
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public addPublisher(@Body() dto: PublisherDto) {
        return this.publisherService.create(dto);
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    public deletePublisher(@Param("id", ParseIntPipe) id: number) {
        return this.publisherService.delete(id);
    }

    @Roles(UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    public async updatePublisher(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: PublisherDto
    ) {
        return this.publisherService.update(id, dto);
    }
}
