import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { TreePath } from 'game/path/Paths';
import { CanvasSize } from 'helpers/CanvasHelper';
import { Rectangle } from 'consts/shapes';
import { Level } from './Level';

enum Color {
  Color1 = 'ForestGreen',
  Color2 = 'GreenYellow',
  Color3 = 'Turquoise',
}

export class Level3 extends Level {
  constructor(canvasSize: CanvasSize) {
    super(canvasSize);

    const minSize = Math.min(canvasSize.width, canvasSize.height);
    this.drawingRectangle = {
      x: 0.5 * canvasSize.width - 0.5 * minSize,
      y: 0.5 * canvasSize.height - 0.4 * minSize,
      width: minSize,
      height: 0.8 * minSize,
    };

    this.path = new TreePath(this.drawingRectangle);
  }

  private drawingRectangle: Rectangle;

  private path: Path;

  get snakePath(): Path {
    return this.path;
  }

  get nymaPosition(): Position {
    const x = this.drawingRectangle.x + 0.5 * this.drawingRectangle.width;
    const y = this.drawingRectangle.y + 0.75 * this.drawingRectangle.height;

    return { x, y };
  }

  get snakeLength(): number {
    return 100;
  }

  get randomColor(): string {
    return Helpers.randomEnum(Color);
  }

  get backgroundColor(): string {
    return 'Ivory';
  }

  get name(): string {
    return 'Level 3';
  }
}
