import { useEffect, useRef } from "react";
import {
  siAndroid,
  siApple,
  siDart,
  siFirebase,
  siFlutter,
  siGit,
  siGithubactions,
  siNextdotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
} from "simple-icons";
import { defaultWorld, hitTest, isAtRest, repel, step, type Body } from "../physics";
import { useReducedMotion } from "./hooks";

type Icon = { title: string; hex: string; path: string };

const ICONS: Icon[] = [
  siFlutter,
  siDart,
  siFirebase,
  siAndroid,
  siApple,
  siReact,
  siNextdotjs,
  siTypescript,
  siPostgresql,
  siPrisma,
  siTailwindcss,
  siVercel,
  siGithubactions,
  siVitest,
  siVite,
  siGit,
];

/** Dark brand colours would vanish on the dark card, so they render white. */
function readable(hex: string): string {
  const n = parseInt(hex, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.35 ? "#eef1f7" : `#${hex}`;
}

type Ball = Body & { icon: Icon; path: Path2D; color: string; dropAt: number };

/**
 * The toolbox as a physics toy: the logos of the stack drop in, pile up and
 * can be pushed with the cursor or picked up and thrown.
 */
export function Playground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let balls: Ball[] = [];
    let raf = 0;
    let last = 0;
    /** When the logos started dropping in. */
    let startedAt = 0;
    let visible = false;
    let hover = -1;
    let drag: { index: number; dx: number; dy: number; vx: number; vy: number } | null = null;
    let pointer: { x: number; y: number; t: number } | null = null;

    const radius = () => Math.max(18, Math.min(32, width / 21));

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = radius();
      if (balls.length === 0) {
        balls = ICONS.map((icon, i) => ({
          icon,
          path: new Path2D(icon.path),
          color: readable(icon.hex),
          r,
          x: r + ((i * 0.618 * width) % Math.max(1, width - 2 * r)),
          y: -r - (i % 4) * r * 2.2,
          vx: (Math.random() - 0.5) * 120,
          vy: 0,
          dropAt: i * 90,
        }));
        if (reduced) settleStatic();
      } else {
        for (const b of balls) {
          b.r = r;
          b.x = Math.min(Math.max(b.x, r), width - r);
          b.y = Math.min(b.y, height - r);
        }
      }
      draw();
    };

    // Reduced motion: lay the logos out in a resting pile instead.
    const settleStatic = () => {
      const r = radius();
      const perRow = Math.max(1, Math.floor(width / (2 * r + 6)));
      balls.forEach((b, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        b.x = r + 3 + col * (2 * r + 6) + (row % 2) * r;
        b.y = height - r - row * (2 * r - 2);
        b.vx = b.vy = 0;
        b.dropAt = 0;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      balls.forEach((b, i) => {
        if (b.y < -b.r * 2) return;
        const lifted = drag?.index === i || hover === i;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.fillStyle = lifted ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = lifted ? `${b.color}aa` : "rgba(255,255,255,0.10)";
        ctx.stroke();
        const s = (b.r * 1.05) / 24;
        ctx.translate(-12 * s, -12 * s);
        ctx.scale(s, s);
        ctx.fillStyle = b.color;
        ctx.fill(b.path);
        ctx.restore();
      });
      const label = drag ? balls[drag.index] : hover >= 0 ? balls[hover] : null;
      if (label) {
        ctx.font = "600 12px Inter, system-ui, sans-serif";
        const text = label.icon.title;
        const w = ctx.measureText(text).width + 16;
        const x = Math.min(Math.max(label.x - w / 2, 4), width - w - 4);
        const y = Math.max(label.y - label.r - 30, 4);
        ctx.fillStyle = "rgba(10,12,18,0.92)";
        ctx.beginPath();
        ctx.roundRect(x, y, w, 22, 11);
        ctx.fill();
        ctx.fillStyle = "#eef1f7";
        ctx.fillText(text, x + 8, y + 15);
      }
    };

    const frame = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      const elapsed = now - startedAt;
      const world = defaultWorld(width, height);
      const active = balls.filter((b) => b.dropAt <= elapsed);
      if (drag) {
        const b = balls[drag.index];
        b.vx = drag.vx;
        b.vy = drag.vy;
      }
      step(active, world, dt, (i) => drag !== null && active[i] === balls[drag.index]);
      draw();
      const allIn = active.length === balls.length;
      if (!visible || (allIn && !drag && isAtRest(balls))) {
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (reduced || raf || !visible) return;
      if (!startedAt) startedAt = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      const now = performance.now();
      if (drag) {
        const b = balls[drag.index];
        const dt = Math.max(1, now - (pointer?.t ?? now)) / 1000;
        const nx = Math.min(Math.max(p.x - drag.dx, b.r), width - b.r);
        const ny = Math.min(Math.max(p.y - drag.dy, b.r), height - b.r);
        drag.vx = (nx - b.x) / dt;
        drag.vy = (ny - b.y) / dt;
        b.x = nx;
        b.y = ny;
      } else if (e.pointerType === "mouse" && pointer) {
        const speed = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        repel(balls, p.x, p.y, 46, Math.min(900, 60 + speed * 14));
      }
      hover = drag ? drag.index : hitTest(balls, p.x, p.y);
      canvas.style.cursor = drag ? "grabbing" : hover >= 0 ? "grab" : "default";
      pointer = { ...p, t: now };
      if (reduced) draw();
      wake();
    };

    const onDown = (e: PointerEvent) => {
      const p = local(e);
      const index = hitTest(balls, p.x, p.y);
      if (index < 0 || reduced) return;
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      const b = balls[index];
      drag = { index, dx: p.x - b.x, dy: p.y - b.y, vx: 0, vy: 0 };
      pointer = { ...p, t: performance.now() };
      wake();
    };

    const onUp = () => {
      if (drag) {
        const b = balls[drag.index];
        b.vx = Math.max(-2200, Math.min(2200, drag.vx));
        b.vy = Math.max(-2200, Math.min(2200, drag.vy));
      }
      drag = null;
      canvas.style.cursor = hover >= 0 ? "grab" : "default";
      wake();
    };

    const onLeave = () => {
      pointer = null;
      if (!drag) hover = -1;
      draw();
      wake();
    };

    const resize = new ResizeObserver(() => {
      layout();
      if (reduced) settleStatic();
      draw();
      wake();
    });
    resize.observe(canvas);

    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      },
      { threshold: 0.25 },
    );
    seen.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    layout();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      seen.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="playground" aria-hidden="true" />;
}
