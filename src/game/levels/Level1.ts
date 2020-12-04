import { Path } from 'game/path/Path';
import { Position } from 'game/objects/Position';
import { Helpers } from 'helpers/Helpers';
import { LinearSection } from 'game/path/LinearSection';
import { Section } from 'game/path/Section';
import { Level } from './Level';

enum Color {
  Green1 = 'DarkGreen',
  Green2 = 'GreenYellow',
  Green3 = 'green',
  Green4 = 'forestgreen',
}

export class Level1 extends Level {
  get snakePath(): Path {
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

    return new Path(sections);
  }

  get snakeBallVelocity(): number {
    return 50;
  }

  get nymaPosition(): Position {
    return { x: 50, y: 50 };
  }

  get snakeLength(): number {
    return 100;
  }

  get randomColor(): string {
    return Helpers.randomEnum(Color);
  }
}
