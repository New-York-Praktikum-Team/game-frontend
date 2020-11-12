export enum Color {
  Red = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'forestgreen',
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

export function randomColor(): Color {
  return randomEnum(Color);
}
