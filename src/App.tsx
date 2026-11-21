import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { CommandPalette, type Action } from "./components/CommandPalette";
import { profile, projects } from "./content";
import { parseHash, type View } from "./lib";
import { Home } from "./views/Home";
import { OffDutyView } from "./views/OffDutyView";
import { ProjectsView } from "./views/ProjectsView";
import { WorkView } from "./views/WorkView";
import { CvView } from "./views/CvView";

const TITLES: Record<View, string> = {
  cv: `CV · ${profile.name}`,
  home: `${profile.name} · Mobile & Web Engineer`,
  work: `Experience · ${profile.name}`,
  projects: `Projects · ${profile.name}`,
  "off-duty": `Off the clock · ${profile.name}`,
};

/** Runs a state change inside a view transition when the browser supports it. */
function transition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (doc.startViewTransition && !reduced) doc.startViewTransition(() => flushSync(update));
  else update();
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [palette, setPalette] = useState(false);

  // Views live in the URL hash, so the back button and shared links work.
  useEffect(() => {
    const onHash = () => {
      const next = parseHash(window.location.hash);
      transition(() => setRoute(next));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = useCallback((hash: string) => {
    if (window.location.hash === hash || (hash === "#" && !window.location.hash)) return;
    window.location.hash = hash;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPalette((open) => !open);
      } else if (e.key === "/" && !typing && !palette) {
        e.preventDefault();
        setPalette(true);
      } else if (e.key === "Escape" && !palette && route.view !== "home") {
        go("#");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, palette, route.view]);

  useEffect(() => {
    document.title = TITLES[route.view];
    if (!route.anchor) window.scrollTo({ top: 0 });
  }, [route]);

  const actions = useMemo<Action[]>(
    () => [
      { id: "home", label: "Home", hint: "Page", run: () => go("#") },
      { id: "cv", label: "CV", hint: "Page", keywords: "resume curriculum pdf download", run: () => go("#cv") },
      { id: "work", label: "Experience", hint: "Page", keywords: "work cv resume skills", run: () => go("#work") },
      { id: "projects", label: "Projects", hint: "Page", keywords: "case studies portfolio", run: () => go("#projects") },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.name,
        hint: `${p.kind} · ${p.context}`,
        keywords: p.stack.join(" "),
        run: () => go(`#projects/${p.slug}`),
      })),
      ...projects.flatMap((p) =>
        p.links.map((l) => ({
          id: `l-${l.href}`,
          label: `${p.name}: ${l.label}`,
          hint: "Opens in a new tab",
          keywords: "link open",
          run: () => window.open(l.href, "_blank", "noopener,noreferrer"),
        })),
      ),
      ...(profile.email
        ? [
            {
              id: "email",
              label: "Email me",
              hint: profile.email,
              keywords: "contact hire mail",
              run: () => {
                window.location.href = `mailto:${profile.email}`;
              },
            },
          ]
        : []),
      {
        id: "github",
        label: "GitHub profile",
        hint: "Opens in a new tab",
        keywords: "code repos",
        run: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      },
    ],
    [go],
  );

  const back = () => go("#");
  const openPastime = useCallback((slug: string | null) => go(slug ? `#off-duty/${slug}` : "#off-duty"), [go]);

  return (
    <>
      {route.view === "home" && <Home onPalette={() => setPalette(true)} onUnlock={() => go("#off-duty")} />}
      {route.view === "work" && <WorkView onBack={back} anchor={route.anchor} />}
      {route.view === "cv" && <CvView onBack={back} />}
      {route.view === "projects" && <ProjectsView onBack={back} anchor={route.anchor} />}
      {route.view === "off-duty" && (
        <OffDutyView onBack={back} slug={route.anchor} onOpen={openPastime} />
      )}
      <CommandPalette actions={actions} open={palette} onClose={() => setPalette(false)} />
    </>
  );
}
