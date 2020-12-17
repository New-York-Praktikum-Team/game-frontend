import { Level } from 'game/levels/Level';
import { renderCircle, renderText } from 'helpers/CanvasHelper';
import { RoundGameObject } from './RoundGameObject';

export class Hole extends RoundGameObject {
  constructor(context: CanvasRenderingContext2D, level: Level) {
    super(context, level.snakePath.end, level.holeRadius);
  }

  draw(): void {
    renderCircle(this.context, this.center, this.radius);
    renderText(
      this.context,
      'Hole', {
        x: this.center.x,
        y: this.center.y,
        color: 'white',
        align: 'center',
        font: '16px Arial',
      },
    );
  }
}
