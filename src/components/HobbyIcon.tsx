/** Line icons for the Off the clock interests, drawn on a 24px grid. */
const paths: Record<string, string> = {
  chess:
    "M12 3.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zM9.5 10.5h5M10.2 10.5c0 3-1.3 5.2-2.7 6.6h9c-1.4-1.4-2.7-3.6-2.7-6.6M6.5 17.1h11M5.5 20.5h13",
  // A gi: shoulders, crossed lapels and the belt with its two ends.
  "martial-arts":
    "M8 3.5 3.5 6.5v14h17v-14L16 3.5M8 3.5l4 6 4-6M12 9.5 9.5 20.5M3.5 13.5h17M11 13.5l-1.6 4.2M13 13.5l1.6 4.2",
  basketball:
    "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3v18M5.7 5.6c3 3.2 3 9.6 0 12.8M18.3 5.6c-3 3.2-3 9.6 0 12.8",
  football:
    "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8.6l3.2 2.3-1.2 3.7h-4l-1.2-3.7zM12 8.6V3.2M15.2 10.9l5-1.6M14 14.6l3 4.2M10 14.6l-3 4.2M8.8 10.9l-5-1.6",
  // Airplane outline after Lucide (ISC licence).
  travelling:
    "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  cars: "M2.5 15.5v-3l2.5-1 3-4h7l3.5 4 3 .8v3.2h-2M9 15.5h6M7 13.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM17 13.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM8.5 11.5h9",
  "coins-and-banknotes":
    "M2.5 5.5h14v9h-14zM9.5 7.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM17.5 12.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM17.5 15v3",
  devops:
    "M7 8.5c-2 0-3.5 1.6-3.5 3.5S5 15.5 7 15.5c3 0 7-7 10-7 2 0 3.5 1.6 3.5 3.5S19 15.5 17 15.5c-3 0-7-7-10-7z",
  networking:
    "M12 2.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM5 15.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM19 15.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM10.9 7 6.1 16M13.1 7l4.8 9M7.2 18h9.6",
  cybersecurity:
    "M5 10.5h14v10H5zM8 10.5V8a4 4 0 0 1 8 0v2.5M12 14a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 16.4v1.8",
  "computer-architecture":
    "M6 6h12v12H6zM9.5 9.5h5v5h-5zM9 2.5V6M12 2.5V6M15 2.5V6M9 18v3.5M12 18v3.5M15 18v3.5M2.5 9H6M2.5 12H6M2.5 15H6M18 9h3.5M18 12h3.5M18 15h3.5",
};

export function HobbyIcon({ slug }: { slug: string }) {
  return (
    <svg
      className="hobby-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[slug] ?? paths.chess} />
    </svg>
  );
}
