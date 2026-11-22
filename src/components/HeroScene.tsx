import { CharacterArt } from "./Character";

/** Brand colours of shipped apps, for the tiles on the phone. */
const tiles = [
  "#C6F43A",
  "#13407a",
  "#E8B84A",
  "#025866",
  "#FF7A55",
  "#9DB4E6",
  "#24538e",
  "#A8F030",
  "#bfc9dc",
  "#8ea2ff",
  "#ffd38a",
  "#5f9b6b",
];

/**
 * The hero's background: a phone full of shipped apps and a laptop, drawn
 * in faint lines, with Eyad in the suit pointing at the phone. Decorative
 * only; hidden on narrower screens where it would crowd the text.
 */
export function HeroScene() {
  return (
    <svg className="hero-scene" viewBox="0 0 520 420" aria-hidden="true">
      {/* Laptop behind */}
      <g
        className="hero-scene-laptop"
        fill="none"
        stroke="rgba(142, 162, 255, 0.28)"
        strokeWidth={2}
      >
        <rect
          x={170}
          y={210}
          width={250}
          height={150}
          rx={10}
          fill="rgba(17, 20, 28, 0.55)"
        />
        <path d="M150 372 h290 l-18 -12 h-254 z" fill="rgba(23, 27, 38, 0.8)" />
        <path
          d="M195 240 h120 M195 262 h170 M195 284 h90"
          stroke="rgba(126, 224, 168, 0.35)"
          strokeLinecap="round"
        />
      </g>
      {/* Phone with app tiles */}
      <g className="hero-scene-phone">
        <rect
          x={40}
          y={40}
          width={170}
          height={330}
          rx={28}
          fill="rgba(17, 20, 28, 0.85)"
          stroke="rgba(142, 162, 255, 0.45)"
          strokeWidth={2.5}
        />
        <rect
          x={100}
          y={54}
          width={50}
          height={8}
          rx={4}
          fill="rgba(142, 162, 255, 0.35)"
        />
        {tiles.map((c, i) => (
          <rect
            key={c}
            x={60 + (i % 3) * 46}
            y={84 + Math.floor(i / 3) * 52}
            width={36}
            height={36}
            rx={10}
            fill={c}
            opacity={0.85}
          />
        ))}
        <rect
          x={60}
          y={300}
          width={128}
          height={44}
          rx={14}
          fill="rgba(142, 162, 255, 0.14)"
        />
      </g>
      {/* A soft light behind Eyad so the dark suit reads on the dark card */}
      <defs>
        <radialGradient id="hero-glow">
          <stop offset="0%" stopColor="rgba(142, 162, 255, 0.32)" />
          <stop offset="100%" stopColor="rgba(142, 162, 255, 0)" />
        </radialGradient>
      </defs>
      <ellipse cx={395} cy={220} rx={120} ry={180} fill="url(#hero-glow)" />
      {/* Eyad, pointing at the phone */}
      <g transform="translate(300 64) scale(0.95)">
        <CharacterArt outfit="suit" pose="point" flip />
      </g>
    </svg>
  );
}
