import { Path } from './Path';
import { Position } from '../Position';

export class LinearPath extends Path {
  public next(current: Position, distanceDelta: number): Position {
    let k;

    if (this.end.y === this.start.y) {
      k = 0;
    } else if (this.end.x === this.start.x) {
      throw new Error("don't do that");
    } else {
      k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    }

    const b = this.start.y - k * this.start.x;

    if (current.y.toFixed(2) !== (k * current.x + b).toFixed(2)) {
      // eslint-disable-next-line no-console
      console.log("Current position isn't on the path");
    }

    const newX = current.x + Math.cos(Math.asin(k)) * distanceDelta;
    const newY = k * newX + b;

    return { x: newX, y: newY };
  }
}
