import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { shotSources } from "./components/Frame";
import { projects } from "./content";
import { applyDocumentLang } from "./i18n";
import "./styles.css";
import "./floating.css";

applyDocumentLang();

// Opened straight on Projects: fetch that page's code and its first
// screenshot now, instead of one after the other once the app has rendered.
if (/^#projects(\/|$)/.test(window.location.hash)) {
  void import("./views/ProjectsView");
  const shot = projects[0]?.shots[0];
  if (shot) {
    const { srcSet, sizes } = shotSources(shot);
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = shot.src;
    link.setAttribute("imagesrcset", srcSet);
    link.setAttribute("imagesizes", sizes);
    link.setAttribute("fetchpriority", "high");
    document.head.append(link);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
