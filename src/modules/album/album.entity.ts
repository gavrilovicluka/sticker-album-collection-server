import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  // publisher
  // userAlbums[]
}