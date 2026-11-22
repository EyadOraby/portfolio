import { t } from "../i18n";
import { ArrowIcon } from "./Icons";
import { alsoDelivered, proApps, type ProApp } from "../content";

export const featuredApps = proApps.filter((a) => a.featured);
const moreApps = proApps.filter((a) => !a.featured);

export const appIcon = (slug: string) => `/pro/${slug}-icon.webp`;
const appShot = (slug: string, i: number) => `/pro/${slug}-${i}.webp`;

/** Icon dock, featured app chapters and the track of other store apps. */
export function ProShowcase({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="apps-heading" className="pro">
      <Heading id="apps-heading" className="pro-title">
        <span>17</span> {t("apps shipped to the App Store and Google Play.")}
      </Heading>
      <p className="muted pro-sub">
        {t(
          "Built in Flutter for iOS and Android at Apes Solutions, Talento and Status Strong. Every screen below comes from the app's own store listing.",
        )}
      </p>
      <div className="dock">
        {proApps.map((app, i) => (
          <a
            key={app.slug}
            className="dock-icon"
            href={`#work/${app.slug}`}
            title={app.name}
            style={{ "--delay": `${(i % 8) * -0.7}s` } as React.CSSProperties}
          >
            <img
              src={appIcon(app.slug)}
              alt={app.name}
              width={64}
              height={64}
              loading="lazy"
            />
          </a>
        ))}
      </div>

      <div className="chapters">
        {featuredApps.map((app, i) => (
          <Chapter key={app.slug} app={app} index={i} />
        ))}
      </div>

      <h3 className="track-title">{t("And more on the stores")}</h3>
      <div
        className="track"
        tabIndex={0}
        role="region"
        aria-label="More shipped apps"
      >
        {moreApps.map((app) => (
          <TrackCard key={app.slug} app={app} />
        ))}
      </div>
      <p className="muted also">
        {t("Also delivered:")} {alsoDelivered.join(", ")}.
      </p>
    </section>
  );
}

function Chapter({ app, index }: { app: ProApp; index: number }) {
  const shots = Array.from({ length: app.shots }, (_, i) =>
    appShot(app.slug, i + 1),
  );
  return (
    <article
      id={`app-${app.slug}`}
      className="chapter"
      style={
        {
          "--c-bg": app.colors.bg,
          "--c-accent": app.colors.accent,
        } as React.CSSProperties
      }
    >
      <div className="chapter-text" data-reveal="left">
        <p className="chapter-kicker">
          <img
            src={appIcon(app.slug)}
            alt=""
            width={48}
            height={48}
            loading="lazy"
          />
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(featuredApps.length).padStart(2, "0")} · {app.category} ·{" "}
            {app.year}
          </span>
        </p>
        <h3>{app.name}</h3>
        <p className="chapter-desc">{app.summary}</p>
        {app.role && (
          <p className="chapter-role">
            {t("My role:")} {app.role}
          </p>
        )}
        {app.stat && (
          <p className="chapter-stat">
            <b>{app.stat.value}</b>
            <span>{app.stat.label}</span>
          </p>
        )}
        <ul className="chips">
          {app.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <StoreLinks app={app} />
      </div>
      <div
        className="deck"
        data-reveal="zoom"
        style={{ "--n": shots.length } as React.CSSProperties}
      >
        {shots.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${app.name} screen ${i + 1}`}
            loading="lazy"
            decoding="async"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </article>
  );
}

function TrackCard({ app }: { app: ProApp }) {
  return (
    <article
      id={`app-${app.slug}`}
      className="tcard"
      style={
        {
          "--t-bg": app.colors.bg,
          "--t-ink": app.colors.ink,
          "--t-accent": app.colors.accent,
        } as React.CSSProperties
      }
    >
      <header>
        <img
          src={appIcon(app.slug)}
          alt=""
          width={52}
          height={52}
          loading="lazy"
        />
        <div>
          <h4>{app.name}</h4>
          <span>
            {app.category} · {app.year}
          </span>
        </div>
      </header>
      <p>{app.summary}</p>
      <div className="tshots">
        {Array.from({ length: app.shots }, (_, i) => (
          <img
            key={i}
            src={appShot(app.slug, i + 1)}
            alt={`${app.name} screen ${i + 1}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <StoreLinks app={app} />
    </article>
  );
}

function StoreLinks({ app }: { app: ProApp }) {
  if (app.status === "Retired")
    return <p className="store-off">{t("Removed from the App Store")}</p>;
  return (
    <div className="store-links">
      {app.links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} <ArrowIcon />
        </a>
      ))}
    </div>
  );
}
