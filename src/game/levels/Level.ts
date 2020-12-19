import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Colors } from 'consts/colors';
import { CanvasSize } from 'helpers/CanvasHelper';

export abstract class Level {
  constructor(public canvasSize: CanvasSize) {}

  get ballRadius(): number {
    return 20;
  }

  get nymaRadius(): number {
    return 50;
  }

  get holeRadius(): number {
    return 30;
  }

  // pixels per second
  get snakeBallVelocity(): number {
    return 80;
  }

  // pixels per second
  get fireBallVelocity(): number {
    return 1000;
  }

  get ballDistance(): number {
    return 0;
  }

  abstract get snakePath(): Path;

  abstract get nymaPosition(): Position;

  abstract get snakeLength(): number;

  abstract get randomColor(): string;

  get snakeBallStartPosition(): Position {
    return this.snakePath.start;
  }

  get backgroundColor(): string {
    return Colors.PaleTurquoise;
  }

  abstract get name(): string;
}
