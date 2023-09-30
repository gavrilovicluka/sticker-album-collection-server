import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';

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

    // @Roles(UserRoles.MEMBER, UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    public deleteAuction(@Param("id", ParseIntPipe) id: number) {
        return this.bidService.delete(id);
    }
}
