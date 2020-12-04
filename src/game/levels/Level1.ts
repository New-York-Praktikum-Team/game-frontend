import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { LinearSection } from 'game/path/LinearSection';
import { Level } from './Level';

enum Color {
  Red = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'forestgreen',
}

export class Level1 extends Level {
  get snakePath(): Path {
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 450, y: 200 };
    const point3 = { x: 200, y: 400 };

    return new Path([new LinearSection(point1, point2), new LinearSection(point2, point3)]);
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
