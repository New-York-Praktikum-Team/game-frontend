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

  private tooClose(ball1: SnakeBall, ball2: SnakeBall): boolean {
    return ball1.distanceTo(ball2) < this.level.ballDistance - this.epsilon;
  }

  private tooFar(ball1: SnakeBall, ball2: SnakeBall): boolean {
    return ball1.distanceTo(ball2) > this.level.ballDistance + this.epsilon;
  }

  findSpace(): void {
    for (let i = 0; i < this.balls.length - 1; i += 1) {
      const currentBall = this.balls[i];
      const previousBall = this.balls[i + 1];

      if (this.tooFar(currentBall, previousBall)) {
        currentBall.isMoving = false;
      } else if (currentBall.isNew && this.tooClose(currentBall, previousBall)) {
        for (let j = this.balls.length - 1; j > i; j -= 1) {
          this.balls[j].isMoving = false;
        }
        break;
      } else {
        previousBall.isMoving = true;
        currentBall.isMoving = true;
        currentBall.isNew = false;
      }
    }
  }
}
