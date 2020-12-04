import { Position } from 'game/objects/Position';

export interface Section {
  start: Position;
  end: Position;
  next(current: Position, distanceDelta: number): Position;
  containsPosition(position: Position): boolean;
  distance(position1: Position, position2: Position): number;
}
