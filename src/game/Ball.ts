import { Color } from './Color';
import { MovingGameObject } from './GameObject';
import { Position } from './Position';

export class Ball extends MovingGameObject {
  constructor(public color: Color, pos: Position, rad: number = 10) {
    super(pos, rad);
  }

  move(dist: number): MovingGameObject {
    let dx = dist/Math.sqrt(2);
    let dy = dist/Math.sqrt(2);
    return super.moveTo(dx, dy);
  }
}

export class FireBall extends Ball {
  public angle = 0;

  constructor(color: Color, pos: Position, rad: number = 10) {
    super(color, pos, rad);
  }

  move(dist: number): MovingGameObject {
    let dx = Math.cos(this.angle) * dist;
    let dy = Math.sin(this.angle) * dist;
    return super.moveTo(dx, dy);
  }
}
