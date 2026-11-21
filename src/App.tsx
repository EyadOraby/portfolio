import { useCallback, useEffect, useState } from "react";
import { Phone } from "./components/Phone";
import { profile } from "./content";
import { OffDutyView } from "./views/OffDutyView";
import { ProjectsView } from "./views/ProjectsView";
import { WorkView } from "./views/WorkView";

export type View = "home" | "work" | "projects" | "off-duty";

const VIEWS: View[] = ["work", "projects", "off-duty"];

function viewFromHash(): View {
  const hash = window.location.hash.replace("#", "") as View;
  return VIEWS.includes(hash) ? hash : "home";
}

export default function App() {
  const [view, setView] = useState<View>(viewFromHash);

  // Views live in the URL hash, so the back button and shared links work.
  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const open = useCallback((next: View) => {
    window.location.hash = next === "home" ? "" : next;
    setView(next);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view !== "home") open("home");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, view]);

  useEffect(() => {
    const titles: Record<View, string> = {
      home: `${profile.name} · Mobile & Web Engineer`,
      work: `Work · ${profile.name}`,
      projects: `Projects · ${profile.name}`,
      "off-duty": `Off the clock · ${profile.name}`,
    };
    document.title = titles[view];
    window.scrollTo({ top: 0 });
  }, [view]);

  if (view === "work") return <WorkView onBack={() => open("home")} />;
  if (view === "projects") return <ProjectsView onBack={() => open("home")} />;
  if (view === "off-duty") return <OffDutyView onBack={() => open("home")} />;

  return (
    <main className="home">
      <section className="intro">
        <p className="eyebrow">Hello, I'm</p>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="tagline">{profile.tagline}</p>
        <p className="hint">Tap an app on the phone to look around.</p>
      </section>
      <Phone onOpen={open} />
    </main>
  );
}
