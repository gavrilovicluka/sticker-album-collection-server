import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAlbum } from './user-album.entity';
import { UserAlbumDto } from './dto/user-album.dto';
import { UserService } from '../user/user.service';
import { AlbumService } from '../album/album.service';
import { UserAlbumEditDto } from './dto/user-album.edit.dto';

@Injectable()
export class UserAlbumService {
    constructor(
        @InjectRepository(UserAlbum) private userAlbumRepository: Repository<UserAlbum>,
        private userService: UserService,
        private albumService: AlbumService) { }


    public async getAllByUserId(userId: number): Promise<UserAlbum[]> {
        const userAlbums = this.userAlbumRepository.find({
            where: { user: { id: userId } },
            relations: ['album']
        });

        if (((await userAlbums).length === 0)) {
            throw new BadRequestException('Korisnik nema nijedan album u kolekciji');
        }

        return userAlbums;
    }

    public async getUserAlbumsByAlbumId(albumId: number): Promise<UserAlbum[]> {
        const userAlbums = this.userAlbumRepository
            .createQueryBuilder('userAlbum')
            .where('userAlbum.album = :albumId', { albumId })
            .leftJoin('userAlbum.album', 'album') 
            .addSelect('album.id') 
            .addSelect('album.name')
            .leftJoin('userAlbum.user', 'user')
            .addSelect('user.id')
            .addSelect('user.username')
            .getMany();

        // .find({ 
        //     where: { album: { id: albumId } },
        //     // relations: ['user'],     
        //     relations: {
        //         user: {
        //             username: true
        //         }
        //     }
        // });

        if (((await userAlbums).length === 0)) {
            throw new BadRequestException('Ne postoji nijedna kolekcija sa datim albumom.');
        }

        return userAlbums;
    }


    public async getByUserAndAlbumId(userId: number, albumId: number): Promise<UserAlbum> {
        const userAlbum = this.userAlbumRepository.findOne({ where: { user: { id: userId }, album: { id: albumId } }, relations: ['album'] });

        if (!(await userAlbum)) {
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

        if (check) {
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

    public async update(id: number, dto: UserAlbumDto): Promise<UserAlbum> {
        // return await this.userAlbumRepository.update(id, dto);

        const existingUserAlbum = await this.userAlbumRepository.findOne({ where: { id }, relations: ['album'] });

        if (!existingUserAlbum) {
            throw new BadRequestException('Kolekcija ne postoji');
        }

        // Kopiranje vrednosti iz dto u existingUserAlbum
        Object.assign(existingUserAlbum, dto);

        await this.userAlbumRepository.save(existingUserAlbum);

        return existingUserAlbum;
    }

    // public async updateStickers(id: number, dto: UserAlbumEditDto) {
    //     return await this.userAlbumRepository.update(id, dto);
    // }
}
