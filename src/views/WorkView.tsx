import { Frame } from "../components/Frame";
import { ArrowIcon, GithubIcon } from "../components/Icons";
import { experience, principles, profile, skills, type ProApp } from "../content";
import { ViewShell } from "./ViewShell";

export function WorkView({ onBack }: { onBack: () => void }) {
  return (
    <ViewShell title="Experience" kicker="Professional" accent="#7c8cff" onBack={onBack}>
      <p className="lead">{profile.summary}</p>
      <div className="actions">
        <a className="button" href={profile.github} target="_blank" rel="noopener noreferrer">
          <GithubIcon /> GitHub
        </a>
        <a className="button button-ghost" href="#projects">
          Case studies <ArrowIcon />
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

      <section aria-labelledby="exp-heading">
        <h2 id="exp-heading">Where I've worked</h2>
        <ol className="timeline">
          {experience.map((item) => (
            <li key={item.title} className="timeline-item" data-reveal="left">
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
              {item.apps && item.apps.length > 0 && (
                <div className="pro-apps">
                  {item.apps.map((app) => (
                    <ProAppCard key={app.name} app={app} />
                  ))}
                </div>
              )}
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
        <h2 id="skills-heading">Skills</h2>
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
    </ViewShell>
  );
}

function ProAppCard({ app }: { app: ProApp }) {
  const shot = app.shots[0];
  return (
    <article className="pro-app" data-reveal="up" style={{ "--accent": app.accent } as React.CSSProperties}>
      {shot && (
        <div className="pro-app-shot">
          <Frame shot={shot} />
        </div>
      )}
      <div className="pro-app-body">
        <p className="pro-app-meta">
          <span className="pill-status" data-status={app.status === "Live" ? "Active" : "Exploring"}>
            {app.status}
          </span>
          {app.platforms.join(" · ")}
        </p>
        <h4>{app.name}</h4>
        <p>{app.summary}</p>
        {app.links.length > 0 && (
          <div className="pro-app-links">
            {app.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <ArrowIcon />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
