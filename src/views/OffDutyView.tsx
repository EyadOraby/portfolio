import { t } from "../i18n";
import { HobbyIcon } from "../components/HobbyIcon";
import { useEffect, useRef } from "react";
import { ArrowIcon, BackIcon, ChevronIcon } from "../components/Icons";
import { useReveal } from "../components/hooks";
import {
  hobbies,
  interests,
  pastimes,
  profile,
  type Pastime,
} from "../content";
import { Room } from "../components/Room";
import { wrapIndex } from "../lib";

const groups = [
  { title: t("Away from the keyboard"), items: hobbies },
  { title: t("Tech I explore"), items: interests },
];

/**
 * The hidden personal side, laid out like a small app: a sidebar of
 * hobbies and interests, and a page for each one.
 */
export function OffDutyView({
  onBack,
  slug,
  onOpen,
}: {
  onBack: () => void;
  slug: string | null;
  onOpen: (slug: string | null) => void;
}) {
  const index = pastimes.findIndex((p) => p.slug === slug);
  const current = index >= 0 ? pastimes[index] : null;
  const main = useRef<HTMLElement>(null);
  useReveal([slug]);

  useEffect(() => {
    document.title = `${current ? current.title : "Off the clock"} · ${profile.name}`;
    window.scrollTo({ top: 0 });
  }, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey
      )
        return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const step = e.key === "ArrowRight" ? 1 : -1;
        const next =
          pastimes[wrapIndex((index < 0 ? -1 : index) + step, pastimes.length)];
        onOpen(next.slug);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onOpen]);

  return (
    <div className="shell">
      <aside className="shell-side" aria-label="Off the clock">
        <div className="shell-brand">
          <button type="button" className="back" onClick={onBack}>
            <BackIcon /> {t("Home")}
          </button>
        </div>
        <button
          type="button"
          className="shell-link shell-overview"
          aria-current={current ? undefined : "page"}
          onClick={() => onOpen(null)}
        >
          <span className="shell-glyph" aria-hidden="true">
            ☾
          </span>
          <span className="shell-label">{t("Overview")}</span>
        </button>
        {groups.map((group) => (
          <nav
            key={group.title}
            className="shell-group"
            aria-label={group.title}
          >
            <h2>{group.title}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    className="shell-link"
                    aria-current={item.slug === slug ? "page" : undefined}
                    onClick={() => onOpen(item.slug)}
                  >
                    <span className="shell-glyph" aria-hidden="true">
                      <HobbyIcon slug={item.slug} />
                    </span>
                    <span className="shell-label">{item.title}</span>
                    <span
                      className="shell-dot"
                      data-status={item.status}
                      title={item.status}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <p className="shell-hint">
          <kbd>←</kbd> <kbd>→</kbd> {t("to flip through")}
        </p>
      </aside>

      <main ref={main} className="shell-main" key={current?.slug ?? "overview"}>
        <div className="shell-crumbs">
          <button type="button" onClick={() => onOpen(null)}>
            {t("Off the clock")}
          </button>
          {current && (
            <>
              <span aria-hidden="true">/</span>
              <span>{current.title}</span>
            </>
          )}
        </div>
        {current ? (
          <Detail item={current} index={index} onOpen={onOpen} />
        ) : (
          <Overview onOpen={onOpen} />
        )}
      </main>
    </div>
  );
}

function Overview({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <div className="shell-page">
      <p className="shell-path">~/off-the-clock</p>
      <h1 className="shell-title">{t("Off the clock")}</h1>
      <p className="shell-lead">
        {t(
          "You held on long enough to clock out with me. This is what I do when the laptop is closed, and the corners of tech I explore just because I enjoy them.",
        )}
      </p>
      <Room onOpen={onOpen} />
      {groups.map((group) => (
        <section key={group.title} className="shell-section">
          <div className="shell-section-head">
            <h2>{group.title}</h2>
            <span>{group.items.length}</span>
          </div>
          <div
            className="library"
            data-even={
              group.items.length % 2 === 0 && group.items.length % 3 !== 0
                ? ""
                : undefined
            }
          >
            {group.items.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                className="library-card"
                data-reveal="zoom"
                style={
                  {
                    "--accent": item.accent,
                    "--delay": `${i * 60}ms`,
                  } as React.CSSProperties
                }
                onClick={() => onOpen(item.slug)}
              >
                <span className="library-art" aria-hidden="true">
                  <span>
                    <HobbyIcon slug={item.slug} />
                  </span>
                </span>
                <span className="library-meta">
                  <strong>{item.title}</strong>
                  <small>{item.tagline}</small>
                </span>
                <span className="library-status" data-status={item.status}>
                  {t(item.status)}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Detail({
  item,
  index,
  onOpen,
}: {
  item: Pastime;
  index: number;
  onOpen: (slug: string) => void;
}) {
  const prev = pastimes[wrapIndex(index - 1, pastimes.length)];
  const next = pastimes[wrapIndex(index + 1, pastimes.length)];
  const isHobby = hobbies.includes(item);

  return (
    <article
      className="shell-page"
      style={{ "--accent": item.accent } as React.CSSProperties}
    >
      <p className="shell-path">
        <span className="pill-status" data-status={item.status}>
          {t(item.status)}
        </span>
        ~/off-the-clock/{item.slug}
      </p>
      <h1 className="shell-title">{item.title}</h1>
      <p className="shell-lead">{item.tagline}</p>

      <div className="feature" data-reveal="up">
        <div className="feature-art" aria-hidden="true">
          <span>
            <HobbyIcon slug={item.slug} />
          </span>
        </div>
        <div className="feature-body">
          <p className="feature-kicker">
            <span className="status-dot" aria-hidden="true" />
            {isHobby ? t("Part of my week") : t("Currently exploring")}
          </p>
          <p>{item.overview}</p>
        </div>
      </div>

      <div className="tiles">
        {item.tiles.map((tile, i) => (
          <div
            key={tile.label}
            className="tile"
            data-reveal="flip"
            style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <span>{tile.label}</span>
            <strong>{tile.value}</strong>
          </div>
        ))}
      </div>

      <section className="shell-section">
        <div className="shell-section-head">
          <h2>{t("Notes")}</h2>
        </div>
        <ul className="notes">
          {item.notes.map((note, i) => (
            <li
              key={note}
              data-reveal="left"
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              {note}
            </li>
          ))}
        </ul>
      </section>

      <nav className="pager" aria-label="More">
        <button type="button" onClick={() => onOpen(prev.slug)}>
          <small>
            <ChevronIcon flip /> {t("Previous")}
          </small>
          <span>{prev.title}</span>
        </button>
        <button type="button" onClick={() => onOpen(next.slug)}>
          <small>
            {t("Next")} <ChevronIcon />
          </small>
          <span>{next.title}</span>
        </button>
      </nav>
      <a className="shell-foot" href="#projects">
        {t("Back to the work")} <ArrowIcon />
      </a>
    </article>
  );
}
