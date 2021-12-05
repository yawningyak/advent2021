export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function product(values: number[]): number {
  return values.reduce((total, value) => total * value, 1);
}

export function contains(aList: number[], bList: number[]): boolean {
  return bList.every((b) => aList.indexOf(b) >= 0);
}

export function parseStrings(
  input: string,
  delimiter: string | RegExp
): string[] {
  return input
    .trim()
    .split(delimiter)
    .filter((str) => str.trim());
}

export function parseInts(input: string, delimiter: string | RegExp): number[] {
  return parseStrings(input, delimiter).map((numstr) => parseInt(numstr));
}
