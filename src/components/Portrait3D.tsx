import { useEffect, useRef, useState } from "react";
import { STRIDE, buildMesh } from "./portraitMesh";

const COLOR_SRC = "/me/portrait-3d.webp";
const DEPTH_SRC = "/me/portrait-depth.png";

const VERT = `
attribute vec3 aPos;
attribute vec3 aNormal;
attribute vec2 aUv;
uniform mat3 uRot;
uniform float uScale;
uniform float uDist;
uniform float uFocal;
uniform float uAspect;
varying vec2 vUv;
varying vec3 vNormal;
void main() {
  vec3 p = uRot * (aPos * uScale);
  p.z -= uDist;
  p.y -= 0.16; // crop the shoulders below the frame
  vUv = aUv;
  vNormal = uRot * aNormal;
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
uniform vec3 uLight;
varying vec2 vUv;
varying vec3 vNormal;
void main() {
  vec4 c = texture2D(uColor, vUv);
  if (c.a < 0.1) discard;
  vec3 n = normalize(vNormal);
  // Gentle studio light: the photo already has its own shading.
  float shade = 0.9 + 0.18 * max(dot(n, normalize(uLight)), 0.0);
  float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 3.0) * 0.35;
  vec3 col = c.rgb * shade + vec3(0.62, 0.69, 1.0) * rim;
  gl_FragColor = vec4(col * c.a, c.a);
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

    Promise.all([load(COLOR_SRC), load(DEPTH_SRC)])
      .then(([color, depthImg]) => {
        if (disposed) return;
        const c2 = document.createElement("canvas");
        c2.width = depthImg.naturalWidth;
        c2.height = depthImg.naturalHeight;
        const ctx = c2.getContext("2d", { willReadFrequently: true })!;
        ctx.drawImage(depthImg, 0, 0);
        const depth = ctx.getImageData(0, 0, c2.width, c2.height);
        const cols = 150;
        const rows = Math.round((cols * depth.height) / depth.width);
        const mesh = buildMesh(depth, cols, rows, 0.42);

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
        attr("aNormal", 3, 3);
        attr("aUv", 2, 6);

        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          color,
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const u = (name: string) => gl.getUniformLocation(prog, name);
        const uRot = u("uRot");
        const uScale = u("uScale");
        const uAspect = u("uAspect");
        const uLight = u("uLight");
        gl.uniform1i(u("uColor"), 0);
        gl.uniform1f(u("uDist"), 4.6);
        gl.uniform1f(u("uFocal"), 4.8);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
        const count = mesh.indices.length;

        draw = (t) => {
          current.x += (target.x - current.x) * 0.06;
          current.y += (target.y - current.y) * 0.06;
          const sway = still ? 0 : Math.sin(t * 0.55) * 0.07;
          const nod = still ? 0 : Math.sin(t * 0.8 + 1) * 0.02;
          const ry = current.x * 0.34 + sway;
          const rx = current.y * 0.16 + nod;
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          gl.uniformMatrix3fv(uRot, false, rotation(ry, rx));
          gl.uniform1f(uScale, 1 + (still ? 0 : Math.sin(t * 1.3) * 0.006));
          gl.uniform1f(uAspect, canvas.width / Math.max(canvas.height, 1));
          gl.uniform3f(uLight, -0.5 - current.x * 0.4, 0.6, 0.9);
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
