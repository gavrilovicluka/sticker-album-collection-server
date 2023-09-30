import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AuctionDto } from './dto/auction.dto';
import { BidView } from '../bid/dto/bid.view';
import { AuctionView } from './dto/auction.view';
import { AuctionListView } from './dto/auction.list.view';
import { BidService } from '../bid/bid.service';

@Injectable()
export class AuctionService {

    constructor(
        @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
        private userService: UserService,
        @Inject(forwardRef(() => BidService))
        private readonly bidService: BidService
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


    public async getAll(): Promise<AuctionListView[]> {
        // const auctions = await this.auctionRepository.find({
        //     relations: ['user']
        // });

        // if (((auctions).length === 0)) {
        //     throw new BadRequestException('Ne postoje aukcije');
        // }

        // return auctions;


        const auctions = await this.auctionRepository
            .createQueryBuilder('auction')
            .leftJoinAndSelect('auction.bids', 'bids')
            .leftJoinAndSelect('bids.user', 'bidUser')
            .getMany();

        if (!auctions) {
            throw new BadRequestException('Ne postoje aukcije');
        }

        let auctionsView: AuctionListView[] = [];

        auctions.forEach(auction => {
            auction.bids.sort((a, b) => b.bidPrice - a.bidPrice);
            const topBid = auction.bids[0];

            const auctionView: AuctionListView = {
                id: auction.id,
                productName: auction.productName,
                productDescription: auction.productDescription,
                startDate: auction.startDate,
                endDate: auction.endDate,
                basePrice: auction.basePrice,
                productImage: auction.productImage,
                topBid: null
            }

            if (topBid) {
                auctionView.topBid = {
                    id: topBid.id,
                    bidPrice: topBid.bidPrice,
                    bidTime: topBid.bidTime,
                    bidUserId: topBid.id,
                    bidUsername: topBid.user.username,
                    bidUserAddress: topBid.user.address,
                    bidUserPhoneNumber: topBid.user.phoneNumber,
                    bidUserEmail: topBid.user.email,
                }
            }

            auctionsView.push(auctionView);
        })

        return auctionsView;
    }

    public async getAuctionsByType(type: string): Promise<AuctionListView[]> {

        let auctionsQuery = await this.auctionRepository
            .createQueryBuilder('auction')
            .leftJoinAndSelect('auction.bids', 'bids')
            .leftJoinAndSelect('bids.user', 'bidUser')

        switch (type) {
            case 'active':
                auctionsQuery = auctionsQuery.where('auction.startDate <= :now AND auction.endDate >= :now', {
                    now: new Date(),
                });
                break;
            case 'ended':
                auctionsQuery = auctionsQuery.where('auction.endDate < :now', {
                    now: new Date(),
                });
                break;
            case 'waiting':
                auctionsQuery = auctionsQuery.where('auction.startDate > :now', {
                    now: new Date(),
                });
                break;
            default:
                throw new BadRequestException('Nepodržan tip aukcije');
        }

        const auctions = await auctionsQuery.getMany();
        if (!auctions) {
            throw new BadRequestException('Ne postoje aukcije');
        }

        let auctionsView: AuctionListView[] = [];

        auctions.forEach(auction => {
            auction.bids.sort((a, b) => b.bidPrice - a.bidPrice);
            const topBid = auction.bids[0];

            const auctionView: AuctionListView = {
                id: auction.id,
                productName: auction.productName,
                productDescription: auction.productDescription,
                startDate: auction.startDate,
                endDate: auction.endDate,
                basePrice: auction.basePrice,
                productImage: auction.productImage,
                topBid: null
            }

            if (topBid) {
                auctionView.topBid = {
                    id: topBid.id,
                    bidPrice: topBid.bidPrice,
                    bidTime: topBid.bidTime,
                    bidUserId: topBid.id,
                    bidUsername: topBid.user.username,
                    bidUserAddress: topBid.user.address,
                    bidUserPhoneNumber: topBid.user.phoneNumber,
                    bidUserEmail: topBid.user.email,
                }
            }

            auctionsView.push(auctionView);
        })

        return auctionsView;
    }

    public getById(id: number): Promise<Auction> {
        // return this.auctionRepository.findOneBy({ id });
        const auction = this.auctionRepository
            .createQueryBuilder('auction')
            .where('auction.id = :id', { id })
            .leftJoinAndSelect('auction.bids', 'bids')
            .leftJoinAndSelect('bids.user', 'bidUser')
            .leftJoin('auction.user', 'user')
            .addSelect('user.id')
            .addSelect('user.username')
            .addSelect('user.address')
            .addSelect('user.phoneNumber')
            .addSelect('user.email')
            .getOne();

        return auction;
    }

    public getByIdWithBids(id: number): Promise<Auction> {
        return this.auctionRepository.findOne({
            where: { id },
            relations: ['bids', 'bids.user']
        });
    }

    public async getWithData(id: number): Promise<AuctionView> {
        const auction = await this.auctionRepository
            .createQueryBuilder('auction')
            .where('auction.id = :id', { id })
            .leftJoinAndSelect('auction.bids', 'bids')
            .leftJoinAndSelect('bids.user', 'bidUser')
            .leftJoin('auction.user', 'user')
            .addSelect('user.id')
            .addSelect('user.username')
            .addSelect('user.address')
            .addSelect('user.phoneNumber')
            .addSelect('user.email')
            .getOne();

        if (!auction) {
            throw new BadRequestException('Aukcija ne postoji');
        }

        auction.bids.sort((a, b) => b.bidPrice - a.bidPrice);
        const top5Bids = auction.bids.slice(0, 5);

        let bids: BidView[] = [];
        top5Bids.forEach(bid => {
            let bidView: BidView = {
                id: bid.id,
                bidPrice: bid.bidPrice,
                bidTime: bid.bidTime,
                bidUserId: bid.user.id,
                bidUsername: bid.user.username,
                bidUserAddress: bid.user.address,
                bidUserPhoneNumber: bid.user.phoneNumber,
                bidUserEmail: bid.user.email
            }
            bids.push(bidView);
        });

        let auctionView: AuctionView = {
            id: auction.id,
            productName: auction.productName,
            startDate: auction.startDate,
            endDate: auction.endDate,
            basePrice: auction.basePrice,
            productDescription: auction.productDescription,
            productImage: auction.productImage,
            user: auction.user,
            bids: bids
        }

        return auctionView;
    }

    public async delete(id: number) {
        // return await this.auctionRepository.delete(id);

        const auction = await this.auctionRepository.findOne({
            where: { id },
            relations: ['bids']
        });

        if (!auction) {
            throw new NotFoundException(`Aukcija sa ID-jem ${id} nije pronadjena.`);
        }

        for (const bid of auction.bids) {
            await this.bidService.delete(bid.id);
        }

        return await this.auctionRepository.delete(id);

    }



}
