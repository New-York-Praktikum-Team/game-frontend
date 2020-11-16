import { Position } from 'game/objects/Position';
import { Path } from './Path';

export class LinearPath implements Path {
  constructor(public start: Position, public end: Position) { }

  public next(current: Position, distanceDelta: number): Position {
    if ((this.start.x === this.end.x && this.start.y === this.end.y) || distanceDelta === 0) {
      throw new Error('Not enough data to calculate path');
    }

    if (this.end.x === this.start.x) {
      const sign = this.start.y < this.end.y ? 1 : -1;
      const nextY = current.y + sign * distanceDelta;
      return { x: current.x, y: nextY };
    }

    const k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    const b = this.start.y - k * this.start.x;

    if (current.y.toFixed(2) !== (k * current.x + b).toFixed(2)) {
      // eslint-disable-next-line no-console
      console.log("Current position isn't on the path");
    }

    const sign = this.start.x < this.end.x ? 1 : -1;
    const nextX = current.x + sign * Math.cos(Math.atan(k)) * distanceDelta;
    const nextY = k * nextX + b;

    return { x: nextX, y: nextY };
  }
}
