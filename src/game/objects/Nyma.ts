import { Level } from 'game/levels/Level';
import { CanvasHelper } from 'helpers/CanvasHelper';
import { FireBall } from './FireBall';
import { RoundGameObject } from './RoundGameObject';

export class Nyma extends RoundGameObject {
  constructor(context: CanvasRenderingContext2D, level: Level) {
    super(context, level.nymaPosition, level.nymaRadius);
    this.fireBall = new FireBall(context, level.nymaPosition, level);
    this.nextBall = new FireBall(
      context,
      { x: this.center.x + level.ballRadius * 2, y: this.center.y + level.ballRadius * 2 },
      level,
    );
  }

  public angle = 0;

  public fireBall: FireBall;

  public nextBall: FireBall;

  draw(): void {
    CanvasHelper.renderCircle(this.context, this.center, this.radius, 'DarkViolet');
    CanvasHelper.renderText(
      this.context,
      'Nyma', {
        x: this.center.x,
        y: this.center.y - 15,
        color: 'white',
        align: 'center',
        font: '16px Arial',
      },
    );

    this.fireBall.draw();
    this.nextBall.draw();
  }

  rotate(angle: number) {
    this.angle = angle;
    this.fireBall.angle = angle;
  }

  shoot() {
    this.fireBall.isMoving = true;
  }
}
