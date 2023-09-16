import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { AlbumDto } from './dto/album.dto';
import { PublisherService } from '../publisher/publisher.service';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album) private albumRepository: Repository<Album>,
        private pubisherService: PublisherService) { }

    public getAll(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    public getById(id: number): Promise<Album> {
        return this.albumRepository.findOneBy({ id });
    }

    public getAlbumsByPublisherId(publisherId: number): Promise<Album[]> {
        return this.albumRepository.find({ where: { publisher: { id: publisherId } } });
    }

    public async create(publisherId: number, albumDto: AlbumDto): Promise<Album> {
        const publisher = await this.pubisherService.getById(publisherId);
        if (!publisher) {
            throw new BadRequestException('Izdavac ne postoji');
        }

        const album = this.albumRepository.create(albumDto);
        album.publisher = publisher;

        return await this.albumRepository.save(album);
    }

    public async delete(id: number) {
        return await this.albumRepository.delete(id);
    }

    public async update(id: number, dto: AlbumDto) {
        return await this.albumRepository.update(id, dto);
    }
}
