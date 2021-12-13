import fs from "fs";
import path from "path";
import { range } from "../utils/core";

// number[x][y] where x is the row index and y is digit index (left to right)
function parseInput(input: string): number[][] {
  return input
    .split("\n")
    .map((str) => str.trim())
    .filter((str) => str)
    .map((str) => str.split("").map((digit) => Number(digit)));
}

function getFrequencies(nums: number[]): Record<number, number> {
  const numberFrequencies: Record<number, number> = {};
  for (const num of nums) {
    numberFrequencies[num] = (numberFrequencies[num] ?? 0) + 1;
  }
  return numberFrequencies;
}

function getNumberByFrequency(
  numberFrequencies: Record<number, number>,
  freqComparator: (freq1: number, freq2: number) => number
): number {
  const entries: [number, number][] = Object.entries(numberFrequencies).map(
    (entry) => [Number(entry[0]), Number(entry[1])]
  );
  if (entries.length === 0) {
    throw new Error("Empty number frequencies");
  }
  return entries.reduce(
    (previous: [number, number], current: [number, number]) => {
      if (freqComparator(current[1], previous[1]) > 0) {
        return current;
      }
      if (freqComparator(current[1], previous[1]) < 0) {
        return previous;
      }
      if (freqComparator(current[0], previous[0]) > 0) {
        return current;
      }
      return previous;
    },
    entries[0]
  )[0];
}

function getDecimal(bits: number[]): number {
  return parseInt(bits.join(""), 2);
}

export function solveFirst(input: string): number {
  const binaryNumbers: number[][] = parseInput(input);
  const numberCount = binaryNumbers.length;
  if (numberCount === 0) {
    return 0;
  }
  const bitCount = binaryNumbers[0].length;
  const bitIndices = range(bitCount);
  const gammaBits = bitIndices.map(() => 0);
  const epsilonBits = bitIndices.map(() => 0);
  bitIndices.forEach((bitIndex) => {
    const digitFrequencies = getFrequencies(
      binaryNumbers.map((bits: number[]) => bits[bitIndex])
    );
    gammaBits[bitIndex] = getNumberByFrequency(
      digitFrequencies,
      (freq1, freq2) => freq1 - freq2
    );
    epsilonBits[bitIndex] = getNumberByFrequency(
      digitFrequencies,
      (freq1, freq2) => freq2 - freq1
    );
  });
  return getDecimal(gammaBits) * getDecimal(epsilonBits);
}

function reduceNumbers(
  binaryNumbers: number[][],
  freqComparator: (freq1: number, freq2: number) => number
): number[][] {
  const bitCount = binaryNumbers[0].length;
  const bitIndices = range(bitCount);
  let reducedNumbers = [...binaryNumbers];
  bitIndices.forEach((bitIndex) => {
    const currentBits = reducedNumbers.map((bits: number[]) => bits[bitIndex]);
    const digitFrequencies = getFrequencies(currentBits);
    const chosenDigit = getNumberByFrequency(digitFrequencies, freqComparator);
    const oneHot = currentBits.map((bit) => (bit === chosenDigit ? 1 : 0));
    reducedNumbers = reducedNumbers.filter((_number, index) => oneHot[index]);
  });
  return reducedNumbers;
}

export function solveSecond(input: string): number {
  const binaryNumbers: number[][] = parseInput(input);
  const numberCount = binaryNumbers.length;
  if (numberCount === 0) {
    throw new Error("No number");
  }
  let oxygenNumbers = reduceNumbers(
    binaryNumbers,
    (freq1, freq2) => freq1 - freq2
  );
  let co2Numbers = reduceNumbers(
    binaryNumbers,
    (freq1, freq2) => freq2 - freq1
  );
  return getDecimal(oxygenNumbers[0]) * getDecimal(co2Numbers[0]);
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
