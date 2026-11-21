import { ArrowIcon, GithubIcon } from "../components/Icons";
import { experience, principles, profile, skills } from "../content";
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
