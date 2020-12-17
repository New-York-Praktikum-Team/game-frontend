import { Level } from 'game/levels/Level';
import { renderCircle, renderRectangle, renderText } from 'helpers/CanvasHelper';
import { Position } from 'game/objects/Position';
import { FireBall } from './FireBall';
import { RoundGameObject } from './RoundGameObject';

export class Nyma extends RoundGameObject {
  constructor(context: CanvasRenderingContext2D, private level: Level) {
    super(context, level.nymaPosition, level.nymaRadius);
    this.currentBall = new FireBall(context, level.nymaPosition, level);
    this.nextBall = new FireBall(
      context,
      { x: this.center.x + level.ballRadius * 2, y: this.center.y + level.ballRadius * 2 },
      level,
    );
  }

  public angle = 0;

  public fireBall?: FireBall | null;

  public currentBall: FireBall;

  public nextBall: FireBall;

  draw(): void {
    this.context.save();
    this.context.translate(this.center.x, this.center.y);
    this.context.rotate(this.angle);

    renderCircle(this.context, { x: 0, y: 0 }, this.radius, 'DarkViolet');
    renderText(
      this.context,
      'Nyma', {
        x: 0,
        y: -15,
        color: 'white',
        align: 'center',
        font: '16px Arial',
      },
    );
    renderRectangle(this.context, { x: 30, y: -10 }, 70, 20, 'DarkViolet');

    this.currentBall.drawRelativeToPosition(this.center, Math.PI / 2);
    this.nextBall.drawRelativeToPosition(this.center, Math.PI / 2);

    this.context.restore();
  }

  rotate(angle: number) {
    this.angle = angle;
    this.currentBall.angle = angle;
  }

  setDirection(position: Position) {
    const deltaX = position.x - this.center.x;
    const deltaY = position.y - this.center.y;
    if (deltaX === 0) {
      return;
    }

    const tg = deltaY / deltaX;
    if (deltaX > 0) {
      this.rotate(Math.atan(tg));
    } else {
      this.rotate(Math.atan(tg) + Math.PI);
    }
  }

  shoot() {
    if (this.fireBall) {
      return;
    }

    this.fireBall = this.currentBall;
    this.fireBall!.isMoving = true;

    const nextBallCenter = this.nextBall.center;

    this.currentBall = this.nextBall;
    this.currentBall.center = this.center;
    this.currentBall.angle = this.angle;

    this.nextBall = new FireBall(
      this.context,
      nextBallCenter,
      this.level,
    );
  }
}
