import { useState } from "react";
import { projects, type Project } from "../content";
import { ViewShell } from "./ViewShell";

type Filter = "All" | Project["kind"];
const FILTERS: Filter[] = ["All", "Mobile", "Web"];

export function ProjectsView({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<string | null>(projects[0]?.name ?? null);
  const shown = projects.filter((p) => filter === "All" || p.kind === filter);

  return (
    <ViewShell title="Projects" kicker="Freelance & portfolio" accent="#ff8a65" onBack={onBack}>
      <p className="lead">
        Client work and personal projects, mostly Flutter apps with a few full-stack web apps.
        Open a card for the details.
      </p>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="filter"
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="projects">
        {shown.map((project, i) => {
          const expanded = open === project.name;
          return (
            <li
              key={project.name}
              className="project"
              style={{ "--accent": project.accent, animationDelay: `${i * 60}ms` } as React.CSSProperties}
            >
              <button
                type="button"
                className="project-head"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : project.name)}
              >
                <span className="project-dot" aria-hidden="true" />
                <span className="project-name">{project.name}</span>
                <span className="project-kind">{project.kind}</span>
                <span className="chevron" aria-hidden="true">
                  ›
                </span>
              </button>
              <p className="project-summary">{project.summary}</p>
              <div className="project-more" hidden={!expanded}>
                <ul className="bullets">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <ul className="chips">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {project.links.length > 0 && (
                  <div className="actions">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className="button button-ghost"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="whisper">Some things are kept behind the status bar.</p>
    </ViewShell>
  );
}
