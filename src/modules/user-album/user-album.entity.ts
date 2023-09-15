import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
  @JoinColumn()
  user: User;

}