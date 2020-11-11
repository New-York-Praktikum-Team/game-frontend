import { Position } from './Position';

export abstract class GameObject {
  constructor(public pos: Position, public rad: number) { }

  collidesWith(obj: GameObject): boolean {
    const dist = Math.sqrt((this.pos.x - obj.pos.x) ^ 2 + (this.pos.y - obj.pos.y) ^ 2);
    if (dist <= this.rad + obj.rad) {
      return true;
    }
    return false;
  }
}

export abstract class MovingGameObject extends GameObject {
  constructor(pos: Position, rad: number) {
    super(pos, rad);
  }

  public velosity = 5;
  public isMoving = false;

  protected abstract move(dist: number): MovingGameObject;

  public clock(time: number): MovingGameObject {
    if (this.isMoving) {
      return this.move(this.velosity * time);
    } 
    return this;
  }

  moveTo(dx: number, dy: number): MovingGameObject {
    this.pos.x += dx;
    this.pos.y += dy;
    return this;
  }
}
