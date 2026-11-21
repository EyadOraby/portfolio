import { useEffect, useState } from "react";
import { Frame } from "../components/Frame";
import { ArrowIcon } from "../components/Icons";
import { Lightbox } from "../components/Lightbox";
import { useReveal } from "../components/hooks";
import { projects, type Project } from "../content";
import { ViewShell } from "./ViewShell";

type Filter = "All" | Project["kind"];
const FILTERS: Filter[] = ["All", "Mobile", "Web"];

export function ProjectsView({ onBack, anchor }: { onBack: () => void; anchor: string | null }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = projects.filter((p) => filter === "All" || p.kind === filter);
  useReveal([filter]);

  useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (!el) return;
    el.classList.add("revealed");
    requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, [anchor]);

  return (
    <ViewShell title="Projects" kicker="Freelance & portfolio" accent="#ff8a65" onBack={onBack}>
      <p className="lead">
        Client work, products and personal builds. Mostly Flutter apps, plus full-stack web products shipped to
        production. Each one is written up as a short case study.
      </p>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className="filter">
            {f}
            <span>{f === "All" ? projects.length : projects.filter((p) => p.kind === f).length}</span>
          </button>
        ))}
      </div>

      <div className="cases">
        {shown.map((project) => (
          <CaseStudy key={project.slug} project={project} />
        ))}
      </div>
      <p className="whisper">The clock on the home screen does more than tell the time.</p>
    </ViewShell>
  );
}

function CaseStudy({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const shot = project.shots[selected];
  const liveUrl = project.links.find((l) => /live/i.test(l.label))?.href;

  return (
    <article
      id={project.slug}
      className="case"
      data-reveal
      data-has-media={project.shots.length > 0}
      style={{ "--accent": project.accent } as React.CSSProperties}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="case-media" data-reveal="left">
        {shot ? (
          <>
            <button
              type="button"
              className="case-stage"
              data-device={shot.device}
              onClick={() => setZoom(selected)}
              aria-label={`Enlarge: ${shot.alt}`}
            >
              <Frame shot={shot} url={shot.device === "desktop" ? liveUrl : undefined} />
            </button>
            {project.shots.length > 1 && (
              <div className="thumbs" role="group" aria-label={`${project.name} screenshots`}>
                {project.shots.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    className="thumb"
                    data-device={s.device}
                    aria-pressed={i === selected}
                    aria-label={s.alt}
                    onClick={() => setSelected(i)}
                  >
                    <img src={s.src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="case-cover" aria-hidden="true">
            <div className="cover-phone">
              <span className="cover-bar" />
              <span className="cover-hero" />
              <span className="cover-line" />
              <span className="cover-line short" />
              <span className="cover-cards">
                <span />
                <span />
              </span>
              <span className="cover-tab" />
            </div>
            <span className="cover-mark">{project.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="case-body" data-reveal="right" style={{ "--delay": "120ms" } as React.CSSProperties}>
        <p className="case-meta">
          <span className="case-kind">{project.kind}</span>
          {project.context}
        </p>
        <h2 id={`${project.slug}-title`}>{project.name}</h2>
        <p className="case-tagline">{project.tagline}</p>
        <dl className="case-story">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Approach</dt>
            <dd>{project.approach}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd>{project.outcome}</dd>
          </div>
        </dl>
        <ul className="bullets">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="chips" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <div className="actions">
            {project.links.map((link, i) => (
              <a
                key={link.href}
                className={i === 0 ? "button" : "button button-ghost"}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} <ArrowIcon />
              </a>
            ))}
          </div>
        )}
      </div>

      {zoom !== null && (
        <Lightbox shots={project.shots} index={zoom} onChange={setZoom} onClose={() => setZoom(null)} />
      )}
    </article>
  );
}
