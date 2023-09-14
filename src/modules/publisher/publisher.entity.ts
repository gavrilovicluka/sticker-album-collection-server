import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publisher {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  // albums[]
}