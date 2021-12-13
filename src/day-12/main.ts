import fs from "fs";
import path from "path";
import { parseStrings } from "../utils/core";

interface Node {
  isBig: boolean;
  name: string;
  neighbors: Graph;
}

type Graph = Record<string, Node>;

function parseInput(input: string): Graph {
  const lines = parseStrings(input, "\n");
  const graph: Graph = {};
  lines.forEach((line) => {
    const [node1, node2] = parseStrings(line, "-").map((name) => {
      graph[name] = graph[name] ?? {
        name,
        neighbors: {},
        isBig: name.toLowerCase() !== name,
      };
      return graph[name];
    });
    node1.neighbors[node2.name] = node2;
    node2.neighbors[node1.name] = node1;
  });
  return graph;
}

export function solveFirst(input: string): number {
  const graph: Graph = parseInput(input);

  return 0;
}

export function solveSecond(input: string): number {
  return 0;
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
