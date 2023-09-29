import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./enums/user-roles.enum";
import { UserAlbum } from "../user-album/user-album.entity";
import { Bid } from "../bid/bid.entity";
import { Auction } from "../auction/auction.entity";

@Entity()
export class User {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER })
  role: UserRoles;

  @OneToMany(() => UserAlbum, (userAlbum) => userAlbum.user)
  userAlbums: UserAlbum[];

  @OneToMany(() => Auction, (auction) => auction.user)
  auctions: Auction[];

  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];
  
}