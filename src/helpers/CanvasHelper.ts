import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { Position } from 'game/objects/Position';

interface TextOptions {
  x?: number;
  y?: number;
  color?: string;
  align?: CanvasTextAlign;
  font?: string;
}

export type CanvasSize = { width: number, height: number };
export type CanvasButtonOptions = {
  backgroundColor?: Colors;
  textColor?: Colors;
  fontSize?: string;
};

export class CanvasHelper {
  static clear(context: CanvasRenderingContext2D, canvasSize: CanvasSize, color: string) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  }

  static renderText(context: CanvasRenderingContext2D, text: string, options?: TextOptions) {
    context.fillStyle = options?.color ?? 'black';
    context.textAlign = options?.align ?? 'left';
    context.font = options?.font ?? '24px Arial';
    context.fillText(text, options?.x ?? 0, options?.y ?? 0);
  }

  static renderCircle(
    context: CanvasRenderingContext2D, center: Position, radius: number, color?: string,
  ) {
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.fillStyle = color ?? 'black';
    context.fill();
    context.closePath();
  }

  static isPositionInsideRect(position: Position, rectangle: Rectangle): boolean {
    return (
      position.x > rectangle.x
      && rectangle.x + rectangle.width > position.x
      && position.y > rectangle.y
      && rectangle.y + rectangle.height > position.y
    );
  }

  static renderStartButton(
    context: CanvasRenderingContext2D,
    buttonRectangle: Rectangle,
    topLeftPosition: Position,
    buttonOptions?: CanvasButtonOptions,
  ): void {
    const {
      backgroundColor = Colors.DarkBlue,
      textColor = Colors.White,
      fontSize = '42px',
    } = buttonOptions || {};

    context.fillStyle = backgroundColor;

    context.fillRect(
      buttonRectangle.x,
      buttonRectangle.y,
      buttonRectangle.width,
      buttonRectangle.height,
    );

    CanvasHelper.renderText(
      context,
      'Play',
      {
        ...topLeftPosition,
        align: 'center',
        font: `${fontSize} Arial`,
        color: textColor,
      },
    );
  }
}
