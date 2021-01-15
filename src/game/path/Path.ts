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
    let found = false;
    let result: Position;

    this.sections.forEach((section, index) => {
      if (
        !found
        && section.strictContainsPosition(current)
        && index !== this.sections.length - 1
      ) {
        if (section.distance(current, section.end) < distanceDelta) {
          const nextSection = this.sections[index + 1];
          result = nextSection.next(nextSection.start, distanceDelta);
          found = true;
        } else {
          result = section.next(current, distanceDelta);
          found = true;
        }
      } else if (!found && index === this.sections.length - 1) {
        result = section.next(current, distanceDelta);
        found = true;
      }
    });
    return result!;
  }
}
