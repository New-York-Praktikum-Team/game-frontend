import { Level } from 'game/levels/Level';
import { Position, positionAfterRotation } from 'game/objects/Position';
import nymaImage from 'assets/images/Nyma.png';
import nymaBaseImage from 'assets/images/NymaBase.png';
import { FireBall } from './FireBall';
import { RoundGameObject } from './RoundGameObject';

export class Nyma extends RoundGameObject {
  constructor(context: CanvasRenderingContext2D, private level: Level) {
    super(context, level.nymaPosition, level.nymaRadius);
    this.currentBall = new FireBall(
      context,
      { x: this.center.x + 60, y: this.center.y },
      level,
    );
    this.nextBall = new FireBall(
      context,
      { x: this.center.x - 1, y: this.center.y + 54 },
      level,
    );
  }

  public angle = 0;

  public fireBall?: FireBall | null;

  public currentBall: FireBall;

  public nextBall: FireBall;

  draw(): void {
    this.currentBall.draw();

    this.context.save();
    this.context.translate(this.center.x, this.center.y);
    this.context.rotate(this.angle);

    const nymaBase = new Image();
    nymaBase.src = nymaBaseImage;
    this.context.drawImage(nymaBase, -63, -63);

    const nyma = new Image();
    nyma.src = nymaImage;
    this.context.drawImage(nyma, -31, -31);

    this.context.restore();

    this.nextBall.draw();
  }

  rotate(angle: number) {
    const dAngle = angle - this.angle;

    this.angle = angle;

    this.currentBall.center = positionAfterRotation(this.currentBall.center, this.center, dAngle);
    this.currentBall.angle = angle;

    this.nextBall.center = positionAfterRotation(this.nextBall.center, this.center, dAngle);
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

    const currentBallCenter = this.currentBall.center;

    this.fireBall = this.currentBall;
    this.fireBall.isMoving = true;

    const nextBallCenter = this.nextBall.center;

    this.currentBall = this.nextBall;
    this.currentBall.center = currentBallCenter;
    this.currentBall.angle = this.angle;

    this.nextBall = new FireBall(
      this.context,
      nextBallCenter,
      this.level,
    );
  }
}
