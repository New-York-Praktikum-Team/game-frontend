import { Position, distanceBetween } from 'game/objects/Position';
import { Section } from './Section';

export class LinearSection implements Section {
  constructor(public start: Position, public end: Position) {
    if (this.start.x === this.end.x && this.start.y === this.end.y) {
      throw new Error('Not enough data to calculate path');
    }

    if (this.end.x === this.start.x) {
      this.isVertical = true;
    } else {
      this.k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
      this.b = this.start.y - this.k * this.start.x;
    }
  }

  private isVertical = false;

  private k = 0;

  private b = 0;

  containsPosition(position: Position): boolean {
    if (this.isVertical) {
      return position.x === this.start.x;
    }
    return position.y.toFixed(2) === (this.k * position.x + this.b).toFixed(2);
  }

  strictContainsPosition(position: Position): boolean {
    return this.containsPosition(position)
      && position.x <= Math.max(this.start.x, this.end.x)
      && position.x >= Math.min(this.start.x, this.end.x);
  }

  distance(position1: Position, position2: Position): number {
    if (!this.containsPosition(position1) || !this.containsPosition(position2)) {
      throw new Error('Positions are not on the path');
    }
    return distanceBetween(position1, position2);
  }

  public next(current: Position, distanceDelta: number): Position {
    if (distanceDelta === 0) {
      return current;
    }

    if (this.isVertical) {
      const sign = this.start.y < this.end.y ? 1 : -1;
      const nextY = current.y + sign * distanceDelta;
      return { x: current.x, y: nextY };
    }

    if (!this.containsPosition(current)) {
      // eslint-disable-next-line no-console
      console.log("Current position isn't on the path");
    }

    const angle = this.start.x < this.end.x ? Math.atan(this.k) : Math.PI + Math.atan(this.k);
    const nextX = current.x + Math.cos(angle) * distanceDelta;
    const nextY = this.k * nextX + this.b;

    return { x: nextX, y: nextY };
  }
}
