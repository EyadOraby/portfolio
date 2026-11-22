/**
 * Four cars drawn from scratch as side profiles, in metres (x from the rear
 * bumper forwards, y up from the ground). The 3D showroom extrudes these and
 * the drag strip draws them flat, so both always match. No logos.
 */
/** Room between a tyre and its wheel arch. */
export const ARCH_GAP = 0.1;

export type ProfileOp =
  | ["M" | "L", number, number]
  | ["Q", number, number, number, number]
  /** A wheel arch over the wheel centred at x. */
  | ["ARCH", number];

export type CarModel = {
  id: string;
  name: string;
  maker: string;
  line: string;
  length: number;
  width: number;
  height: number;
  wheelRadius: number;
  wheels: [number, number];
  /** Bottom edge of the body. */
  sill: number;
  profile: ProfileOp[];
  /** Side window outline. */
  glass: [number, number][];
  windscreen: [[number, number], [number, number]];
  rearGlass: [[number, number], [number, number]];
  headlightY: number;
  taillightY: number;
  paints: { name: string; hex: string }[];
  rim: string;
  caliper: string;
  /** Wheel design: spoke count, and whether each spoke is doubled. */
  spokes: number;
  doubleSpokes: boolean;
  /** Front lights: one bar across the nose, or two slanted strips. */
  lights: "bar" | "strips";
  /** Grille: a slim slot, or a large single-frame trapezoid. */
  grille: "slot" | "frame";
  /** Arches: flared in body colour, or framed in black trim. */
  arches: "flare" | "trim";
  /** Exhaust tips across the back, as offsets from the centre in metres. */
  exhausts: number[];
  ovalExhausts: boolean;
  roofSpoiler: boolean;
  /** Accent for small trim pieces (mirror caps, light strips). */
  accent: string;
};

export const carModels: CarModel[] = [
  {
    id: "golf",
    name: "Golf R",
    maker: "Volkswagen",
    line: "The hot hatch: a 2.0-litre turbo and 4MOTION all-wheel drive.",
    length: 4.29,
    width: 1.79,
    height: 1.46,
    wheelRadius: 0.34,
    wheels: [0.8, 3.42],
    sill: 0.3,
    profile: [
      ["M", 0.06, 0.3],
      ["L", 0, 0.56],
      ["L", 0.02, 0.96],
      ["Q", 0.05, 1.22, 0.28, 1.41],
      ["Q", 1.3, 1.49, 2.28, 1.44],
      ["L", 2.98, 1.0],
      ["Q", 3.7, 0.97, 4.2, 0.84],
      ["Q", 4.3, 0.76, 4.29, 0.52],
      ["L", 4.22, 0.3],
      ["ARCH", 3.42],
      ["ARCH", 0.8],
    ],
    glass: [
      [0.62, 1.0],
      [0.38, 1.35],
      [2.24, 1.39],
      [2.86, 1.03],
    ],
    windscreen: [
      [2.28, 1.44],
      [2.98, 1.0],
    ],
    rearGlass: [
      [0.05, 1.16],
      [0.28, 1.41],
    ],
    headlightY: 0.8,
    taillightY: 0.98,
    paints: [
      { name: "Lapiz blue", hex: "#1f4fa3" },
      { name: "Pure white", hex: "#e9ebee" },
      { name: "Deep black", hex: "#16181c" },
    ],
    rim: "#b8bec7",
    caliper: "#1f4fa3",
    spokes: 5,
    doubleSpokes: true,
    lights: "bar",
    grille: "slot",
    arches: "flare",
    exhausts: [-0.62, -0.5, 0.5, 0.62],
    ovalExhausts: false,
    roofSpoiler: true,
    accent: "#c8ccd2",
  },
  {
    id: "rs3",
    name: "RS3 Saloon",
    maker: "Audi",
    line: "A 2.5-litre five-cylinder turbo with quattro.",
    length: 4.54,
    width: 1.85,
    height: 1.41,
    wheelRadius: 0.34,
    wheels: [0.92, 3.55],
    sill: 0.3,
    profile: [
      ["M", 0.06, 0.32],
      ["L", 0, 0.58],
      ["L", 0.04, 0.99],
      ["Q", 0.3, 1.03, 0.7, 1.02],
      ["L", 1.3, 1.37],
      ["Q", 1.95, 1.44, 2.55, 1.38],
      ["L", 3.12, 0.98],
      ["Q", 3.9, 0.94, 4.46, 0.8],
      ["Q", 4.56, 0.72, 4.54, 0.52],
      ["L", 4.46, 0.3],
      ["ARCH", 3.55],
      ["ARCH", 0.92],
    ],
    glass: [
      [1.1, 1.0],
      [1.32, 1.32],
      [2.52, 1.34],
      [3.0, 1.0],
    ],
    windscreen: [
      [2.55, 1.38],
      [3.12, 0.98],
    ],
    rearGlass: [
      [0.7, 1.02],
      [1.3, 1.37],
    ],
    headlightY: 0.78,
    taillightY: 0.95,
    paints: [
      { name: "Kyalami green", hex: "#3f7d3a" },
      { name: "Nardo grey", hex: "#8a8d8f" },
      { name: "Tango red", hex: "#b3201e" },
    ],
    rim: "#2b2e33",
    caliper: "#c62828",
    spokes: 10,
    doubleSpokes: false,
    lights: "strips",
    grille: "frame",
    arches: "flare",
    exhausts: [-0.6, 0.6],
    ovalExhausts: true,
    roofSpoiler: false,
    accent: "#2b2e33",
  },
  {
    id: "rs6",
    name: "RS6 Avant",
    maker: "Audi",
    line: "A 4.0-litre twin-turbo V8 estate with quattro.",
    length: 4.99,
    width: 1.95,
    height: 1.46,
    wheelRadius: 0.36,
    wheels: [0.98, 3.91],
    sill: 0.3,
    profile: [
      ["M", 0.06, 0.3],
      ["L", 0, 0.58],
      ["L", 0.03, 0.98],
      ["Q", 0.06, 1.3, 0.4, 1.43],
      ["Q", 1.8, 1.48, 2.95, 1.42],
      ["L", 3.55, 1.0],
      ["Q", 4.35, 0.95, 4.92, 0.82],
      ["Q", 5.01, 0.74, 4.99, 0.52],
      ["L", 4.92, 0.3],
      ["ARCH", 3.91],
      ["ARCH", 0.98],
    ],
    glass: [
      [0.55, 1.02],
      [0.5, 1.36],
      [2.9, 1.37],
      [3.45, 1.03],
    ],
    windscreen: [
      [2.95, 1.42],
      [3.55, 1.0],
    ],
    rearGlass: [
      [0.06, 1.2],
      [0.4, 1.43],
    ],
    headlightY: 0.8,
    taillightY: 1.0,
    paints: [
      { name: "Nardo grey", hex: "#8a8d8f" },
      { name: "Mythos black", hex: "#141518" },
      { name: "Sebring black", hex: "#2a2c30" },
    ],
    rim: "#1d1f23",
    caliper: "#c62828",
    spokes: 10,
    doubleSpokes: false,
    lights: "strips",
    grille: "frame",
    arches: "flare",
    exhausts: [-0.68, 0.68],
    ovalExhausts: true,
    roofSpoiler: true,
    accent: "#1d1f23",
  },
  {
    id: "cupra",
    name: "Formentor",
    maker: "Cupra",
    line: "Cupra's sporty crossover; the VZ5 shares Audi's five-cylinder.",
    length: 4.45,
    width: 1.84,
    height: 1.51,
    wheelRadius: 0.36,
    wheels: [0.86, 3.54],
    sill: 0.36,
    profile: [
      ["M", 0.08, 0.36],
      ["L", 0, 0.62],
      ["L", 0.03, 1.02],
      ["Q", 0.1, 1.2, 0.42, 1.3],
      ["Q", 1.1, 1.52, 2.25, 1.5],
      ["L", 2.95, 1.05],
      ["Q", 3.75, 1.02, 4.36, 0.9],
      ["Q", 4.46, 0.8, 4.45, 0.58],
      ["L", 4.36, 0.36],
      ["ARCH", 3.54],
      ["ARCH", 0.86],
    ],
    glass: [
      [0.72, 1.05],
      [0.82, 1.33],
      [2.22, 1.44],
      [2.84, 1.07],
    ],
    windscreen: [
      [2.25, 1.5],
      [2.95, 1.05],
    ],
    rearGlass: [
      [0.42, 1.3],
      [0.95, 1.45],
    ],
    headlightY: 0.86,
    taillightY: 1.05,
    paints: [
      { name: "Magnetic tech", hex: "#5b6064" },
      { name: "Petrol blue", hex: "#1d4e5a" },
      { name: "Graphene grey", hex: "#3a3d41" },
    ],
    rim: "#b87333",
    caliper: "#b87333",
    spokes: 5,
    doubleSpokes: true,
    lights: "strips",
    grille: "frame",
    arches: "trim",
    exhausts: [-0.62, -0.5, 0.5, 0.62],
    ovalExhausts: false,
    roofSpoiler: true,
    accent: "#b87333",
  },
];

/** The car's side profile as an SVG path, 42 px per metre, ground at y=74. */
export function profilePath(car: CarModel, scale = 42, ground = 74, x0 = 5) {
  const X = (x: number) => (x0 + x * scale).toFixed(1);
  const Y = (y: number) => (ground - y * scale).toFixed(1);
  const arch = car.wheelRadius + ARCH_GAP;
  let d = "";
  for (const op of car.profile) {
    if (op[0] === "M" || op[0] === "L") d += `${op[0]}${X(op[1])} ${Y(op[2])}`;
    else if (op[0] === "Q")
      d += `Q${X(op[1])} ${Y(op[2])} ${X(op[3])} ${Y(op[4])}`;
    else {
      const cx = op[1];
      d += `L${X(cx + arch)} ${Y(car.sill)}L${X(cx + arch)} ${Y(car.wheelRadius)}`;
      d += `A${(arch * scale).toFixed(1)} ${(arch * scale).toFixed(1)} 0 0 0 ${X(cx - arch)} ${Y(car.wheelRadius)}`;
      d += `L${X(cx - arch)} ${Y(car.sill)}`;
    }
  }
  return d + "Z";
}

export function glassPath(car: CarModel, scale = 42, ground = 74, x0 = 5) {
  return (
    car.glass
      .map(
        ([x, y], i) =>
          `${i ? "L" : "M"}${(x0 + x * scale).toFixed(1)} ${(ground - y * scale).toFixed(1)}`,
      )
      .join("") + "Z"
  );
}
