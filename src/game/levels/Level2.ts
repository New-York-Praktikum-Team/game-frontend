import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { heartPath } from 'game/path/Paths';
import { Level } from './Level';

enum Color {
  Pink1 = 'Crimson',
  Pink2 = 'DarkRed',
  Pink3 = 'DeepPink',
  Pink4 = 'Pink',
}

export class Level2 extends Level {
  get snakePath(): Path {
    return heartPath;
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

  get backgroundColor(): string {
    return 'LightYellow';
  }
}
