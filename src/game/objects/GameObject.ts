import { Position } from './Position';

export abstract class GameObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public pos: Position,
    public radius: number,
  ) { }

  public abstract draw(): void;

  distanceToPosition(pos: Position): number {
    return Math.sqrt((this.pos.x - pos.x) ** 2 + (this.pos.y - pos.y) ** 2) - this.radius;
  }

  distanceTo(obj: GameObject): number {
    return this.distanceToPosition(obj.pos) - obj.radius;
  }

  collidesWith(obj: GameObject): boolean {
    return this.distanceTo(obj) <= 0;
  }
}
