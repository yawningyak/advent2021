import { solveFirst, solveSecond } from "../main";

describe("solveFirst", () => {
  it("works for example", () => {
    const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;
    expect(solveFirst(input)).toEqual(150);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
  forward 5
  down 5
  forward 8
  up 3
  down 8
  forward 2
  `;
    expect(solveSecond(input)).toEqual(900);
  });
});
