/**
 * Builds a grid mesh for the 3D portrait: a plane pushed forward by a depth map.
 * Positions, normals and texture coordinates are interleaved per vertex.
 */
export type Mesh = {
  /** x, y, z, nx, ny, nz, u, v per vertex */
  vertices: Float32Array;
  indices: Uint16Array;
};

export const STRIDE = 8;

export function buildMesh(
  depth: { data: ArrayLike<number>; width: number; height: number },
  cols: number,
  rows: number,
  relief: number,
): Mesh {
  const aspect = depth.height / depth.width;
  const w = 2;
  const h = 2 * aspect;
  const z = new Float32Array(cols * rows);

  // Bilinear sample of the red channel (the depth map is grayscale).
  const sample = (u: number, v: number) => {
    const x = u * (depth.width - 1);
    const y = v * (depth.height - 1);
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, depth.width - 1);
    const y1 = Math.min(y0 + 1, depth.height - 1);
    const fx = x - x0;
    const fy = y - y0;
    const at = (px: number, py: number) =>
      depth.data[(py * depth.width + px) * 4] / 255;
    const top = at(x0, y0) * (1 - fx) + at(x1, y0) * fx;
    const bottom = at(x0, y1) * (1 - fx) + at(x1, y1) * fx;
    return top * (1 - fy) + bottom * fy;
  };

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      z[r * cols + c] = sample(c / (cols - 1), r / (rows - 1)) * relief;

  const vertices = new Float32Array(cols * rows * STRIDE);
  const dx = w / (cols - 1);
  const dy = h / (rows - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const u = c / (cols - 1);
      const v = r / (rows - 1);
      // Normal from the slope of the surface (central differences).
      const zl = z[r * cols + Math.max(c - 1, 0)];
      const zr = z[r * cols + Math.min(c + 1, cols - 1)];
      const zu = z[Math.max(r - 1, 0) * cols + c];
      const zd = z[Math.min(r + 1, rows - 1) * cols + c];
      let nx = -(zr - zl) / (2 * dx);
      let ny = (zd - zu) / (2 * dy);
      let nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      vertices.set(
        [u * w - w / 2, h / 2 - v * h, z[i] - relief / 2, nx, ny, nz, u, v],
        i * STRIDE,
      );
    }
  }

  const indices = new Uint16Array((cols - 1) * (rows - 1) * 6);
  let k = 0;
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c;
      const b = a + 1;
      const d = a + cols;
      const e = d + 1;
      indices.set([a, d, b, b, d, e], k);
      k += 6;
    }
  }
  return { vertices, indices };
}
