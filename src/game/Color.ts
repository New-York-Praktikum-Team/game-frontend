export enum Color {
  Red = '#FF0000',
  Blue = '#0000FF',
  Yellow = '#FFFF00',
  Green = '#00FF00'
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

export function randomColor(): Color {
  return randomEnum(Color);
}
