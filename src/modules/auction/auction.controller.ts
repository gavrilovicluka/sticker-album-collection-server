import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionDto } from './dto/auction.dto';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from '../user/enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auction')
export class AuctionController {

    constructor(private auctionService: AuctionService) { }

    // @Roles(UserRoles.MEMBER)
    // @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseInterceptors(
        FileInterceptor('Image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        }),
    )
    public addAuction(
        @Body() dto: AuctionDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req
    ) {
        return this.auctionService.create(dto, file, req);
    }

    @Get('/filter')
    filterAuctions(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        return {
            noviDate: new Date(startDate),
            endDate
        }

        // return this.auctionService.filterAuctions(startDate, endDate);
    }

    // @Roles(UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get('/userAuctions')
    public getUserAuctions(
        @Req() req,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        return this.auctionService.getUserAuctionsWithFilter(req.user.userId, startDate, endDate);
    }
    
    @Get('/hot/:numberOfAuctions')
    public getHotAuctions(@Param("numberOfAuctions", ParseIntPipe) numberOfAuctions: number) {
        return this.auctionService.getHotAuctions(numberOfAuctions);
    }

    // @Roles(UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    // @UseGuards(AuthGuard('jwt'))
    @Get()
    public getAuctions(@Query('type') type: string) {
        // return this.auctionService.getAll();
        return this.auctionService.getAuctionsByType(type);
    }

    @Get(':aucionId')
    public getAuctionById(@Param("aucionId", ParseIntPipe) aucionId: number) {
        return this.auctionService.getById(aucionId);
    }



    @Get(':aucionId/bids')
    public getAuctionByIdWithBids(@Param("aucionId", ParseIntPipe) aucionId: number,) {
        return this.auctionService.getByIdWithBids(aucionId);
    }

    @Get('/getWithData/:aucionId')
    public getAuctionWithData(@Param("aucionId", ParseIntPipe) aucionId: number,) {
        return this.auctionService.getWithData(aucionId);
    }

    // @Roles(UserRoles.MEMBER, UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    // @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    public deleteAuction(@Param("id", ParseIntPipe) id: number) {
        return this.auctionService.delete(id);
    }



}
