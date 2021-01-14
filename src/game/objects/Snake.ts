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

  balls: SnakeBall[];

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

  collidesWith(obj: RoundGameObject): boolean {
    return this.distanceToPosition(obj.center) - obj.radius <= 0;
  }

  collisionBallIndex(obj: RoundGameObject): number | undefined {
    let index;
    this.balls.forEach((ball, i) => {
      const distance = ball.distanceToPosition(obj.center);
      if (distance - obj.radius <= 0) {
        index = i;
      }
    });
    return index;
  }

  addBallAtIndex(ball: Ball, index: number): void {
    const snakeBall = new SnakeBall(this.context, this.level, true);
    snakeBall.center = this.balls[index].center;
    snakeBall.color = ball.color;
    this.balls.splice(index, 0, snakeBall);
  }

  private epsilon = 2;

  findSpace(): void {
    for (let i = 1; i < this.balls.length; i += 1) {
      const current = this.balls[i - 1];
      const previous = this.balls[i];

      if (current.distanceTo(previous) > this.epsilon) {
        this.balls[i].isMoving = true;
        this.balls[i - 1].isMoving = false;
      } else if (current.isNew && current.distanceTo(previous) < -this.epsilon) {
        for (let j = this.balls.length - 1; j >= i; j -= 1) {
          this.balls[j].isMoving = false;
        }
        this.balls[i - 1].isMoving = true;
        break;
      } else {
        this.balls[i].isMoving = true;
        this.balls[i - 1].isMoving = true;
        this.balls[i - 1].isNew = false;
      }
    }
  }
}
