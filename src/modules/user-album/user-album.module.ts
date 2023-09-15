import { Module } from '@nestjs/common';
import { UserAlbumController } from './user-album.controller';
import { UserAlbumService } from './user-album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAlbum } from './user-album.entity';
import { UserModule } from '../user/user.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAlbum]), UserModule, AlbumModule],
  controllers: [UserAlbumController],
  providers: [UserAlbumService]
})
export class UserAlbumModule {}
