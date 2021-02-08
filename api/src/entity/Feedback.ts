import { Entity, Column, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {

  constructor(user: string = "anonymus", text: string = "") {
    this.user = user;
    this.text = text;
  } 

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  user?: string;

  @Column()
  text?: string;
}
