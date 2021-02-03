import { Position } from 'game/objects/Position';
import { Rectangle } from 'consts/shapes';
import { Path } from './Path';
import { Section } from './Section';
import { LinearSection } from './LinearSection';
import { CircularSection } from './CircularSection';

export class SpiralPath extends Path {
  constructor(drawingRectangle: Rectangle) {
    const relativePoints = [
      { x: 0, y: 0.53 },
      { x: 1, y: 0.53 },
      { x: 0.15, y: 0.53 },
      { x: 0.85, y: 0.53 },
      { x: 0.3, y: 0.5 },
    ];

    const points: Position[] = relativePoints.map((p) => {
      const x = drawingRectangle.x + p.x * drawingRectangle.width;
      const y = drawingRectangle.y + p.y * drawingRectangle.height;
      return { x, y };
    });

    const sections: Section[] = [];
    points.forEach((point, i) => {
      if (i !== points.length - 1) {
        sections.push(new CircularSection(points[i], points[i + 1]));
      }
    });

    super(sections);
  }
}

export class TreePath extends Path {
  constructor(drawingRectangle: Rectangle) {
    const relativePoints = [
      { x: 0, y: 1 },
      { x: 0.3, y: 0.66 },
      { x: 0.1, y: 0.66 },
      { x: 0.4, y: 0.33 },
      { x: 0.2, y: 0.33 },
      { x: 0.5, y: 0 },
      { x: 0.8, y: 0.33 },
      { x: 0.6, y: 0.33 },
      { x: 0.9, y: 0.66 },
      { x: 0.7, y: 0.66 },
      { x: 1, y: 1 },
      { x: 0.26, y: 1 },
    ];

    const points: Position[] = relativePoints.map((p) => {
      const x = drawingRectangle.x + p.x * drawingRectangle.width;
      const y = drawingRectangle.y + p.y * drawingRectangle.height;
      return { x, y };
    });

    const sections: Section[] = [];
    points.forEach((point, i) => {
      if (i !== points.length - 1) {
        sections.push(new LinearSection(points[i], points[i + 1]));
      }
    });

    super(sections);
  }
}

export class HeartPath extends Path {
  constructor(drawingRectangle: Rectangle) {
    const relativePoints = [
      { x: 0.5, y: 1 },
      { x: 0, y: 0.4 },
      { x: 0.5, y: 0.25 },
      { x: 1, y: 0.4 },
      { x: 0.645, y: 0.825 },
    ];

    const points: Position[] = relativePoints.map((p) => {
      const x = drawingRectangle.x + p.x * drawingRectangle.width;
      const y = drawingRectangle.y + p.y * drawingRectangle.height;
      return { x, y };
    });

    const sections = [
      new LinearSection(points[0], points[1]),
      new CircularSection(points[1], points[2]),
      new CircularSection(points[2], points[3]),
      new LinearSection(points[3], points[4]),
    ];

    super(sections);
  }
}
