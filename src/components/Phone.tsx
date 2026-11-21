import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { View } from "../App";
import { profile } from "../content";
import { shadeProgress, SHADE_HEIGHT, shouldOpenShade } from "./shade";

type AppIcon = {
  id: View | "github";
  label: string;
  glyph: string;
  color: string;
};

const APPS: AppIcon[] = [
  { id: "work", label: "Work", glyph: "💼", color: "linear-gradient(135deg,#5b8def,#7c5cf0)" },
  { id: "projects", label: "Projects", glyph: "🚀", color: "linear-gradient(135deg,#f0845b,#e2425f)" },
  { id: "github", label: "GitHub", glyph: "⌥", color: "linear-gradient(135deg,#2b3140,#151821)" },
];

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Phone({ onOpen }: { onOpen: (view: View) => void }) {
  const time = useClock();
  const screen = useRef<HTMLDivElement>(null);
  const [launch, setLaunch] = useState<{ rect: DOMRect; color: string; open: boolean } | null>(null);
  const [pull, setPull] = useState(0);
  const [shadeOpen, setShadeOpen] = useState(false);
  const drag = useRef<{ startY: number } | null>(null);

  /** Grows a panel out of the tapped icon, then opens the view. */
  function launchApp(app: AppIcon, target: HTMLElement) {
    if (app.id === "github") {
      window.open(profile.github, "_blank", "noopener,noreferrer");
      return;
    }
    const view = app.id;
    if (reducedMotion() || !screen.current) {
      onOpen(view);
      return;
    }
    const icon = target.getBoundingClientRect();
    setLaunch({ rect: icon, color: app.color, open: false });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setLaunch((l) => (l ? { ...l, open: true } : l))),
    );
    window.setTimeout(() => onOpen(view), 420);
  }

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    drag.current = { startY: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    setPull(Math.max(0, Math.min(SHADE_HEIGHT, e.clientY - drag.current.startY)));
  }
  function onPointerUp() {
    if (!drag.current) return;
    drag.current = null;
    setShadeOpen((open) => open || shouldOpenShade(pull));
    setPull(0);
  }

  const shadeOffset = shadeOpen ? 1 : shadeProgress(pull);

  return (
    <div className="phone" aria-label="Phone with apps">
      <div className="phone-screen" ref={screen}>
        <button
          type="button"
          className="status-bar"
          aria-label="Status bar. Pull down, or press Enter, to open the shade."
          aria-expanded={shadeOpen}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
              e.preventDefault();
              setShadeOpen(true);
            }
          }}
        >
          <span>{time}</span>
          <span className="notch" aria-hidden="true" />
          <span aria-hidden="true">● ● ▮</span>
        </button>

        <div
          className="shade"
          style={{ transform: `translateY(${(shadeOffset - 1) * 100}%)` }}
          aria-hidden={!shadeOpen}
        >
          <p className="shade-title">Control centre</p>
          <div className="shade-tiles">
            <span className="tile">📶 Online</span>
            <span className="tile">🌙 Focus</span>
          </div>
          <button
            type="button"
            className="tile tile-secret"
            tabIndex={shadeOpen ? 0 : -1}
            onClick={() => onOpen("off-duty")}
          >
            🔓 Off the clock
            <small>The part not on my CV</small>
          </button>
          <button
            type="button"
            className="shade-close"
            tabIndex={shadeOpen ? 0 : -1}
            onClick={() => setShadeOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="wallpaper" aria-hidden="true" />
        <p className="phone-greeting">
          {profile.name.split(" ")[0]}'s phone
        </p>
        <ul className="app-grid">
          {APPS.map((app) => (
            <li key={app.id}>
              <button
                type="button"
                className="app"
                onClick={(e) => launchApp(app, e.currentTarget.querySelector(".app-icon") as HTMLElement)}
              >
                <span className="app-icon" style={{ background: app.color }} aria-hidden="true">
                  {app.glyph}
                </span>
                <span className="app-label">{app.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="dock" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="home-bar" aria-hidden="true" />
      </div>

      {launch && (
        <div
          className="launch"
          aria-hidden="true"
          style={
            launch.open
              ? {
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100dvh",
                  borderRadius: 0,
                  background: launch.color,
                }
              : {
                  top: launch.rect.top,
                  left: launch.rect.left,
                  width: launch.rect.width,
                  height: launch.rect.height,
                  background: launch.color,
                }
          }
        />
      )}
    </div>
  );
}
