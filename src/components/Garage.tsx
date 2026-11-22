import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { t } from "../i18n";
import {
  carModels,
  glassPath,
  profilePath,
  type CarModel,
} from "../data/carModels";

const Showroom3D = lazy(() => import("./Showroom3D"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** The same car, flat: drawn from the profile the 3D model is built from. */
export function CarArt({
  car,
  paint = car.paints[0].hex,
  spinning = false,
}: {
  car: CarModel;
  paint?: string;
  spinning?: boolean;
}) {
  const r = car.wheelRadius * 42;
  return (
    <svg
      viewBox="0 0 220 80"
      className={`car-art${spinning ? " is-spinning" : ""}`}
      aria-hidden="true"
    >
      <ellipse
        cx={5 + (car.length * 42) / 2}
        cy="76"
        rx={(car.length * 42) / 2}
        ry="3.5"
        className="car-shadow"
      />
      <path d={profilePath(car)} fill={paint} />
      <path d={glassPath(car)} className="car-glass" />
      {car.wheels.map((x) => {
        const cx = 5 + x * 42;
        const cy = 74 - r;
        return (
          <g
            key={x}
            className="car-wheel"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle cx={cx} cy={cy} r={r} className="car-tyre" />
            <circle cx={cx} cy={cy} r={r * 0.62} fill={car.rim} />
            <path
              d={`M${cx - r * 0.6} ${cy}H${cx + r * 0.6}M${cx} ${cy - r * 0.6}V${cy + r * 0.6}`}
              className="car-spoke"
            />
          </g>
        );
      })}
    </svg>
  );
}

function Showroom() {
  const [car, setCar] = useState(carModels[0]);
  const [paint, setPaint] = useState(carModels[0].paints[0].hex);
  const [webgl] = useState(hasWebGL);

  const pick = (m: CarModel) => {
    setCar(m);
    setPaint(m.paints[0].hex);
  };

  const flat = (
    <div className="showroom-flat">
      <CarArt car={car} paint={paint} />
    </div>
  );

  return (
    <div className="showroom">
      <div className="showroom-stage">
        {webgl ? (
          <Suspense fallback={flat}>
            <Showroom3D car={car} paint={paint} />
          </Suspense>
        ) : (
          flat
        )}
        <div className="showroom-label" aria-live="polite">
          <span>{car.maker}</span>
          <strong>{car.name}</strong>
          <small>{car.line}</small>
        </div>
        {webgl && <span className="showroom-hint">{t("Drag to turn")}</span>}
      </div>

      <div className="showroom-controls">
        <div className="showroom-tabs" role="tablist" aria-label={t("Cars")}>
          {carModels.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={car.id === m.id}
              onClick={() => pick(m)}
            >
              <CarArt car={m} />
              <span>
                <small>{m.maker}</small> {m.name}
              </span>
            </button>
          ))}
        </div>
        <div
          className="showroom-paints"
          role="radiogroup"
          aria-label={t("Paint")}
        >
          {car.paints.map((p) => (
            <button
              key={p.hex}
              type="button"
              role="radio"
              aria-checked={paint === p.hex}
              title={p.name}
              aria-label={p.name}
              style={{ "--swatch": p.hex } as React.CSSProperties}
              onClick={() => setPaint(p.hex)}
            />
          ))}
          <span className="showroom-paint-name">
            {car.paints.find((p) => p.hex === paint)?.name}
          </span>
        </div>
      </div>
    </div>
  );
}

type Phase = "idle" | "staging" | "green" | "running" | "done" | "foul";

function readBest(): number | null {
  try {
    const v = Number(localStorage.getItem("drag-best"));
    return v > 0 ? v : null;
  } catch {
    return null;
  }
}

/**
 * A drag strip: pick a car, wait for the lights, launch on green. Only your
 * reaction time counts; the rival reacts somewhere between 0.20 and 0.45 s.
 */
function DragStrip() {
  const [pick, setPick] = useState(carModels[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [amber, setAmber] = useState(0);
  const [result, setResult] = useState<{ you: number; rival: number } | null>(
    null,
  );
  const [best, setBest] = useState<number | null>(readBest);
  const greenAt = useRef(0);
  const timers = useRef<number[]>([]);
  const you = carModels.find((c) => c.id === pick)!;
  const rivalCar = carModels.find((c) => c.id !== pick)!;

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const stage = () => {
    clear();
    setResult(null);
    setAmber(0);
    setPhase("staging");
    const hold = 600 + Math.random() * 900;
    [1, 2, 3].forEach((n) =>
      timers.current.push(
        window.setTimeout(() => setAmber(n), hold + (n - 1) * 450),
      ),
    );
    timers.current.push(
      window.setTimeout(
        () => {
          greenAt.current = performance.now();
          setPhase("green");
        },
        hold + 3 * 450,
      ),
    );
  };

  const launch = () => {
    if (phase === "staging") {
      clear();
      setPhase("foul");
      return;
    }
    if (phase !== "green") return;
    const yourTime = (performance.now() - greenAt.current) / 1000;
    const rival = 0.2 + Math.random() * 0.25;
    setResult({ you: yourTime, rival });
    setPhase("running");
    if (best === null || yourTime < best) {
      setBest(yourTime);
      try {
        localStorage.setItem("drag-best", String(yourTime));
      } catch {
        /* private mode */
      }
    }
    timers.current.push(window.setTimeout(() => setPhase("done"), 2600));
  };

  // Space launches, like a real button box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || (phase !== "staging" && phase !== "green"))
        return;
      e.preventDefault();
      launch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const moving = phase === "running" || phase === "done";
  const won = result ? result.you < result.rival : false;

  return (
    <div className="drag">
      <div
        className="drag-pick"
        role="radiogroup"
        aria-label={t("Pick your car")}
      >
        {carModels.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={pick === c.id}
            disabled={
              phase === "staging" || phase === "green" || phase === "running"
            }
            onClick={() => {
              setPick(c.id);
              setPhase("idle");
              setResult(null);
            }}
          >
            <CarArt car={c} />
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      <div className={`drag-strip is-${phase}`}>
        <div className="drag-tree" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`lamp lamp-amber${amber >= n ? " on" : ""}`}
            />
          ))}
          <span
            className={`lamp lamp-green${phase === "green" || moving ? " on" : ""}`}
          />
          <span className={`lamp lamp-red${phase === "foul" ? " on" : ""}`} />
        </div>
        {[
          { car: you, time: result?.you, lane: "you" },
          { car: rivalCar, time: result?.rival, lane: "rival" },
        ].map(({ car, time, lane }) => (
          <div key={lane} className={`drag-lane drag-lane-${lane}`}>
            <div
              className="drag-car"
              style={
                moving && time !== undefined
                  ? ({ "--react": `${time}s` } as React.CSSProperties)
                  : undefined
              }
            >
              <CarArt car={car} spinning={phase === "running"} />
            </div>
          </div>
        ))}
        <span className="drag-finish" aria-hidden="true" />
      </div>

      <div className="drag-controls">
        {phase === "staging" || phase === "green" ? (
          <button type="button" className="button drag-go" onClick={launch}>
            {t("Launch")} <kbd>Space</kbd>
          </button>
        ) : (
          <button type="button" className="button" onClick={stage}>
            {phase === "idle" ? t("Stage the car") : t("Run it again")}
          </button>
        )}
        <p className="drag-result" aria-live="polite">
          {phase === "foul" && t("Red light: you jumped the start.")}
          {phase === "staging" && t("Wait for green…")}
          {phase === "green" && t("Go!")}
          {result && moving && (
            <>
              {t("Reaction")} <b>{result.you.toFixed(3)} s</b> ·{" "}
              {won
                ? `${t("you win by")} ${(result.rival - result.you).toFixed(3)} s`
                : `${t("rival wins by")} ${(result.you - result.rival).toFixed(3)} s`}
            </>
          )}
          {phase === "idle" &&
            t("Stage the car, then launch the moment the light turns green.")}
        </p>
        {best !== null && (
          <p className="drag-best">
            {t("Your best")}: <b>{best.toFixed(3)} s</b>
          </p>
        )}
      </div>
    </div>
  );
}

export function Garage() {
  return (
    <section className="garage" aria-labelledby="garage-heading">
      <h2 id="garage-heading">{t("The garage")}</h2>
      <p className="muted garage-lead">
        {t(
          "Mostly German: a Golf R, Audi's RS3 and RS6, and a Cupra. Each one modelled from scratch for this page.",
        )}
      </p>
      <Showroom />
      <div className="garage-screen">
        <span className="garage-tag">{t("Also on my list")}</span>
        <span className="garage-chip">Ferrari</span>
        <span className="garage-chip">Ford Mustang</span>
        <span className="garage-chip">{t("Supercars and hypercars")}</span>
      </div>
      <div className="garage-screen">
        <span className="garage-tag">{t("On screen")}</span>
        <span className="garage-chip">{t("Fast & Furious, the films")}</span>
        <span className="garage-chip">{t("Need for Speed, the games")}</span>
      </div>
      <h3 className="garage-sub">{t("Drag strip")}</h3>
      <DragStrip />
    </section>
  );
}
