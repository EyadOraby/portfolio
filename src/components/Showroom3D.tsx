import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ARCH_GAP, type CarModel } from "../data/carModels";

/** The side profile as a three.js shape (same path as the 2D drawing). */
function profileShape(m: CarModel, ceiling = Infinity) {
  const s = new THREE.Shape();
  const arch = m.wheelRadius + ARCH_GAP;
  const y = (v: number) => Math.min(v, ceiling);
  for (const op of m.profile) {
    if (op[0] === "M") s.moveTo(op[1], y(op[2]));
    else if (op[0] === "L") s.lineTo(op[1], y(op[2]));
    else if (op[0] === "Q")
      s.quadraticCurveTo(op[1], y(op[2]), op[3], y(op[4]));
    else {
      const cx = op[1];
      s.lineTo(cx + arch, m.sill);
      s.lineTo(cx + arch, m.wheelRadius);
      s.absarc(cx, m.wheelRadius, arch, 0, Math.PI, false);
      s.lineTo(cx - arch, m.sill);
    }
  }
  s.closePath();
  return s;
}

/** The outline points between the two points nearest to `from` and `to`. */
function outlineBetween(
  shape: THREE.Shape,
  from: [number, number],
  to: [number, number],
) {
  const pts = shape.getSpacedPoints(600);
  const near = (p: THREE.Vector2, q: [number, number]) =>
    Math.hypot(p.x - q[0], p.y - q[1]);
  let a = 0;
  let b = 0;
  pts.forEach((p, i) => {
    if (near(p, from) < near(pts[a], from)) a = i;
    if (near(p, to) < near(pts[b], to)) b = i;
  });
  return a < b ? pts.slice(a, b + 1) : pts.slice(b, a + 1);
}

/**
 * A strip of glass that follows the body outline between two points, lifted
 * slightly off the paint, across the car's width.
 */
function glassStrip(
  shape: THREE.Shape,
  from: [number, number],
  to: [number, number],
  half: number,
) {
  const line = outlineBetween(shape, from, to);
  const pos: number[] = [];
  const idx: number[] = [];
  line.forEach((p, i) => {
    const prev = line[Math.max(i - 1, 0)];
    const next = line[Math.min(i + 1, line.length - 1)];
    // Outward normal of an outline traced this way round.
    let nx = -(next.y - prev.y);
    let ny = next.x - prev.x;
    const len = Math.hypot(nx, ny) || 1;
    nx /= len;
    ny /= len;
    const x = p.x + nx * 0.065;
    const y = p.y + ny * 0.065;
    pos.push(x, y, -half, x, y, half);
    if (i > 0) {
      const k = i * 2;
      idx.push(k - 2, k - 1, k, k - 1, k + 1, k);
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function wheel(m: CarModel, outward: 1 | -1) {
  const r = m.wheelRadius;
  const g = new THREE.Group();
  const tyre = new THREE.Mesh(
    new THREE.CylinderGeometry(r, r, 0.25, 40),
    new THREE.MeshStandardMaterial({ color: 0x0f1013, roughness: 0.9 }),
  );
  tyre.rotation.x = Math.PI / 2;
  g.add(tyre);
  const metal = new THREE.MeshStandardMaterial({
    color: m.rim,
    metalness: 0.85,
    roughness: 0.3,
  });
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(r * 0.74, r * 0.74, 0.255, 40),
    new THREE.MeshStandardMaterial({
      color: 0x1a1c20,
      metalness: 0.6,
      roughness: 0.5,
    }),
  );
  barrel.rotation.x = Math.PI / 2;
  g.add(barrel);
  const face = new THREE.Group();
  face.position.z = 0.13 * outward;
  for (let i = 0; i < 5; i++) {
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(r * 0.72, 0.07, 0.03),
      metal,
    );
    spoke.position.x = (r * 0.72) / 2;
    const arm = new THREE.Group();
    arm.rotation.z = (i * Math.PI * 2) / 5;
    arm.add(spoke);
    face.add(arm);
  }
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.04, 20),
    metal,
  );
  hub.rotation.x = Math.PI / 2;
  face.add(hub);
  g.add(face);
  const caliper = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.2, 0.06),
    new THREE.MeshStandardMaterial({ color: m.caliper, roughness: 0.4 }),
  );
  caliper.position.set(-r * 0.45, r * 0.15, 0.08 * outward);
  // The caliper stays put while the wheel turns.
  return { group: g, spin: [face], caliper };
}

function buildCar(m: CarModel, paint: THREE.MeshPhysicalMaterial) {
  const car = new THREE.Group();
  const shape = profileShape(m);
  const belt = Math.min(...m.glass.map(([, y]) => y));

  // Lower body: the full outline cut flat at the beltline, full width, with
  // the corners pulled in so it reads rounded from above.
  const bevel = 0.08;
  const depth = m.width - bevel * 2;
  const lowerGeo = new THREE.ExtrudeGeometry(profileShape(m, belt), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: 0.05,
    bevelSegments: 6,
    curveSegments: 32,
  });
  lowerGeo.translate(0, 0, -depth / 2);
  const pos = lowerGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const t = Math.abs(pos.getX(i) - m.length / 2) / (m.length / 2);
    pos.setZ(i, pos.getZ(i) * (1 - 0.07 * Math.pow(t, 8)));
  }
  lowerGeo.computeVertexNormals();
  car.add(new THREE.Mesh(lowerGeo, paint));

  // Cabin: the roof outline from the rear glass to the windscreen, narrower
  // than the body so the shoulders show.
  const roofLine = outlineBetween(shape, m.rearGlass[0], m.windscreen[1]);
  const cabinShape = new THREE.Shape([
    ...roofLine,
    new THREE.Vector2(roofLine[roofLine.length - 1].x, belt - 0.08),
    new THREE.Vector2(roofLine[0].x, belt - 0.08),
  ]);
  const cabinW = m.width - 0.3;
  const cabinBevel = 0.1;
  const cabinGeo = new THREE.ExtrudeGeometry(cabinShape, {
    depth: cabinW - cabinBevel * 2,
    bevelEnabled: true,
    bevelThickness: cabinBevel,
    bevelSize: 0.04,
    bevelSegments: 6,
  });
  cabinGeo.translate(0, 0, -(cabinW - cabinBevel * 2) / 2);
  car.add(new THREE.Mesh(cabinGeo, paint));

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0b0e14,
    metalness: 0.2,
    roughness: 0.08,
    envMapIntensity: 0.35,
    clearcoat: 1,
    side: THREE.DoubleSide,
  });
  const sideShape = new THREE.Shape(
    m.glass.map(([x, y]) => new THREE.Vector2(x, y)),
  );
  const sideGeo = new THREE.ExtrudeGeometry(sideShape, {
    depth: cabinW + 0.02,
    bevelEnabled: false,
  });
  sideGeo.translate(0, 0, -(cabinW + 0.02) / 2);
  car.add(new THREE.Mesh(sideGeo, glass));
  const half = cabinW / 2 - 0.1;
  car.add(
    new THREE.Mesh(
      glassStrip(cabinShape, m.windscreen[0], m.windscreen[1], half),
      glass,
    ),
  );
  car.add(
    new THREE.Mesh(
      glassStrip(cabinShape, m.rearGlass[0], m.rearGlass[1], half),
      glass,
    ),
  );

  const lamp = (color: number, intensity: number) =>
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: intensity,
    });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x0c0d10,
    roughness: 0.6,
  });
  const front = m.length;
  // Wing mirrors at the base of the windscreen, and dark side skirts.
  for (const side of [-1, 1]) {
    const mirror = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.09, 0.14),
      paint,
    );
    mirror.position.set(
      m.windscreen[1][0] - 0.12,
      belt + 0.06,
      side * (cabinW / 2 + 0.1),
    );
    car.add(mirror);
    const skirt = new THREE.Mesh(
      new THREE.BoxGeometry(
        m.wheels[1] - m.wheels[0] - (m.wheelRadius + ARCH_GAP) * 2,
        0.08,
        0.02,
      ),
      dark,
    );
    skirt.position.set(
      (m.wheels[0] + m.wheels[1]) / 2,
      m.sill + 0.04,
      side * (m.width / 2 + 0.005),
    );
    car.add(skirt);
  }
  for (const side of [-1, 1]) {
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.07, 0.34),
      lamp(0xffffff, 2.2),
    );
    head.position.set(front - 0.05, m.headlightY, side * (m.width / 2 - 0.3));
    car.add(head);
  }
  const grille = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.22, m.width * 0.5),
    dark,
  );
  grille.position.set(front - 0.02, m.headlightY - 0.24, 0);
  car.add(grille);
  const tail = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.05, m.width - 0.3),
    lamp(0xff2a2a, 1.8),
  );
  tail.position.set(0.0, m.taillightY, 0);
  car.add(tail);
  const diffuser = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.14, m.width * 0.7),
    dark,
  );
  diffuser.position.set(0.04, m.sill + 0.08, 0);
  car.add(diffuser);

  const spinning: THREE.Object3D[] = [];
  for (const x of m.wheels) {
    for (const side of [-1, 1] as const) {
      const w = wheel(m, side);
      w.group.position.set(x, m.wheelRadius, side * (m.width / 2 - 0.14));
      w.caliper.position.add(w.group.position);
      car.add(w.group, w.caliper);
      spinning.push(...w.spin);
    }
  }
  // Centre the car on the turntable.
  car.position.x = -m.length / 2;
  const root = new THREE.Group();
  root.add(car);
  return { root, spinning };
}

function contactShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,0.75)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(c),
      transparent: true,
      depthWrite: false,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.005;
  return mesh;
}

function disposeTree(o: THREE.Object3D) {
  o.traverse((n) => {
    if (n instanceof THREE.Mesh) {
      n.geometry.dispose();
      const mats = Array.isArray(n.material) ? n.material : [n.material];
      mats.forEach((mat) => mat.dispose());
    }
  });
}

/**
 * A small showroom: the selected car on a turntable you can drag round.
 * Built from the car's profile with three.js; loaded only on the Cars page.
 */
export default function Showroom3D({
  car,
  paint,
  onReady,
}: {
  car: CarModel;
  paint: string;
  onReady?: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<{
    id: string;
    show: (m: CarModel, paint: string) => void;
    repaint: (paint: string) => void;
  } | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.8;

    const camera = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 60);
    camera.position.set(6.2, 2.1, 6.4);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.65, 0);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 0.7;
    controls.maxPolarAngle = 1.45;
    controls.autoRotate = !still;
    controls.autoRotateSpeed = 0.9;

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(7, 72),
      new THREE.MeshStandardMaterial({
        color: 0x07090e,
        roughness: 0.85,
        metalness: 0.05,
        envMapIntensity: 0.15,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.4, 3.45, 96),
      new THREE.MeshBasicMaterial({
        color: 0xe5484d,
        transparent: true,
        opacity: 0.35,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.003;
    scene.add(ring);
    const shadow = contactShadow();
    scene.add(shadow);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(4, 6, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe5484d, 0.9);
    rim.position.set(-5, 2.5, -4);
    scene.add(rim);

    const paintMat = new THREE.MeshPhysicalMaterial({
      color: paint,
      metalness: 0.35,
      roughness: 0.4,
      envMapIntensity: 0.45,
      clearcoat: 0.6,
      clearcoatRoughness: 0.18,
    });
    let current: ReturnType<typeof buildCar> | null = null;
    let enter = 1; // 0 -> 1 while a car drives onto the turntable
    let targetColor = new THREE.Color(paint);

    const show = (m: CarModel, p: string) => {
      if (current) {
        scene.remove(current.root);
        current.root.traverse((n) => {
          if (n instanceof THREE.Mesh && n.material !== paintMat) {
            n.geometry.dispose();
            (n.material as THREE.Material).dispose();
          } else if (n instanceof THREE.Mesh) n.geometry.dispose();
        });
      }
      paintMat.color.set(p);
      targetColor = new THREE.Color(p);
      current = buildCar(m, paintMat);
      scene.add(current.root);
      shadow.scale.set(m.length * 1.15, m.width * 1.5, 1);
      enter = still ? 1 : 0;
      kick();
    };
    api.current = {
      id: car.id,
      show: (m, p) => {
        if (api.current) api.current.id = m.id;
        show(m, p);
      },
      repaint: (p) => {
        targetColor = new THREE.Color(p);
        kick();
      },
    };

    let raf = 0;
    let visible = true;
    let last = performance.now();
    const frame = (now: number) => {
      // rAF timestamps can be older than the time kick() ran: never go back.
      const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
      last = now;
      let busy = !still;
      if (current && enter < 1) {
        const before = enter;
        enter = Math.min(1, enter + dt / 1.3);
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const x = -7 * (1 - ease(enter));
        current.root.position.x = x;
        const moved = 7 * (ease(enter) - ease(before));
        for (const s of current.spinning) s.rotation.z -= moved / 0.34;
        busy = true;
      }
      if (!paintMat.color.equals(targetColor)) {
        paintMat.color.lerp(targetColor, 0.12);
        busy = true;
      }
      controls.update(dt);
      renderer.render(scene, camera);
      raf = 0;
      if ((busy || controls.autoRotate) && visible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    controls.addEventListener("change", kick);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      kick();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", kick);

    show(car, paint);
    resize();
    onReady?.();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
      controls.dispose();
      disposeTree(scene);
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
    // The scene is built once; car and paint changes go through api.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (api.current && api.current.id !== car.id) api.current.show(car, paint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car]);
  useEffect(() => {
    api.current?.repaint(paint);
  }, [paint]);

  return <div ref={host} className="showroom-canvas" />;
}
