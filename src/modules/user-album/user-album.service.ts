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

    
    public async getAllByUserId(userId: number): Promise<UserAlbum[]> {
        const userAlbums = this.userAlbumRepository.find({ where: { user: { id: userId } }, relations: ['album'] });

        if(((await userAlbums).length === 0)) {
            throw new BadRequestException('Korisnik nema nijedan album u kolekciji');
        }

        return userAlbums;
    }


    public async getByUserAndAlbumId(userId: number, albumId: number): Promise<UserAlbum> {
        const userAlbum = this.userAlbumRepository.findOne({ where: { user: { id: userId }, album: { id: albumId } } }); 

        if(!(await userAlbum)) {
            throw new BadRequestException('Korisnik nema dati album u kolekciji');
        }

        return userAlbum;
    }

    public async create(userId: number, albumId: number): Promise<UserAlbum> {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new BadRequestException('Korisnik ne postoji');
        }

        const album = await this.albumService.getById(albumId);
        if (!album) {
            throw new BadRequestException('Album ne postoji');
        }

        const check = await this.userAlbumRepository.findOne({ where: { user: { id: userId }, album: { id: albumId } } }); 
        
        if(check) {
            throw new BadRequestException('Vec imate izabrani album u kolekciji');
        }

        const missingStickers = Array.from({ length: album.stickersNumber }, (_, i) => i + 1);
        const duplicatesStickers = [];

        const userAlbum: UserAlbumDto = {
            user,
            album,
            missingStickers,
            duplicatesStickers
        };

        const createdUserAlbum = this.userAlbumRepository.create(userAlbum);
        return await this.userAlbumRepository.save(createdUserAlbum);
    }

    public async delete(id: number) {
        return await this.userAlbumRepository.delete(id);
    }

    public async update(id: number, dto: UserAlbumDto) {
        return await this.userAlbumRepository.update(id, dto);
    }
}
