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

  ballsCount: number = 0;

  draw(): void {
    this.balls.forEach((ball) => ball.draw());
  }

  clock(time: number): void {
    this.balls.forEach((ball) => ball.clock(time));
  }

  addBall(): void {
    if (
      this.neeedMoreBalls()
      && (
        this.distanceToPosition(this.level.snakeBallStartPosition)
        > this.level.ballDistance + this.level.ballRadius
      )
    ) {
      const ball = new SnakeBall(this.context, this.level);
      this.balls.push(ball);
      this.ballsCount += 1;
    }
  }

  neeedMoreBalls(): boolean {
    return this.ballsCount < this.level.snakeLength;
  }

  distanceToPosition(pos: Position): number {
    return Math.min(...this.balls.map((ball) => ball.distanceToPosition(pos)));
  }

  collidesWith(obj: RoundGameObject): boolean {
    return this.distanceToPosition(obj.center) - obj.radius <= 0;
  }

  collisionBallIndex(obj: RoundGameObject): number {
    let index = -1;
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

    if (index < this.balls.length - 1) {
      this.balls[index + 1].wasApart = true;
    }
    if (index > 0) {
      this.balls[index - 1].wasApart = true;
    }
  }

  private epsilon = 2;

  private tooClose(ball1: SnakeBall, ball2: SnakeBall): boolean {
    return ball1.distanceTo(ball2) < this.level.ballDistance - this.epsilon;
  }

  private tooFar(ball1: SnakeBall, ball2: SnakeBall): boolean {
    return ball1.distanceTo(ball2) > this.level.ballDistance + this.epsilon;
  }

  normalize(): void {
    for (let i = 0; i < this.balls.length - 1; i += 1) {
      const currentBall = this.balls[i];
      const previousBall = this.balls[i + 1];

      if (this.tooFar(currentBall, previousBall)) {
        for (let j = 0; j <= i; j += 1) {
          this.balls[j].isMoving = false;
        }
        previousBall.isMoving = true;
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

  explode(): number {
    if (this.balls.length < 3) {
      return 0;
    }

    const sameColorInfo = new Map();
    let currentColorStartIndex = 0;
    let currentColor = this.balls[currentColorStartIndex].color;
    let currentColorCount = 1;

    sameColorInfo.set(currentColorStartIndex, currentColorCount);

    for (let i = 1; i <= this.balls.length - 1; i += 1) {
      const currentBall = this.balls[i];

      if (
        currentBall.color === currentColor
        && !this.tooFar(currentBall, this.balls[i - 1])
        && !this.tooClose(currentBall, this.balls[i - 1])
      ) {
        currentColorCount += 1;
      } else {
        currentColorStartIndex = i;
        currentColor = currentBall.color;
        currentColorCount = 1;
      }
      sameColorInfo.set(currentColorStartIndex, currentColorCount);
    }

    for (let i = this.balls.length - 1; i >= 0; i -= 1) {
      if (sameColorInfo.has(i)) {
        const sameColorCount = sameColorInfo.get(i);

        const subset = this.balls.slice(i, i + sameColorCount);

        // don't explode initial ball sequences
        let shouldExplode = false;
        for (let j = 0; j < subset.length; j += 1) {
          if (subset[j].wasNew) {
            shouldExplode = true;
          }
          if (j < subset.length - 1 && subset[j].wasApart && subset[j + 1].wasApart) {
            shouldExplode = true;
          }
        }

        if (shouldExplode && sameColorCount >= 3) {
          this.balls.splice(i, sameColorCount);
          return sameColorCount;
        }
      }
    }

    return 0;
  }
}
