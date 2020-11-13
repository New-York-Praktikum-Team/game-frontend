import { Level } from 'game/levels/Level';
import { Ball } from './Ball';

export class SnakeBall extends Ball {
  constructor(level: Level) {
    super(level.snakeBallStartPosition, level.ballRadius, level.randomColor);
    this.setPath(level.snakePath);
    this.setVelocity(level.snakeBallVelocity);
    this.isMoving = true;
  }
}
