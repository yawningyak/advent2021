import fs from "fs";
import path from "path";
import { parseStrings, sum } from "../utils";

type Char = "{" | "}" | "[" | "]" | "(" | ")" | "<" | ">";

function parseInput(input: string): string[] {
  return parseStrings(input, "\n");
}

function findIllegalChar(line: Char[]): Char | undefined {
  const stack: Char[] = [];
  let illegalChar: undefined | Char = undefined;
  for (let char of line) {
    switch (char) {
      case "[":
      case "(":
      case "{":
      case "<":
        stack.push(char);
        break;
      case "]":
        if (stack.pop() !== "[") {
          illegalChar = char;
        }
        break;
      case ")":
        if (stack.pop() !== "(") {
          illegalChar = char;
        }
        break;
      case "}":
        if (stack.pop() !== "{") {
          illegalChar = char;
        }
        break;
      case ">":
        if (stack.pop() !== "<") {
          illegalChar = char;
        }
        break;
    }
    if (illegalChar) {
      break;
    }
  }
  return illegalChar;
}

function scoreIllegalChar(char: Char): number {
  switch (char) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
    default:
      throw new Error("Unexpected character: " + char);
  }
}

function getClosingSequence(line: Char[]): Char[] {
  const stack: Char[] = [];
  for (let char of line) {
    switch (char) {
      case "[":
      case "(":
      case "{":
      case "<":
        stack.push(char);
        break;
      case "]":
      case ")":
      case "}":
      case ">":
        stack.pop();
        break;
    }
  }
  stack.reverse();
  return stack.map((char) => {
    switch (char) {
      case "[":
        return "]";
      case "(":
        return ")";
      case "{":
        return "}";
      case "<":
        return ">";
      default:
        throw new Error("Unexpected character: " + char);
    }
  });
}

function scoreClosingSequence(seq: Char[]): number {
  return seq.reduce((score, char) => {
    let value = 0;
    if (char === ")") {
      value = 1;
    } else if (char === "]") {
      value = 2;
    } else if (char === "}") {
      value = 3;
    } else if (char === ">") {
      value = 4;
    } else {
      throw new Error("Unexpected character: " + char);
    }
    return score * 5 + value;
  }, 0);
}

export function solveFirst(input: string): number {
  const lines = parseInput(input) as unknown as Char[][];
  const scores = lines
    .map(findIllegalChar)
    .filter((char) => char)
    .map((char) => scoreIllegalChar(char!));
  return sum(scores);
}

export function solveSecond(input: string): number {
  const lines = parseInput(input) as unknown as Char[][];
  const incompleteLines = lines.filter(
    (line) => findIllegalChar(line) === undefined
  );
  const scores = incompleteLines
    .map(getClosingSequence)
    .map(scoreClosingSequence);
  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
