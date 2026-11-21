import { describe, expect, it } from "vitest";
import { OPEN_THRESHOLD, SHADE_HEIGHT, shadeProgress, shouldOpenShade } from "../components/shade";
import { experience, hobbies, profile, projects, skills } from "../content";

describe("content", () => {
  it("has the three views' content", () => {
    expect(profile.name).toBeTruthy();
    expect(experience.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
    expect(hobbies.length).toBeGreaterThan(0);
  });

  it("uses unique project names and safe links", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
    for (const link of projects.flatMap((p) => p.links)) {
      expect(link.href).toMatch(/^https:\/\//);
    }
    expect(profile.github).toMatch(/^https:\/\/github\.com\//);
  });

  it("shows mostly mobile work", () => {
    const mobile = projects.filter((p) => p.kind === "Mobile").length;
    expect(mobile).toBeGreaterThan(projects.length / 2);
  });
});

describe("notification shade", () => {
  it("maps the pull distance to progress between 0 and 1", () => {
    expect(shadeProgress(-20)).toBe(0);
    expect(shadeProgress(SHADE_HEIGHT / 2)).toBe(0.5);
    expect(shadeProgress(SHADE_HEIGHT * 2)).toBe(1);
  });

  it("opens only after a deliberate pull", () => {
    expect(shouldOpenShade(OPEN_THRESHOLD - 1)).toBe(false);
    expect(shouldOpenShade(OPEN_THRESHOLD)).toBe(true);
  });
});
