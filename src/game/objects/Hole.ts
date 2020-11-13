import { Level } from 'game/levels/Level';
import { GameObject } from './GameObject';

export class Hole extends GameObject {
  constructor(level: Level) {
    super(level.snakePath.end, level.holeRadius);
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
