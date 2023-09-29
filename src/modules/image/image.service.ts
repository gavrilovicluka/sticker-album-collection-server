import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionImage } from './image.entity';
import { Repository } from 'typeorm';
import { AuctionService } from '../auction/auction.service';
import { Auction } from '../auction/auction.entity';

@Injectable()
export class ImageService {

    constructor(
        @InjectRepository(AuctionImage) private repo: Repository<AuctionImage>,
        private auctionService: AuctionService
    ) { }

    async uploadImage(file: Express.Multer.File, req) {

        // const auctionId = req.body.auctionId; // Dodajte polje "auctionId" u telo zahteva prilikom slanja
        // const auction: Auction = await this.auctionService.findOne(auctionId);

        // if (!auction) {
        //     throw new BadRequestException('Auction not found');
        // }

        // const auctionImage = new AuctionImage();
        // auctionImage.imageUrl = `/uploads/${file.filename}`;

        // auction.productImage = auctionImage;

        // await this.repo.save(auctionImage);
        // await this.auctionService.save(auction);

    }
}
