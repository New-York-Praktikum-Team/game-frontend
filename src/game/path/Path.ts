import { Position } from 'game/objects/Position';
import { Section } from './Section';

export class Path {
  constructor(public sections: Section[]) {
    this.start = sections[0].start;
    this.end = sections[sections.length - 1].end;
  }

  start: Position;

  end: Position;

  next(current: Position, distanceDelta: number): Position {
    let result: Position;

    this.sections.forEach((section, index) => {
      if (section.containsPosition(current)) {
        if (
          section.distance(current, section.end) < distanceDelta
          && index !== this.sections.length - 1
        ) {
          const newDistanceDelta = distanceDelta - section.distance(current, section.end);
          const newSection = this.sections[index + 1];
          result = newSection.next(newSection.start, newDistanceDelta);
        } else {
          result = section.next(current, distanceDelta);
        }
      }
    });

    return result!;
  }
}
