import { Injectable } from '@nestjs/common';
import { Publisher } from './publisher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherDto } from './dto/publisher.dto';

@Injectable()
export class PublisherService {
    constructor(@InjectRepository(Publisher) private publisherRepository: Repository<Publisher>) { }

    public getAll(): Promise<Publisher[]> {
        return this.publisherRepository.find();
    }

    public getById(id: number): Promise<Publisher> {
        return this.publisherRepository.findOneBy({ id });
    }

    public getByIdWithAlbums(id: number): Promise<Publisher | undefined> {
        return this.publisherRepository.findOne( { where: { id }, relations: ['albums'] });
    }

    public async create(publisherDto: PublisherDto): Promise<Publisher> {
        const publisher = this.publisherRepository.create(publisherDto);
        return await this.publisherRepository.save(publisher);
    }

    public async delete(id: number) {
        return await this.publisherRepository.delete(id);
    }

    public async update(id: number, dto: PublisherDto) {
        return await this.publisherRepository.update(id, dto);
    }
}
