import { Level } from 'game/levels/Level';
import { CanvasHelper } from 'helpers/CanvasHelper';
import { GameObject } from './GameObject';

export class Hole extends GameObject {
  constructor(context: CanvasRenderingContext2D, level: Level) {
    super(context, level.snakePath.end, level.holeRadius);
  }

  draw(): void {
    CanvasHelper.renderCircle(this.context, this.pos, this.radius);
    CanvasHelper.renderText(
      this.context,
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
