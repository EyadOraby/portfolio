/**
 * Eyad as a flat vector character, drawn from his photos: short dark hair
 * with a high hairline at the temples, thick brows, a light beard and a
 * friendly smile. Three outfits: the black suit with an open white shirt
 * (work), the black hoodie with the red zip (home), and a white tee with
 * black shorts and aviators (travel and sport).
 *
 * Drawn in a 200 x 350 box with the feet on the bottom edge, so it can be
 * placed inside other SVGs (the room) or used on its own.
 */
export type Outfit = "suit" | "hoodie" | "travel" | "sport";
export type Pose = "stand" | "wave" | "point";

const SKIN = "#c99674";
const SKIN_SHADE = "#b07f5f";
const HAIR = "#1d1916";
const INK = "#2a211c";

export function CharacterArt({
  outfit,
  pose = "stand",
  flip = false,
}: {
  outfit: Outfit;
  pose?: Pose;
  flip?: boolean;
}) {
  const c = clothes(outfit);
  return (
    <g
      className={`char char-${pose}`}
      transform={flip ? "translate(200 0) scale(-1 1)" : undefined}
    >
      <g className="char-body">
        {/* Back arm (his left, our right) is drawn first so the torso overlaps it. */}
        <g className="char-arm char-arm-back">
          <Arm
            sleeve={c.sleeve}
            short={c.shortSleeve}
            stripe={c.stripe}
            x={122}
          />
        </g>

        {/* Legs and shoes */}
        <rect
          x={80.5}
          y={204}
          width={19}
          height={c.shorts ? 60 : 126}
          rx={5}
          fill={c.legs}
        />
        <rect
          x={100.5}
          y={204}
          width={19}
          height={c.shorts ? 60 : 126}
          rx={5}
          fill={c.legs}
        />
        {c.shorts && (
          <>
            <rect x={85} y={262} width={12} height={66} rx={5} fill={SKIN} />
            <rect x={104} y={262} width={12} height={66} rx={5} fill={SKIN} />
          </>
        )}
        <path d="M78 330 h24 q2 10 -6 12 h-20 q-6 0 -4 -6 z" fill={c.shoes} />
        <path d="M100 330 h24 q6 6 2 12 h-22 q-6 -2 -4 -12 z" fill={c.shoes} />

        {/* Torso */}
        <path
          d="M71 118 q2 -12 17 -14 h24 q15 2 17 14 l2 90 q-31 8 -62 0 z"
          fill={c.top}
        />
        {outfit === "suit" && (
          <>
            {/* Open white shirt, lapels and a belt */}
            <path d="M89 104 h22 l-11 54 z" fill="#f5f4ef" />
            <path
              d="M89 104 l-4 12 l9 8 z M111 104 l4 12 l-9 8 z"
              fill="#ffffff"
            />
            <path
              d="M87 106 l13 50 l-17 -30 z M113 106 l-13 50 l17 -30 z"
              fill="#111318"
            />
            <circle cx={100} cy={172} r={1.8} fill="#3a3d47" />
            <rect x={71} y={202} width={60} height={6} fill="#0d0f14" />
          </>
        )}
        {outfit === "hoodie" && (
          <>
            {/* Hood behind the neck, zip with a red pull, chest logo */}
            <path
              d="M84 104 q16 14 32 0 q-4 10 -16 12 q-12 -2 -16 -12z"
              fill="#1a1c22"
            />
            <line
              x1={100}
              y1={112}
              x2={100}
              y2={210}
              stroke="#3b3f4a"
              strokeWidth={2}
            />
            <rect x={98} y={130} width={4} height={10} rx={2} fill="#d23b3b" />
            <path d="M108 160 l6 0 l-2 8 l-6 0 z" fill="#d7d9de" />
          </>
        )}
        {(outfit === "travel" || outfit === "sport") && (
          <path
            d="M90 104 q10 8 20 0"
            fill="none"
            stroke="#e3e1da"
            strokeWidth={3}
          />
        )}

        {/* Front arm (his right, our left) */}
        <g className="char-arm char-arm-front">
          <Arm
            sleeve={c.sleeve}
            short={c.shortSleeve}
            stripe={c.stripe}
            x={64}
          />
        </g>

        {/* Neck and head */}
        <rect x={92} y={88} width={16} height={18} rx={5} fill={SKIN_SHADE} />
        <Head sunglasses={outfit === "travel"} />
      </g>
    </g>
  );
}

function Arm({
  sleeve,
  short,
  stripe,
  x,
}: {
  sleeve: string;
  short: boolean;
  stripe?: string;
  x: number;
}) {
  return (
    <>
      <rect
        x={x}
        y={112}
        width={14}
        height={short ? 34 : 82}
        rx={7}
        fill={sleeve}
      />
      {stripe && (
        <rect x={x + 9} y={122} width={3} height={62} rx={1.5} fill={stripe} />
      )}
      {short && (
        <rect x={x + 1.5} y={140} width={11} height={56} rx={5.5} fill={SKIN} />
      )}
      <circle cx={x + 7} cy={short ? 199 : 198} r={6.5} fill={SKIN} />
    </>
  );
}

function Head({ sunglasses }: { sunglasses: boolean }) {
  return (
    <g className="char-head">
      {/* Ears */}
      <ellipse cx={78.5} cy={70} rx={4} ry={6} fill={SKIN_SHADE} />
      <ellipse cx={121.5} cy={70} rx={4} ry={6} fill={SKIN_SHADE} />
      {/* Face */}
      <path
        d="M79 62 q0 -26 21 -26 q21 0 21 26 q0 20 -8 28 q-6 7 -13 7 q-7 0 -13 -7 q-8 -8 -8 -28 z"
        fill={SKIN}
      />
      {/* Light beard along the jaw and a faint moustache */}
      <path
        d="M80 72 q2 20 20 24 q18 -4 20 -24 q-3 14 -20 17 q-17 -3 -20 -17 z"
        fill={INK}
        opacity={0.17}
      />
      <path
        d="M92 80 q8 -3 16 0"
        fill="none"
        stroke={INK}
        strokeOpacity={0.2}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Hair: short, fuller on top, high at the temples */}
      <path
        d="M80 57 q-3 -26 20 -27 q25 -2 22 27 q-3 -10 -9 -13 q-6 -3 -13 -3 q-8 0 -13 3 q-5 4 -7 13 z"
        fill={HAIR}
      />
      <path d="M86 38 q9 -9 24 -4 q-11 -1 -18 5 z" fill="#332b25" />
      {/* Short sides above the ears */}
      <path
        d="M79.5 56 q-1 7 0.5 13 l2.4 0 q-0.8 -7 0.4 -13 z M120.5 56 q1 7 -0.5 13 l-2.4 0 q0.8 -7 -0.4 -13 z"
        fill={HAIR}
        opacity={0.85}
      />
      {/* Brows */}
      <path
        d="M85.5 60 q6 -4 12 -1"
        fill="none"
        stroke={HAIR}
        strokeWidth={3.4}
        strokeLinecap="round"
      />
      <path
        d="M102.5 59 q6 -3 12 1"
        fill="none"
        stroke={HAIR}
        strokeWidth={3.4}
        strokeLinecap="round"
      />
      {sunglasses ? (
        <g>
          <path
            d="M84 64 h14 q1 9 -7 10 q-7 0 -7 -10 z M102 64 h14 q0 10 -7 10 q-8 -1 -7 -10 z"
            fill="#111"
          />
          <path
            d="M98 65 h4 M84 64 l-5 -1 M116 64 l5 -1"
            stroke="#8b8f99"
            strokeWidth={1.4}
          />
        </g>
      ) : (
        <g className="char-eyes">
          <ellipse cx={91.5} cy={67} rx={2.3} ry={2.7} fill={INK} />
          <ellipse cx={108.5} cy={67} rx={2.3} ry={2.7} fill={INK} />
        </g>
      )}
      {/* Nose and smile */}
      <path
        d="M100.5 68 q-3 7 0 9"
        fill="none"
        stroke={SKIN_SHADE}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M90.5 82.5 Q100 92 109.5 82.5 Q100 86.5 90.5 82.5 Z"
        fill="#fffaf3"
        stroke={INK}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </g>
  );
}

function clothes(outfit: Outfit) {
  switch (outfit) {
    case "suit":
      return {
        top: "#1b1d24",
        sleeve: "#1b1d24",
        legs: "#15171d",
        shoes: "#0a0a0c",
        shorts: false,
        shortSleeve: false,
      };
    case "hoodie":
      return {
        top: "#23262e",
        sleeve: "#23262e",
        legs: "#2c3446",
        shoes: "#e9e9e4",
        shorts: false,
        shortSleeve: false,
        stripe: "#d23b3b",
      };
    case "travel":
    case "sport":
      return {
        top: "#f4f3ee",
        sleeve: "#f4f3ee",
        legs: "#16181d",
        shoes: "#f4f3ee",
        shorts: true,
        shortSleeve: true,
      };
  }
}

/** The character on its own, for use outside the room. */
export function Character({
  outfit,
  pose = "stand",
  className,
  label,
}: {
  outfit: Outfit;
  pose?: Pose;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 350"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <CharacterArt outfit={outfit} pose={pose} />
    </svg>
  );
}
