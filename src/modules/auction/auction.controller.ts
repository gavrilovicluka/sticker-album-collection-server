import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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

    // @Roles(UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    // @UseGuards(AuthGuard('jwt'))
    @Get()
    public getAuctions() {
        return this.auctionService.getAll();
    }

}
