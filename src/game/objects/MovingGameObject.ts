import { Path } from 'game/path/Path';
import { MovingObject } from './MovingObject';
import { RoundGameObject } from './RoundGameObject';

export abstract class MovingGameObject extends RoundGameObject implements MovingObject {
  public isMoving = false;

  private path?: Path;

  protected setPath(path: Path) {
    this.path = path;
  }

  private velocity?: number;

  protected setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  // time in milliseconds
  public clock(time: number): void {
    if (!this.path) {
      throw new Error('Object path was not provided');
    }
    if (!this.velocity) {
      throw new Error('Object velocity was not provided');
    }
    this.moveAndDraw((this.velocity * time) / 1000, this.path);
  }

  public moveAndDraw(dist: number, path: Path)
    : void {
    if (this.isMoving) {
      const nextPos = path.next(this.center, dist);
      this.center = nextPos;
      this.draw();
    }
  }
}
