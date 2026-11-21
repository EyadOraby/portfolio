import { t } from "../i18n";
import type { ReactNode } from "react";
import { LangToggle } from "../components/LangToggle";
import { BackIcon } from "../components/Icons";
import { useReveal } from "../components/hooks";

/** Page layout with a sticky back bar, used by every view. */
export function ViewShell({
  title,
  kicker,
  accent,
  onBack,
  children,
}: {
  title: string;
  kicker: string;
  accent: string;
  onBack: () => void;
  children: ReactNode;
}) {
  useReveal();
  return (
    <div className="view" style={{ "--view-accent": accent } as React.CSSProperties}>
      <header className="view-header">
        <button type="button" className="back" onClick={onBack}>
          <BackIcon /> {t("Home")}
        </button>
        <span className="view-header-end">
          <span className="view-kicker">{kicker}</span>
          <LangToggle />
        </span>
      </header>
      <main className="view-body">
        <h1 className="view-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
