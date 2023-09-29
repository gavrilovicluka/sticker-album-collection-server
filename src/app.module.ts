import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { PublisherModule } from './modules/publisher/publisher.module';
import { AlbumModule } from './modules/album/album.module';
import { UserAlbumModule } from './modules/user-album/user-album.module';
import { AuctionModule } from './modules/auction/auction.module';
import { ImageModule } from './modules/image/image.module';
import { BidModule } from './modules/bid/bid.module';

@Module({
  imports: [
    UserModule, 
    TypeOrmModule.forRoot(typeOrmConfig), 
    AuthModule, 
    PublisherModule, 
    AlbumModule, 
    UserAlbumModule, 
    AuctionModule, 
    ImageModule, 
    BidModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
