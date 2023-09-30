import { Module, forwardRef } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { UserModule } from '../user/user.module';
import { BidModule } from '../bid/bid.module';
import { BidService } from '../bid/bid.service';
@Module({
  imports: [TypeOrmModule.forFeature([Auction]), UserModule, forwardRef(() => BidModule)],
  controllers: [AuctionController],
  providers: [AuctionService],
  exports: [AuctionService]
})
export class AuctionModule {}
