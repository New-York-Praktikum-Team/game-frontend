import { Ball } from './Ball';
import { Color } from './Color';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

export class FireBall extends Ball {
  public angle = 0;

  constructor(pos: Position, radius: number, color: Color) {
    super(pos, radius, color);
    this.isMoving = false;
  }

  move(dist: number): MovingGameObject {
    const dx = Math.cos(this.angle) * dist;
    const dy = Math.sin(this.angle) * dist;
    return super.moveTo(dx, dy);
  }
}
