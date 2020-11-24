import { Position } from './Position';

export abstract class GameObject {
  constructor(
    public context: CanvasRenderingContext2D,
  ) { }

  public abstract draw(): void;

  public abstract distanceToPosition(pos: Position): number;
}
