import { create } from "domain";
import { range } from "./core";

export enum Axis {
  X = "X",
  Y = "Y",
}

export function printGrid(
  grid: any[][],
  colDelimiter = ",",
  rowDelimiter = "\n",
  toValueString = (c: any) => c
): void {
  const [yLimit, xLimit] = getDimensions(grid);
  let output = "";
  for (let y = 0; y < yLimit; y++) {
    if (y > 0) {
      output += rowDelimiter;
    }
    for (let x = 0; x < xLimit; x++) {
      if (x > 0) {
        output += colDelimiter;
      }
      output += toValueString(grid[x][y]);
    }
  }
  console.log(output);
}

/**
 * Create X-by-Y grid, such that each cell is addressable by grid[x][y].
 *
 * grid[0][0] is the upper-left point.
 * grid[xLimit-1][0] is the upper-right point.
 * grid[0][yLimit-1] is the lower-left point.
 * grid[xLimit-1][yLimit-1] is the lower-right point.
 *
 * @param yLimit The range of y is [0, yLimit - 1]
 * @param xLimit The range of x is [0, xLimit - 1]
 * @param initialValue
 * @returns
 */
export function createGrid<T>(
  xLimit: number,
  yLimit: number,
  initialValue: T
): T[][] {
  return range(xLimit).map(() => range(yLimit).map(() => initialValue));
}

export function createGridWithSameDimensions<T>(
  grid: T[][],
  initialValue: T
): T[][] {
  const [yLimit, xLimit] = getDimensions(grid);
  return createGrid<T>(xLimit, yLimit, initialValue);
}

export function getYLimit<T = any>(grid: T[][]): number {
  return grid[0] ? grid[0].length : 0;
}

export function getXLimit<T = any>(grid: T[][]): number {
  return grid.length;
}

export function getDimensions<T = any>(grid: T[][]): [number, number] {
  return [getYLimit(grid), getXLimit(grid)];
}

export function splitGrid<T = any>(
  grid: T[][],
  axis: Axis,
  splitPoint: number, // can be decimal for even number of rows or cols (e.g., use 1.5 to split 4 rows into two grids with 2 rows each)
  initialValue: T
): [T[][], T[][]] {
  switch (axis) {
    case Axis.Y: {
      const xLimit = getXLimit(grid);
      const yLimit = getYLimit(grid);
      const A = createGrid<T>(xLimit, splitPoint, initialValue);
      const B = createGrid<T>(xLimit, Math.floor(yLimit / 2), initialValue);
      for (let y = 0; y < yLimit; y++) {
        for (let x = 0; x < xLimit; x++) {
          if (y < splitPoint) {
            A[x][y] = grid[x][y];
          } else if (y > splitPoint) {
            const yPrime = Math.ceil(y - splitPoint) - 1;
            B[x][yPrime] = grid[x][y];
          }
        }
      }
      return [A, B];
    }
    case Axis.X: {
      const xLimit = getXLimit(grid);
      const yLimit = getYLimit(grid);
      const A = createGrid<T>(splitPoint, yLimit, initialValue);
      const B = createGrid<T>(Math.floor(xLimit / 2), yLimit, initialValue);
      for (let y = 0; y < yLimit; y++) {
        for (let x = 0; x < xLimit; x++) {
          if (x < splitPoint) {
            A[x][y] = grid[x][y];
          } else if (x > splitPoint) {
            const xPrime = Math.ceil(x - splitPoint) - 1;
            B[xPrime][y] = grid[x][y];
          }
        }
      }
      return [A, B];
    }
  }
}

export function invertGrid<T = any>(
  grid: T[][],
  axis: Axis,
  initialValue: T
): T[][] {
  const inverted = createGridWithSameDimensions(grid, initialValue);
  switch (axis) {
    case Axis.Y: {
      const yMax = getYLimit(grid) - 1;
      for (let y = 0; y < getYLimit(grid); y++) {
        for (let x = 0; x < getXLimit(grid); x++) {
          const yPrime = yMax - y;
          inverted[x][yPrime] = grid[x][y];
        }
      }
      break;
    }
    case Axis.X: {
      const xMax = getXLimit(grid) - 1;
      for (let x = 0; x < getXLimit(grid); x++) {
        for (let y = 0; y < getYLimit(grid); y++) {
          const xPrime = xMax - x;
          inverted[xPrime][y] = grid[x][y];
        }
      }
      break;
    }
  }
  return inverted;
}

export function mergeGrids<T = any>(
  A: T[][],
  B: T[][],
  merge: (a: T | undefined, b: T | undefined) => T,
  initialValue: T
): T[][] {
  const xLimit = Math.max(getXLimit(A), getXLimit(B));
  const yLimit = Math.max(getYLimit(A), getYLimit(B));
  const merged = createGrid<T>(xLimit, yLimit, initialValue);
  for (let y = 0; y < yLimit; y++) {
    for (let x = 0; x < xLimit; x++) {
      merged[x][y] = merge(A[x]?.[y], B[x]?.[y]);
    }
  }
  return merged;
}
