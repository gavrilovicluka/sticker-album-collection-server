import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
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
        @Inject(forwardRef(() => AuctionService)) 
        private readonly auctionService: AuctionService
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

        if (user.id === auction.user.id) {
            throw new BadRequestException('Ne mozete dati ponudu za svoj proizvod');
        }

        if (bidPrice < auction.basePrice) {
            throw new BadRequestException('Ponuda mora biti veca od pocetne cene');
        }

        const bids = await this.bidRepository.find({ where: { auction: { id: auctionId } } });
        bids.sort((a, b) => b.bidPrice - a.bidPrice)

        if (bids.length > 0 && bidPrice <= bids[0].bidPrice) {
            throw new BadRequestException('Ponuda mora biti veca od trenutne najvece ponude');
        }

        const newBid = new Bid();
        newBid.bidPrice = bidPrice;
        newBid.bidTime = new Date();
        newBid.user = user;
        newBid.auction = auction;

        const alreadyBid = await this.bidRepository.findOne(
            {
                where: {
                    auction: { id: auctionId },
                    user: { id: user.id }
                }
            }
        )

        if (alreadyBid) {
            if (bidPrice < alreadyBid.bidPrice) {
                throw new BadRequestException('Ponuda mora biti veca vase prethodne ponude');
            }
            // newBid.id = alreadyBid[0].id;         
            // return await this.bidRepository.update(alreadyBid[0].id, newBid);
            
            const updatedBid = { ...alreadyBid, ...newBid };
            return await this.bidRepository.save(updatedBid);
        }

        const createdBid = this.bidRepository.create(newBid);
        return await this.bidRepository.save(createdBid);
    }

    public async delete(id: number) {
        return await this.bidRepository.delete(id);
    }
}
