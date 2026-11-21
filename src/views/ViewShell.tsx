import type { ReactNode } from "react";

/** Full-screen "app" with a back button, used by every view. */
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
  return (
    <div className="view" style={{ "--view-accent": accent } as React.CSSProperties}>
      <header className="view-header">
        <button type="button" className="back" onClick={onBack}>
          <span aria-hidden="true">‹</span> Home
        </button>
        <span className="view-kicker">{kicker}</span>
      </header>
      <main className="view-body">
        <h1 className="view-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
