import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, ManyToOne } from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { User } from '../user/user.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bidPrice: number;

  @CreateDateColumn()
  bidTime: Date;
  
  @ManyToOne(() => Auction, (auction) => auction.bids)
  auction: Auction;
  
  @ManyToOne(() => User, (user) => user.bids)
  user: User;
}
