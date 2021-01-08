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
  text: string;
  backgroundColor?: Colors;
  textColor?: Colors;
  fontSize?: string;
};

export const clear = (context: CanvasRenderingContext2D, canvasSize: CanvasSize, color: string) => {
  context.fillStyle = color;
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
};

export const renderText = (
  context: CanvasRenderingContext2D, text: string, options?: TextOptions,
) => {
  context.fillStyle = options?.color ?? 'black';
  context.textAlign = options?.align ?? 'left';
  context.textBaseline = 'middle';
  context.font = options?.font ?? '24px Arial';
  context.fillText(text, options?.x ?? 0, options?.y ?? 0);
};

export const renderCircle = (
  context: CanvasRenderingContext2D, center: Position, radius: number, color?: string,
) => {
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  context.fillStyle = color ?? 'black';
  context.fill();
  context.closePath();
};

export const renderRectangle = (
  context: CanvasRenderingContext2D,
  corner: Position,
  width: number, height: number,
  color?: string,
) => {
  context.beginPath();
  context.rect(corner.x, corner.y, width, height);
  context.fillStyle = color ?? 'black';
  context.fill();
  context.closePath();
};

export const getMousePosition = (event: MouseEvent, clientRect: ClientRect) => {
  const { left, top } = clientRect;

  return ({
    x: event.clientX - left,
    y: event.clientY - top,
  }) as Position;
};

export const isPositionInsideRect = (position: Position, rectangle: Rectangle) => (
  position.x > rectangle.x
  && rectangle.x + rectangle.width > position.x
  && position.y > rectangle.y
  && rectangle.y + rectangle.height > position.y
);

export const isMousePositionInsideRect = (
  event: MouseEvent,
  clientRect: ClientRect,
  targetRect: Rectangle,
): boolean => {
  const mousePosition = getMousePosition(event, clientRect);
  return isPositionInsideRect(mousePosition, targetRect);
};

export const renderButton = (
  context: CanvasRenderingContext2D,
  buttonRectangle: Rectangle,
  buttonOptions: CanvasButtonOptions,
): void => {
  const {
    text,
    backgroundColor = Colors.DarkBlue,
    textColor = Colors.White,
    fontSize = '42px',
  } = buttonOptions || {};

  const textPosition: Position = {
    x: buttonRectangle.x + buttonRectangle.width / 2,
    y: buttonRectangle.y + buttonRectangle.height / 2,
  };

  context.fillStyle = backgroundColor;

  context.fillRect(
    buttonRectangle.x,
    buttonRectangle.y,
    buttonRectangle.width,
    buttonRectangle.height,
  );

  renderText(
    context,
    text,
    {
      ...textPosition,
      align: 'center',
      font: `${fontSize} Arial`,
      color: textColor,
    },
  );
};

export const renderImageButton = (
  context: CanvasRenderingContext2D,
  position: Position,
  src: string,
): Rectangle => {
  const image = new Image();
  image.src = src;

  const clickTarget = {
    x: position.x,
    y: position.y,
    width: image.width + 20,
    height: image.height + 20,
  };

  context.drawImage(image, position.x + 10, position.y + 10);
  return clickTarget;
};
