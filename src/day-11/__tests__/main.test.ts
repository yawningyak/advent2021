import { solveFirst, solveSecond } from "../main";

describe("solveFirst", () => {
  it("works for quick example", () => {
    const input = `
11111
19991
19191
19991
11111
    `;
    expect(solveFirst(input, 1)).toEqual(9);
  });

  it("works for example", () => {
    const input = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
    `;
    expect(solveFirst(input)).toEqual(1656);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
    `;
    expect(solveSecond(input)).toEqual(195);
  });
});
