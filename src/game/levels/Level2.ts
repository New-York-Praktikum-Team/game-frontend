import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { HeartPath } from 'game/path/Paths';
import { CanvasSize } from 'helpers/CanvasHelper';
import { Level } from './Level';

enum Color {
  Pink1 = 'Crimson',
  Pink2 = 'DarkRed',
  Pink3 = 'DeepPink',
  Pink4 = 'Pink',
}

export class Level2 extends Level {
  constructor(canvasSize: CanvasSize) {
    super(canvasSize);
    this.path = new HeartPath(canvasSize);
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

  get backgroundColor(): string {
    return 'LightYellow';
  }
}
