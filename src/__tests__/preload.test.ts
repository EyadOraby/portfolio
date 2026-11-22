import { describe, expect, it } from "vitest";
import indexHtml from "../../index.html?raw";
import { shotSources } from "../components/Frame";
import { projects } from "../content";

describe("Projects preload in index.html", () => {
  it("matches the first case study's first screenshot", () => {
    const shot = projects[0].shots[0];
    const { srcSet, sizes } = shotSources(shot);
    const attr = (name: string) =>
      indexHtml.match(new RegExp(`"${name}", "([^"]+)"`))?.[1];
    expect(indexHtml).toContain(`l.href = "${shot.src}";`);
    expect(attr("imagesrcset")).toBe(srcSet);
    expect(attr("imagesizes")).toBe(sizes);
  });
});
