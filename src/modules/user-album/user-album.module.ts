import { Module } from '@nestjs/common';
import { UserAlbumController } from './user-album.controller';
import { UserAlbumService } from './user-album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAlbum } from './user-album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAlbum])],
  controllers: [UserAlbumController],
  providers: [UserAlbumService]
})
export class UserAlbumModule {}
