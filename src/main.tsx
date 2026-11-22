import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyDocumentLang } from "./i18n";
import "./styles.css";
import "./floating.css";

applyDocumentLang();

// Opened straight on Projects: fetch that page's code now, alongside the
// first screenshot that index.html already preloads.
if (/^#projects(\/|$)/.test(window.location.hash)) {
  void import("./views/ProjectsView");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
