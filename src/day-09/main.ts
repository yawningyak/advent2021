import fs from "fs";
import path from "path";
import { parseInts, parseStrings, product, sum } from "../utils";

function parseInput(input: string): number[][] {
  return parseStrings(input, "\n").map((line) => parseInts(line, ""));
}

interface Position {
  rowIndex: number;
  colIndex: number;
}

function findLowPoints(heightMap: number[][]): Position[] {
  if (heightMap.length === 0) {
    return [];
  }
  if (heightMap[0].length === 0) {
    return [];
  }
  const lowPoints: Position[] = [];
  const rowIndexMin = 0;
  const rowIndexMax = heightMap.length - 1;
  const colIndexMin = 0;
  const colIndexMax = heightMap[0].length - 1;
  heightMap.forEach((rowPoints: number[], rowIndex: number) => {
    rowPoints.forEach((point: number, colIndex: number) => {
      const belowLeft =
        colIndex <= colIndexMin || point < heightMap[rowIndex][colIndex - 1];
      const belowRight =
        colIndex >= colIndexMax || point < heightMap[rowIndex][colIndex + 1];
      const belowTop =
        rowIndex <= rowIndexMin || point < heightMap[rowIndex - 1][colIndex];
      const belowBottom =
        rowIndex >= rowIndexMax || point < heightMap[rowIndex + 1][colIndex];
      if (belowLeft && belowRight && belowTop && belowBottom) {
        lowPoints.push({ rowIndex, colIndex });
      }
    });
  });
  return lowPoints;
}

function toString(position: Position): string {
  return position.rowIndex + "," + position.colIndex;
}

function findBasinSize(heightMap: number[][], lowPoint: Position): number {
  const rowIndexMin = 0;
  const rowIndexMax = heightMap.length - 1;
  const colIndexMin = 0;
  const colIndexMax = heightMap[0].length - 1;
  const processedPoints = new Set<string>();
  const queuedPoints: Position[] = [lowPoint];
  let basinSize = 0;

  // Add point to the queue if it is not already processed
  function addPoint(position: Position): void {
    if (!processedPoints.has(toString(position))) {
      queuedPoints.push(position);
    }
  }

  while (queuedPoints.length > 0) {
    const point = queuedPoints.shift();
    if (!point) {
      continue;
    }
    // If the point has already been processed, stop going further
    if (processedPoints.has(toString(point))) {
      continue;
    }
    // If at any point, we hit a 9, stop going further
    if (heightMap[point.rowIndex][point.colIndex] === 9) {
      continue;
    }
    basinSize++;
    if (point.colIndex > colIndexMin) {
      // above
      addPoint({
        rowIndex: point.rowIndex,
        colIndex: point.colIndex - 1,
      });
    }
    if (point.colIndex < colIndexMax) {
      // below
      addPoint({
        rowIndex: point.rowIndex,
        colIndex: point.colIndex + 1,
      });
    }
    if (point.rowIndex > rowIndexMin) {
      // left
      addPoint({
        rowIndex: point.rowIndex - 1,
        colIndex: point.colIndex,
      });
    }
    if (point.rowIndex < rowIndexMax) {
      // right
      addPoint({
        rowIndex: point.rowIndex + 1,
        colIndex: point.colIndex,
      });
    }
    processedPoints.add(toString(point));
  }
  return basinSize;
}

export function solveFirst(input: string): number {
  const heightMap = parseInput(input);
  const lowPoints = findLowPoints(heightMap);
  const riskLevels = lowPoints.map(
    (position) => heightMap[position.rowIndex][position.colIndex] + 1
  );
  return sum(riskLevels);
}

export function solveSecond(input: string): number {
  const heightMap = parseInput(input);
  const lowPoints = findLowPoints(heightMap);
  const basinSizes = lowPoints.map((lowPoint) =>
    findBasinSize(heightMap, lowPoint)
  );
  basinSizes.sort((a, b) => b - a);
  return product(basinSizes.slice(0, 3));
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
