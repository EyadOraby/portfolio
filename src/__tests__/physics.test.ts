import { describe, expect, it } from "vitest";
import { defaultWorld, hitTest, isAtRest, repel, step, type Body } from "../physics";

const ball = (x: number, y: number, r = 10): Body => ({ x, y, vx: 0, vy: 0, r });

function simulate(bodies: Body[], seconds: number, width = 200, height = 100) {
  const world = defaultWorld(width, height);
  for (let t = 0; t < seconds; t += 1 / 60) step(bodies, world, 1 / 60);
}

describe("physics", () => {
  it("drops bodies onto the floor and lets them settle", () => {
    const b = ball(50, -40);
    simulate([b], 3);
    expect(b.y).toBeCloseTo(90, 0);
    expect(isAtRest([b])).toBe(true);
  });

  it("keeps bodies inside the walls", () => {
    const b = { ...ball(100, 50), vx: 5000 };
    simulate([b], 1);
    expect(b.x).toBeLessThanOrEqual(190);
    expect(b.x).toBeGreaterThanOrEqual(10);
  });

  it("separates overlapping bodies", () => {
    const a = ball(100, 90);
    const b = ball(102, 90);
    simulate([a, b], 1);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThanOrEqual(19.5);
  });

  it("does not move a pinned (dragged) body", () => {
    const pinned = ball(100, 20);
    const other = ball(100, 5);
    step([pinned, other], defaultWorld(200, 100), 1 / 60, (i) => i === 0);
    expect(pinned).toMatchObject({ x: 100, y: 20 });
  });

  it("pushes nearby bodies away from the cursor", () => {
    const b = ball(110, 50);
    repel([b], 100, 50, 40, 500);
    expect(b.vx).toBeGreaterThan(0);
    const far = ball(190, 50);
    repel([far], 100, 50, 40, 500);
    expect(far.vx).toBe(0);
  });

  it("finds the body under a point", () => {
    const bodies = [ball(20, 20), ball(60, 20)];
    expect(hitTest(bodies, 62, 18)).toBe(1);
    expect(hitTest(bodies, 150, 80)).toBe(-1);
  });
});
