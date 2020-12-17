import ballsImageSrc from 'assets/images/balls.png';
import { MovingGameObject } from './MovingGameObject';
import { Position } from './Position';

const ballImage = new Image();
ballImage.src = ballsImageSrc;

// width and height of the ball frame on the sprite image
const width = 136.5;
const height = 136.5;

const lastFrameNumber = 60;

// we have different colors on different rows of the sprite
const getYStartPositionByColor = (color: string) => {
  switch (color) {
    case 'yellow': return height;
    case 'green': return height * 2;
    case 'red': return height * 3;
    case 'blue':
    default:
      return 0;
  }
};

export abstract class Ball extends MovingGameObject {
  constructor(
    context: CanvasRenderingContext2D,
    center: Position,
    radius: number,
    public color: string,
  ) {
    super(context, center, radius);
  }

  draw(shift = { x: 0, y: 0 }, angle = 0): void {
    const x = this.center.x - this.radius - shift.x;
    const y = this.center.y - this.radius - shift.y;

    this.animationStep({ x, y }, angle);
  }

  // frame number to start with
  private currentFrameNumber = 1;

  animationStep(position: Position, angle: number) {
    this.drawFrame(this.currentFrameNumber, position, angle);

    this.currentFrameNumber += 1;

    if (this.currentFrameNumber >= lastFrameNumber) {
      this.currentFrameNumber = 1;
    }
  }

  drawFrame(frame: number, position: Position, angle: number) {
    const dx = width * frame;

    const startPositionX = 0;
    const startPositionY = getYStartPositionByColor(this.color);

    // scale image to the size of the ball
    const scale = (this.radius * 2) / width;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    if (angle !== 0) {
      this.context.translate(position.x + this.radius, position.y + this.radius);
      this.context.rotate(angle);

      this.context.drawImage(
        // image
        ballImage,
        // position of top left point of the frame on the original image
        startPositionX + dx,
        startPositionY,
        // frame dimentions on the original image
        width,
        height,
        // top left position where to draw a frame
        -this.radius,
        -this.radius,
        // frame dimensions to draw on canvas
        scaledWidth,
        scaledHeight,
      );

      this.context.rotate(-angle);
      this.context.translate(-(position.x + this.radius), -(position.y + this.radius));
    } else {
      this.context.drawImage(
        ballImage,
        startPositionX + dx,
        startPositionY,
        width,
        height,
        position.x,
        position.y,
        scaledWidth,
        scaledHeight,
      );
    }
  }
}
