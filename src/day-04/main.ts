import fs from "fs";
import path from "path";
import {
  contains,
  parseInts,
  parseStrings,
  product,
  range,
  sum,
} from "../utils/core";

interface Problem {
  sequence: number[];
  boardsById: Map<number, Board>;
}

interface Board {
  id: number;
  rows: Combo[];
  columns: Combo[];
}

interface Combo {
  boardId: number;
  members: number[];
}

function parseInput(input: string): Problem {
  const newlineIndex = input.trim().indexOf("\n");
  const firstLine = input.trim().slice(0, newlineIndex);
  const rest = input.trim().slice(newlineIndex);
  const sequence = parseInts(firstLine, ",");
  const boardsById: Map<number, Board> = new Map();
  parseStrings(rest, "\n\n").forEach((section, boardId) => {
    const board: Board = { id: boardId, rows: [], columns: [] };
    const rowLines = parseStrings(section, "\n");
    rowLines.forEach((line: string) => {
      const members = parseInts(line, / +/);
      const combo = { boardId, members };
      board.rows.push(combo);
    });
    const columnIndices = range(board.rows[0].members.length);
    columnIndices.forEach((columnIndex) => {
      const members = board.rows.map((row) => row.members[columnIndex]);
      const combo = { boardId, members };
      board.columns.push(combo);
    });
    boardsById.set(boardId, board);
  });
  return { sequence, boardsById };
}

function getBingoBoardId(
  problem: Problem,
  calledIndex: number
): number | undefined {
  const calledNumbers = problem.sequence.slice(0, calledIndex + 1);
  let bingoBoardId = undefined;
  for (const board of problem.boardsById.values()) {
    for (const combo of [...board.rows, ...board.columns]) {
      if (contains(calledNumbers, combo.members)) {
        bingoBoardId = board.id;
        break;
      }
    }
    if (bingoBoardId) {
      break;
    }
  }
  return bingoBoardId;
}

function getBingoBoardIds(problem: Problem, calledIndex: number): Set<number> {
  const calledNumbers = problem.sequence.slice(0, calledIndex + 1);
  const bingoBoardIds = new Set<number>();
  for (const board of problem.boardsById.values()) {
    for (const combo of [...board.rows, ...board.columns]) {
      if (contains(calledNumbers, combo.members)) {
        bingoBoardIds.add(board.id);
      }
    }
  }
  return bingoBoardIds;
}

export function solveFirst(input: string): number {
  const problem = parseInput(input);
  const calledIndices = range(problem.sequence.length);
  let solution = undefined;
  for (const calledIndex of calledIndices) {
    const calledNumber = problem.sequence[calledIndex];
    const calledNumbers = problem.sequence.slice(0, calledIndex + 1);
    const boardId = getBingoBoardId(problem, calledIndex);
    if (boardId !== undefined) {
      const board = problem.boardsById.get(boardId);
      // calculate sum of unmarked numbers on the board
      let uncalledSum = 0;
      board?.rows.forEach((row) => {
        const uncalledNumbers = row.members.filter(
          (member) => !calledNumbers.includes(member)
        );
        uncalledSum += sum(uncalledNumbers);
      });
      solution = uncalledSum * calledNumber;
      break;
    }
  }
  if (solution === undefined) {
    throw new Error("No solution found");
  }
  return solution;
}

export function solveSecond(input: string): number {
  const problem = parseInput(input);
  const calledIndices = range(problem.sequence.length);
  const boardIdsNotYetWon = new Set(problem.boardsById.keys());
  let solution = undefined;
  for (const calledIndex of calledIndices) {
    const calledNumber = problem.sequence[calledIndex];
    const calledNumbers = problem.sequence.slice(0, calledIndex + 1);
    const bingoBoardIds = getBingoBoardIds(problem, calledIndex);
    if (boardIdsNotYetWon.size === bingoBoardIds.size) {
      const lastBoardId = [...bingoBoardIds][0];
      const board = problem.boardsById.get(lastBoardId);
      // calculate sum of unmarked numbers on the board
      let uncalledSum = 0;
      board?.rows.forEach((row) => {
        const uncalledNumbers = row.members.filter(
          (member) => !calledNumbers.includes(member)
        );
        uncalledSum += sum(uncalledNumbers);
      });
      solution = uncalledSum * calledNumber;
      break;
    }
    bingoBoardIds.forEach((boardId) => {
      boardIdsNotYetWon.delete(boardId);
      problem.boardsById.delete(boardId);
    });
  }
  if (solution === undefined) {
    throw new Error("No solution found");
  }
  return solution;
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
