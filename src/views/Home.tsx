import { t } from "../i18n";
import { useState } from "react";
import { Counter } from "../components/Counter";
import { HoldClock } from "../components/HoldClock";
import {
  ArrowIcon,
  BriefcaseIcon,
  GithubIcon,
  LayersIcon,
  MailIcon,
  SearchIcon,
} from "../components/Icons";
import { Playground } from "../components/Playground";
import { LangToggle } from "../components/LangToggle";
import { ProShowcase } from "../components/ProShowcase";
import { ShotCycler } from "../components/ShotCycler";
import { spotlight, useReveal } from "../components/hooks";
import {
  experience,
  metrics,
  proApps,
  profile,
  projects,
  skills,
} from "../content";

const live = projects.flatMap((p) =>
  p.links
    .filter((l) => /live/i.test(l.label))
    .map((l) => ({ name: p.name, href: l.href, host: new URL(l.href).host })),
);

const allSkills = skills.flatMap((g) => g.items);

export function Home({
  onPalette,
  onUnlock,
}: {
  onPalette: () => void;
  onUnlock: () => void;
}) {
  useReveal();
  const [paused, setPaused] = useState(false);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <main className="home">
      <div className="hero">
        <section
          className="widget widget-intro hero-intro"
          onPointerMove={spotlight}
          aria-labelledby="name"
        >
          <div className="intro-top">
            <span className="monogram" aria-hidden="true">
              EO
            </span>
            <span className="intro-pills">
              <span className="pill pill-hire">
                <span className="hire-dot" aria-hidden="true" />
                {t("Open to work")}
              </span>
              <span className="pill">
                <span className="pulse" aria-hidden="true" />
                {t("17 apps on the App Store & Google Play")}
              </span>
            </span>
          </div>
          <h1 id="name">{profile.name}</h1>
          <p className="role">
            {profile.role}
            {profile.location && (
              <span className="location"> · {profile.location}</span>
            )}
          </p>
          <p className="tagline">{profile.tagline}</p>
          <div className="intro-dock" aria-label="Shipped apps">
            {proApps.slice(0, 9).map((app, i) => (
              <a
                key={app.slug}
                href={`#work/${app.slug}`}
                title={app.name}
                className="dock-icon"
                style={{ "--delay": `${i * -0.8}s` } as React.CSSProperties}
              >
                <img
                  src={`/pro/${app.slug}-icon.webp`}
                  alt={app.name}
                  width={44}
                  height={44}
                />
              </a>
            ))}
            <a href="#work" className="intro-dock-more">
              +{proApps.length - 9}
            </a>
          </div>
          <div className="intro-actions">
            <a className="button" href="#work">
              {t("See all my apps")} <ArrowIcon />
            </a>
            <a
              className="button button-ghost"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon /> {t("GitHub")}
            </a>
            <a className="button button-ghost" href="#cv">
              {t("CV")}
            </a>
            {profile.email && (
              <a
                className="button button-ghost"
                href={`mailto:${profile.email}`}
              >
                <MailIcon /> {t("Email")}
              </a>
            )}
            <LangToggle />
            <button type="button" className="kbd-hint" onClick={onPalette}>
              <SearchIcon /> <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
              <kbd>K</kbd>
            </button>
          </div>
        </section>
      </div>

      <ProShowcase />

      <aside
        className="insight"
        aria-labelledby="side-heading"
        data-reveal="up"
      >
        <p className="insight-kicker">{t("Beyond the day job")}</p>
        <h2 id="side-heading">
          {t("I also build open-source and freelance products.")}
        </h2>
        <p className="muted">
          {t(
            "A multi-event RSVP builder live on Vercel, plus Flutter apps with web demos you can open right now.",
          )}
        </p>
        <div className="insight-links">
          {projects.slice(0, 5).map((p) => (
            <a
              key={p.slug}
              href={`#projects/${p.slug}`}
              style={{ "--accent": p.accent } as React.CSSProperties}
            >
              <span className="insight-dot" aria-hidden="true" />
              {p.name}
            </a>
          ))}
          <a href="#projects" className="insight-all">
            {t("All case studies")} <ArrowIcon />
          </a>
        </div>
      </aside>

      <h2 className="home-more" data-reveal="up">
        {t("More about me")}
      </h2>
      <div className="bento">
        <a
          className="widget widget-projects"
          href="#projects"
          onPointerMove={spotlight}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-label={t("Projects")}
        >
          <div className="widget-head">
            <span className="app-icon app-icon-projects" aria-hidden="true">
              <LayersIcon />
            </span>
            <span>
              <strong>{t("Projects")}</strong>
              <small>
                {projects.length} {t("open-source & freelance case studies")}
              </small>
            </span>
            <span className="widget-go" aria-hidden="true">
              <ArrowIcon />
            </span>
          </div>
          <ShotCycler paused={paused} />
        </a>

        <a
          className="widget widget-work"
          href="#work"
          onPointerMove={spotlight}
        >
          <div className="widget-head">
            <span className="app-icon app-icon-work" aria-hidden="true">
              <BriefcaseIcon />
            </span>
            <span>
              <strong>{t("Experience")}</strong>
              <small>{t("17 store apps · 4 companies")}</small>
            </span>
            <span className="widget-go" aria-hidden="true">
              <ArrowIcon />
            </span>
          </div>
          <ol className="mini-timeline">
            {experience.slice(0, 4).map((item) => (
              <li key={item.period}>
                <span>{item.place.split(" · ")[0]}</span>
                <small>{item.period}</small>
              </li>
            ))}
          </ol>
        </a>

        <HoldClock onUnlock={onUnlock} />

        <section
          className="widget widget-live"
          onPointerMove={spotlight}
          aria-labelledby="live-heading"
        >
          <h2 id="live-heading" className="widget-label">
            {t("Live now")}
          </h2>
          <ul className="live-list">
            {live.map((site) => (
              <li key={site.href}>
                <a href={site.href} target="_blank" rel="noopener noreferrer">
                  <span className="status-dot" aria-hidden="true" />
                  <span>
                    <strong>{site.name}</strong>
                    <small>{site.host}</small>
                  </span>
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="widget widget-stack"
          onPointerMove={spotlight}
          aria-labelledby="stack-heading"
        >
          <div className="stack-head">
            <h2 id="stack-heading" className="widget-label">
              {t("Toolbox")}
            </h2>
            <span className="stack-hint">{t("Grab one and throw it")}</span>
          </div>
          <p className="sr-only">{allSkills.join(", ")}</p>
          <Playground />
        </section>

        <section
          className="widget widget-metrics"
          onPointerMove={spotlight}
          aria-label="Highlights"
        >
          {metrics.map((m) => (
            <div key={m.label} className="metric">
              <Counter
                value={m.value}
                suffix={m.suffix}
                decimals={m.decimals}
              />
              <span>{m.label}</span>
            </div>
          ))}
        </section>
      </div>
      <footer className="home-foot">
        <span>{t("Built with React, TypeScript and Vite · tested in CI")}</span>
        <a
          href={`${profile.github}/portfolio`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Source")} <ArrowIcon />
        </a>
      </footer>
    </main>
  );
}
