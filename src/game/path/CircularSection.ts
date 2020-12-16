import { Position } from 'game/objects/Position';
import { Section } from './Section';

export class CircularSection implements Section {
  constructor(public start: Position, public end: Position, private radius: number) {
    const d = Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2);

    if (radius < 0.5 * d) {
      this.radius = 0.5 * d;
      this.center = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
    } else {
      const alpha = Math.atan((end.x - start.x) / Math.abs(end.y - start.y));
      const beta = Math.asin(d / (2 * radius));
      this.center = {
        x: start.x - radius * Math.cos(alpha + beta),
        y: start.y - radius * Math.sin(alpha + beta),
      };
    }
  }

  private center: Position;

  containsPosition(position: Position): boolean {
    return ((position.x - this.center.x) ** 2 + (position.y - this.center.y) ** 2).toFixed(2)
      === (this.radius ** 2).toFixed(2);
  }

  distance(position1: Position, position2: Position): number {
    if (!this.containsPosition(position1) || !this.containsPosition(position2)) {
      throw new Error('Positions are not on the path');
    }

    // TODO: calculate distance along circle
    return Math.sqrt((position1.x - position2.x) ** 2 + (position1.y - position2.y) ** 2);
  }

  public next(current: Position, distanceDelta: number): Position {
    if (distanceDelta === 0) {
      return current;
    }

    const currentPhi = Math.acos((current.x - this.center.x) / this.radius);

    const circleLength = 2 * Math.PI * this.radius;
    const deltaPhi = (2 * Math.PI * distanceDelta) / circleLength;

    const sign = this.start.y < this.end.y ? 1 : -1;
    const nextPhi = currentPhi + sign * deltaPhi;

    const x = this.center.x + this.radius * Math.cos(nextPhi);
    const y = this.center.y + this.radius * Math.sin(nextPhi);

    return { x, y };
  }
}
