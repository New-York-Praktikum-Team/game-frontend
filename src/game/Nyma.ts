import { FireBall } from './Ball';
import { randomColor } from './Color';
import { GameObject } from './GameObject';
import { Position } from './Position';

export class Nyma extends GameObject {
  constructor(pos: Position, rad: number = 30) {
    super(pos, rad);
    this.fireBall = new FireBall(randomColor(), this.pos);
    this.nextBall = new FireBall(randomColor(), new Position(this.pos.x - 20, this.pos.y - 20));
  }

  public angle = 0;
  public fireBall: FireBall;
  public nextBall: FireBall;

  rotate(angle: number) {
    this.angle = angle;
    this.fireBall.angle = angle;
  }

  shoot() {
    this.fireBall.isMoving = true;
  }
}
