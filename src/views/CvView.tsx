import { isAr, t } from "../i18n";
import { useEffect } from "react";
import { LangToggle } from "../components/LangToggle";
import { BackIcon } from "../components/Icons";
import {
  alsoDelivered,
  education,
  experience,
  profile,
  proApps,
  projects,
  skills,
} from "../content";

/**
 * A one-page CV built from the same content as the site. "Download PDF"
 * serves the ATS-friendly LaTeX build in public/Eyad_Oraby_CV.pdf.
 */
export function CvView({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    document.documentElement.classList.add("cv-mode");
    return () => document.documentElement.classList.remove("cv-mode");
  }, []);

  const live = proApps.filter((a) => a.status === "Live");
  const site = typeof window === "undefined" ? "" : window.location.origin;

  return (
    <div className="cv-page">
      <div className="cv-toolbar">
        <button type="button" className="back" onClick={onBack}>
          <BackIcon /> {t("Home")}
        </button>
        <span className="view-header-end">
          <LangToggle />
          <a
            className="button"
            href={isAr ? "/Eyad_Oraby_CV_ar.pdf" : "/Eyad_Oraby_CV.pdf"}
            download={isAr ? "Eyad_Oraby_CV_ar.pdf" : "Eyad_Oraby_CV.pdf"}
          >
            {t("Download PDF")}
          </a>
        </span>
      </div>

      <article className="cv" aria-label="Curriculum vitae">
        <header className="cv-head">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv-role">{t("Flutter Software Engineer")}</p>
          </div>
          <ul className="cv-contact">
            {profile.location && <li>{profile.location}</li>}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            )}
            <li>
              <a href={profile.linkedin}>linkedin.com/in/eyad-oraby</a>
            </li>
            <li>
              <a href={profile.github}>github.com/EyadOraby</a>
            </li>
            {site && (
              <li>
                <a href={site}>{site.replace(/^https?:\/\//, "")}</a>
              </li>
            )}
          </ul>
        </header>

        <section>
          <h2>{t("Profile")}</h2>
          <p>{profile.summary}</p>
        </section>

        <section>
          <h2>{t("Experience")}</h2>
          {experience.map((e) => (
            <div key={`${e.place}-${e.period}`} className="cv-role-block">
              <div className="cv-row">
                <h3>
                  {e.title} · <span>{e.place}</span>
                </h3>
                <span className="cv-date">{e.period}</span>
              </div>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>{t("Shipped apps (17)")}</h2>
          <p className="cv-apps">
            {live.map((a) => `${a.name} (${a.year})`).join(" · ")} ·{" "}
            {t("Status Strong (iOS, retired)")} · {alsoDelivered.join(" · ")}
          </p>
        </section>

        <section>
          <h2>{t("Open-source and freelance")}</h2>
          <ul className="cv-projects">
            {projects.map((p) => (
              <li key={p.slug}>
                <strong>{p.name}</strong>: {p.tagline}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-two">
          <div>
            <h2>{t("Skills")}</h2>
            {skills.map((g) => (
              <p key={g.group}>
                <strong>{g.group}:</strong> {g.items.join(", ")}
              </p>
            ))}
          </div>
          <div>
            <h2>{t("Education")}</h2>
            {education.map((e) => (
              <p key={e.school}>
                <strong>{e.school}</strong>
                <br />
                {e.degree}
                {e.highlight && (
                  <>
                    <br />
                    {e.highlight}
                  </>
                )}
              </p>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
