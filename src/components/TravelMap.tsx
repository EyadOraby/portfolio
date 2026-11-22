import { useEffect, useMemo, useRef, useState } from "react";
import { t } from "../i18n";
import {
  home,
  regions,
  visited,
  type Place,
  type Region,
} from "../data/travel";

type MapData = typeof import("../data/worldMap");

const byId = new Map(visited.map((p) => [p.id, p]));

/** A flight line from home: a curve that bows away from the straight line. */
function arc(map: MapData, to: Place) {
  const [x1, y1] = map.project(home.lon, home.lat);
  const [x2, y2] = map.project(to.lon, to.lat);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.min(len * 0.28, 90);
  // Bow upwards (north) on screen.
  const nx = (y1 - y2) / (len || 1);
  const ny = (x2 - x1) / (len || 1);
  const flip = ny > 0 ? -1 : 1;
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${(mx + nx * lift * flip).toFixed(1)},${(my + ny * lift * flip).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

export function TravelMap() {
  const [map, setMap] = useState<MapData | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [hover, setHover] = useState<Place | null>(null);
  const [on, setOn] = useState(false);
  const [flights, setFlights] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    import("../data/worldMap").then((m) => live && setMap(m));
    return () => {
      live = false;
    };
  }, []);

  // Light the countries up once the map scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        regions.map((r) => [r, visited.filter((p) => p.region === r).length]),
      ) as Record<Region, number>,
    [],
  );
  const order = useMemo(() => new Map(visited.map((p, i) => [p.id, i])), []);
  const shown = region ? visited.filter((p) => p.region === region) : visited;
  const label = hover ?? (focus ? (byId.get(focus) ?? null) : null);

  return (
    <section className="travel" aria-labelledby="travel-heading">
      <div className="travel-head">
        <div>
          <h2 id="travel-heading">{t("Where I've been")}</h2>
          <p className="muted">
            {visited.length}{" "}
            {t("countries and territories, from home in Egypt")}
          </p>
        </div>
        <button
          type="button"
          className="button button-ghost travel-fly"
          onClick={() => setFlights((n) => n + 1)}
        >
          {t("Replay the flights")}
        </button>
      </div>

      <div
        className="travel-filters"
        role="group"
        aria-label={t("Filter by region")}
      >
        <button
          type="button"
          aria-pressed={region === null}
          onClick={() => setRegion(null)}
        >
          {t("All")} <span>{visited.length}</span>
        </button>
        {regions.map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={region === r}
            onClick={() => setRegion(region === r ? null : r)}
          >
            {t(r)} <span>{counts[r]}</span>
          </button>
        ))}
      </div>

      <div
        ref={ref}
        className={`travel-map${on ? " is-on" : ""}`}
        data-filter={region ?? undefined}
      >
        <p className="travel-label" aria-live="polite">
          {label ? (
            <>
              <strong>{label.name}</strong> · {t(label.region)}
            </>
          ) : (
            <>
              <strong>{t("Home")}</strong> · {t("Egypt")}
            </>
          )}
        </p>
        {map ? (
          <svg
            viewBox={`0 0 ${map.MAP_WIDTH} ${map.MAP_HEIGHT}`}
            role="img"
            aria-label={t(
              "World map with the countries I have visited highlighted",
            )}
          >
            {map.countries.map((c) => {
              const place = byId.get(c.id);
              const isHome = c.id === home.id;
              const dim = region && place && place.region !== region;
              return (
                <path
                  key={c.id}
                  d={c.d}
                  className={
                    isHome
                      ? "land land-home"
                      : place
                        ? `land land-visited${dim ? " is-dim" : ""}${focus === c.id ? " is-focus" : ""}`
                        : "land"
                  }
                  style={
                    place
                      ? ({ "--i": order.get(c.id) } as React.CSSProperties)
                      : undefined
                  }
                  onPointerEnter={place ? () => setHover(place) : undefined}
                  onPointerLeave={place ? () => setHover(null) : undefined}
                />
              );
            })}
            <g key={flights} className="travel-arcs" aria-hidden="true">
              {shown.map((p) => (
                <path
                  key={p.id}
                  d={arc(map, p)}
                  pathLength={1}
                  style={{ "--i": order.get(p.id) } as React.CSSProperties}
                />
              ))}
            </g>
            {visited
              .filter((p) => p.tiny)
              .map((p) => {
                const [x, y] = map.project(p.lon, p.lat);
                const dim = region && p.region !== region;
                return (
                  <circle
                    key={p.id}
                    cx={x}
                    cy={y}
                    r={3.2}
                    className={`travel-dot${dim ? " is-dim" : ""}${focus === p.id ? " is-focus" : ""}`}
                    style={{ "--i": order.get(p.id) } as React.CSSProperties}
                    onPointerEnter={() => setHover(p)}
                    onPointerLeave={() => setHover(null)}
                  />
                );
              })}
            {(() => {
              const [x, y] = map.project(home.lon, home.lat);
              return (
                <g className="travel-home" aria-hidden="true">
                  <circle cx={x} cy={y} r={9} className="travel-home-ring" />
                  <circle cx={x} cy={y} r={4} />
                </g>
              );
            })()}
          </svg>
        ) : (
          <div className="travel-map-loading" aria-hidden="true" />
        )}
      </div>

      <ul className="stamps">
        {shown.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              className="stamp"
              data-region={p.region}
              aria-pressed={focus === p.id}
              style={
                {
                  "--tilt": `${((i * 37) % 9) - 4}deg`,
                } as React.CSSProperties
              }
              onClick={() => setFocus(focus === p.id ? null : p.id)}
            >
              <span className="stamp-name">{p.name}</span>
              <span className="stamp-region">{t(p.region)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
