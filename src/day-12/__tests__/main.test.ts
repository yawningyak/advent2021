import { solveFirst, solveSecond } from "../main";

describe("solveFirst", () => {
  it("works for example 1", () => {
    const input = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
    `;
    expect(solveFirst(input)).toEqual(10);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
### REPLACE ###
    `;
    expect(solveSecond(input)).toEqual(100);
  });
});
