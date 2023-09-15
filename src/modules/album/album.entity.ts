import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Publisher } from "../publisher/publisher.entity";
import { UserAlbum } from "../user-album/user-album.entity";

@Entity()
export class Album {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  stickersNumber: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.albums)
  publisher: Publisher;

  @OneToMany(() => UserAlbum, (userAlbum) => userAlbum.album)
  userAlbums: UserAlbum[];

}