import { CanvasHelper } from 'helpers/CanvasHelper';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

export abstract class Ball extends MovingGameObject {
  constructor(context: CanvasRenderingContext2D, pos: Position, rad: number, public color: string) {
    super(context, pos, rad);
  }

  draw(): void {
    CanvasHelper.renderCircle(this.context, this.pos, this.radius, this.color);
  }
}
