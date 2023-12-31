import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { WebsocketsGateway } from 'src/websockets.gateway';

@Controller('bid')
export class BidController {

    constructor(private bidService: BidService, private readonly websocketsGateway: WebsocketsGateway) { }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get('/userBids')
    public getUserBids(
        @Req() req,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        return this.bidService.getUserBids(req.user.userId, startDate, endDate);
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post('/create/:auctionId/:bidPrice')
    public async makeBid(
        @Param("auctionId", ParseIntPipe) auctionId: number,
        @Param("bidPrice", ParseIntPipe) bidPrice: number,
        @Req() req
    ) {
        const newBid = this.bidService.makeBid(bidPrice, auctionId, req);
        this.websocketsGateway.sendBidToClients(await newBid);
        return newBid;
    }

    @Roles(UserRoles.MEMBER, UserRoles.ADMIN)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    public deleteAuction(@Param("id", ParseIntPipe) id: number) {
        return this.bidService.delete(id);
    }
}
