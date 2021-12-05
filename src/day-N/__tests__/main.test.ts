import { solveFirst, solveSecond } from "../main";

describe("solveFirst", () => {
  it("works for example", () => {
    const input = `
### REPLACE ###
`;
    expect(solveFirst(input)).toEqual(100);
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
