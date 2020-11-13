import { GameObject } from './GameObject';
import { Path } from './path/Path';

export abstract class MovingGameObject extends GameObject {
  // pixels per second
  public velocity = 50;

  private path?: Path;

  public isMoving = false;

  public setPath(path: Path) {
    this.path = path;
  }

  // time in milliseconds
  public clock(time: number, context: CanvasRenderingContext2D): MovingGameObject {
    if (!this.path) {
      throw new Error('Object path was not provided');
    }
    return this.moveAndDraw((this.velocity * time) / 1000, this.path, context);
  }

  public moveAndDraw(dist: number, path: Path, context: CanvasRenderingContext2D)
    : MovingGameObject {
    if (this.isMoving) {
      const nextPos = path.next(this.pos, dist);
      this.pos = nextPos;
      this.draw(context);
    }
    return this;
  }
}
