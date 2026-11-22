import { describe, expect, it } from "vitest";
import { STRIDE, buildMesh } from "../components/portraitMesh";

// A 2x2 RGBA depth map: left column far (0), right column near (255).
const depth = {
  width: 2,
  height: 2,
  data: [0, 0, 0, 255, 255, 0, 0, 255, 0, 0, 0, 255, 255, 0, 0, 255],
};

describe("portrait mesh", () => {
  const mesh = buildMesh(depth, 4, 4, 0.4);

  it("makes one vertex per grid point and two triangles per cell", () => {
    expect(mesh.vertices.length).toBe(16 * STRIDE);
    expect(mesh.indices.length).toBe(3 * 3 * 6);
    expect(Math.max(...mesh.indices)).toBe(15);
  });

  it("pushes the near side forward and centres the relief", () => {
    const z = (i: number) => mesh.vertices[i * STRIDE + 2];
    expect(z(0)).toBeCloseTo(-0.2);
    expect(z(3)).toBeCloseTo(0.2);
  });

  it("tilts normals away from the slope", () => {
    const nx = mesh.vertices[1 * STRIDE + 3];
    expect(nx).toBeLessThan(0);
  });
});
