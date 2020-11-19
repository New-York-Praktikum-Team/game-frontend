import { GameObject } from './GameObject';
import { Position } from './Position';

export abstract class RoundGameObject extends GameObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public center: Position,
    public radius: number,
  ) {
    super(context);
  }

  distanceToPosition(pos: Position): number {
    return Math.sqrt((this.center.x - pos.x) ** 2 + (this.center.y - pos.y) ** 2) - this.radius;
  }

  distanceTo(obj: RoundGameObject): number {
    return this.distanceToPosition(obj.center) - obj.radius;
  }

  collidesWith(obj: RoundGameObject): boolean {
    return this.distanceTo(obj) <= 0;
  }
}
