import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherDto } from './dto/publisher.dto';

@Controller('publisher')
export class PublisherController {
    constructor(private publisherService: PublisherService) { }

    @Get()
    public getPublishers() {
        return this.publisherService.getAll();
    }

    @Get(":id")
    public getPublisher(@Param("id", ParseIntPipe) id: number) {
        return this.publisherService.getById(id);
    }

    @Post()
    public addPublisher(@Body() dto: PublisherDto) {
        return this.publisherService.create(dto);
    }

    @Delete(":id")
    public deletePublisher(@Param("id", ParseIntPipe) id: number) {
        return this.publisherService.delete(id);
    }

    @Put(":id")
    public async updatePublisher(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: PublisherDto
    ) {
        return this.publisherService.update(id, dto);
    }
}
