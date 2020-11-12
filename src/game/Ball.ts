import { Color } from './Color';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

export class Ball extends MovingGameObject {
  constructor(pos: Position, rad: number, public color: Color) {
    super(pos, rad);
    this.isMoving = true;
  }

  move(dist: number): MovingGameObject {
    const dx = dist / Math.sqrt(2);
    const dy = dist / Math.sqrt(2);

    return super.moveTo(dx, dy);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}
