import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AuctionImage } from './image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionModule } from '../auction/auction.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionImage]), AuctionModule],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
