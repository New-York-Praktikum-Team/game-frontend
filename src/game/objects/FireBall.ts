import { Level } from 'game/levels/Level';
import { LinearPath } from 'game/path/LinearPath';
import { Ball } from './Ball';
import { Position } from './Position';

export class FireBall extends Ball {
  constructor(context: CanvasRenderingContext2D, pos: Position, level: Level) {
    super(context, pos, level.ballRadius, level.randomColor);
    this.setPath(new LinearPath(this.pos, { x: this.pos.x + 1, y: this.pos.y }));
    this.setVelocity(level.fireBallVelocity);
    this.isMoving = false;
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
