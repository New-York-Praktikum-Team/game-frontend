import { AppMode } from 'components/GameCanvas';
import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { Level } from 'game/levels/Level';
import { Level1 } from 'game/levels/Level1';
import { Hole } from 'game/objects/Hole';
import { Nyma } from 'game/objects/Nyma';
import { Snake } from 'game/objects/Snake';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import * as api from 'modules/api';
import { store } from 'store/store';
import { Scene } from './Scene';

interface GameOptions {
  level?: Level;
}

export class NymaGame extends Scene {
  constructor(canvasRef: HTMLCanvasElement, canvasSize: CanvasSize, options?: GameOptions) {
    super(canvasRef, canvasSize);
    this.level = options?.level ?? new Level1();
    this.score = 0;

    this.canvasRef.addEventListener('click', this.handleClick);
    this.canvasRef.addEventListener('mousemove', this.handleMouseMove);
  }

  level: Level;

  nyma?: Nyma;

  hole?: Hole;

  snake?: Snake;

  lastTime: number = 0;

  resolveCallback: Function = () => { };

  render(): Promise<AppMode> {
    return new Promise((resolve) => {
      this.resolveCallback = resolve;
      this.startGame();
    });
  }

  destroy(): void {
    this.canvasRef.removeEventListener('click', this.handleClick);
    this.canvasRef.removeEventListener('mousemove', this.handleMouseMove);
  }

  startGame(): void {
    this.nyma = new Nyma(this.context, this.level);
    this.hole = new Hole(this.context, this.level);
    this.snake = new Snake(this.context, this.level);
    this.lastTime = performance.now();

    this.clearAndDrawStaticObjects();

    requestAnimationFrame(() => { this.updateCanvas(); });
  }

  clearAndDrawStaticObjects() {
    CanvasHelper.clear(this.context, this.canvasSize, Colors.PaleTurquoise);
    this.nyma!.draw();
    this.hole!.draw();
  }

  private canvasRectangle: Rectangle = {
    x: 0,
    y: 0,
    width: this.canvasSize.width,
    height: this.canvasSize.height,
  };

  handleMouseMove = (event: MouseEvent) => {
    const position = CanvasHelper.getMousePosition(event, this.clientRect);
    if (CanvasHelper.isPositionInsideRect(position, this.canvasRectangle)) {
      this.nyma!.setDirection(position);
    }
  };

  handleClick = (event: MouseEvent) => {
    const isMouseInsideCanvas = CanvasHelper.isMousePositionInsideRect(
      event,
      this.clientRect,
      this.canvasRectangle,
    );

    if (isMouseInsideCanvas) {
      this.nyma!.shoot();
    }
  };

  needToShowBang = false;

  bangPosition = { x: 0, y: 0 };

  showBang() {
    if (this.needToShowBang) {
      CanvasHelper.renderText(
        this.context,
        'BANG!', {
          x: this.bangPosition.x,
          y: this.bangPosition.y,
          color: 'black',
          align: 'center',
          font: '24px Arial',
        },
      );
    }
  }

  score: number;

  scoring = (score: number): void => {
    this.score += score;
  };

  sendPlayerScoreToLeaderboard = async (): Promise<void> => {
    const user = store.getState().user.data;

    await api.setLeaderboardItem({
      ratingFieldName: 'numaScore',
      data: {
        name: user ? user.displayName || user.login : 'Anonymous',
        numaScore: this.score,
      },
    });
  };

  updateCanvas(): void {
    const time = performance.now();
    const timeDelta = time - this.lastTime;
    this.lastTime = time;

    this.clearAndDrawStaticObjects();

    this.snake!.addBall();
    this.snake!.clock(timeDelta);
    this.nyma!.fireBall?.clock(timeDelta);

    this.showBang();

    if (this.nyma!.fireBall) {
      if (!CanvasHelper.isPositionInsideRect(this.nyma!.fireBall.center, this.canvasRectangle)) {
        this.nyma!.fireBall = null;
      } else if (this.snake!.collidesWith(this.nyma!.fireBall)) {
        this.scoring(5);

        this.needToShowBang = true;
        this.bangPosition = this.nyma!.fireBall.center;
        setTimeout(() => { this.needToShowBang = false; }, 1000);
        this.nyma!.fireBall = null;
      }
    }

    if (this.snake!.collidesWith(this.hole!)) {
      this.sendPlayerScoreToLeaderboard();
      this.resolveCallback(AppMode.Losing);
      return;
    }

    requestAnimationFrame(() => this.updateCanvas());
  }
}
