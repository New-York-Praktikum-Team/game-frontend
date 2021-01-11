import { renderCircle } from 'helpers/CanvasHelper';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';
import ballsImage from 'assets/images/Balls.png';

const frameWidth = 162;
const frameHeight = 162;

export abstract class Ball extends MovingGameObject {
  constructor(
    context: CanvasRenderingContext2D,
    center: Position,
    radius: number,
    public color: string,
  ) {
    super(context, center, radius);
  }

  draw(): void {

    let sprite = new Image();
    sprite.src = ballsImage;

    let row = 0;
    let column = 0;

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
      column*frameWidth, 
      row*frameHeight, 
      frameWidth, 
      frameHeight, 
      - this.radius, 
      - this.radius, 
      scaledWidth, 
      scaledHeight
    );

    this.context.restore();

    renderCircle(this.context, this.center, this.radius, this.color, 0.6);
  }
}
