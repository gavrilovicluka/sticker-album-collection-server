import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
    constructor(@InjectRepository(Album) private albumRepository: Repository<Album>) { }

    public getAll(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    public getById(id: number): Promise<Album> {
        return this.albumRepository.findOneBy({ id });
    }

    public async create(albumDto: AlbumDto): Promise<Album> {
        const album = this.albumRepository.create(albumDto);
        return await this.albumRepository.save(album);
    }

    public async delete(id: number) {
        return await this.albumRepository.delete(id);
    }

    public async update(id: number, dto: AlbumDto) {
        return await this.albumRepository.update(id, dto);
    }
}
