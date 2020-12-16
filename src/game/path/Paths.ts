import { Position } from 'game/objects/Position';
import { Path } from './Path';
import { Section } from './Section';
import { LinearSection } from './LinearSection';
import { CircularSection } from './CircularSection';

class TreePath extends Path {
  constructor() {
    const points: Position[] = [
      { x: 0, y: 450 },
      { x: 150, y: 350 },
      { x: 50, y: 350 },
      { x: 200, y: 250 },
      { x: 100, y: 250 },
      { x: 250, y: 50 },
      { x: 400, y: 250 },
      { x: 300, y: 250 },
      { x: 450, y: 350 },
      { x: 350, y: 350 },
      { x: 500, y: 450 },
      { x: 250, y: 450 },
    ];

    const sections: Section[] = [];
    points.forEach((point, i) => {
      if (i !== points.length - 1) {
        sections.push(new LinearSection(points[i], points[i + 1]));
      }
    });

    super(sections);
  }
}

export const treePath = new TreePath();

class RoundPath extends Path {
  constructor() {
    const p1 = { x: 300, y: 500 };
    const p2 = { x: 500, y: 300 };
    const r = 200;

    const sections = [new CircularSection(p2, p1, r, false, true)];
    super(sections);
  }
}

export const roundPath = new RoundPath();
