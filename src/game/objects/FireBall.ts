import { Level } from 'game/levels/Level';
import { LinearPath } from 'game/path/LinearPath';
import { Ball } from './Ball';
import { Position } from './Position';

export class FireBall extends Ball {
  constructor(context: CanvasRenderingContext2D, center: Position, level: Level) {
    super(context, center, level.ballRadius, level.randomColor);
    this.setPath(new LinearPath(this.center, { x: this.center.x + 1, y: this.center.y }));
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
        this.center,
        {
          x: this.center.x + Math.cos(this.angleValue),
          y: this.center.y + Math.sin(this.angleValue),
        },
      ),
    );
  }

  drawRelativeToPosition(position: Position): void {
    super.draw(position);
  }
}
