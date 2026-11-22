import { t } from "../i18n";
import { useEffect } from "react";
import { Portrait3D } from "../components/Portrait3D";
import { ProShowcase } from "../components/ProShowcase";
import { ArrowIcon, GithubIcon } from "../components/Icons";
import { education, experience, principles, profile, skills } from "../content";
import { ViewShell } from "./ViewShell";

export function WorkView({
  onBack,
  anchor,
}: {
  onBack: () => void;
  anchor: string | null;
}) {
  useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(`app-${anchor}`);
    if (!el) return;
    el.querySelectorAll("[data-reveal]").forEach((n) =>
      n.classList.add("revealed"),
    );
    requestAnimationFrame(() => el.scrollIntoView({ block: "center" }));
  }, [anchor]);

  return (
    <ViewShell
      title={t("Experience")}
      kicker={t("Professional")}
      accent="#7c8cff"
      onBack={onBack}
    >
      <div className="hire-card" data-reveal>
        <div className="hire-photo">
          <Portrait3D
            className="hire-photo-3d"
            label={t("Eyad Oraby, Flutter engineer")}
          />
        </div>
        <span className="hire-status">
          <span className="hire-dot" aria-hidden="true" />
          {t("Open to work")}
        </span>
        <p className="hire-title">
          {t("Flutter engineer, ready for the next team.")}
        </p>
        <p className="hire-lead">{profile.summary}</p>
        <div className="actions">
          <a
            className="button"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon /> {t("GitHub")}
          </a>
          <a
            className="button button-ghost"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("LinkedIn")} <ArrowIcon />
          </a>
          <a className="button button-ghost" href="#cv">
            {t("Download CV")}
          </a>
          {profile.email && (
            <a className="button button-ghost" href={`mailto:${profile.email}`}>
              {t("Email me")}
            </a>
          )}
        </div>
      </div>

      <ProShowcase />

      <section aria-labelledby="exp-heading">
        <h2 id="exp-heading">{t("Where I've worked")}</h2>
        <ol className="timeline">
          {experience.map((item) => (
            <li
              key={`${item.place}-${item.period}`}
              className="timeline-item"
              data-reveal="left"
            >
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
        <h2 id="how-heading">{t("How I work")}</h2>
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
        <h2 id="skills-heading">{t("Toolkit")}</h2>
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
        <h2 id="edu-heading">{t("Education")}</h2>
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
