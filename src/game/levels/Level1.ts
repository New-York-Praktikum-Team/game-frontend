import { LinearPath } from 'game/path/LinearPath';
import { Path } from 'game/path/Path';
import { Level } from './Level';

export class Level1 extends Level {
  path(): Path {
    const start = { x: 200, y: 0 };
    const end = { x: 100, y: 300 };

    return new LinearPath(start, end);
  }
}
