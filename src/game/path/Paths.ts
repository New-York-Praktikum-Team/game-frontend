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

class HeartPath extends Path {
  constructor() {
    const p1 = { x: 250, y: 500 };
    const p2 = { x: 100, y: 250 };
    const p3 = { x: 250, y: 200 };
    const p4 = { x: 400, y: 250 };
    const p5 = { x: 300, y: 400 };

    const r = 80;

    const sections = [
      new LinearSection(p1, p2),
      new CircularSection(p2, p3, r),
      new CircularSection(p3, p4, r, true, { x: 320, y: 230 }),
      new LinearSection(p4, p5),
    ];
    super(sections);
  }
}

export const heartPath = new HeartPath();
