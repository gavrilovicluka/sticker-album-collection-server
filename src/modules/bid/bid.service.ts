import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { Between, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AuctionService } from '../auction/auction.service';
import { AuctionListView } from '../auction/dto/auction.list.view';
import { BidView } from './dto/bid.view';

@Injectable()
export class BidService {

    constructor(
        @InjectRepository(Bid) private bidRepository: Repository<Bid>,
        private userService: UserService,
        @Inject(forwardRef(() => AuctionService))
        private readonly auctionService: AuctionService
    ) { }


    public async makeBid(bidPrice: number, auctionId: number, req): Promise<BidView> {
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
            await this.bidRepository.save(updatedBid);
            
            const updatedBidView: BidView = {
                id: updatedBid.id,
                bidPrice: updatedBid.bidPrice,
                bidTime: updatedBid.bidTime,
                bidUserId: updatedBid.user.id,
                bidUsername: updatedBid.user.username,
                bidUserAddress: updatedBid.user.address,
                bidUserPhoneNumber: updatedBid.user.phoneNumber,
                bidUserEmail: updatedBid.user.email,
                auctionId: updatedBid.auction.id
            }

            return updatedBidView;
        }

        const createdBid = this.bidRepository.create(newBid);
        await this.bidRepository.save(createdBid);

        const createdBidView: BidView = {   
            id: createdBid.id,
            bidPrice: createdBid.bidPrice,
            bidTime: createdBid.bidTime,
            bidUserId: createdBid.user.id,
            bidUsername: createdBid.user.username,
            bidUserAddress: createdBid.user.address,
            bidUserPhoneNumber: createdBid.user.phoneNumber,
            bidUserEmail: createdBid.user.email,
            auctionId: createdBid.auction.id
        }

        return createdBidView;
    }

    public async getUserBids(userId: number, startDate: string, endDate: string): Promise<BidView[]> {

        const bids = await this.bidRepository.find({
            where: {
                user: { id: userId },
                bidTime: Between(new Date(startDate), new Date(endDate))
            },
            relations: ['auction', 'user'],
        });

        if (!bids) {
            throw new BadRequestException('Ne postoje ponude');
        }

        return this.processBids(bids);
    }

    public async processBids(bids: Bid[]): Promise<BidView[]> {
        const bidsView: BidView[] = [];

        for (const bid of bids) {

            let won: boolean = false;

            if (bid.auction.endDate < new Date()) {
                const topBid: Bid = await this.auctionService.getTopBid(bid.auction.id);

                won = topBid.id === bid.id;
            }

            const bidView: BidView = {
                id: bid.id,
                bidPrice: bid.bidPrice,
                bidTime: bid.bidTime,
                bidUserId: bid.user.id,
                auctionId: bid.auction.id,
                productName: bid.auction.productName,
                productDescription: bid.auction.productDescription,
                endDate: bid.auction.endDate,
                won: won
            };

            bidsView.push(bidView);
        }

        return bidsView;
    }

    public async delete(id: number) {
        return await this.bidRepository.delete(id);
    }
}
