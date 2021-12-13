import { bit } from "../bitops";
import { Axis, createGrid, getXLimit, getYLimit, invertGrid } from "../grid";

describe("createGrid", () => {
  it("1 x 1", () => {
    const m = createGrid<bit>(1, 1, 0);
    expect(m[0][0]).toBe(0);
    m[0][0] = 1;
    expect(m[0][0]).toBe(1);
  });
  it("2 (rows) x 1 (cols)", () => {
    const m = createGrid<bit>(1, 2, 0);
    expect(m[0][0]).toBe(0);
    expect(m[0][1]).toBe(0);
    expect(m[1]?.[0]).toBe(undefined);
    m[0][0] = 1;
    expect(m[0][0]).toBe(1);
    expect(m[0][1]).toBe(0);
    m[0][1] = 1;
    expect(m[0][0]).toBe(1);
    expect(m[0][1]).toBe(1);
  });
  it("1 (rows) x 2 (cols)", () => {
    const m = createGrid<bit>(2, 1, 0);
    expect(m[0][0]).toBe(0);
    expect(m[1][0]).toBe(0);
    expect(m[0][1]).toBe(undefined);
    m[0][0] = 1;
    expect(m[0][0]).toBe(1);
    expect(m[1][0]).toBe(0);
    m[1][0] = 1;
    expect(m[0][0]).toBe(1);
    expect(m[1][0]).toBe(1);
  });
});

describe("invertGrid", () => {
  describe("1 x 1", () => {
    let original: bit[][];

    beforeEach(() => {
      original = createGrid<bit>(1, 1, 0);
      original[0][0] = 1;
    });

    it("y-axis", () => {
      const inverted = invertGrid<bit>(original, Axis.Y, 0);
      expect(getYLimit(inverted)).toBe(1);
      expect(getXLimit(inverted)).toBe(1);
      expect(inverted[0][0]).toBe(1);
    });

    it("x-axis", () => {
      const inverted = invertGrid<bit>(original, Axis.X, 0);
      expect(getYLimit(inverted)).toBe(1);
      expect(getXLimit(inverted)).toBe(1);
      expect(inverted[0][0]).toBe(1);
    });
  });

  describe("2 x 2", () => {
    let original: bit[][];

    beforeEach(() => {
      original = createGrid<bit>(2, 2, 0);
      original[0][0] = 1;
    });

    it("y-axis", () => {
      const inverted = invertGrid<bit>(original, Axis.Y, 0);
      expect(getYLimit(inverted)).toBe(2);
      expect(getXLimit(inverted)).toBe(2);
      expect(inverted[0][0]).toBe(0);
      expect(inverted[0][1]).toBe(1);
      expect(inverted[1][0]).toBe(0);
      expect(inverted[1][1]).toBe(0);
    });

    it("x-axis", () => {
      const inverted = invertGrid<bit>(original, Axis.X, 0);
      expect(getYLimit(inverted)).toBe(2);
      expect(getXLimit(inverted)).toBe(2);
      expect(inverted[0][0]).toBe(0);
      expect(inverted[0][1]).toBe(0);
      expect(inverted[1][0]).toBe(1);
      expect(inverted[1][1]).toBe(0);
    });
  });

  describe("2 (rows) x 3 (cols)", () => {
    let original: bit[][];

    beforeEach(() => {
      original = createGrid<bit>(3, 2, 0);
      original[0][0] = 1;
      original[1][1] = 1;
    });

    it("y-axis", () => {
      const inverted = invertGrid<bit>(original, Axis.Y, 0);
      expect(getYLimit(inverted)).toBe(2);
      expect(getXLimit(inverted)).toBe(3);
      expect(inverted[0][0]).toBe(0);
      expect(inverted[0][1]).toBe(1);
      expect(inverted[1][0]).toBe(1);
      expect(inverted[1][1]).toBe(0);
      expect(inverted[2][0]).toBe(0);
      expect(inverted[2][1]).toBe(0);
    });

    it("x-axis", () => {
      const inverted = invertGrid<bit>(original, Axis.X, 0);
      expect(getYLimit(inverted)).toBe(2);
      expect(getXLimit(inverted)).toBe(3);
      expect(inverted[0][0]).toBe(0);
      expect(inverted[0][1]).toBe(0);
      expect(inverted[1][0]).toBe(0);
      expect(inverted[1][1]).toBe(1);
      expect(inverted[2][0]).toBe(1);
      expect(inverted[2][1]).toBe(0);
    });
  });
});
