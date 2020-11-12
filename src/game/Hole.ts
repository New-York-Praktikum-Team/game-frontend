import { HoleRadius } from './Defaults';
import { GameObject } from './GameObject';
import { Position } from './Position';

export class Hole extends GameObject {
  constructor(pos: Position, radius: number = HoleRadius) {
    super(pos, radius);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.font = '16px Arial';
    context.fillText('Hole', this.pos.x, this.pos.y);
  }
}
