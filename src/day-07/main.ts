import fs from "fs";
import path from "path";
import { parseInts, sum } from "../utils";

function parseInput(input: string): number[] {
  return parseInts(input, ",");
}

type CostFunction = (positions: number[], alignment: number) => number;

function getLinearCost(positions: number[], alignment: number): number {
  return sum(positions.map((position) => Math.abs(position - alignment)));
}

export function getGeometricCost(
  positions: number[],
  alignment: number
): number {
  return sum(
    positions.map((position) => {
      const dist = Math.abs(position - alignment);
      return ((dist + 1) * dist) / 2;
    })
  );
}

function findAlignmentPosition(
  positions: number[],
  getCost: CostFunction
): number {
  if (positions.length === 0) {
    throw new Error("Nothing to align");
  }
  if (positions.length === 1) {
    return positions[0];
  }
  const position = positions[0];
  const rest = positions.slice(1);
  const alignment = findAlignmentPosition(rest, getCost);
  if (position === alignment) {
    return alignment;
  }
  let optimalAlignment = alignment;
  let optimalCost = getCost(positions, alignment);
  for (
    let candidate = alignment;
    position > alignment ? candidate <= position : candidate >= position;
    candidate = position > alignment ? candidate + 1 : candidate - 1
  ) {
    const newCost = getCost(positions, candidate);
    if (newCost < optimalCost) {
      optimalAlignment = candidate;
      optimalCost = newCost;
    }
  }
  return optimalAlignment;
}

export function solveFirst(input: string): number {
  const positions = parseInput(input);
  const alignment = findAlignmentPosition(positions, getLinearCost);
  return getLinearCost(positions, alignment);
}

export function solveSecond(input: string): number {
  const positions = parseInput(input);
  const alignment = findAlignmentPosition(positions, getGeometricCost);
  return getGeometricCost(positions, alignment);
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
