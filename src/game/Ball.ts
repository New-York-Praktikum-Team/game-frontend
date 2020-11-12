import { Color } from './Color';
import { MovingGameObject } from './MovingGameObject';
import { Path } from './path/Path';
import { Position } from './Position';

export class Ball extends MovingGameObject {
  constructor(pos: Position, rad: number, public color: Color) {
    super(pos, rad);
    this.isMoving = true;
  }

  protected move(dist: number, path: Path): MovingGameObject {
    const nextPos = path.next(this.pos, dist);
    return super.moveToPosition(nextPos);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}
