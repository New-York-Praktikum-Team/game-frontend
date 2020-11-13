import { Path } from 'game/path/Path';
import { GameObject } from './GameObject';

export abstract class MovingGameObject extends GameObject {
  public isMoving = false;

  private path?: Path;

  protected setPath(path: Path) {
    this.path = path;
  }

  private velocity?: number;

  protected setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  // time in milliseconds
  public clock(time: number, context: CanvasRenderingContext2D): MovingGameObject {
    if (!this.path) {
      throw new Error('Object path was not provided');
    }
    if (!this.velocity) {
      throw new Error('Object velocity was not provided');
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
