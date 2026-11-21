import { experience, profile, skills } from "../content";
import { ViewShell } from "./ViewShell";

export function WorkView({ onBack }: { onBack: () => void }) {
  return (
    <ViewShell title="Work" kicker="Professional" accent="#7c8cff" onBack={onBack}>
      <p className="lead">{profile.summary}</p>
      <div className="actions">
        <a className="button" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {profile.email && (
          <a className="button button-ghost" href={`mailto:${profile.email}`}>
            Email me
          </a>
        )}
      </div>

      <section aria-labelledby="exp-heading">
        <h2 id="exp-heading">Experience</h2>
        <ol className="timeline">
          {experience.map((item, i) => (
            <li key={item.title} className="timeline-item" style={{ animationDelay: `${i * 70}ms` }}>
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

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        <div className="skill-groups">
          {skills.map((group) => (
            <div key={group.group} className="card">
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
