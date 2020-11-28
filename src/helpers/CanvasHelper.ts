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
  text?: string;
  backgroundColor?: Colors;
  textColor?: Colors;
  fontSize?: string;
};

const getMousePosition = (event: MouseEvent, clientRect: ClientRect) => {
  const { left, top } = clientRect;

  return ({
    x: event.clientX - left,
    y: event.clientY - top,
  }) as Position;
};

const isPositionInsideRect = (position: Position, rectangle: Rectangle) => (
  position.x > rectangle.x
    && rectangle.x + rectangle.width > position.x
    && position.y > rectangle.y
    && rectangle.y + rectangle.height > position.y
);

export class CanvasHelper {
  static clear(context: CanvasRenderingContext2D, canvasSize: CanvasSize, color: string) {
    context.fillStyle = color;
    context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  }

  static renderText(context: CanvasRenderingContext2D, text: string, options?: TextOptions) {
    context.fillStyle = options?.color ?? 'black';
    context.textAlign = options?.align ?? 'left';
    context.textBaseline = 'middle';
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

  static isClickedInsideRect(
    event: MouseEvent,
    clientRect: ClientRect,
    targetRect: Rectangle,
  ): boolean {
    const mousePosition = getMousePosition(event, clientRect);
    return isPositionInsideRect(mousePosition, targetRect);
  }

  static renderButton(
    context: CanvasRenderingContext2D,
    buttonRectangle: Rectangle,
    topLeftPosition: Position,
    buttonOptions?: CanvasButtonOptions,
  ): void {
    const {
      text = 'Play',
      backgroundColor = Colors.DarkBlue,
      textColor = Colors.White,
      fontSize = '42px',
    } = buttonOptions || {};

    const textPosition: Position = {
      x: topLeftPosition.x + buttonRectangle.width / 2,
      y: topLeftPosition.y + buttonRectangle.height / 2,
    };

    context.fillStyle = backgroundColor;

    context.fillRect(
      buttonRectangle.x,
      buttonRectangle.y,
      buttonRectangle.width,
      buttonRectangle.height,
    );

    CanvasHelper.renderText(
      context,
      text,
      {
        ...textPosition,
        align: 'center',
        font: `${fontSize} Arial`,
        color: textColor,
      },
    );
  }
}
