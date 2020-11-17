import { Position } from 'game/objects/Position';

interface TextOptions {
  x?: number;
  y?: number;
  color?: string;
  align?: CanvasTextAlign;
  font?: string;
}

export type CanvasSize = { width: number, height: number };

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
}
