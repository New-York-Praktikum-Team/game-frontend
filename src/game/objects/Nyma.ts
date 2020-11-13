import { Level } from 'game/levels/Level';
import { FireBall } from './FireBall';
import { GameObject } from './GameObject';

export class Nyma extends GameObject {
  constructor(level: Level) {
    super(level.nymaPosition, level.nymaRadius);
    this.fireBall = new FireBall(level.nymaPosition, level);
    this.nextBall = new FireBall(
      { x: this.pos.x + level.ballRadius * 2, y: this.pos.y + level.ballRadius * 2 },
      level,
    );
  }

  public angle = 0;

  public fireBall: FireBall;

  public nextBall: FireBall;

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = 'DarkViolet';
    context.fill();
    context.closePath();

    this.fireBall.draw(context);
    this.nextBall.draw(context);

    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.font = '16px Arial';
    context.fillText('Nyma', this.pos.x, this.pos.y - 15);
  }

  rotate(angle: number) {
    this.angle = angle;
    this.fireBall.angle = angle;
  }

  shoot() {
    this.fireBall.isMoving = true;
  }
}
