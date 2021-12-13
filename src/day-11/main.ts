import fs from "fs";
import path from "path";
import { getRanges, parseInts, parseStrings, range } from "../utils/core";

interface Position {
  rowIndex: number;
  colIndex: number;
}

function toString(position: Position): string {
  return position.rowIndex + "," + position.colIndex;
}

function parseInput(input: string): number[][] {
  return parseStrings(input, "\n").map((line) => parseInts(line, ""));
}

function isSynchronized(energyLevels: number[][]): boolean {
  return energyLevels.every((row) => row.every((level) => level === 0));
}

function getFlashingPositions(energyLevels: number[][]): Position[] {
  const positions: Position[] = [];
  energyLevels.forEach((row, rowIndex) =>
    row.forEach((level, colIndex) => {
      if (level > 9) {
        positions.push({ rowIndex, colIndex });
      }
    })
  );
  return positions;
}

function simulateSingleStep(startingEnergyLevels: number[][]): {
  endingEnergyLevels: number[][];
  flashes: number;
} {
  const { rowIndexMin, rowIndexMax, colIndexMin, colIndexMax } =
    getRanges(startingEnergyLevels);

  // First, increment every octopus's energy level by 1
  let energyLevels = startingEnergyLevels.map((row) =>
    row.map((level) => level + 1)
  );

  const flashed = new Set<string>();
  let flashing = getFlashingPositions(energyLevels);

  function bumpEnergy(position: Position): void {
    const { rowIndex, colIndex } = position;
    if (
      rowIndex >= rowIndexMin &&
      rowIndex <= rowIndexMax &&
      colIndex >= colIndexMin &&
      colIndex <= colIndexMax
    ) {
      energyLevels[rowIndex][colIndex] = energyLevels[rowIndex][colIndex] + 1;
    }
  }

  while (flashing.length > 0) {
    const position = flashing.shift();
    if (!position) {
      continue;
    }
    const { rowIndex, colIndex } = position;
    if (flashed.has(toString(position))) {
      throw new Error("Octopus is in queue to flash but has already flashed");
    }
    if (energyLevels[rowIndex][colIndex] <= 9) {
      throw new Error(
        "Octopus is in queue to flash but has insufficient energy level"
      );
    }
    flashed.add(toString(position));
    // Bump all the adjacent octopuses' energy levels
    bumpEnergy({ rowIndex: rowIndex - 1, colIndex });
    bumpEnergy({ rowIndex: rowIndex - 1, colIndex: colIndex - 1 });
    bumpEnergy({ rowIndex: rowIndex - 1, colIndex: colIndex + 1 });
    bumpEnergy({ rowIndex: rowIndex + 1, colIndex });
    bumpEnergy({ rowIndex: rowIndex + 1, colIndex: colIndex - 1 });
    bumpEnergy({ rowIndex: rowIndex + 1, colIndex: colIndex + 1 });
    bumpEnergy({ rowIndex, colIndex: colIndex - 1 });
    bumpEnergy({ rowIndex, colIndex: colIndex + 1 });
    // Find all flashing octopuses again, minus the ones already flashed
    flashing = getFlashingPositions(energyLevels).filter(
      (position) => !flashed.has(toString(position))
    );
  }

  // Finally, reset the energy levels of those flashed
  const endingEnergyLevels = energyLevels.map((row) =>
    row.map((level) => (level > 9 ? 0 : level))
  );

  return { endingEnergyLevels, flashes: flashed.size };
}

export function solveFirst(input: string, steps = 100): number {
  let energyLevels = parseInput(input);
  let totalFlashes = 0;
  for (let step of range(steps)) {
    const { endingEnergyLevels, flashes } = simulateSingleStep(energyLevels);
    totalFlashes += flashes;
    energyLevels = endingEnergyLevels;
  }
  return totalFlashes;
}

export function solveSecond(input: string): number {
  let energyLevels = parseInput(input);
  let step = 0;
  while (!isSynchronized(energyLevels)) {
    step++;
    energyLevels = simulateSingleStep(energyLevels).endingEnergyLevels;
  }
  return step;
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
