import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bid')
export class BidController {

    constructor(private bidService: BidService) { }

    // @Roles(UserRoles.MEMBER)
    // @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post('/create/:auctionId/:bidPrice')
    public makeBid(
        @Param("auctionId", ParseIntPipe) auctionId: number,
        @Param("bidPrice", ParseIntPipe) bidPrice: number,
        @Req() req
    ) {
        return this.bidService.makeBid(bidPrice, auctionId, req);
    }
}
