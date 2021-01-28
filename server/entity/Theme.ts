import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type IVariables = Record<string, string>;

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('jsonb')
  variables!: IVariables;
}
