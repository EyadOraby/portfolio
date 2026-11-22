import { useEffect, useState } from "react";
import { t } from "../i18n";
import { ArrowIcon } from "./Icons";

/** One piece as exported by the Collector app (`collection.json`). */
export type Piece = {
  id: string;
  kind: string;
  country: string;
  denomination: string;
  year?: string;
  notes?: string;
  thumb?: string;
};

const APP = "https://eyadoraby.github.io/collector/";
const APK = "https://github.com/EyadOraby/collector/releases/tag/android";
const CODE = "https://github.com/EyadOraby/collector";

/** Keeps only well-formed pieces from an untrusted JSON file. */
export function readPieces(json: unknown): Piece[] {
  const list = (json as { entries?: unknown })?.entries;
  if (!Array.isArray(list)) return [];
  return list.flatMap((e) => {
    if (!e || typeof e !== "object") return [];
    const p = e as Record<string, unknown>;
    if (typeof p.id !== "string") return [];
    const str = (v: unknown) => (typeof v === "string" ? v : "");
    const thumb = str(p.thumb);
    return [
      {
        id: p.id,
        kind: str(p.kind) === "banknote" ? "banknote" : "coin",
        country: str(p.country),
        denomination: str(p.denomination),
        year: str(p.year),
        notes: str(p.notes),
        // Only inline JPEGs from the app's own export.
        thumb: thumb.startsWith("data:image/jpeg;base64,") ? thumb : undefined,
      },
    ];
  });
}

export function CollectionShowcase() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/collection.json")
      .then((r) => (r.ok ? r.json() : { entries: [] }))
      .then((j) => live && setPieces(readPieces(j)))
      .catch(() => live && setPieces([]));
    return () => {
      live = false;
    };
  }, []);

  return (
    <section className="collection" aria-labelledby="collection-heading">
      <div className="collection-hero">
        <div className="coin-stage" aria-hidden="true">
          <div className="coin3d">
            <span className="coin-face coin-front">
              <span>1</span>
              <small>COLLECTOR</small>
            </span>
            <span className="coin-face coin-back">
              <span>EO</span>
              <small>2026</small>
            </span>
          </div>
          <div className="coin-shadow" />
        </div>
        <div className="collection-app">
          <h2 id="collection-heading">{t("I built an app for it")}</h2>
          <p className="muted">
            {t(
              "Collector scans a coin or banknote, identifies the country, denomination and year with Claude, and keeps my notes on every piece: where it came from, its condition, the story.",
            )}
          </p>
          <div className="actions">
            <a
              className="button"
              href={APP}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Open the app")} <ArrowIcon />
            </a>
            <a
              className="button button-ghost"
              href={APK}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Android app")} <ArrowIcon />
            </a>
            <a
              className="button button-ghost"
              href={CODE}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Code")} <ArrowIcon />
            </a>
          </div>
        </div>
        <img
          className="collection-shot"
          src="/collection/collector-app.webp"
          alt={t("The Collector app's home screen")}
          width={520}
          height={1125}
          loading="lazy"
        />
      </div>

      <h3 className="collection-sub">{t("The cabinet")}</h3>
      {pieces === null ? null : pieces.length === 0 ? (
        <p className="muted collection-empty">
          {t(
            "Empty for now: pieces show up here once they are scanned and exported from the app.",
          )}
        </p>
      ) : (
        <ul className="cabinet">
          {pieces.map((p) => (
            <li key={p.id} className="cabinet-piece" data-kind={p.kind}>
              {p.thumb ? (
                <img src={p.thumb} alt="" loading="lazy" />
              ) : (
                <span className="cabinet-blank" aria-hidden="true" />
              )}
              <strong>
                {[p.denomination, p.country].filter(Boolean).join(" · ") ||
                  t("Unnamed piece")}
              </strong>
              {p.year && <small>{p.year}</small>}
              {p.notes && <p>{p.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
