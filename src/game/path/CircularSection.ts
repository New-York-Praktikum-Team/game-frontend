import { Position } from 'game/objects/Position';
import { Section } from './Section';

export class CircularSection implements Section {
  constructor(
    public start: Position,
    public end: Position,
    private radius: number = 0,
    private clockWise = true,
    approximateCenter?: Position,
  ) {
    const d = this.distanceBetween(start, end);
    const middle = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };

    if (radius < 0.5 * d) {
      this.radius = 0.5 * d;
      this.center = middle;
    } else {
      const center1 = {
        x: middle.x + (Math.sqrt(radius ** 2 - (d / 2) ** 2) * (start.y - end.y)) / d,
        y: middle.y + (Math.sqrt(radius ** 2 - (d / 2) ** 2) * (end.x - start.x)) / d,
      };
      const center2 = {
        x: middle.x - (Math.sqrt(radius ** 2 - (d / 2) ** 2) * (start.y - end.y)) / d,
        y: middle.y - (Math.sqrt(radius ** 2 - (d / 2) ** 2) * (end.x - start.x)) / d,
      };

      if (approximateCenter) {
        const d1 = this.distanceBetween(approximateCenter, center1);
        const d2 = this.distanceBetween(approximateCenter, center2);
        this.center = d1 < d2 ? center1 : center2;
      } else {
        this.center = center1;
      }
    }
  }

  private distanceBetween(p1: Position, p2: Position): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }

  private center: Position;

  containsPosition(position: Position): boolean {
    return ((position.x - this.center.x) ** 2 + (position.y - this.center.y) ** 2).toFixed(2)
      === (this.radius ** 2).toFixed(2);
  }

  strictContainsPosition(position: Position): boolean {
    // TODO: implement
    return this.containsPosition(position);
  }

  distance(position1: Position, position2: Position): number {
    if (!this.containsPosition(position1) || !this.containsPosition(position2)) {
      throw new Error('Positions are not on the path');
    }
    // TODO: calculate distance along circle
    return this.distanceBetween(position1, position2);
  }

  public next(current: Position, distanceDelta: number): Position {
    if (distanceDelta === 0) {
      return current;
    }

    let currentPhi = Math.acos((current.x - this.center.x) / this.radius);
    if (current.y < this.center.y) {
      currentPhi = -currentPhi;
    }

    const circleLength = 2 * Math.PI * this.radius;
    const deltaPhi = (2 * Math.PI * distanceDelta) / circleLength;

    const sign = this.clockWise ? 1 : -1;
    const nextPhi = currentPhi + sign * deltaPhi;

    const x = this.center.x + this.radius * Math.cos(nextPhi);
    const y = this.center.y + this.radius * Math.sin(nextPhi);

    return { x, y };
  }
}
