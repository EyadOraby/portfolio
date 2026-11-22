import { describe, expect, it } from "vitest";
import { readPieces } from "../components/CollectionShowcase";
import { cars } from "../data/cars";
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
  it("points every car at a real photo with a full credit", () => {
    const files = Object.keys(import.meta.glob("../../public/cars/*.webp")).map(
      (f) => f.replace("../../public", ""),
    );
    expect(new Set(cars.map((c) => c.id)).size).toBe(cars.length);
    for (const car of cars) {
      expect(files).toContain(car.image);
      expect(car.credit.artist).not.toBe("");
      expect(car.credit.license).toMatch(/^CC BY-SA /);
      expect(car.credit.licenseUrl).toMatch(
        /^https:\/\/creativecommons\.org\//,
      );
      expect(car.credit.source).toMatch(
        /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
      );
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

describe("Arabic", () => {
  it("translates every hobby and interest, with a value for every tile", async () => {
    const { hobbies, interests } = await import("../content");
    const { pastimesAr, labelsAr } = await import("../content.ar");
    for (const p of [...hobbies, ...interests]) {
      const ar = pastimesAr[p.slug];
      expect(ar, p.slug).toBeDefined();
      expect(ar.tiles).toHaveLength(p.tiles.length);
      expect(ar.notes.length).toBeGreaterThan(0);
      for (const tile of p.tiles)
        expect(labelsAr[tile.label], tile.label).toBeDefined();
    }
  });
});
