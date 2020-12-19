import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { SpiralPath } from 'game/path/Paths';
import { CanvasSize } from 'helpers/CanvasHelper';
import { Rectangle } from 'consts/shapes';
import { Level } from './Level';

enum Color {
  Color1 = 'Yellow',
  Color2 = 'Blue',
  Color3 = 'Red',
  Color4 = 'Green',
}

export class Level1 extends Level {
  constructor(canvasSize: CanvasSize) {
    super(canvasSize);

    const minSize = Math.min(canvasSize.width, canvasSize.height);
    this.drawingRectangle = {
      x: 0.5 * canvasSize.width - 0.45 * minSize,
      y: 0.5 * canvasSize.height - 0.5 * minSize,
      width: 0.9 * minSize,
      height: minSize,
    };

    this.path = new SpiralPath(this.drawingRectangle);
  }

  private drawingRectangle: Rectangle;

  private path: Path;

  get snakePath(): Path {
    return this.path;
  }

  get nymaPosition(): Position {
    const x = this.drawingRectangle.x + 0.6 * this.drawingRectangle.width;
    const y = this.drawingRectangle.y + 0.53 * this.drawingRectangle.height;

    return { x, y };
  }

  get snakeLength(): number {
    return 100;
  }

  get randomColor(): string {
    return Helpers.randomEnum(Color);
  }

  get name(): string {
    return 'Level 1';
  }
}
