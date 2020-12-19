import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { TreePath } from 'game/path/Paths';
import { CanvasSize } from 'helpers/CanvasHelper';
import { Level } from './Level';

enum Color {
  Green1 = 'DarkGreen',
  Green2 = 'GreenYellow',
  Green3 = 'green',
  Green4 = 'forestgreen',
}

export class Level1 extends Level {
  constructor(canvasSize: CanvasSize) {
    super(canvasSize);
    this.path = new TreePath(canvasSize);
  }

  private path: Path;

  get snakePath(): Path {
    return this.path;
  }

  get nymaPosition(): Position {
    return { x: 50, y: 50 };
  }

  get snakeLength(): number {
    return 100;
  }

  get randomColor(): string {
    return Helpers.randomEnum(Color);
  }
}
