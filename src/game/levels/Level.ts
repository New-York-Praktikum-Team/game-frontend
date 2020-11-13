import { Path } from 'game/path/Path';
import { Position } from 'game/Position';

export abstract class Level {
  // TODO: add color, ball count and ball velocity to this object so they can vary by level
  abstract path(): Path;

  abstract nymaPosition(): Position;

  abstract snakeLength(): number;
}
