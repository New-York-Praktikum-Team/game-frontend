import { Position } from 'game/objects/Position';

export interface Section {
  start: Position;
  end: Position;
  next(current: Position, distanceDelta: number): Position;
  // Position satisfies section equation
  containsPosition(position: Position): boolean;
  // Position satisfies section equation and is between start and end points
  strictContainsPosition(position: Position): boolean;
  distance(position1: Position, position2: Position): number;
}
