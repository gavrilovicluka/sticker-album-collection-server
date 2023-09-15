import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlbum } from './user-album.entity';
import { UserAlbumDto } from './dto/user-album.dto';
import { UserService } from '../user/user.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class UserAlbumService {
    constructor(
        @InjectRepository(UserAlbum) private userAlbumRepository: Repository<UserAlbum>,
        private userService: UserService,
        private albumService: AlbumService) { }

    // By User ID
    public getAll(): Promise<UserAlbum[]> {
        return this.userAlbumRepository.find();     // plus where...
    }

    // By User ID
    public getById(id: number): Promise<UserAlbum> {
        return this.userAlbumRepository.findOneBy({ id });      // plus where...
    }

    // public async create(userId: number, albumId: number, userAlbumDto: UserAlbumDto): Promise<UserAlbum> {
    //     const user = this.userService.getUserById(userId);
    //     if (!user) {
    //         throw new BadRequestException('Korisnik ne postoji');
    //     }

    //     const album = this.albumService.getById(albumId);
    //     if (!album) {
    //         throw new BadRequestException('Album ne postoji');
    //     }

    //     const userAlbum = this.userAlbumRepository.create({
    //         ...userAlbumDto,
    //         user,
    //         album,
    //     });

    //     return await this.userAlbumRepository.save(userAlbum);
    // }

    public async delete(id: number) {
        return await this.userAlbumRepository.delete(id);
    }

    public async update(id: number, dto: UserAlbumDto) {
        return await this.userAlbumRepository.update(id, dto);
    }
}
