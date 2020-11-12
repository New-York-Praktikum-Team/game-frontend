import { GameObject } from './GameObject';
import { Path } from './path/Path';
import { Position } from './Position';

export abstract class MovingGameObject extends GameObject {
  // pixels per second
  public velocity = 30;

  public isMoving = false;

  protected abstract move(dist: number, path: Path): MovingGameObject;

  // time in milliseconds
  public clock(time: number, path: Path, context: CanvasRenderingContext2D): MovingGameObject {
    return this.moveAndDraw((this.velocity * time) / 1000, path, context);
  }

  public moveAndDraw(dist: number, path: Path, context: CanvasRenderingContext2D)
    : MovingGameObject {
    if (this.isMoving) {
      this.move(dist, path);
      this.draw(context);
    }
    return this;
  }

  moveToPosition(pos: Position): MovingGameObject {
    this.pos = pos;
    return this;
  }

  moveTo(dx: number, dy: number): MovingGameObject {
    this.pos.x += dx;
    this.pos.y += dy;
    return this;
  }
}
