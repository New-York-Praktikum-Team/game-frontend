import { LinearPath } from 'game/path/LinearPath';
import { Path } from 'game/path/Path';
import { Level } from './Level';

export class Level1 extends Level {
  path(): Path {
    const start = { x: 0, y: 100 };
    const end = { x: 450, y: 100 };

    return new LinearPath(start, end);
  }
}
