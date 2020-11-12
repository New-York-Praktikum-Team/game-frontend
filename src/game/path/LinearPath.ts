import { Path } from './Path';
import { Position } from '../Position';

export class LinearPath extends Path {
  public next(current: Position, distanceDelta: number): Position {
    if ((this.start.x === this.end.x && this.start.y === this.end.y) || distanceDelta === 0) {
      throw new Error('Not enough data to calculate path');
    }

    if (this.end.x === this.start.x) {
      let newY;
      if (this.start.y < this.end.y) {
        newY = current.y + distanceDelta;
      } else {
        newY = current.y - distanceDelta;
      }
      return { x: current.x, y: newY };
    }

    const k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
    const b = this.start.y - k * this.start.x;

    if (current.y.toFixed(2) !== (k * current.x + b).toFixed(2)) {
      // eslint-disable-next-line no-console
      console.log("Current position isn't on the path");
    }

    let newX;
    if (this.start.x < this.end.x) {
      newX = current.x + Math.cos(Math.atan(k)) * distanceDelta;
    } else {
      newX = current.x - Math.cos(Math.atan(k)) * distanceDelta;
    }
    const newY = k * newX + b;

    return { x: newX, y: newY };
  }
}
