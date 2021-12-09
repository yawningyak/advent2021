import { solveFirst, solveSecond } from "../main";

describe("solveFirst", () => {
  it("works for example", () => {
    const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
    `;
    expect(solveFirst(input)).toEqual(15);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
    `;
    expect(solveSecond(input)).toEqual(1134);
  });
});
