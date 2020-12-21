import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';

export abstract class Level {
  get ballRadius(): number {
    return 10;
  }

  get nymaRadius(): number {
    return 50;
  }

  get holeRadius(): number {
    return 30;
  }

  // pixels per second
  get snakeBallVelocity(): number {
    return 20;
  }

  // pixels per second
  get fireBallVelocity(): number {
    return 350;
  }

  get ballDistance(): number {
    return 5;
  }

  abstract get snakePath(): Path;

  abstract get nymaPosition(): Position;

  abstract get snakeLength(): number;

  abstract get randomColor(): string;

  get snakeBallStartPosition(): Position {
    return this.snakePath.start;
  }
}
