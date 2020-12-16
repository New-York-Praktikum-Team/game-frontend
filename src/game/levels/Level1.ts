import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { roundPath } from 'game/path/Paths';
import { Level } from './Level';

enum Color {
  Green1 = 'DarkGreen',
  Green2 = 'GreenYellow',
  Green3 = 'green',
  Green4 = 'forestgreen',
}

export class Level1 extends Level {
  get snakePath(): Path {
    return roundPath;
  }

  get snakeBallVelocity(): number {
    return 50;
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
