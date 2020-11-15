import { Position } from 'game/objects/Position';

export interface Path {
  start: Position;
  end: Position;
  next(current: Position, distanceDelta: number): Position;
}
