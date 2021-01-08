export interface Position {
  x: number;
  y: number;
}

export const distanceBetween = (position1: Position, position2: Position): number => Math.sqrt(
  (position1.x - position2.x) ** 2 + (position1.y - position2.y) ** 2,
);
export const positionAfterRotation = (
  position: Position, rotationCenter: Position, angle: number,
): Position => {
  const x = rotationCenter.x
    + (position.x - rotationCenter.x) * Math.cos(angle)
    - (position.y - rotationCenter.y) * Math.sin(angle);
  const y = rotationCenter.y
    + (position.x - rotationCenter.x) * Math.sin(angle)
    + (position.y - rotationCenter.y) * Math.cos(angle);
  return { x, y };
};
