import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { HeartPath } from 'game/path/Paths';
import { CanvasSize, renderImage } from 'helpers/CanvasHelper';
import { Rectangle } from 'consts/shapes';
import level2Background from 'assets/images/level2.png';
import { Level } from './Level';

enum Color {
  Color1 = 'DarkRed',
  Color2 = 'DeepPink',
  Color3 = 'Pink',
}

export class Level2 extends Level {
  constructor(canvasSize: CanvasSize) {
    super(canvasSize);

    const minSize = Math.min(canvasSize.width, canvasSize.height);
    this.drawingRectangle = {
      x: 0.5 * canvasSize.width - 0.45 * minSize,
      y: 0.5 * canvasSize.height - 0.45 * minSize,
      width: 0.9 * minSize,
      height: 0.9 * minSize,
    };

    this.path = new HeartPath(this.drawingRectangle);
  }

  private drawingRectangle: Rectangle;

  private path: Path;

  get snakePath(): Path {
    return this.path;
  }

  get nymaPosition(): Position {
    const x = this.drawingRectangle.x + 0.3 * this.drawingRectangle.width;
    const y = this.drawingRectangle.y + 0.4 * this.drawingRectangle.height;

    return { x, y };
  }

  get snakeLength(): number {
    return 100;
  }

  get randomColor(): string {
    return Helpers.randomEnum(Color);
  }

  get backgroundColor(): string {
    return 'LightYellow';
  }

  setBackground(context: CanvasRenderingContext2D): void {
    super.setBackground(context);
    renderImage(context, { x: 5, y: 0 }, level2Background);
  }

  get name(): string {
    return 'Level 2';
  }
}
