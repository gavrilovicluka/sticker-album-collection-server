import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAlbum {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", { array: true })
  missingStickers: number[];

  @Column("integer", { array: true })
  duplicatesStickers: number[];

  // album
  // user
}