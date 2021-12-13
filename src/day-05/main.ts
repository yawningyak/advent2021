import fs from "fs";
import path from "path";
import { parseInts, parseStrings, sum } from "../utils/core";

interface Line {
  p1: [number, number];
  p2: [number, number];
  isHorizontal: boolean;
  isVertical: boolean;
  isDiagonal: boolean;
}

type Topo = Record<string, number>;

function parseInput(input: string): Line[] {
  return parseStrings(input, "\n").map((line) => {
    const [p1str, p2str] = parseStrings(line, "->");
    const [x1, y1] = parseInts(p1str, ",");
    const [x2, y2] = parseInts(p2str, ",");
    return {
      p1: [x1, y1],
      p2: [x2, y2],
      isHorizontal: y1 === y2,
      isVertical: x1 === x2,
      isDiagonal: Math.abs(x1 - x2) === Math.abs(y1 - y2),
    };
  });
}

export function solveFirst(input: string): number {
  const lines = parseInput(input);
  const topo: Topo = {};
  for (const line of lines) {
    if (line.isVertical) {
      const x = line.p1[0];
      const y1 = Math.min(line.p1[1], line.p2[1]);
      const y2 = Math.max(line.p1[1], line.p2[1]);
      for (let y = y1; y <= y2; y++) {
        const ptKey = x + "," + y;
        topo[ptKey] = (topo[ptKey] ?? 0) + 1;
      }
    } else if (line.isHorizontal) {
      const x1 = Math.min(line.p1[0], line.p2[0]);
      const x2 = Math.max(line.p1[0], line.p2[0]);
      const y = line.p1[1];
      for (let x = x1; x <= x2; x++) {
        const ptKey = x + "," + y;
        topo[ptKey] = (topo[ptKey] ?? 0) + 1;
      }
    }
  }
  return sum(Object.values(topo).map((count) => (count > 1 ? 1 : 0)));
}

export function solveSecond(input: string): number {
  const lines = parseInput(input);
  const topo: Topo = {};
  for (const line of lines) {
    if (line.isVertical) {
      const x = line.p1[0];
      const y1 = Math.min(line.p1[1], line.p2[1]);
      const y2 = Math.max(line.p1[1], line.p2[1]);
      for (let y = y1; y <= y2; y++) {
        const ptKey = x + "," + y;
        topo[ptKey] = (topo[ptKey] ?? 0) + 1;
      }
    } else if (line.isHorizontal) {
      const x1 = Math.min(line.p1[0], line.p2[0]);
      const x2 = Math.max(line.p1[0], line.p2[0]);
      const y = line.p1[1];
      for (let x = x1; x <= x2; x++) {
        const ptKey = x + "," + y;
        topo[ptKey] = (topo[ptKey] ?? 0) + 1;
      }
    } else if (line.isDiagonal) {
      const increasingX = line.p1[0] <= line.p2[0];
      const increasingY = line.p1[1] <= line.p2[1];
      for (
        let [x, y] = line.p1;
        (increasingX ? x <= line.p2[0] : x >= line.p2[0]) &&
        (increasingY ? y <= line.p2[1] : y >= line.p2[1]);
        [x, y] = [increasingX ? x + 1 : x - 1, increasingY ? y + 1 : y - 1]
      ) {
        const ptKey = x + "," + y;
        topo[ptKey] = (topo[ptKey] ?? 0) + 1;
      }
    }
  }
  return sum(Object.values(topo).map((count) => (count > 1 ? 1 : 0)));
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
