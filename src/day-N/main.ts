import fs from "fs";
import path from "path";


function parseInput(input: string): any {
}

export function solveFirst(input: string): number {
    return 0;
}

export function solveSecond(input: string): number {
    return 0;
}

const data = fs.readFileSync(path.join(__dirname, "./input.txt"));
console.log("First:", solveFirst(data.toString()));
console.log("Second:", solveSecond(data.toString()));
