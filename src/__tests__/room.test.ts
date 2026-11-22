import { describe, expect, it } from "vitest";
import { spots, stops } from "../components/Room";
import { pastimes } from "../content";

describe("Explore the room", () => {
  it("has six corners, each framed inside the room at 16:9", () => {
    const list = stops();
    expect(list).toHaveLength(6);
    for (const s of list) {
      const [x, y, w, h] = s.view;
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x + w).toBeLessThanOrEqual(1600);
      expect(y + h).toBeLessThanOrEqual(900);
      expect(w / h).toBeCloseTo(16 / 9, 1);
    }
  });

  it("only links to interests that have a page", () => {
    const slugs = new Set(pastimes.map((p) => p.slug));
    for (const s of stops())
      for (const link of s.links) expect(slugs.has(link)).toBe(true);
  });

  it("has a place for Eyad at every corner and in the whole-room view", () => {
    for (const id of ["all", ...stops().map((s) => s.id)])
      expect(spots[id]).toBeDefined();
  });
});
