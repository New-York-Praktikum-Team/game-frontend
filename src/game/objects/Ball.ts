import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

export abstract class Ball extends MovingGameObject {
  constructor(pos: Position, rad: number, public color: string) {
    super(pos, rad);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}
