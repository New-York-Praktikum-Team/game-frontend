import { AppMode } from 'components/GameCanvas';
import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { Level } from './levels/Level';
import { Level1 } from './levels/Level1';
import { GameObject } from './objects/GameObject';
import { Hole } from './objects/Hole';
import { Nyma } from './objects/Nyma';
import { SnakeBall } from './objects/SnakeBall';

interface GameOptions {
  level?: Level;
  canvasSize: CanvasSize;
}

export class NymaGame {
  constructor(public context: CanvasRenderingContext2D, options: GameOptions) {
    this.level = options.level ?? new Level1();
    this.canvasSize = options.canvasSize;
  }

  level: Level;

  canvasSize: CanvasSize;

  gameObjects: GameObject[] = [];

  nyma?: Nyma;

  hole?: Hole;

  ballSnake?: SnakeBall[];

  lastTime: number = 0;

  resolveCallback: Function = () => { };

  play(): Promise<AppMode> {
    return new Promise((resolve) => {
      this.resolveCallback = resolve;
      this.startGame();
    });
  }

  startGame(): void {
    this.nyma = new Nyma(this.context, this.level);
    this.hole = new Hole(this.context, this.level);
    this.ballSnake = [];

    this.gameObjects.push(this.nyma);
    this.gameObjects.push(this.hole);

    this.drawObjects();

    this.lastTime = performance.now();

    requestAnimationFrame(() => { this.updateCanvas(); });
  }

  drawObjects(): void {
    CanvasHelper.clear(this.context, this.canvasSize, '#AFEEEE');
    this.gameObjects.forEach((o) => o.draw());
  }

  addBall(): SnakeBall {
    const ball = new SnakeBall(this.context, this.level);
    this.ballSnake!.push(ball);
    this.gameObjects.push(ball);
    ball.draw();

    return ball;
  }

  shouldAddAnotherBall(): boolean {
    const currentSnakeLength = this.ballSnake!.length;
    return (
      currentSnakeLength === 0
      || this.ballSnake![currentSnakeLength - 1]
        .distanceToPosition(this.level.snakeBallStartPosition)
      > this.level.ballDistance + this.level.ballRadius)
      && currentSnakeLength < this.level.snakeLength;
  }

  updateCanvas(): void {
    const ctx = this.context;

    const time = performance.now();
    const timeDelta = time - this.lastTime;
    this.lastTime = time;

    if (this.shouldAddAnotherBall()) {
      this.addBall();
    }

    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.drawObjects();

    this.ballSnake!.forEach((ball) => {
      ball.clock(timeDelta);
    });

    if (this.ballSnake![0].collidesWith(this.hole!)) {
      this.resolveCallback(AppMode.Losing);
      return;
    }

    requestAnimationFrame(() => this.updateCanvas());
  }
}
