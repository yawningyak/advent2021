import { solveFirst, solveSecond } from "../main";

describe("solveFirst", () => {
  it("works for example", () => {
    const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;
    expect(solveFirst(input)).toEqual(198);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
      `;
    expect(solveSecond(input)).toEqual(230);
  });
});
