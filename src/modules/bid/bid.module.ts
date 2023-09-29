import { Module } from '@nestjs/common';
import { Bid } from './bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Bid])],
})
export class BidModule {}
