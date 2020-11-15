import { Level } from 'game/levels/Level';
import { CanvasHelper } from 'helpers/CanvasHelper';
import { GameObject } from './GameObject';

export class Hole extends GameObject {
  constructor(level: Level) {
    super(level.snakePath.end, level.holeRadius);
  }

  draw(context: CanvasRenderingContext2D): void {
    CanvasHelper.renderCircle(context, this.pos, this.radius);
    CanvasHelper.renderText(
      context,
      'Hole', {
        x: this.pos.x,
        y: this.pos.y,
        color: 'white',
        align: 'center',
        font: '16px Arial',
      },
    );
  }
}
