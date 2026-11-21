import { useEffect } from "react";
import { ArrowIcon, GithubIcon } from "../components/Icons";
import { alsoDelivered, education, experience, principles, proApps, profile, skills, type ProApp } from "../content";
import { ViewShell } from "./ViewShell";

const featured = proApps.filter((a) => a.featured);
const more = proApps.filter((a) => !a.featured);

export const appIcon = (slug: string) => `/pro/${slug}-icon.webp`;
const appShot = (slug: string, i: number) => `/pro/${slug}-${i}.webp`;

export function WorkView({ onBack, anchor }: { onBack: () => void; anchor: string | null }) {
  useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(`app-${anchor}`);
    if (!el) return;
    el.querySelectorAll("[data-reveal]").forEach((n) => n.classList.add("revealed"));
    requestAnimationFrame(() => el.scrollIntoView({ block: "center" }));
  }, [anchor]);

  return (
    <ViewShell title="Experience" kicker="Professional" accent="#7c8cff" onBack={onBack}>
      <p className="lead">{profile.summary}</p>
      <div className="actions">
        <a className="button" href={profile.github} target="_blank" rel="noopener noreferrer">
          <GithubIcon /> GitHub
        </a>
        <a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <ArrowIcon />
        </a>
        {profile.cv && (
          <a className="button button-ghost" href={profile.cv} download>
            Download CV
          </a>
        )}
        {profile.email && (
          <a className="button button-ghost" href={`mailto:${profile.email}`}>
            Email me
          </a>
        )}
      </div>

      <section aria-labelledby="apps-heading" className="pro">
        <h2 id="apps-heading" className="pro-title">
          <span>17</span> apps shipped to the App Store and Google Play.
        </h2>
        <p className="muted pro-sub">
          Built in Flutter for iOS and Android. Every screen below comes from the app's own store listing.
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
              <img src={appIcon(app.slug)} alt={app.name} width={64} height={64} loading="lazy" />
            </a>
          ))}
        </div>

        <div className="chapters">
          {featured.map((app, i) => (
            <Chapter key={app.slug} app={app} index={i} />
          ))}
        </div>

        <h3 className="track-title">And more on the stores</h3>
        <div className="track" tabIndex={0} role="region" aria-label="More shipped apps">
          {more.map((app) => (
            <TrackCard key={app.slug} app={app} />
          ))}
        </div>
        <p className="muted also">Also delivered: {alsoDelivered.join(", ")}.</p>
      </section>

      <section aria-labelledby="exp-heading">
        <h2 id="exp-heading">Where I've worked</h2>
        <ol className="timeline">
          {experience.map((item) => (
            <li key={`${item.place}-${item.period}`} className="timeline-item" data-reveal="left">
              <div className="timeline-head">
                <h3>{item.title}</h3>
                <span className="muted">{item.period}</span>
              </div>
              <p className="muted">{item.place}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading">How I work</h2>
        <div className="principles">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="card"
              data-reveal="flip"
              style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="principle-num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">Toolkit</h2>
        <div className="skill-groups">
          {skills.map((group, i) => (
            <div
              key={group.group}
              className="card"
              data-reveal="zoom"
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <h3>{group.group}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="edu-heading">
        <h2 id="edu-heading">Education</h2>
        <div className="skill-groups">
          {education.map((e) => (
            <div key={e.school} className="card" data-reveal>
              <h3>{e.school}</h3>
              <p>{e.degree}</p>
              {e.highlight && <p className="edu-highlight">{e.highlight}</p>}
            </div>
          ))}
        </div>
      </section>
    </ViewShell>
  );
}

function Chapter({ app, index }: { app: ProApp; index: number }) {
  const shots = Array.from({ length: app.shots }, (_, i) => appShot(app.slug, i + 1));
  return (
    <article
      id={`app-${app.slug}`}
      className="chapter"
      style={{ "--c-bg": app.colors.bg, "--c-accent": app.colors.accent } as React.CSSProperties}
    >
      <div className="chapter-text" data-reveal="left">
        <p className="chapter-kicker">
          <img src={appIcon(app.slug)} alt="" width={48} height={48} loading="lazy" />
          <span>
            {String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")} · {app.category} ·{" "}
            {app.year}
          </span>
        </p>
        <h3>{app.name}</h3>
        <p className="chapter-desc">{app.summary}</p>
        {app.role && <p className="chapter-role">My role: {app.role}</p>}
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
      <div className="deck" data-reveal="zoom" style={{ "--n": shots.length } as React.CSSProperties}>
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
      style={{ "--t-bg": app.colors.bg, "--t-ink": app.colors.ink, "--t-accent": app.colors.accent } as React.CSSProperties}
    >
      <header>
        <img src={appIcon(app.slug)} alt="" width={52} height={52} loading="lazy" />
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
          <img key={i} src={appShot(app.slug, i + 1)} alt={`${app.name} screen ${i + 1}`} loading="lazy" decoding="async" />
        ))}
      </div>
      <StoreLinks app={app} />
    </article>
  );
}

function StoreLinks({ app }: { app: ProApp }) {
  if (app.status === "Retired") return <p className="store-off">Removed from the App Store</p>;
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
