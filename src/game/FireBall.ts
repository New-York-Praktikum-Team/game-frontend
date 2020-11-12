import { Ball } from './Ball';
import { Color } from './Color';
import { LinearPath } from './path/LinearPath';
import { Position } from './Position';

export class FireBall extends Ball {
  constructor(pos: Position, radius: number, color: Color) {
    super(pos, radius, color);
    this.isMoving = false;
    this.setPath(new LinearPath(this.pos, { x: this.pos.x + 1, y: this.pos.y }));
  }

  private angleValue = 0;

  get angle(): number {
    return this.angleValue;
  }

  set angle(value: number) {
    this.angleValue = value;
    this.setPath(
      new LinearPath(
        this.pos,
        { x: this.pos.x + Math.cos(this.angleValue), y: this.pos.y + Math.sin(this.angleValue) },
      ),
    );
  }
}
