/**
 * A tiny 2D physics step for the toolbox playground: circles with gravity,
 * walls, a floor and circle-to-circle collisions. Pure, so it can be tested.
 */

export type Body = { x: number; y: number; vx: number; vy: number; r: number };

export type World = {
  width: number;
  height: number;
  gravity: number;
  /** Bounciness against walls and other bodies, 0 to 1. */
  restitution: number;
  /** Velocity kept per second of air time (simple drag). */
  drag: number;
};

export const defaultWorld = (width: number, height: number): World => ({
  width,
  height,
  gravity: 1600,
  restitution: 0.42,
  drag: 0.6,
});

/** Advances every body by `dt` seconds (clamped to keep things stable). */
export function step(bodies: Body[], world: World, dt: number, skip?: (index: number) => boolean) {
  const t = Math.min(dt, 1 / 30);
  const keep = Math.pow(world.drag, t);

  bodies.forEach((b, i) => {
    if (skip?.(i)) return;
    b.vy += world.gravity * t;
    b.vx *= keep;
    b.vy *= keep;
    b.x += b.vx * t;
    b.y += b.vy * t;
  });

  // A few relaxation passes keep stacks from sinking into each other.
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) collide(bodies[i], bodies[j], world.restitution, skip?.(i), skip?.(j));
    }
    bodies.forEach((b, i) => {
      if (!skip?.(i)) contain(b, world);
    });
  }
}

function contain(b: Body, world: World) {
  if (b.x - b.r < 0) {
    b.x = b.r;
    b.vx = Math.abs(b.vx) * world.restitution;
  } else if (b.x + b.r > world.width) {
    b.x = world.width - b.r;
    b.vx = -Math.abs(b.vx) * world.restitution;
  }
  if (b.y + b.r > world.height) {
    b.y = world.height - b.r;
    b.vy = -Math.abs(b.vy) * world.restitution;
    // Rolling friction on the floor, and settle small bounces.
    b.vx *= 0.92;
    if (Math.abs(b.vy) < 40) b.vy = 0;
  }
}

function collide(a: Body, b: Body, restitution: number, aPinned = false, bPinned = false) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const min = a.r + b.r;
  const distSq = dx * dx + dy * dy;
  if (distSq >= min * min) return;
  const dist = Math.sqrt(distSq) || 0.01;
  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = min - dist;

  // Push apart; a pinned (dragged) body does not move.
  const aShare = aPinned ? 0 : bPinned ? 1 : 0.5;
  const bShare = bPinned ? 0 : aPinned ? 1 : 0.5;
  a.x -= nx * overlap * aShare;
  a.y -= ny * overlap * aShare;
  b.x += nx * overlap * bShare;
  b.y += ny * overlap * bShare;

  // Exchange momentum along the contact normal.
  const relative = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (relative > 0) return;
  const impulse = (-(1 + restitution) * relative) / ((aPinned ? 0 : 1) + (bPinned ? 0 : 1) || 1);
  if (!aPinned) {
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
  }
  if (!bPinned) {
    b.vx += impulse * nx;
    b.vy += impulse * ny;
  }
}

/** Pushes bodies away from a point, stronger the closer they are. */
export function repel(bodies: Body[], x: number, y: number, radius: number, strength: number) {
  for (const b of bodies) {
    const dx = b.x - x;
    const dy = b.y - y;
    const d = Math.hypot(dx, dy);
    if (d === 0 || d > radius + b.r) continue;
    const f = (1 - d / (radius + b.r)) * strength;
    b.vx += (dx / d) * f;
    b.vy += (dy / d) * f;
  }
}

/** True once nothing is moving enough to be worth animating. */
export function isAtRest(bodies: Body[], threshold = 6): boolean {
  return bodies.every((b) => Math.abs(b.vx) < threshold && Math.abs(b.vy) < threshold);
}

/** Index of the body under a point, or -1. */
export function hitTest(bodies: Body[], x: number, y: number): number {
  for (let i = bodies.length - 1; i >= 0; i--) {
    const b = bodies[i];
    if (Math.hypot(b.x - x, b.y - y) <= b.r) return i;
  }
  return -1;
}
