import { AppMode } from 'components/GameCanvas';
import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { Level } from 'game/levels/Level';
import { Level1 } from 'game/levels/Level1';
import { Hole } from 'game/objects/Hole';
import { Nyma } from 'game/objects/Nyma';
import { Snake } from 'game/objects/Snake';
import { Colors } from 'consts/colors';

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

  nyma?: Nyma;

  hole?: Hole;

  snake?: Snake;

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

  updateCanvas(): void {
    const time = performance.now();
    const timeDelta = time - this.lastTime;
    this.lastTime = time;

    this.clearAndDrawStaticObjects();

    this.snake!.addBall();
    this.snake!.clock(timeDelta);

    if (this.snake!.collidesWith(this.hole!)) {
      this.resolveCallback(AppMode.Losing);
      return;
    }

    requestAnimationFrame(() => this.updateCanvas());
  }
}
