import fs from "fs";
import path from "path";
import { parseInts, sum } from "../utils";

export function countIncreases(values: number[], windowSize = 1): number {
  return values.reduce((increases, currentValue, currentIndex, array) => {
    if (currentIndex < windowSize) {
      return increases;
    }
    const previousSum = sum(
      array.slice(currentIndex - windowSize, currentIndex)
    );
    const currentSum = sum(
      array.slice(currentIndex - windowSize + 1, currentIndex + 1)
    );
    if (currentSum > previousSum) {
      return increases + 1;
    }
    return increases;
  }, 0);
}

function solveFirst(input: string): number {
  ``;
  return countIncreases(parseInts(input, "\n"), 1);
}

function solveSecond(input: string): number {
  return countIncreases(parseInts(input, "\n"), 3);
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
