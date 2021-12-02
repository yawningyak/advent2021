import { countIncreases } from "../main";

describe("countIncreases", () => {
  describe("given window size = 1", () => {
    it.each([
      [[], 0],
      [[1], 0],
      [[1, 2], 1],
      [[1, 2, 2, 3], 2],
      [[1, 2, 3, 2], 2],
    ])(`%s`, (values, expected) => {
      expect(countIncreases(values, 1)).toEqual(expected);
    });
  });

  describe("given window size = 3", () => {
    it.each([
      [[], 0],
      [[1], 0],
      [[1, 2], 0],
      [[1, 2, 3], 0],
      [[1, 2, 2, 1], 0],
      [[1, 2, 3, 4], 1],
    ])(`%s`, (values, expected) => {
      expect(countIncreases(values, 3)).toEqual(expected);
    });
  });
});
