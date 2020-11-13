import { AppMode, CanvasDimension } from 'components/Canvas';
import { Ball } from './Ball';
import { randomColor } from './Color';
import { BallRadius } from './Defaults';
import { GameObject } from './GameObject';
import { Hole } from './Hole';
import { Level } from './levels/Level';
import { Level1 } from './levels/Level1';
import { Nyma } from './Nyma';

interface GameOptions {
  level?: Level;
  canvasDim: CanvasDimension;
}

export class NymaGame {
  constructor(public context: CanvasRenderingContext2D, options: GameOptions) {
    this.level = options.level ?? new Level1();
    this.canvasDim = options.canvasDim;
    this.snakeLength = this.level.snakeLength();
  }

  level: Level;

  canvasDim: CanvasDimension;

  snakeLength: number;

  gameObjects: GameObject[] = [];

  nyma?: Nyma;

  hole?: Hole;

  ballSnake?: Ball[];

  startTime: number = 0;

  lastTime: number = 0;

  maxAnimationTime = 50000;

  ballDistance = 15;

  resolve: Function = () => { };

  play(): Promise<AppMode> {
    return new Promise((resolve) => {
      this.resolve = resolve;
      this.startGame();
    });
  }

  startGame(): void {
    this.nyma = new Nyma(this.level.nymaPosition());
    this.hole = new Hole(this.level.path().end);
    this.ballSnake = [];

    this.gameObjects.push(this.nyma);
    this.gameObjects.push(this.hole);

    this.drawObjects();

    this.startTime = performance.now();
    this.lastTime = this.startTime;

    requestAnimationFrame(() => { this.updateCanvas(); });
  }

  drawObjects(): void {
    const ctx = this.context!;
    ctx.fillStyle = '#AFEEEE';
    ctx.fillRect(0, 0, this.canvasDim.width, this.canvasDim.height);
    this.gameObjects.forEach((o) => o.draw(this.context!));
  }

  addBall(): Ball {
    const ball = new Ball(this.level.path().start, BallRadius, randomColor());
    this.ballSnake!.push(ball);
    this.gameObjects.push(ball);
    ball.draw(this.context);

    return ball;
  }

  shouldAddAnotherBall(): boolean {
    const currentSnakeLength = this.ballSnake!.length;
    return (
      currentSnakeLength === 0
      || this.ballSnake![currentSnakeLength - 1].distanceToPosition(this.level.path().start)
      > this.ballDistance)
      && currentSnakeLength < this.snakeLength;
  }

  updateCanvas(): void {
    const ctx = this.context;

    const time = performance.now();
    const timeDelta = time - this.lastTime;
    this.lastTime = time;

    if (this.shouldAddAnotherBall()) {
      const ball = this.addBall();
      ball.setPath(this.level.path());
    }

    ctx.clearRect(0, 0, this.canvasDim.width, this.canvasDim.height);
    this.drawObjects();

    this.ballSnake!.forEach((ball) => {
      ball.clock(timeDelta, ctx);
    });

    if (this.ballSnake![0].collidesWith(this.hole!)) {
      this.resolve(AppMode.End_lose);
      return;
    }

    if (time <= this.startTime + this.maxAnimationTime) {
      requestAnimationFrame(() => this.updateCanvas());
    } else {
      this.resolve(AppMode.End_win);
    }
  }
}
