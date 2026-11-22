import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { t } from "../i18n";
import { pastimes } from "../content";
import { CharacterArt, type Outfit, type Pose } from "./Character";

/**
 * "Explore the room": an illustrated room with one corner per interest. The
 * visitor is guided from stop to stop; at each one a small thing can be
 * tapped (the map, the screen, the ball...) before moving on. The camera
 * pans between stops; with reduced motion it simply cuts.
 */
type Stop = {
  id: string;
  title: string;
  line: string;
  hint: string;
  /** Pastime pages this corner leads to. */
  links: string[];
  /** Camera framing in room units (the room is 1600 x 900). */
  view: [number, number, number, number];
};

const W = 1600;
const H = 900;

export const stops = (): Stop[] => [
  {
    id: "travel",
    title: t("The travel wall"),
    line: t(
      "Pins for the places I've been, and more for the ones on the list.",
    ),
    hint: t("Tap the map to fly"),
    links: ["travelling"],
    view: [60, 40, 560, 315],
  },
  {
    id: "desk",
    title: t("The desk"),
    line: t(
      "Where the tech side lives: servers, networks, security and how computers really work.",
    ),
    hint: t("Tap the screen"),
    links: ["devops", "networking", "cybersecurity", "computer-architecture"],
    view: [40, 330, 560, 315],
  },
  {
    id: "gaming",
    title: t("The gaming corner"),
    line: t(
      "A controller always within reach. Good games are good design you can hold.",
    ),
    hint: t("Press the controller"),
    links: [],
    view: [520, 360, 480, 270],
  },
  {
    id: "collector",
    title: t("The collector's shelf"),
    line: t(
      "Model cars, motorbikes and a frame of coins and banknotes from around the world.",
    ),
    hint: t("Give the car a push"),
    links: ["cars", "coins-and-banknotes"],
    view: [840, 150, 400, 225],
  },
  {
    id: "sports",
    title: t("The sports corner"),
    line: t(
      "Basketball, football and martial arts: the hours that keep everything else in balance.",
    ),
    hint: t("Take the shot"),
    links: ["basketball", "football", "martial-arts"],
    view: [1000, 268, 600, 337.5],
  },
  {
    id: "reading",
    title: t("The reading nook"),
    line: t(
      "An armchair, a stack of books and a chess game that never quite finishes.",
    ),
    hint: t("Open the book"),
    links: ["chess"],
    view: [960, 520, 640, 360],
  },
];

export function Room({ onOpen }: { onOpen: (slug: string) => void }) {
  const list = stops();
  // -1 is the whole room, before the tour starts.
  const [at, setAt] = useState(-1);
  const [played, setPlayed] = useState<Record<string, boolean>>({});
  const panel = useRef<HTMLDivElement>(null);
  const stop = at >= 0 ? list[at] : null;
  const [x, y, w] = stop ? stop.view : [0, 0, W, H];
  const scale = W / w;

  const go = useCallback(
    (next: number) => {
      setAt(Math.max(-1, Math.min(list.length - 1, next)));
    },
    [list.length],
  );

  useEffect(() => {
    if (at >= 0) panel.current?.focus({ preventScroll: true });
  }, [at]);

  const play = (id: string) => {
    setPlayed((p) => ({ ...p, [id]: false }));
    // Restart the animation on every tap.
    requestAnimationFrame(() => setPlayed((p) => ({ ...p, [id]: true })));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(at + 1);
    else if (e.key === "ArrowLeft") go(at - 1);
    else return;
    e.preventDefault();
    e.stopPropagation();
  };

  const hot = (id: string, label: string) => ({
    role: "button",
    tabIndex: stop?.id === id ? 0 : -1,
    "aria-label": label,
    className: `room-hot${stop?.id === id ? " is-live" : ""}`,
    onClick: () => stop?.id === id && play(id),
    onKeyDown: (e: KeyboardEvent<SVGGElement>) => {
      if ((e.key === "Enter" || e.key === " ") && stop?.id === id) {
        e.preventDefault();
        play(id);
      }
    },
  });

  const flags = Object.entries(played)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(" ");

  return (
    <section
      className="room"
      aria-label={t("Explore the room")}
      onKeyDown={onKeyDown}
    >
      <div className="room-stage">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="room-svg"
          data-played={flags}
          data-at={stop?.id ?? "all"}
        >
          <g
            className="room-camera"
            style={{ transform: `scale(${scale}) translate(${-x}px, ${-y}px)` }}
          >
            <RoomArt hot={hot} at={stop?.id ?? "all"} />
          </g>
        </svg>
        {at < 0 && (
          <div className="room-intro">
            <p className="room-eyebrow">{t("Off the clock")}</p>
            <h2>{t("Explore the room")}</h2>
            <p>
              {t(
                "Six corners, one for each thing I love doing. I'll walk you round.",
              )}
            </p>
            <button type="button" className="button" onClick={() => go(0)}>
              {t("Start the tour")}
            </button>
          </div>
        )}
      </div>

      {stop && (
        <div
          className="room-panel"
          ref={panel}
          tabIndex={-1}
          aria-live="polite"
        >
          <div className="room-progress" aria-hidden="true">
            {list.map((s, i) => (
              <span key={s.id} data-on={i <= at ? "" : undefined} />
            ))}
          </div>
          <p className="room-step">
            {at + 1} / {list.length}
          </p>
          <h3>{stop.title}</h3>
          <p>{stop.line}</p>
          <p className="room-hint" data-done={played[stop.id] ? "" : undefined}>
            {played[stop.id] ? t("Nice.") : stop.hint}
          </p>
          {stop.links.length > 0 && (
            <div className="room-links">
              {stop.links.map((slug) => {
                const p = pastimes.find((x) => x.slug === slug);
                return p ? (
                  <button
                    key={slug}
                    type="button"
                    className="room-chip"
                    onClick={() => onOpen(slug)}
                  >
                    {p.title}
                  </button>
                ) : null;
              })}
            </div>
          )}
          <div className="room-nav">
            <button
              type="button"
              className="button button-ghost"
              onClick={() => go(at - 1)}
            >
              {at === 0 ? t("Whole room") : t("Back")}
            </button>
            {at < list.length - 1 ? (
              <button
                type="button"
                className="button"
                onClick={() => go(at + 1)}
              >
                {t("Next corner")}
              </button>
            ) : (
              <button type="button" className="button" onClick={() => go(-1)}>
                {t("Finish the tour")}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

type Hot = (id: string, label: string) => Record<string, unknown>;

/** Where Eyad stands at each stop: centre x, top y, scale, outfit, pose, facing left. */
export const spots: Record<
  string,
  [number, number, number, Outfit, Pose, boolean]
> = {
  all: [900, 469, 0.66, "hoodie", "wave", false],
  travel: [560, 175, 0.66, "travel", "point", true],
  desk: [560, 419, 0.66, "hoodie", "point", true],
  gaming: [905, 409, 0.66, "hoodie", "stand", false],
  collector: [1212, 212, 0.5, "hoodie", "point", true],
  sports: [1090, 409, 0.66, "sport", "point", false],
  reading: [1530, 639, 0.66, "hoodie", "stand", false],
};

function Me({ at }: { at: string }) {
  const [x, top, s, outfit, pose, flip] = spots[at] ?? spots.all;
  return (
    <g
      className="room-me"
      style={{ transform: `translate(${x - 100 * s}px, ${top}px) scale(${s})` }}
    >
      <CharacterArt outfit={outfit} pose={pose} flip={flip} />
    </g>
  );
}

/** The room itself: flat shapes on a night palette, lit by the desk lamp. */
function RoomArt({ hot, at }: { hot: Hot; at: string }) {
  return (
    <>
      {/* Wall, floor and skirting */}
      <rect width={W} height={H} fill="#161b2c" />
      <rect y={640} width={W} height={260} fill="#10131f" />
      <rect y={636} width={W} height={8} fill="#232a40" />
      {/* Window with the moon */}
      <rect
        x={620}
        y={70}
        width={220}
        height={190}
        rx={8}
        fill="#0d1120"
        stroke="#2a3250"
        strokeWidth={8}
      />
      <circle cx={770} cy={128} r={26} fill="#e9e4cf" />
      <circle cx={782} cy={120} r={24} fill="#0d1120" />
      <line
        x1={730}
        y1={70}
        x2={730}
        y2={260}
        stroke="#2a3250"
        strokeWidth={6}
      />
      <circle cx={660} cy={110} r={2.5} fill="#cfd6ff" />
      <circle cx={700} cy={200} r={2} fill="#cfd6ff" />
      <circle cx={815} cy={215} r={2} fill="#cfd6ff" />

      {/* Travel wall: a map with pins and a flight path */}
      <g {...hot("travel", t("The map"))}>
        <rect
          x={120}
          y={90}
          width={360}
          height={200}
          rx={10}
          fill="#1f2840"
          stroke="#33406a"
          strokeWidth={4}
        />
        <path
          d="M150 190 q30 -40 70 -20 t70 0 q20 -40 60 -30 t70 10 v50 q-40 30 -80 10 t-80 10 q-40 -10 -60 20 t-50 -10 z"
          fill="#2c3b63"
        />
        <path
          className="room-flight"
          d="M190 210 Q 300 110 420 170"
          fill="none"
          stroke="#8ea2ff"
          strokeWidth={4}
          strokeDasharray="10 10"
        />
        <g className="room-plane">
          <path d="M0 -8 L22 0 L0 8 L4 0 Z" fill="#ffd38a" />
        </g>
        <circle className="room-pin" cx={190} cy={210} r={9} fill="#ff7a6b" />
        <circle className="room-pin" cx={420} cy={170} r={9} fill="#ff7a6b" />
        <circle cx={330} cy={150} r={7} fill="#ffd38a" />
      </g>

      {/* Desk with monitor, lamp and plant */}
      <rect x={70} y={560} width={460} height={18} rx={4} fill="#5a4033" />
      <rect x={90} y={578} width={16} height={70} fill="#4a342a" />
      <rect x={494} y={578} width={16} height={70} fill="#4a342a" />
      <g {...hot("desk", t("The screen"))}>
        <rect
          x={170}
          y={410}
          width={240}
          height={140}
          rx={10}
          fill="#0b0e18"
          stroke="#2f3754"
          strokeWidth={6}
        />
        <rect x={278} y={550} width={24} height={12} fill="#2f3754" />
        <g className="room-terminal">
          <rect
            className="room-term-line l1"
            x={190}
            y={432}
            width={150}
            height={10}
            rx={3}
            fill="#7ee0a8"
          />
          <rect
            className="room-term-line l2"
            x={190}
            y={452}
            width={110}
            height={10}
            rx={3}
            fill="#8ea2ff"
          />
          <rect
            className="room-term-line l3"
            x={190}
            y={472}
            width={170}
            height={10}
            rx={3}
            fill="#7ee0a8"
          />
          <rect
            className="room-cursor"
            x={190}
            y={492}
            width={12}
            height={12}
            fill="#eef1f7"
          />
        </g>
      </g>
      <rect x={200} y={548} width={180} height={10} rx={4} fill="#2a3048" />
      <path
        d="M460 560 L470 470 L500 450"
        fill="none"
        stroke="#b9c1d9"
        strokeWidth={5}
      />
      <path d="M485 445 l40 -10 l-6 30 z" fill="#ffd38a" />
      <circle cx={520} cy={470} r={70} fill="#ffd38a" opacity={0.06} />
      <rect x={100} y={520} width={34} height={40} rx={6} fill="#c5704f" />
      <path
        d="M117 520 q-20 -40 -10 -60 q12 25 10 60 q4 -40 22 -55 q-2 35 -22 55"
        fill="#5f9b6b"
      />

      {/* Gaming corner: TV on a low console */}
      <rect x={560} y={600} width={300} height={48} rx={6} fill="#3e2e27" />
      <g {...hot("gaming", t("The controller"))}>
        <rect
          x={590}
          y={430}
          width={240}
          height={150}
          rx={10}
          fill="#0b0e18"
          stroke="#2f3754"
          strokeWidth={6}
        />
        <g className="room-game">
          <rect x={610} y={540} width={200} height={14} fill="#5f9b6b" />
          <rect
            className="room-hero"
            x={640}
            y={516}
            width={18}
            height={24}
            fill="#ffd38a"
          />
          <rect x={700} y={500} width={30} height={14} fill="#c5704f" />
          <rect x={760} y={486} width={30} height={14} fill="#c5704f" />
          <text
            x={740}
            y={462}
            fill="#eef1f7"
            fontSize={18}
            fontFamily="monospace"
          >
            1UP
          </text>
        </g>
        <path
          d="M680 612 q-20 0 -22 16 q0 12 12 12 q8 0 14 -8 h32 q6 8 14 8 q12 0 12 -12 q-2 -16 -22 -16 z"
          fill="#232a40"
        />
        <circle cx={736} cy={624} r={4} fill="#ff7a6b" />
        <circle cx={746} cy={618} r={4} fill="#8ea2ff" />
      </g>

      {/* Collector's shelf: model car, motorbike and a coin frame */}
      <rect x={880} y={230} width={320} height={10} rx={3} fill="#5a4033" />
      <rect x={880} y={320} width={320} height={10} rx={3} fill="#5a4033" />
      <g {...hot("collector", t("The model car"))}>
        <g className="room-car">
          <path
            d="M900 222 h70 q10 0 14 -10 l10 -14 h-50 q-12 0 -18 8 l-12 6 q-14 2 -14 10 z"
            fill="#ff7a6b"
          />
          <circle cx={915} cy={224} r={7} fill="#0b0e18" />
          <circle cx={968} cy={224} r={7} fill="#0b0e18" />
        </g>
      </g>
      <g>
        <circle
          cx={1080}
          cy={300}
          r={14}
          fill="none"
          stroke="#b9c1d9"
          strokeWidth={4}
        />
        <circle
          cx={1140}
          cy={300}
          r={14}
          fill="none"
          stroke="#b9c1d9"
          strokeWidth={4}
        />
        <path
          d="M1080 300 l20 -26 h22 l18 26 M1100 274 l-6 -10 h14"
          fill="none"
          stroke="#8ea2ff"
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </g>
      <rect
        x={1030}
        y={170}
        width={150}
        height={50}
        rx={4}
        fill="#1f2840"
        stroke="#b08a4f"
        strokeWidth={4}
      />
      {[1050, 1080, 1110, 1140, 1165].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy={195}
          r={9}
          fill={i % 2 ? "#d6b16a" : "#c0c6d6"}
        />
      ))}

      {/* Sports corner: hoop, ball, belt and dumbbell */}
      <rect
        x={1380}
        y={280}
        width={150}
        height={100}
        rx={6}
        fill="#eef1f7"
        opacity={0.9}
      />
      <rect
        x={1430}
        y={320}
        width={50}
        height={36}
        fill="none"
        stroke="#ff7a6b"
        strokeWidth={4}
      />
      <ellipse
        cx={1455}
        cy={376}
        rx={34}
        ry={7}
        fill="none"
        stroke="#ff7a6b"
        strokeWidth={5}
      />
      <path
        d="M1425 380 l12 40 h36 l12 -40"
        fill="none"
        stroke="#b9c1d9"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <g {...hot("sports", t("The ball"))}>
        <g className="room-ball">
          <circle cx={1180} cy={540} r={26} fill="#e8803d" />
          <path
            d="M1154 540 h52 M1180 514 v52 M1162 520 q18 20 0 40 M1198 520 q-18 20 0 40"
            fill="none"
            stroke="#7a3a17"
            strokeWidth={2.5}
          />
        </g>
      </g>
      <rect x={1140} y={566} width={90} height={10} rx={4} fill="#5a4033" />
      <path
        d="M1270 300 v120 M1300 300 v120"
        stroke="#0b0e18"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <rect x={1262} y={292} width={46} height={14} rx={4} fill="#0b0e18" />
      <circle cx={1540} cy={610} r={22} fill="#eef1f7" />
      <path d="M1528 600 l12 -6 l12 6 l-4 14 h-16 z" fill="#232a40" />
      <rect x={1320} y={612} width={70} height={10} rx={5} fill="#5d6579" />
      <rect x={1312} y={600} width={14} height={34} rx={4} fill="#2a3048" />
      <rect x={1384} y={600} width={14} height={34} rx={4} fill="#2a3048" />

      {/* Reading nook: armchair, books and a chess board */}
      <path
        d="M1040 860 v-150 q0 -40 40 -40 h140 q40 0 40 40 v150 z"
        fill="#3d4a7a"
      />
      <rect x={1020} y={760} width={40} height={100} rx={14} fill="#33406a" />
      <rect x={1240} y={760} width={40} height={100} rx={14} fill="#33406a" />
      <rect x={1060} y={780} width={180} height={50} rx={10} fill="#4a5890" />
      <rect x={1320} y={760} width={150} height={12} rx={4} fill="#5a4033" />
      <rect x={1390} y={772} width={10} height={88} fill="#4a342a" />
      <g>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}${c}`}
              x={1340 + c * 14}
              y={704 + r * 14}
              width={14}
              height={14}
              fill={(r + c) % 2 ? "#5a4033" : "#e9e4cf"}
            />
          )),
        )}
        <rect
          x={1336}
          y={700}
          width={64}
          height={64}
          fill="none"
          stroke="#3e2e27"
          strokeWidth={4}
        />
        <path
          className="room-knight"
          d="M1424 760 h22 v-6 l-4 -4 l2 -16 q-4 -12 -16 -10 l-8 10 l6 4 l6 -4 l-8 16 z"
          fill="#eef1f7"
        />
      </g>
      <g {...hot("reading", t("The book"))}>
        <rect x={1100} y={740} width={70} height={14} rx={2} fill="#8ea2ff" />
        <rect x={1104} y={728} width={62} height={12} rx={2} fill="#ff7a6b" />
        <g className="room-book">
          <rect x={1112} y={712} width={50} height={16} rx={2} fill="#ffd38a" />
          <rect
            className="room-page"
            x={1137}
            y={692}
            width={40}
            height={30}
            rx={2}
            fill="#e9e4cf"
          />
        </g>
      </g>
      {/* Lamp light pooling on the floor */}
      <ellipse
        cx={300}
        cy={700}
        rx={260}
        ry={40}
        fill="#ffd38a"
        opacity={0.04}
      />
      <Me at={at} />
    </>
  );
}
