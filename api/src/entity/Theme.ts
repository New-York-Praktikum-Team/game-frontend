import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

type IThemeJson = Record<string, string>;

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  json: IThemeJson;
}
