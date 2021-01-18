import { Position } from 'game/objects/Position';
import { LinearSection } from './LinearSection';
import { Path } from './Path';

export class LinearPath extends Path {
  constructor(public start: Position, public end: Position) {
    super([new LinearSection(start, end)]);
  }
}
