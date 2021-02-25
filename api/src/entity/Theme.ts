import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

type IThemeJson = Record<string, string>;

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'jsonb' })
  json: IThemeJson;
}
