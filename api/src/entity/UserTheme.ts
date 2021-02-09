import {
  Column, Entity, ManyToOne,
} from 'typeorm';
import { Theme } from './Theme';

@Entity()
export class UserTheme {
  @Column({ unique: true, primary: true })
  userId: number;

  @ManyToOne(() => Theme, (theme) => theme.json)
  theme: Theme;
}