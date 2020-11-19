import { Level } from 'game/levels/Level';
import { Ball } from './Ball';
import { GameObject } from './GameObject';
import { MovingObject } from './MovingObject';
import { Position } from './Position';
import { RoundGameObject } from './RoundGameObject';
import { SnakeBall } from './SnakeBall';

export class Snake extends GameObject implements MovingObject {
  constructor(
    context: CanvasRenderingContext2D, public level: Level,
  ) {
    super(context);
    this.balls = [];
  }

  balls: Ball[];

  draw(): void {
    this.balls.forEach((ball) => ball.draw());
  }

  clock(time: number): void {
    this.balls.forEach((ball) => ball.clock(time));
  }

  addBall(): void {
    if (this.shouldAddAnotherBall) {
      const ball = new SnakeBall(this.context, this.level);
      this.balls.push(ball);
    }
  }

  private get shouldAddAnotherBall(): boolean {
    return this.balls.length < this.level.snakeLength
      && (
        this.balls.length === 0
        || this.distanceToPosition(this.level.snakeBallStartPosition)
        > this.level.ballDistance + this.level.ballRadius
      );
  }

  distanceToPosition(pos: Position): number {
    return Math.min(...this.balls.map((ball) => ball.distanceToPosition(pos)));
  }

  distanceTo(obj: RoundGameObject): number {
    return this.distanceToPosition(obj.center) - obj.radius;
  }

  collidesWith(obj: RoundGameObject): boolean {
    return this.distanceTo(obj) <= 0;
  }
}
