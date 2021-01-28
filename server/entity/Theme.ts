import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
