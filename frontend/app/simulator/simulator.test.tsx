import { describe, it, expect } from "vitest";
import { rotateLeft, rotateRight, move } from "./logic";

// Tests for the simulator than run through the logic functions

describe("rotateLeft", () => {
  it("rotates NORTH, WEST, SOUTH, EAST, NORTH", () => {
    expect(rotateLeft("NORTH")).toBe("WEST");
    expect(rotateLeft("WEST")).toBe("SOUTH");
    expect(rotateLeft("SOUTH")).toBe("EAST");
    expect(rotateLeft("EAST")).toBe("NORTH");
  });
});

describe("rotateRight", () => {
  it("rotates NORTH, EAST, SOUTH, WEST, NORTH", () => {
    expect(rotateRight("NORTH")).toBe("EAST");
    expect(rotateRight("EAST")).toBe("SOUTH");
    expect(rotateRight("SOUTH")).toBe("WEST");
    expect(rotateRight("WEST")).toBe("NORTH");
  });
});

describe("moveForward", () => {
  it("moves in facing direction", () => {
    expect(move({ x: 2, y: 2 }, "NORTH")).toEqual({ x: 2, y: 3 });
    expect(move({ x: 2, y: 2 }, "SOUTH")).toEqual({ x: 2, y: 1 });
    expect(move({ x: 2, y: 2 }, "EAST")).toEqual({ x: 3, y: 2 });
    expect(move({ x: 2, y: 2 }, "WEST")).toEqual({ x: 1, y: 2 });
  });

  it("does not move past boundaries", () => {
    expect(move({ x: 0, y: 0 }, "WEST")).toEqual({ x: 0, y: 0 });
    expect(move({ x: 0, y: 0 }, "SOUTH")).toEqual({ x: 0, y: 0 });
    expect(move({ x: 4, y: 4 }, "EAST")).toEqual({ x: 4, y: 4 });
    expect(move({ x: 4, y: 4 }, "NORTH")).toEqual({ x: 4, y: 4 });
  });
});