import fs from "fs";
import path from "path";
import { bit, count, or } from "../utils/bitops";
import { parseInts, parseStrings, range, sum } from "../utils/core";
import {
  Axis,
  createGrid,
  getDimensions,
  invertGrid,
  mergeGrids,
  printGrid,
  splitGrid,
} from "../utils/grid";

interface Problem {
  pattern: bit[][];
  folds: Fold[];
}

interface Fold {
  axis: Axis;
  foldPoint: number;
}

interface Coordinates {
  x: number;
  y: number;
}

type Mapper = (x: number, y: number) => [number, number];

function parseInput(input: string): Problem {
  const [patternPart, foldPart] = parseStrings(input, "\n\n");
  const coordinates: Coordinates[] = parseStrings(patternPart, "\n").map(
    (coordStr) => {
      const [x, y] = parseInts(coordStr, ",");
      return { x, y };
    }
  );
  const xLimit = Math.max(...coordinates.map((coord) => coord.x)) + 1;
  const yLimit = Math.max(...coordinates.map((coord) => coord.y)) + 1;
  const pattern = createGrid<bit>(xLimit, yLimit, 0);
  coordinates.forEach(({ x, y }) => {
    pattern[x][y] = 1;
  });
  const folds = parseStrings(foldPart, "\n")
    .map((foldStr) => foldStr.substring("fold along ".length))
    .map((line) => parseStrings(line, "="))
    .map(([axis, pointStr]) => ({
      axis: axis === "y" ? Axis.Y : Axis.X,
      foldPoint: Number(pointStr),
    }));
  return { pattern, folds };
}

function overlay(pattern1: bit[][], pattern2: bit[][]): bit[][] {
  const [yLimit1, xLimit1] = getDimensions(pattern1);
  const [yLimit2, xLimit2] = getDimensions(pattern2);
  const yLimit = Math.max(yLimit1, yLimit2);
  const xLimit = Math.max(xLimit1, xLimit2);
  return createGrid<bit>(xLimit, yLimit, 0).map((row, y) =>
    row.map((col, x) => or(pattern1?.[x]?.[y], pattern2?.[x]?.[y]))
  );
}

function horizontalFold(pattern: bit[][], y: number): bit[][] {
  const [top, bottom] = splitGrid<bit>(pattern, Axis.Y, y, 0);
  const flippedTop = invertGrid<bit>(top, Axis.Y, 0);
  const combined = mergeGrids<bit>(bottom, flippedTop, or, 0);
  return invertGrid<bit>(combined, Axis.Y, 0);
}

function verticalFold(pattern: bit[][], x: number): bit[][] {
  const [left, right] = splitGrid<bit>(pattern, Axis.X, x, 0);
  const flippedLeft = invertGrid<bit>(left, Axis.X, 0);
  const combiend = mergeGrids<bit>(right, flippedLeft, or, 0);
  return invertGrid<bit>(combiend, Axis.X, 0);
}

export function solveFirst(input: string, steps = 1): number {
  let { pattern, folds } = parseInput(input);
  for (let step of range(steps)) {
    const fold = folds[step];
    const foldOperation = fold.axis === Axis.Y ? horizontalFold : verticalFold;
    pattern = foldOperation(pattern, fold.foldPoint);
  }
  return count(pattern);
}

export function solveSecond(input: string): void {
  let { pattern, folds } = parseInput(input);
  for (let step of range(folds.length)) {
    const fold = folds[step];
    const foldOperation = fold.axis === Axis.Y ? horizontalFold : verticalFold;
    pattern = foldOperation(pattern, fold.foldPoint);
  }
  printGrid(pattern, "", "\n", (b: bit) => (b ? "*" : " "));
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
