import fs from "fs";
import path from "path";
import { parseInts, range, sum } from "../utils";

function parseInput(input: string): number[] {
  return parseInts(input, ",");
}

const memoizedResults: Record<string, number> = {};

export function simulateOneFish(
  days: number,
  initialTimer = 0,
  reproductionDelay = 2,
  reproductionCycle = 7
): number {
  const memoKey = [
    days,
    initialTimer,
    reproductionDelay,
    reproductionCycle,
  ].join(",");
  if (memoizedResults[memoKey] !== undefined) {
    return memoizedResults[memoKey];
  }

  const childCount =
    initialTimer >= days
      ? 0
      : Math.floor((days - initialTimer - 1) / reproductionCycle) + 1;

  if (reproductionDelay !== Infinity) {
    const descendantCount = sum(
      range(childCount).map((childIndex) => {
        const birthday = initialTimer + childIndex * reproductionCycle + 1;
        return simulateOneFish(
          days - birthday,
          reproductionDelay + reproductionCycle - 1,
          reproductionDelay,
          reproductionCycle
        );
      })
    );
    const result = 1 + descendantCount;
    memoizedResults[memoKey] = result;
    return result;
  }
  const result = 1 + childCount;
  memoizedResults[memoKey] = result;
  return result;
}

export function solveFirst(input: string): number {
  const initialTimers = parseInput(input);
  return sum(
    initialTimers.map((initialTimer) => simulateOneFish(80, initialTimer))
  );
}

export function solveSecond(input: string): number {
  const initialTimers = parseInput(input);
  return sum(
    initialTimers.map((initialTimer) => simulateOneFish(256, initialTimer))
  );
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
