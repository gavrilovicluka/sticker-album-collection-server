import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Auction } from '../auction/auction.entity';

@Entity()
export class AuctionImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToOne(() => Auction, (auction) => auction.productImage)
  auction: Auction;
}
