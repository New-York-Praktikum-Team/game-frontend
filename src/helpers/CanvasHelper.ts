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
  context: CanvasRenderingContext2D, center: Position, radius: number, color?: string, opacity: number = 1
) => {
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  context.fillStyle = color ?? 'black';
  context.globalAlpha = opacity; 
  context.fill();
  context.globalAlpha = 1; 
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

export const getMousePosition = (
  event: MouseEvent,
  clientRect: ClientRect,
  canvasSize: CanvasSize,
): Position => {
  const { left, top } = clientRect;

  if (!document.fullscreenElement) {
    return {
      x: event.clientX - left,
      y: event.clientY - top,
    };
  }

  const canvasRatio = canvasSize.width / canvasSize.height;
  const clientRectRatio = clientRect.width / clientRect.height;

  if (canvasRatio >= clientRectRatio) {
    const xScale = canvasSize.width / clientRect.width;
    const realCanvasHeight = canvasSize.height / xScale;

    const yMargin = (clientRect.height - realCanvasHeight) / 2;

    return ({
      x: event.clientX * xScale,
      y: (event.clientY - yMargin) * xScale,
    });
  }
  const yScale = canvasSize.height / clientRect.height;
  const realCanvasWidth = canvasSize.width / yScale;

  const xMargin = (clientRect.width - realCanvasWidth) / 2;

  return ({
    x: (event.clientX - xMargin) * yScale,
    y: event.clientY * yScale,
  });
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
  canvasSize: CanvasSize,
  targetRect: Rectangle,
): boolean => {
  const mousePosition = getMousePosition(event, clientRect, canvasSize);
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

export const renderImage = (
  context: CanvasRenderingContext2D,
  position: Position,
  src: string,
): void => {
  const render = (imageElement: HTMLImageElement) => {
    context.drawImage(imageElement, position.x, position.y);
  };

  const image = new Image();
  image.src = src;
  image.onload = () => render(image);

  render(image);
};

export const blurCanvas = (context: CanvasRenderingContext2D): Promise<void> => new Promise(
  (resolve) => {
    const img = new Image();
    img.src = context.canvas.toDataURL('image/png');

    img.addEventListener('load', () => {
      context.filter = 'blur(3px)';
      context.drawImage(img, 0, 0);
      context.filter = 'none';
      resolve();
    });
  },
);
