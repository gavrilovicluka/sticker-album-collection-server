import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { PublisherModule } from '../publisher/publisher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), PublisherModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService]
})
export class AlbumModule {}
