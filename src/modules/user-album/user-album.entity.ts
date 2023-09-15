import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "../album/album.entity";
import { User } from "../user/user.entity";

@Entity()
export class UserAlbum {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", { array: true })
  missingStickers: number[];

  @Column("integer", { array: true })
  duplicatesStickers: number[];

  @ManyToOne(() => Album, (album) => album.userAlbums)
  album: Album;

  @OneToOne(() => User, (user) => user.userAlbum)
  user: User;

  constructor() {
    this.missingStickers = Array.from({ length: this.album.stickersNumber }, (_, i) => i + 1);
  }

}