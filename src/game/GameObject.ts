import { Position } from './Position';

export abstract class GameObject {
  constructor(public pos: Position, public radius: number) { }

  public abstract draw(context: CanvasRenderingContext2D): void;

  collidesWith(obj: GameObject): boolean {
    const dist = Math.sqrt((this.pos.x - obj.pos.x) ** 2 + (this.pos.y - obj.pos.y) ** 2);
    if (dist <= this.radius + obj.radius) {
      return true;
    }
    return false;
  }
}
