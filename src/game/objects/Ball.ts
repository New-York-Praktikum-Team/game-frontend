import { renderCircle } from 'helpers/CanvasHelper';
import ballsImage from 'assets/images/Balls.png';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

const frameCount = 60;
const frameWidth = 160;
const frameHeight = 160;

export abstract class Ball extends MovingGameObject {
  constructor(
    context: CanvasRenderingContext2D,
    center: Position,
    radius: number,
    public color: string,
  ) {
    super(context, center, radius);
  }

  private frameIndex = 59;

  private cumDistance = 0;

  draw(): void {
    const sprite = new Image();
    sprite.src = ballsImage;

    const scale = (this.radius * 2) / frameWidth;
    const scaledWidth = frameWidth * scale;
    const scaledHeight = frameHeight * scale;

    this.context.save();
    this.context.translate(this.center.x, this.center.y);
    if (this.isMoving) {
      this.context.rotate(this.path!.angle(this.center));
    }

    this.context.drawImage(
      sprite,
      this.frameIndex * frameWidth,
      0,
      frameWidth,
      frameHeight,
      -this.radius,
      -this.radius,
      scaledWidth,
      scaledHeight,
    );

    this.context.restore();

    renderCircle(this.context, this.center, this.radius, this.color, 0.6);
  }

  protected moveAndDraw(distance: number)
    : void {
    this.cumDistance += distance;
    if (this.cumDistance > (2 * this.radius) / frameCount) {
      this.frameIndex = (this.frameIndex + 1) % frameCount;
      this.cumDistance = 0;
    }

    super.moveAndDraw(distance);
  }
}
