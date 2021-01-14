import { AppMode } from 'components/GameCanvas';
import {
  CanvasSize, getMousePosition, isMousePositionInsideRect,
  isPositionInsideRect, renderText,
} from 'helpers/CanvasHelper';
import { Level } from 'game/levels/Level';
import { Level1 } from 'game/levels/Level1';
import { Hole } from 'game/objects/Hole';
import { Nyma } from 'game/objects/Nyma';
import { Snake } from 'game/objects/Snake';
import { Rectangle } from 'consts/shapes';
import { setLeaderboard } from 'store/leaderboard/thunks';
import { AppOptions, GameOptions, Scene } from './Scene';

export class NymaGame extends Scene {
  constructor(canvasRef: HTMLCanvasElement, canvasSize: CanvasSize, options?: GameOptions) {
    super(canvasRef, canvasSize);
    this.level = options?.level ?? new Level1(this.canvasSize);
    this.score = 0;

    this.nyma = new Nyma(this.context, this.level);
    this.hole = new Hole(this.context, this.level);
    this.snake = new Snake(this.context, this.level);

    this.canvasRef.addEventListener('click', this.handleClick);
    this.canvasRef.addEventListener('mousemove', this.handleMouseMove);
  }

  level: Level;

  nyma: Nyma;

  hole: Hole;

  snake: Snake;

  lastTime: number = 0;

  resolveCallback: Function = () => {};

  render(): Promise<AppOptions> {
    return new Promise((resolve) => {
      this.resolveCallback = resolve;
      this.startGame();
    });
  }

  destroy(): void {
    super.destroy();
    this.canvasRef.removeEventListener('click', this.handleClick);
    this.canvasRef.removeEventListener('mousemove', this.handleMouseMove);
  }

  startGame(): void {
    this.lastTime = performance.now();

    this.clearAndDrawStaticObjects();

    requestAnimationFrame(() => { this.updateCanvas(); });
  }

  clearAndDrawStaticObjects() {
    this.level.setBackground(this.context);
    this.nyma.draw();
    this.hole.draw();

    this.renderFullScreenButton();
  }

  private canvasRectangle: Rectangle = {
    x: 0,
    y: 0,
    width: this.canvasSize.width,
    height: this.canvasSize.height,
  };

  handleMouseMove = (event: MouseEvent) => {
    const position = getMousePosition(event, this.clientRect, this.canvasSize);
    if (isPositionInsideRect(position, this.canvasRectangle)) {
      this.nyma.setDirection(position);
    }
  };

  handleClick = (event: MouseEvent) => {
    const isMouseInsideCanvas = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.canvasSize,
      this.canvasRectangle,
    );

    if (isMouseInsideCanvas) {
      this.nyma.shoot();
    }

    this.handleFullScreenButtonClick(event);
  };

  score: number;

  scoring = (score: number = 5): void => {
    this.score += score;
  };

  showScore = () => {
    renderText(
      this.context,
      `SCORE: ${this.score}`, {
        x: this.canvasSize.width - 15,
        y: 20,
        color: 'black',
        align: 'right',
        font: '14px Arial',
      },
    );
  };

  updateCanvas(): void {
    const time = performance.now();
    const timeDelta = time - this.lastTime;
    this.lastTime = time;

    this.clearAndDrawStaticObjects();

    this.snake.addBall();
    this.snake.clock(timeDelta);
    this.nyma.fireBall?.clock(timeDelta);

    this.showScore();

    if (this.nyma.fireBall) {
      if (!isPositionInsideRect(this.nyma.fireBall.center, this.canvasRectangle)) {
        this.nyma.fireBall = null;
      } else {
        const collisionIndex = this.snake.collisionBallIndex(this.nyma.fireBall);
        if (collisionIndex) {
          this.scoring(5);
          this.snake.addBallAtIndex(this.nyma.fireBall, collisionIndex);
          this.nyma.fireBall = null;
        }
      }
    }
    this.snake.findSpace();

    if (this.snake.collidesWith(this.hole)) {
      this.resolveCallback({ appMode: AppMode.Losing });
      setLeaderboard(this.score);
      return;
    }

    requestAnimationFrame(() => this.updateCanvas());
  }
}
