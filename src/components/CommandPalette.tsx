import { t } from "../i18n";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { filterCommands, wrapIndex, type Command } from "../lib";
import { SearchIcon } from "./Icons";

export type Action = Command & { run: () => void };

/** A keyboard-first launcher, opened with Ctrl+K, ⌘K or "/". */
export function CommandPalette({
  actions,
  open,
  onClose,
}: {
  actions: Action[];
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const results = useMemo(
    () => filterCommands(actions, query),
    [actions, query],
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const previous = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => input.current?.focus());
    return () => previous?.focus?.();
  }, [open]);

  if (!open) return null;

  const run = (action: Action | undefined) => {
    if (!action) return;
    onClose();
    action.run();
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <label className="palette-search">
          <SearchIcon />
          <input
            ref={input}
            value={query}
            placeholder={t("Jump to a project, page or link…")}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              results[active] ? `${listId}-${results[active].id}` : undefined
            }
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) =>
                  wrapIndex(
                    i + (e.key === "ArrowDown" ? 1 : -1),
                    results.length,
                  ),
                );
              } else if (e.key === "Enter") {
                e.preventDefault();
                run(results[active]);
              } else if (e.key === "Escape") {
                e.preventDefault();
                onClose();
              }
            }}
          />
          <kbd>Esc</kbd>
        </label>
        <ul className="palette-list" id={listId} role="listbox">
          {results.map((action, i) => (
            <li
              key={action.id}
              id={`${listId}-${action.id}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => run(action)}
            >
              <span>{action.label}</span>
              <small>{action.hint}</small>
            </li>
          ))}
          {results.length === 0 && (
            <li className="palette-empty">
              {t("Nothing matches")} “{query}”.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
