import { LinearPath } from 'game/path/LinearPath';
import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { Level } from './Level';

enum Color {
  Red = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'forestgreen',
}

export class Level1 extends Level {
  get snakePath(): Path {
    const start = { x: 0, y: 0 };
    const end = { x: 450, y: 200 };

    return new LinearPath(start, end);
  }

  get nymaPosition(): Position {
    return { x: 150, y: 350 };
  }

  get snakeLength(): number {
    return 10;
  }

  get randomColor(): string {
    return Helpers.randomEnum(Color);
  }
}
