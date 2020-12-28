import { Level } from 'game/levels/Level';
import { RoundGameObject } from './RoundGameObject';

export class Hole extends RoundGameObject {
  constructor(context: CanvasRenderingContext2D, level: Level) {
    super(context, level.snakePath.end, level.holeRadius);
  }

  draw(): void {
  }
}
