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

export function range(len: number): number[] {
  return [...Array(len).keys()];
}

/**
 * Given a M x N matrix, where each cell is addressible by matrix[n][m] where
 * m is the row index and n is the column index, return the inclusive index
 * ranges for rows and columns.
 * @param matrix
 * @returns
 */
export function getRanges(matrix: number[][]): {
  rowIndexMin: number;
  rowIndexMax: number;
  colIndexMin: number;
  colIndexMax: number;
} {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return { rowIndexMin: 0, rowIndexMax: 0, colIndexMin: 0, colIndexMax: 0 };
  }
  const rowIndexMin = 0;
  const rowIndexMax = matrix.length - 1;
  const colIndexMin = 0;
  const colIndexMax = matrix[0].length - 1;
  return {
    rowIndexMin,
    rowIndexMax,
    colIndexMin,
    colIndexMax,
  };
}
