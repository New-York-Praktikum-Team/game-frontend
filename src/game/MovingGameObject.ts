import { GameObject } from './GameObject';

export abstract class MovingGameObject extends GameObject {
  // pixels per second
  public velocity = 30;

  public isMoving = false;

  protected abstract move(dist: number): MovingGameObject;

  // time in milliseconds
  public clock(time: number, context: CanvasRenderingContext2D): MovingGameObject {
    return this.moveAndDraw((this.velocity * time) / 1000, context);
  }

  public moveAndDraw(dist: number, context: CanvasRenderingContext2D): MovingGameObject {
    if (this.isMoving) {
      this.move(dist);
      this.draw(context);
    }
    return this;
  }

  moveTo(dx: number, dy: number): MovingGameObject {
    this.pos.x += dx;
    this.pos.y += dy;
    return this;
  }
}
