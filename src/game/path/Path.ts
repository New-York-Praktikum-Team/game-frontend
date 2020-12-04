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
        && section.containsPosition(current)
        // current is between section path and end
        && current.x <= Math.max(section.start.x, section.end.x)
        && current.x >= Math.min(section.start.x, section.end.x)
        && current.y <= Math.max(section.start.y, section.end.y)
        && current.y >= Math.min(section.start.y, section.end.y)
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
      }
    });
    return result!;
  }
}
