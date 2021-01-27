import { Entity, Column, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {

  constructor(user: string = "anonymus", text: string = "test") {
    this.user = user;
    this.text = text;
  } 

  @ObjectIdColumn()
  _id?: ObjectID;

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  user?: string;

  @Column()
  text?: string;
}
