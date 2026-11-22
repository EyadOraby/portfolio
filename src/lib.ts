/** Small pure helpers, kept apart from the components so they are easy to test. */

export type View = "home" | "work" | "projects" | "off-duty" | "cv";

const VIEWS: View[] = ["work", "projects", "off-duty", "cv"];

/** "#projects/makers-market" → { view: "projects", anchor: "makers-market" }. */
export function parseHash(hash: string): { view: View; anchor: string | null } {
  const [first = "", anchor = ""] = hash.replace(/^#\/?/, "").split("/");
  const view = VIEWS.includes(first as View) ? (first as View) : "home";
  return { view, anchor: view === "home" ? null : anchor || null };
}

/** How far a press-and-hold has got, from 0 to 1. */
export function holdProgress(elapsedMs: number, durationMs: number): number {
  if (durationMs <= 0) return 1;
  return Math.min(1, Math.max(0, elapsedMs / durationMs));
}

/** Wraps an index around a list, in either direction. */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export type Command = { id: string; label: string; hint: string; keywords?: string };

/**
 * Filters palette commands: every word typed must appear in the label,
 * hint or keywords. Label matches that start with the query come first.
 */
export function filterCommands<T extends Command>(commands: T[], query: string): T[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return commands;
  const hits = commands.filter((c) => {
    const text = `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });
  const q = words.join(" ");
  return hits
    .map((c, i) => ({ c, i, rank: c.label.toLowerCase().startsWith(q) ? 0 : 1 }))
    .sort((a, b) => a.rank - b.rank || a.i - b.i)
    .map((x) => x.c);
}
