import { sum } from "./core";

export type bit = 0 | 1;

export function or(a: bit | undefined, b: bit | undefined): bit {
  return (a ?? 0) || (b ?? 0);
}

export function count(bitmap: bit[][]): number {
  return sum(bitmap.map((bitarray) => sum(bitarray)));
}
