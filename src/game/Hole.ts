import { GameObject } from './GameObject';
import { Position } from './Position';

export class Hole extends GameObject {
  constructor(pos: Position, rad: number = 30) {
    super(pos, rad);
  }
}
