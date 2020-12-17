import { renderCircle } from 'helpers/CanvasHelper';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

export abstract class Ball extends MovingGameObject {
  constructor(
    context: CanvasRenderingContext2D,
    center: Position,
    radius: number,
    public color: string,
  ) {
    super(context, center, radius);
  }

  draw(): void {
    renderCircle(this.context, this.center, this.radius, this.color);
  }
}
