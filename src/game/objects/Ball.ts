import { CanvasHelper } from 'helpers/CanvasHelper';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

export abstract class Ball extends MovingGameObject {
  constructor(pos: Position, rad: number, public color: string) {
    super(pos, rad);
  }

  draw(context: CanvasRenderingContext2D): void {
    CanvasHelper.renderCircle(context, this.pos, this.radius, this.color);
  }
}
