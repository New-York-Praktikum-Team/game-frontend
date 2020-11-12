import { FireBall } from './FireBall';
import { randomColor } from './Color';
import { GameObject } from './GameObject';
import { Position } from './Position';
import { BallRadius, NymaRadius } from './Defaults';

export class Nyma extends GameObject {
  constructor(pos: Position, radius: number = NymaRadius) {
    super(pos, radius);
    this.fireBall = new FireBall(this.pos, BallRadius, randomColor());
    this.nextBall = new FireBall(
      { x: this.pos.x + BallRadius * 2, y: this.pos.y + BallRadius * 2 },
      BallRadius,
      randomColor(),
    );
  }

  public angle = 0;

  public fireBall: FireBall;

  public nextBall: FireBall;

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = 'hotpink';
    context.fill();
    context.closePath();

    this.fireBall.draw(context);
    this.nextBall.draw(context);
  }

  rotate(angle: number) {
    this.angle = angle;
    this.fireBall.angle = angle;
  }

  shoot() {
    this.fireBall.isMoving = true;
  }
}
