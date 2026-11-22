import { useEffect, useRef, useState } from "react";
import { STRIDE, buildMesh } from "./portraitMesh";

const COLOR_SRC = "/me/portrait-3d.webp";
const DEPTH_SRC = "/me/portrait-depth.png";
const NORMAL_SRC = "/me/portrait-normal.webp";

const VERT = `
attribute vec3 aPos;
attribute vec2 aUv;
uniform mat3 uRot;
uniform float uScale;
uniform float uDist;
uniform float uFocal;
uniform float uAspect;
varying vec2 vUv;
void main() {
  vec3 p = uRot * (aPos * uScale);
  p.z -= uDist;
  p.y -= 0.02; // shoulders run off the frame
  vUv = aUv;
  float near = 1.0;
  float far = 10.0;
  gl_Position = vec4(
    p.x * uFocal / uAspect,
    p.y * uFocal,
    (far + near) / (near - far) * p.z + 2.0 * far * near / (near - far),
    -p.z
  );
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uColor;
uniform sampler2D uNormals;
uniform mat3 uRotF;
uniform vec3 uLight;
varying vec2 vUv;
void main() {
  vec4 c = texture2D(uColor, vUv); // premultiplied
  if (c.a < 0.02) discard;
  vec3 n = normalize(texture2D(uNormals, vUv).xyz * 2.0 - 1.0);
  vec3 rn = uRotF * n;
  vec3 l = normalize(uLight);
  // The photo already carries its own light, so only the change from turning
  // is added: surfaces that turn towards the key light brighten, others dim.
  float shade = 1.0 + 0.55 * (max(dot(rn, l), 0.0) - max(dot(n, l), 0.0));
  float rim = pow(1.0 - clamp(rn.z, 0.0, 1.0), 2.5) * 0.22;
  vec3 col = c.rgb * shade + vec3(1.0, 0.95, 0.88) * rim * c.a;
  gl_FragColor = vec4(col, c.a);
}`;

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

/** Rotation about Y then X, column-major for WebGL. */
function rotation(ry: number, rx: number) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return new Float32Array([
    cy,
    sx * sy,
    -cx * sy,
    0,
    cx,
    sx,
    sy,
    -sx * cy,
    cx * cy,
  ]);
}

/**
 * Eyad's real photo as a 3D relief: a depth map pushes the face and shoulders
 * forward, and the portrait turns towards the pointer, sways and breathes.
 * Falls back to the flat photo without WebGL.
 */
export function Portrait3D({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!gl) {
      setFlat(true);
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let ready = false;
    let disposed = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let draw = (_t: number) => {};

    const frame = (t: number) => {
      raf = 0;
      if (disposed || !ready) return;
      draw(t / 1000);
      if (!still && visible && !document.hidden)
        raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && ready) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy =
        (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      target.x = Math.max(-1, Math.min(1, dx));
      target.y = Math.max(-1, Math.min(1, dy));
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      kick();
    });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", kick);
    if (!still)
      window.addEventListener("pointermove", onPointer, { passive: true });

    Promise.all([load(COLOR_SRC), load(DEPTH_SRC), load(NORMAL_SRC)])
      .then(([color, depthImg, normals]) => {
        if (disposed) return;
        const c2 = document.createElement("canvas");
        c2.width = depthImg.naturalWidth;
        c2.height = depthImg.naturalHeight;
        const ctx = c2.getContext("2d", { willReadFrequently: true })!;
        ctx.drawImage(depthImg, 0, 0);
        const depth = ctx.getImageData(0, 0, c2.width, c2.height);
        const cols = 180;
        const rows = Math.round((cols * depth.height) / depth.width);
        const mesh = buildMesh(depth, cols, rows, 0.36);

        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
          throw new Error("link");
        gl.useProgram(prog);

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
        const bytes = STRIDE * 4;
        const attr = (name: string, size: number, offset: number) => {
          const loc = gl.getAttribLocation(prog, name);
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, size, gl.FLOAT, false, bytes, offset * 4);
        };
        attr("aPos", 3, 0);
        attr("aUv", 2, 6);

        const texture = (
          unit: number,
          img: HTMLImageElement,
          premultiply: boolean,
        ) => {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiply);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img,
          );
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        };
        texture(0, color, true);
        texture(1, normals, false);

        const u = (name: string) => gl.getUniformLocation(prog, name);
        const uRot = u("uRot");
        const uScale = u("uScale");
        const uAspect = u("uAspect");
        const uRotF = u("uRotF");
        gl.uniform1i(u("uColor"), 0);
        gl.uniform1i(u("uNormals"), 1);
        gl.uniform3f(u("uLight"), -0.55, 0.55, 0.65);
        gl.uniform1f(u("uDist"), 4.6);
        gl.uniform1f(u("uFocal"), 5.6);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
        const count = mesh.indices.length;

        draw = (t) => {
          current.x += (target.x - current.x) * 0.06;
          current.y += (target.y - current.y) * 0.06;
          const sway = still ? 0 : Math.sin(t * 0.55) * 0.06;
          const nod = still ? 0 : Math.sin(t * 0.8 + 1) * 0.02;
          const ry = current.x * 0.27 + sway;
          const rx = current.y * 0.16 + nod;
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          const rot = rotation(ry, rx);
          gl.uniformMatrix3fv(uRot, false, rot);
          gl.uniformMatrix3fv(uRotF, false, rot);
          gl.uniform1f(uScale, 1 + (still ? 0 : Math.sin(t * 1.3) * 0.006));
          gl.uniform1f(uAspect, canvas.width / Math.max(canvas.height, 1));
          gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
        };
        ready = true;
        canvas.dataset.ready = "true";
        kick();
      })
      .catch(() => {
        if (!disposed) setFlat(true);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  if (flat) return <img className={className} src={COLOR_SRC} alt={label} />;
  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={label}
    />
  );
}
