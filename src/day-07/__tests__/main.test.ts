import { parseInts } from "../../utils/core";
import { getGeometricCost, solveFirst, solveSecond } from "../main";

describe("getGeometricCost", () => {
  const input = parseInts("16,1,2,0,4,2,7,1,2,14", ",");
  it.each([
    [input, 2, 206],
    [input, 5, 168],
  ])("calculates cost", (positions, alignment, expected) => {
    expect(getGeometricCost(positions, alignment)).toEqual(expected);
  });
});

describe("solveFirst", () => {
  it("works for example", () => {
    const input = `
16,1,2,0,4,2,7,1,2,14
`;
    expect(solveFirst(input)).toEqual(37);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
16,1,2,0,4,2,7,1,2,14
    `;
    expect(solveSecond(input)).toEqual(168);
  });
});
