import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Bid } from "../bid/bid.entity";

@Entity()
export class Auction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;
  
  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column()
  basePrice: number;

  @Column()
  productDescription: string;
  
  @Column()
  productImage: string;

  @ManyToOne(() => User, (user) => user.auctions)
  user: User;

  @OneToMany(() => Bid, (bid) => bid.auction)
  bids: Bid[];

}