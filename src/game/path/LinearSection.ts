import { Position } from 'game/objects/Position';
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

  distance(position1: Position, position2: Position): number {
    if (!this.containsPosition(position1) || !this.containsPosition(position2)) {
      throw new Error('Positions are not on the path');
    }
    return Math.sqrt((position1.x - position2.x) ** 2 + (position1.y - position2.y) ** 2);
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

    const sign = this.start.x < this.end.x ? 1 : -1;
    const nextX = current.x + sign * Math.cos(Math.atan(this.k)) * distanceDelta;
    const nextY = this.k * nextX + this.b;

    return { x: nextX, y: nextY };
  }
}
