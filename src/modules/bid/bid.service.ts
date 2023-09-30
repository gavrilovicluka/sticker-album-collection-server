import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AuctionService } from '../auction/auction.service';

@Injectable()
export class BidService {

    constructor(
        @InjectRepository(Bid) private bidRepository: Repository<Bid>,
        private userService: UserService,
        private auctionService: AuctionService
    ) { }


    public async makeBid(bidPrice: number, auctionId: number, req): Promise<Bid> {

        const user = await this.userService.getUserById(req.user.userId);
        if (!user) {
            throw new BadRequestException('Korisnik ne postoji');
        }
        
        const auction = await this.auctionService.getById(auctionId);
        if (!auction) {
            throw new BadRequestException('Aukcija ne postoji');
        }
        
        const newBid = new Bid();
        newBid.bidPrice = bidPrice;
        newBid.user = user;
        newBid.auction = auction;

        return await this.bidRepository.save(newBid);
    }
}
