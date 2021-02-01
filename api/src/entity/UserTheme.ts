import {
  Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { Theme } from './Theme';

@Entity()
export class UserTheme {
  @Column({ unique: true, primary: true })
  userId: number;

  @OneToOne(() => Theme)
  @JoinColumn()
  theme: Theme;
}
