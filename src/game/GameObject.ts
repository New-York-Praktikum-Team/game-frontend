import { Position } from './Position';

export abstract class GameObject {
  constructor(public pos: Position, public radius: number) { }

  public abstract draw(context: CanvasRenderingContext2D): void;

  distanceToPosition(pos: Position): number {
    const dist = Math.sqrt((this.pos.x - pos.x) ** 2 + (this.pos.y - pos.y) ** 2) - this.radius;
    return dist;
  }

  distanceTo(obj: GameObject): number {
    const dist = this.distanceToPosition(obj.pos) - obj.radius;
    return dist;
  }

  collidesWith(obj: GameObject): boolean {
    const dist = this.distanceTo(obj);
    return (dist <= 0);
  }
}
