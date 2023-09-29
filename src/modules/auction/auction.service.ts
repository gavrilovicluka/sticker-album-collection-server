import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AuctionDto } from './dto/auction.dto';
import { extname, join } from 'path';
import { AuctionImage } from '../image/image.entity';

@Injectable()
export class AuctionService {

    constructor(
        @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
        private userService: UserService
    ) { }

    public async create(auctionDto: AuctionDto, file: Express.Multer.File, req): Promise<Auction> {

        const user = await this.userService.getUserById(req.user.userId);
        if (!user) {
            throw new BadRequestException('Korisnik ne postoji');
        }

        const auction = new Auction();
        auction.productName = auctionDto.productName;
        auction.startDate = auctionDto.startDate;
        auction.endDate = auctionDto.endDate;
        auction.basePrice = auctionDto.basePrice;
        auction.productDescription = auctionDto.productDescription;
        auction.user = user;

        // const auctionImage = new AuctionImage();
        // auctionImage.imageUrl = `/uploads/${file.filename}`;
        // auction.productImage = auctionImage;

        auction.productImage = `/uploads/${file.filename}`;

        // if (productImage) {
        //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        //     const ext = extname(productImage.originalname);
        //     const filename = `${uniqueSuffix}${ext}`;
        //     const destination = './uploads'; // Putanja do foldera za čuvanje slika

        //     // Čuvanje slike na serveru
        //     // Možete koristiti fs.promises za čuvanje slike na disku
        //     const filePath = join(destination, filename);
        //     await fs.promises.writeFile(filePath, productImage.buffer);

        //     auction.productImage = filePath; // Sačuvajte putanju do slike u bazi ili odgovarajući atribut
        // }

        return await this.auctionRepository.save(auction);
    }


    public async getAll(): Promise<Auction[]> {
        const auctions = this.auctionRepository.find({
            relations: ['user']
        });

        if (((await auctions).length === 0)) {
            throw new BadRequestException('Ne postoje aukcije');
        }

        return auctions;
    }
}
