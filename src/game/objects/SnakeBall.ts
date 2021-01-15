import { Level } from 'game/levels/Level';
import { Ball } from './Ball';

export class SnakeBall extends Ball {
  public wasTooFar = false;

  public wasNew = false;

  constructor(context: CanvasRenderingContext2D, level: Level, public isNew = false) {
    super(context, level.snakeBallStartPosition, level.ballRadius, level.randomColor);
    this.setPath(level.snakePath);
    this.setVelocity(level.snakeBallVelocity);
    this.isMoving = true;
    this.wasNew = isNew;
  }

  get angle(): number {
    return this.path!.angle(this.center);
  }
}
