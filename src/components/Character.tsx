import { useId } from "react";

/**
 * Eyad as an avatar-style cartoon (big head, soft shading, expressive eyes),
 * drawn from his photos: wavy dark hair, thick brows, warm skin, brown eyes;
 * light stubble with the suit and a fuller beard in casual outfits. Outfits:
 * black suit with an open white shirt (work), black zip hoodie over a blue
 * tee (home), white tee with black shorts, plus aviators for travel.
 *
 * Drawn in a 200 x 350 box with the feet on the bottom edge, so it can be
 * placed inside other SVGs (the room) or used on its own.
 */
export type Outfit = "suit" | "hoodie" | "travel" | "sport";
export type Pose = "stand" | "wave" | "point";

const SKIN = "#c99674";
const SKIN_DARK = "#a8724f";
const HAIR = "#1d1714";

type Clothes = {
  top: string;
  sleeve: string;
  legs: string;
  shoes: string;
  shorts: boolean;
  shortSleeve: boolean;
};

function clothes(outfit: Outfit): Clothes {
  switch (outfit) {
    case "suit":
      return {
        top: "#1c1f27",
        sleeve: "#1c1f27",
        legs: "#171a21",
        shoes: "#0b0b0d",
        shorts: false,
        shortSleeve: false,
      };
    case "hoodie":
      return {
        top: "#202329",
        sleeve: "#202329",
        legs: "#2c3446",
        shoes: "#ecebe6",
        shorts: false,
        shortSleeve: false,
      };
    case "travel":
    case "sport":
      return {
        top: "#f5f4ef",
        sleeve: "#f5f4ef",
        legs: "#16181d",
        shoes: "#f5f4ef",
        shorts: true,
        shortSleeve: true,
      };
  }
}

export function CharacterArt({
  outfit,
  pose = "stand",
  flip = false,
}: {
  outfit: Outfit;
  pose?: Pose;
  flip?: boolean;
}) {
  // Unique gradient ids, so several characters can share a page.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;
  const c = clothes(outfit);
  const casual = outfit !== "suit";

  return (
    <g
      className={`char char-${pose}`}
      transform={flip ? "translate(200 0) scale(-1 1)" : undefined}
    >
      <defs>
        <radialGradient id={id("skin")} cx="45%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#e2b28e" />
          <stop offset="60%" stopColor={SKIN} />
          <stop offset="100%" stopColor={SKIN_DARK} />
        </radialGradient>
        <linearGradient id={id("hair")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2d25" />
          <stop offset="100%" stopColor="#120d0b" />
        </linearGradient>
        <linearGradient id={id("cloth")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.12} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.22} />
        </linearGradient>
        <linearGradient id={id("lens")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b3a35" />
          <stop offset="100%" stopColor="#0c1210" />
        </linearGradient>
      </defs>

      <g className="char-body">
        {/* Ground shadow */}
        <ellipse
          cx={100}
          cy={345}
          rx={44}
          ry={4.5}
          fill="#000"
          opacity={0.18}
        />

        {/* Back arm (his left, our right), drawn first so the torso overlaps it */}
        <g className="char-arm char-arm-back">
          <Arm x={122} c={c} url={url} />
        </g>

        {/* Legs and shoes */}
        <path d="M78 232 h21 l-1 96 h-17 z" fill={c.legs} />
        <path d="M101 232 h21 l-3 96 h-17 z" fill={c.legs} />
        <path d="M78 232 h44 l-1 30 h-42 z" fill="#000" opacity={0.08} />
        {c.shorts && (
          <>
            <path d="M83 266 h13 l-1 62 h-11 z" fill={url("skin")} />
            <path d="M104 266 h13 l-2 62 h-11 z" fill={url("skin")} />
            <path d="M77 232 h46 l-1 36 h-44 z" fill={c.legs} />
          </>
        )}
        <path d="M74 328 h26 q3 12 -6 14 h-22 q-7 0 -4 -8 z" fill={c.shoes} />
        <path d="M100 328 h26 q7 7 2 14 h-24 q-7 -3 -4 -14 z" fill={c.shoes} />
        <path
          d="M76 336 h18 M104 336 h18"
          stroke="#fff"
          strokeOpacity={0.25}
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* Torso */}
        <path
          d="M66 142 C66 129 78 124 90 122 L110 122 C122 124 134 129 134 142 L136 236 C112 242 88 242 64 236 Z"
          fill={c.top}
        />
        {outfit === "suit" && (
          <>
            <path d="M89 121 L111 121 L100 170 Z" fill="#f6f5f1" />
            <path
              d="M89 121 L85 133 L95 141 Z M111 121 L115 133 L105 141 Z"
              fill="#ffffff"
            />
            <path
              d="M86 124 L100 170 L80 140 Z M114 124 L100 170 L120 140 Z"
              fill="#12141a"
            />
            <circle cx={100} cy={186} r={2} fill="#3c404b" />
            <circle cx={100} cy={204} r={2} fill="#3c404b" />
            <path
              d="M118 150 l10 -2 l-1 5 l-9 1 z"
              fill="#ffffff"
              opacity={0.85}
            />
            <rect x={67} y={228} width={66} height={7} rx={2} fill="#0c0d11" />
          </>
        )}
        {outfit === "hoodie" && (
          <>
            <path d="M88 124 L112 124 L108 236 L92 236 Z" fill="#2f5fd0" />
            <path
              d="M82 123 C90 137 110 137 118 123 C116 133 108 139 100 139 C92 139 84 133 82 123 Z"
              fill="#15171c"
            />
            <path
              d="M89 128 L92 236 M111 128 L108 236"
              stroke="#8d929c"
              strokeWidth={1.6}
              strokeDasharray="2 2"
            />
            <path
              d="M91 131 l-1 32 M109 131 l1 32"
              stroke="#ecebe6"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path d="M118 166 l8 0 l-2 9 l-8 0 z" fill="#d9dbe0" />
          </>
        )}
        {(outfit === "travel" || outfit === "sport") && (
          <path
            d="M88 123 C93 132 107 132 112 123"
            fill="none"
            stroke="#dedcd4"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
        )}
        <path
          d="M66 142 C66 129 78 124 90 122 L110 122 C122 124 134 129 134 142 L136 236 C112 242 88 242 64 236 Z"
          fill={url("cloth")}
        />

        {/* Front arm (his right, our left) */}
        <g className="char-arm char-arm-front">
          <Arm x={62} c={c} url={url} />
        </g>

        {/* Neck and head */}
        <path d="M89 104 h22 v20 q-11 8 -22 0 z" fill={SKIN_DARK} />
        <Head url={url} sunglasses={outfit === "travel"} fullBeard={casual} />
      </g>
    </g>
  );
}

function Arm({
  x,
  c,
  url,
}: {
  x: number;
  c: Clothes;
  url: (n: string) => string;
}) {
  const len = c.shortSleeve ? 40 : 86;
  return (
    <>
      <rect x={x} y={128} width={16} height={len} rx={8} fill={c.sleeve} />
      <rect x={x} y={128} width={16} height={len} rx={8} fill={url("cloth")} />
      {c.shortSleeve && (
        <rect
          x={x + 2}
          y={160}
          width={12}
          height={52}
          rx={6}
          fill={url("skin")}
        />
      )}
      {/* Hand with a thumb */}
      <ellipse
        cx={x + 8}
        cy={c.shortSleeve ? 214 : 216}
        rx={8}
        ry={8.5}
        fill={url("skin")}
      />
      <ellipse
        cx={x + (x < 100 ? 14 : 2)}
        cy={c.shortSleeve ? 210 : 212}
        rx={3}
        ry={4.5}
        fill={url("skin")}
      />
    </>
  );
}

function Head({
  url,
  sunglasses,
  fullBeard,
}: {
  url: (n: string) => string;
  sunglasses: boolean;
  fullBeard: boolean;
}) {
  return (
    <g className="char-head">
      {/* Ears */}
      <ellipse cx={67} cy={80} rx={6.5} ry={9.5} fill={url("skin")} />
      <ellipse cx={133} cy={80} rx={6.5} ry={9.5} fill={url("skin")} />
      <path
        d="M65 76 q3 4 1 9 M135 76 q-3 4 -1 9"
        stroke={SKIN_DARK}
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
      />

      {/* Face */}
      <path
        d="M68 72 C68 48 82 38 100 38 C118 38 132 48 132 72 C132 98 122 116 100 120 C78 116 68 98 68 72 Z"
        fill={url("skin")}
      />

      {/* Beard: full and short when casual, light stubble with the suit */}
      {fullBeard ? (
        <>
          <path
            d="M68 76 C70 102 82 120 100 123 C118 120 130 102 132 76 C129 90 124 98 118 102 C111 107 106 104 100 104 C94 104 89 107 82 102 C76 98 71 90 68 76 Z"
            fill={url("hair")}
          />
          <path
            d="M87 99 C93 94 107 94 113 99 C107 98.5 93 98.5 87 99 Z"
            fill={url("hair")}
          />
        </>
      ) : (
        <>
          <path
            d="M69 80 C71 102 82 118 100 121 C118 118 129 102 131 80 C127 96 118 108 100 110 C82 108 73 96 69 80 Z"
            fill="#2a1d17"
            opacity={0.22}
          />
          <path
            d="M88 99 C94 96 106 96 112 99"
            fill="none"
            stroke="#2a1d17"
            strokeOpacity={0.28}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </>
      )}

      {/* Hair: wavy, fuller on top, short at the sides */}
      <path
        d="M66 70 C62 44 80 29 100 30 C122 29 140 44 134 70 C131 60 127 54 120 51 C110 47 90 47 80 51 C73 54 69 60 66 70 Z"
        fill={url("hair")}
      />
      {[
        [74, 47, 6],
        [82, 40, 6.5],
        [91, 35.5, 6.8],
        [100, 34, 7],
        [109, 35, 6.8],
        [118, 38.5, 6.5],
        [126, 45, 6],
      ].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} fill={url("hair")} />
      ))}
      <path
        d="M84 38 q6 -5 12 -3 M100 35 q6 -4 12 0 M117 40 q5 0 8 4"
        stroke="#fff"
        strokeOpacity={0.14}
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M66.5 62 q-1 9 1 16 l3 0 q-1.5 -8 0 -16 z M133.5 62 q1 9 -1 16 l-3 0 q1.5 -8 0 -16 z"
        fill={HAIR}
      />

      {/* Brows */}
      <path
        d="M75 63 C81 57 90 57 96 61 L95 64.5 C89 62 82 62 76 66.5 Z"
        fill={HAIR}
      />
      <path
        d="M125 63 C119 57 110 57 104 61 L105 64.5 C111 62 118 62 124 66.5 Z"
        fill={HAIR}
      />

      {sunglasses ? (
        <g>
          <path
            d="M74 70 h22 q1 12 -10 13 q-12 -1 -12 -13 z"
            fill={url("lens")}
          />
          <path
            d="M104 70 h22 q0 12 -12 13 q-11 -1 -10 -13 z"
            fill={url("lens")}
          />
          <path
            d="M74 70 h22 M104 70 h22 M96 71 q4 -3 8 0"
            stroke="#c9a35a"
            strokeWidth={1.4}
            fill="none"
          />
          <path
            d="M77 73 l5 4 M107 73 l5 4"
            stroke="#fff"
            strokeOpacity={0.35}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g className="char-eyes">
          {[85, 115].map((cx) => (
            <g key={cx}>
              <ellipse cx={cx} cy={75} rx={6.8} ry={5.2} fill="#fbfaf7" />
              <circle
                cx={cx + (cx < 100 ? 0.8 : -0.8)}
                cy={75.6}
                r={3.8}
                fill="#4a2c1c"
              />
              <circle
                cx={cx + (cx < 100 ? 0.8 : -0.8)}
                cy={75.6}
                r={1.9}
                fill="#150c08"
              />
              <circle
                cx={cx + (cx < 100 ? 2 : 0.4)}
                cy={74.2}
                r={1.15}
                fill="#ffffff"
              />
              <path
                d={`M${cx - 7.4} 74.5 C${cx - 4.5} 69.2 ${cx + 4.5} 69.2 ${cx + 7.4} 74.5`}
                stroke="#25170f"
                strokeWidth={1.9}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M${cx - 5} 79.6 C${cx - 2} 81.3 ${cx + 2} 81.3 ${cx + 5} 79.6`}
                stroke={SKIN_DARK}
                strokeWidth={1}
                fill="none"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      )}

      {/* Nose, cheeks and an open smile */}
      <path
        d="M100.5 78 C98.5 86 96 89.5 97 91.5 C99 93 101.5 93 103.5 91.5"
        stroke="#9a6747"
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={80} cy={90} rx={6} ry={3.5} fill="#d9786a" opacity={0.16} />
      <ellipse cx={120} cy={90} rx={6} ry={3.5} fill="#d9786a" opacity={0.16} />
      <path
        d="M88.5 100.5 C94 109 106 109 111.5 100.5 C106 103 94 103 88.5 100.5 Z"
        fill="#6e2f23"
      />
      <path
        d="M90.5 101.4 C95 103.6 105 103.6 109.5 101.4 L108.6 103.2 C104 105.2 96 105.2 91.4 103.2 Z"
        fill="#ffffff"
      />
    </g>
  );
}

/** The character on its own, for use outside the room. */
export function Character({
  outfit,
  pose = "stand",
  className,
  label,
  viewBox = "0 0 200 350",
}: {
  outfit: Outfit;
  pose?: Pose;
  className?: string;
  label?: string;
  /** Crop, e.g. "28 6 160 160" for head and shoulders. */
  viewBox?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <CharacterArt outfit={outfit} pose={pose} />
    </svg>
  );
}
