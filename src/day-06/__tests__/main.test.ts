import { simulateOneFish, solveFirst, solveSecond } from "../main";

describe("simulateOneFish", () => {
  describe.skip("with infinite birth delay", () => {
    it.each([
      { days: 0, initialTimer: 0, expected: 1 },
      { days: 1, initialTimer: 0, expected: 2 }, // 0 -> +1
      { days: 2, initialTimer: 0, expected: 2 }, // 6
      { days: 3, initialTimer: 0, expected: 2 }, // 5
      { days: 4, initialTimer: 0, expected: 2 }, // 4
      { days: 5, initialTimer: 0, expected: 2 }, // 3
      { days: 6, initialTimer: 0, expected: 2 }, // 2
      { days: 7, initialTimer: 0, expected: 2 }, // 1
      { days: 8, initialTimer: 0, expected: 3 }, // 0 -> +1
      { days: 9, initialTimer: 0, expected: 3 }, // 6
      { days: 10, initialTimer: 0, expected: 3 }, // 5
      { days: 11, initialTimer: 0, expected: 3 }, // 4
      { days: 12, initialTimer: 0, expected: 3 }, // 3
      { days: 13, initialTimer: 0, expected: 3 }, // 2
      { days: 14, initialTimer: 0, expected: 3 }, // 1
      { days: 15, initialTimer: 0, expected: 4 }, // 0 -> +1
      // initial timer = 1
      { days: 0, initialTimer: 1, expected: 1 },
      { days: 1, initialTimer: 1, expected: 1 }, // 1
      { days: 2, initialTimer: 1, expected: 2 }, // 0 -> +1
      { days: 3, initialTimer: 1, expected: 2 }, // 6
      { days: 4, initialTimer: 1, expected: 2 }, // 5
      { days: 5, initialTimer: 1, expected: 2 }, // 4
      { days: 6, initialTimer: 1, expected: 2 }, // 3
      { days: 7, initialTimer: 1, expected: 2 }, // 2
      { days: 8, initialTimer: 1, expected: 2 }, // 1
      { days: 9, initialTimer: 1, expected: 3 }, // 0 -> +1
      { days: 10, initialTimer: 1, expected: 3 }, // 6
      { days: 11, initialTimer: 1, expected: 3 }, // 5
      { days: 12, initialTimer: 1, expected: 3 }, // 4
      { days: 13, initialTimer: 1, expected: 3 }, // 3
      { days: 14, initialTimer: 1, expected: 3 }, // 2
      { days: 15, initialTimer: 1, expected: 3 }, // 1
      { days: 16, initialTimer: 1, expected: 4 }, // 0 -> +1
    ])("%s", ({ days, initialTimer, expected }) => {
      expect(simulateOneFish(days, initialTimer, Infinity)).toEqual(expected);
    });
  });
  describe("with 0-day birth delay", () => {
    it.each([
      { days: 0, initialTimer: 0, expected: 1 },
      { days: 1, initialTimer: 0, expected: 2 }, // 0 -> +1
      { days: 2, initialTimer: 0, expected: 2 }, // 6
      { days: 3, initialTimer: 0, expected: 2 }, // 5
      { days: 4, initialTimer: 0, expected: 2 }, // 4
      { days: 5, initialTimer: 0, expected: 2 }, // 3
      { days: 6, initialTimer: 0, expected: 2 }, // 2
      { days: 7, initialTimer: 0, expected: 2 }, // 1
      { days: 8, initialTimer: 0, expected: 4 }, // 0 -> +2
      { days: 9, initialTimer: 0, expected: 4 }, // 6
      { days: 10, initialTimer: 0, expected: 4 }, // 5
      { days: 11, initialTimer: 0, expected: 4 }, // 4
      { days: 12, initialTimer: 0, expected: 4 }, // 3
      { days: 13, initialTimer: 0, expected: 4 }, // 2
      { days: 14, initialTimer: 0, expected: 4 }, // 1
      { days: 15, initialTimer: 0, expected: 8 }, // 0 -> +4
      // initial timer = 1
      { days: 0, initialTimer: 1, expected: 1 },
      { days: 1, initialTimer: 1, expected: 1 }, // 1
      { days: 2, initialTimer: 1, expected: 2 }, // 0 -> +1
      { days: 3, initialTimer: 1, expected: 2 }, // 6
      { days: 4, initialTimer: 1, expected: 2 }, // 5
      { days: 5, initialTimer: 1, expected: 2 }, // 4
      { days: 6, initialTimer: 1, expected: 2 }, // 3
      { days: 7, initialTimer: 1, expected: 2 }, // 2
      { days: 8, initialTimer: 1, expected: 2 }, // 1
      { days: 9, initialTimer: 1, expected: 4 }, // 0 -> +2
      { days: 10, initialTimer: 1, expected: 4 }, // 6
      { days: 11, initialTimer: 1, expected: 4 }, // 5
      { days: 12, initialTimer: 1, expected: 4 }, // 4
      { days: 13, initialTimer: 1, expected: 4 }, // 3
      { days: 14, initialTimer: 1, expected: 4 }, // 2
      { days: 15, initialTimer: 1, expected: 4 }, // 1
      { days: 16, initialTimer: 1, expected: 8 }, // 0 -> +4
    ])("%s", ({ days, initialTimer, expected }) => {
      expect(simulateOneFish(days, initialTimer, 0)).toEqual(expected);
    });
  });
  describe("with 1-day birth delay", () => {
    it.each([
      { days: 0, initialTimer: 0, expected: 1 },
      { days: 1, initialTimer: 0, expected: 2 }, // 0
      { days: 2, initialTimer: 0, expected: 2 }, // 6 7
      { days: 3, initialTimer: 0, expected: 2 }, // 5 6
      { days: 4, initialTimer: 0, expected: 2 }, // 4 5
      { days: 5, initialTimer: 0, expected: 2 }, // 3 4
      { days: 6, initialTimer: 0, expected: 2 }, // 2 3
      { days: 7, initialTimer: 0, expected: 2 }, // 1 2
      { days: 8, initialTimer: 0, expected: 3 }, // 0 1
      { days: 9, initialTimer: 0, expected: 4 }, // 6 0 7
      { days: 10, initialTimer: 0, expected: 4 }, // 5 6 6 7
      { days: 11, initialTimer: 0, expected: 4 }, // 4 5 5 6
      { days: 12, initialTimer: 0, expected: 4 }, // 3 4 4 5
      { days: 13, initialTimer: 0, expected: 4 }, // 2 3 3 4
      { days: 14, initialTimer: 0, expected: 4 }, // 1 2 2 3
      { days: 15, initialTimer: 0, expected: 5 }, // 0 1 1 2
      { days: 16, initialTimer: 0, expected: 7 }, // 6 0 0 1 7
      { days: 17, initialTimer: 0, expected: 8 }, // 5 6 6 0 6 7 7
      // initial timer = 1
      { days: 0, initialTimer: 1, expected: 1 },
      { days: 1, initialTimer: 1, expected: 1 },
      { days: 2, initialTimer: 1, expected: 2 },
      { days: 3, initialTimer: 1, expected: 2 },
      { days: 4, initialTimer: 1, expected: 2 },
      { days: 5, initialTimer: 1, expected: 2 },
      { days: 6, initialTimer: 1, expected: 2 },
      { days: 7, initialTimer: 1, expected: 2 },
      { days: 8, initialTimer: 1, expected: 2 },
      { days: 9, initialTimer: 1, expected: 3 },
      { days: 10, initialTimer: 1, expected: 4 },
      { days: 11, initialTimer: 1, expected: 4 },
      { days: 12, initialTimer: 1, expected: 4 },
      { days: 13, initialTimer: 1, expected: 4 },
      { days: 14, initialTimer: 1, expected: 4 },
      { days: 15, initialTimer: 1, expected: 4 },
      { days: 16, initialTimer: 1, expected: 5 },
      { days: 17, initialTimer: 1, expected: 7 },
    ])("%s", ({ days, initialTimer, expected }) => {
      expect(simulateOneFish(days, initialTimer, 1)).toEqual(expected);
    });
  });
});

describe("solveFirst", () => {
  it("works for example", () => {
    const input = `
3,4,3,1,2
`;
    expect(solveFirst(input)).toEqual(5934);
  });
});

describe("solveSecond", () => {
  it("works for example", () => {
    const input = `
3,4,3,1,2
    `;
    expect(solveSecond(input)).toEqual(26984457539);
  });
});
