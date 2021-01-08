import { GameObject } from './GameObject';
import { Position, distanceBetween } from './Position';

export abstract class RoundGameObject extends GameObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public center: Position,
    public radius: number,
  ) {
    super(context);
  }

  distanceToPosition(pos: Position): number {
    return distanceBetween(this.center, pos) - this.radius;
  }

  distanceTo(obj: RoundGameObject): number {
    return this.distanceToPosition(obj.center) - obj.radius;
  }

  collidesWith(obj: RoundGameObject): boolean {
    return this.distanceTo(obj) <= 0;
  }
}
