import { describe, expect, it } from "vitest";
import { readPieces } from "../components/CollectionShowcase";
import { carModels, profilePath } from "../data/carModels";
import { home, regions, visited } from "../data/travel";

describe("travel", () => {
  it("lists 29 places with unique ids in known regions", () => {
    expect(visited).toHaveLength(29);
    expect(new Set(visited.map((p) => p.id)).size).toBe(29);
    for (const p of visited) {
      expect(regions).toContain(p.region);
      expect(Math.abs(p.lon)).toBeLessThanOrEqual(180);
      expect(Math.abs(p.lat)).toBeLessThanOrEqual(90);
    }
    expect(visited.find((p) => p.id === home.id)).toBeUndefined();
  });
});

describe("cars", () => {
  it("draws every car with both wheel arches inside its length", () => {
    for (const car of carModels) {
      const arches = car.profile.filter((op) => op[0] === "ARCH");
      expect(arches.map((op) => op[1]).sort((a, b) => a - b)).toEqual(
        [...car.wheels].sort((a, b) => a - b),
      );
      for (const x of car.wheels) {
        expect(x).toBeGreaterThan(car.wheelRadius);
        expect(x).toBeLessThan(car.length - car.wheelRadius);
      }
      expect(profilePath(car)).toMatch(/^M.*Z$/);
      expect(car.paints.length).toBeGreaterThan(0);
    }
  });
});

describe("collection", () => {
  it("keeps well-formed pieces and drops anything else", () => {
    const pieces = readPieces({
      entries: [
        {
          id: "a",
          kind: "banknote",
          country: "Spain",
          denomination: "100 pesetas",
          thumb: "data:image/jpeg;base64,AAA",
        },
        { id: "b", kind: "coin", thumb: "javascript:alert(1)" },
        { kind: "coin" },
        "nope",
      ],
    });
    expect(pieces.map((p) => p.id)).toEqual(["a", "b"]);
    expect(pieces[0].thumb).toMatch(/^data:image\/jpeg/);
    expect(pieces[1].thumb).toBeUndefined();
    expect(readPieces(null)).toEqual([]);
    expect(readPieces({ entries: "x" })).toEqual([]);
  });
});
