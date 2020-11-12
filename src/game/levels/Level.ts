import { Path } from 'game/path/Path';

export abstract class Level {
  // TODO: add colors number and ball count to this object so they vary by level
  abstract path(): Path;
}
