import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "../album/album.entity";

@Entity()
export class Publisher {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Album, (album) => album.publisher)
  albums: Album[]

}