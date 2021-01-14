import { Level } from 'game/levels/Level';
import { Ball } from './Ball';

export class SnakeBall extends Ball {
  constructor(context: CanvasRenderingContext2D, level: Level, public isNew = false) {
    super(context, level.snakeBallStartPosition, level.ballRadius, level.randomColor);
    this.setPath(level.snakePath);
    this.setVelocity(level.snakeBallVelocity);
    this.isMoving = true;
  }

  get angle(): number {
    return this.path!.angle(this.center);
  }
}
