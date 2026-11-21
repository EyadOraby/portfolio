import { describe, expect, it } from "vitest";
import { experience, hobbies, metrics, principles, profile, projects, skills } from "../content";
import { filterCommands, holdProgress, parseHash, wrapIndex } from "../lib";

describe("content", () => {
  it("has the three views' content", () => {
    expect(profile.name).toBeTruthy();
    expect(experience.length).toBeGreaterThan(0);
    expect(principles.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
    expect(hobbies.length).toBeGreaterThan(0);
    expect(metrics.every((m) => m.value > 0)).toBe(true);
  });

  it("uses unique, URL-safe slugs and safe links", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
    for (const link of projects.flatMap((p) => p.links)) {
      expect(link.href).toMatch(/^https:\/\//);
    }
    expect(profile.github).toMatch(/^https:\/\/github\.com\//);
  });

  it("points every screenshot at a real file with alt text", () => {
    const files = Object.keys(import.meta.glob("../../public/shots/*.png")).map((f) =>
      f.replace("../../public", ""),
    );
    for (const shot of projects.flatMap((p) => p.shots)) {
      expect(files).toContain(shot.src);
      expect(shot.alt.length).toBeGreaterThan(10);
    }
  });

  it("never links the client's private site", () => {
    const hrefs = projects.flatMap((p) => p.links.map((l) => l.href));
    expect(hrefs.some((h) => h.includes("youssef"))).toBe(false);
  });

  it("shows mostly mobile work", () => {
    const mobile = projects.filter((p) => p.kind === "Mobile").length;
    expect(mobile).toBeGreaterThan(projects.length / 2);
  });
});

describe("parseHash", () => {
  it("reads the view and an optional anchor", () => {
    expect(parseHash("")).toEqual({ view: "home", anchor: null });
    expect(parseHash("#work")).toEqual({ view: "work", anchor: null });
    expect(parseHash("#projects/mini-shop")).toEqual({ view: "projects", anchor: "mini-shop" });
    expect(parseHash("#/off-duty")).toEqual({ view: "off-duty", anchor: null });
  });

  it("falls back to home for unknown views", () => {
    expect(parseHash("#nope/mini-shop")).toEqual({ view: "home", anchor: null });
  });
});

describe("holdProgress", () => {
  it("clamps between 0 and 1", () => {
    expect(holdProgress(-5, 1000)).toBe(0);
    expect(holdProgress(500, 1000)).toBe(0.5);
    expect(holdProgress(5000, 1000)).toBe(1);
    expect(holdProgress(10, 0)).toBe(1);
  });
});

describe("wrapIndex", () => {
  it("wraps both ways", () => {
    expect(wrapIndex(3, 3)).toBe(0);
    expect(wrapIndex(-1, 3)).toBe(2);
    expect(wrapIndex(4, 0)).toBe(0);
  });
});

describe("filterCommands", () => {
  const commands = [
    { id: "1", label: "Projects", hint: "Case studies" },
    { id: "2", label: "Mini Shop", hint: "Project", keywords: "flutter bloc" },
    { id: "3", label: "Open GitHub", hint: "Link", keywords: "code" },
  ];

  it("returns everything for an empty query", () => {
    expect(filterCommands(commands, "  ")).toHaveLength(3);
  });

  it("matches every word across label, hint and keywords", () => {
    expect(filterCommands(commands, "flutter shop").map((c) => c.id)).toEqual(["2"]);
    expect(filterCommands(commands, "zzz")).toEqual([]);
  });

  it("ranks label prefixes first", () => {
    expect(filterCommands(commands, "pro").map((c) => c.id)).toEqual(["1", "2"]);
  });
});
