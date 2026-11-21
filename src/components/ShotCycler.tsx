import { useEffect, useState } from "react";
import { projects, type Shot } from "../content";
import { wrapIndex } from "../lib";
import { Frame } from "./Frame";
import { useReducedMotion } from "./hooks";

type Scene = { project: string; slug: string; accent: string; wide: Shot; tall?: Shot };

const shotsBySrc = new Map(projects.flatMap((p) => p.shots.map((s) => [s.src, s] as const)));
const pick = (name: string) => shotsBySrc.get(`/shots/${name}.png`);

/** Pairs a desktop screenshot with a phone one, so each scene shows both sides of a product. */
const pairs: [slug: string, wide: string, tall: string][] = [
  ["rsvp-studio", "rsvp-builder", "rsvp-mobile"],
  ["mini-shop", "shop-desktop", "shop-mobile"],
  ["wedding-invitation", "rsvp-event-page", "rsvp-mobile-form"],
];

const scenes: Scene[] = pairs.flatMap(([slug, wide, tall]) => {
  const project = projects.find((p) => p.slug === slug);
  const wideShot = pick(wide);
  if (!project || !wideShot) return [];
  return [{ project: project.name, slug, accent: project.accent, wide: wideShot, tall: pick(tall) }];
});

/** Cross-fades through real screenshots of shipped work. */
export function ShotCycler({ paused }: { paused: boolean }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || reduced || scenes.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => wrapIndex(i + 1, scenes.length)), 3800);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const current = scenes[index];

  return (
    <div className="cycler" style={{ "--accent": current.accent } as React.CSSProperties}>
      <div className="cycler-stage">
        {scenes.map((scene, i) => (
          <div key={scene.slug} className="cycler-scene" data-active={i === index} aria-hidden={i !== index}>
            <div className="cycler-wide">
              <Frame shot={scene.wide} eager={i === 0} />
            </div>
            {scene.tall && (
              <div className="cycler-tall">
                <Frame shot={scene.tall} eager={i === 0} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="cycler-foot">
        <span className="cycler-name" key={current.slug}>
          {current.project}
        </span>
        <span className="cycler-dots" aria-hidden="true">
          {scenes.map((scene, i) => (
            <span key={scene.slug} data-active={i === index} />
          ))}
        </span>
      </div>
    </div>
  );
}
