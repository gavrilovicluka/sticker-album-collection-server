import { Module, forwardRef } from '@nestjs/common';
import { Bid } from './bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { UserModule } from '../user/user.module';
import { AuctionModule } from '../auction/auction.module';
import { AuctionService } from '../auction/auction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Bid]), UserModule, forwardRef(() => AuctionModule)],
    controllers: [BidController],
    providers: [BidService],
    exports: [BidService]
})
export class BidModule {}
