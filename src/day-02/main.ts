import fs from "fs";
import path from "path";

interface Move {
  direction: "forward" | "down" | "up";
  magnitude: number;
}

interface Position {
  horizontal: number;
  depth: number;
}

interface Position2 extends Position {
  aim: number;
}

function parseInput(input: string): Move[] {
  return input
    .split("\n")
    .map((str) => str.trim())
    .filter((str) => str)
    .map((str) => {
      const [direction, magnitude] = str.split(" ");
      return { direction, magnitude: parseInt(magnitude) } as unknown as Move;
    });
}

function goto(moves: Move[]): Position {
  let position = { horizontal: 0, depth: 0 };
  for (const move of moves) {
    switch (move.direction) {
      case "forward":
        position.horizontal += move.magnitude;
        break;
      case "down":
        position.depth += move.magnitude;
        break;
      case "up":
        position.depth -= move.magnitude;
        break;
    }
  }
  return position;
}

function goto2(moves: Move[]): Position2 {
  let position = { horizontal: 0, depth: 0, aim: 0 };
  for (const move of moves) {
    switch (move.direction) {
      case "forward":
        position.horizontal += move.magnitude;
        position.depth += position.aim * move.magnitude;
        break;
      case "down":
        position.aim += move.magnitude;
        break;
      case "up":
        position.aim -= move.magnitude;
        break;
    }
  }
  return position;
}

export function solveFirst(input: string): number {
  const position: Position = goto(parseInput(input));
  return position.horizontal * position.depth;
}

export function solveSecond(input: string): number {
  const position: Position2 = goto2(parseInput(input));
  return position.horizontal * position.depth;
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log('Second:', solveSecond(data.toString()));
