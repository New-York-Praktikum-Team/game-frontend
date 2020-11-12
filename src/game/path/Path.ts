import { Position } from 'game/Position';

export abstract class Path {
  constructor(public start: Position, public end: Position) { }

  public abstract next(current: Position, distanceDelta: number): Position;
}
