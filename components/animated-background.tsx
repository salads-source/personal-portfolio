"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_dark;
  uniform vec2 u_mouse;

  float bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }

  float bayer4(vec2 a) {
    return bayer2(0.5 * a) * 0.25 + bayer2(a);
  }

  float bayer8(vec2 a) {
    return bayer4(0.5 * a) * 0.25 + bayer2(a);
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float field(vec2 p, float t) {
    float aspect = u_resolution.x / u_resolution.y;
    vec2 q = vec2(p.x * aspect, p.y);
    vec2 m = vec2(u_mouse.x / max(u_resolution.x, 1.0), 1.0 - u_mouse.y / max(u_resolution.y, 1.0));
    m.x *= aspect;

    vec2 c1 = vec2(0.18 * aspect + sin(t * 0.23) * 0.12, 0.32 + cos(t * 0.20) * 0.08);
    vec2 c2 = vec2(0.52 * aspect + cos(t * 0.17) * 0.16, 0.72 + sin(t * 0.19) * 0.09);
    vec2 c3 = vec2(0.78 * aspect + sin(t * 0.14) * 0.10, 0.38 + cos(t * 0.16) * 0.11);

    float v = 0.0;
    v += 0.24 / (distance(q, c1) + 0.055);
    v += 0.20 / (distance(q, c2) + 0.060);
    v += 0.18 / (distance(q, c3) + 0.062);
    v += 0.12 / (distance(q, m) + 0.075);
    v += valueNoise(q * 2.1 + t * 0.08) * 0.55;
    v += sin((q.x * 1.8 + q.y * 2.6 + t * 0.35) * 3.14159) * 0.16;

    return v;
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / u_resolution;
    float t = u_time * 0.001;
    float pixelSize = mix(9.0, 10.5, step(u_resolution.x, 700.0));
    vec2 pixelId = floor(frag / pixelSize);
    vec2 cell = fract(frag / pixelSize) - 0.5;

    float diamond = 1.0 - smoothstep(0.255, 0.34, abs(cell.x) + abs(cell.y));
    float bayer = bayer8(pixelId);
    float f = field(uv, t);
    float bandStart = mix(1.02, 1.30, u_dark);
    float bandEnd = mix(1.95, 2.55, u_dark);
    float band = smoothstep(bandStart, bandEnd, f);
    float ordered = step(bayer, band);
    float alpha = ordered * diamond * mix(1.0, 0.62, u_dark);

    vec3 lightBase = vec3(0.968, 0.953, 0.902);
    vec3 darkBase = vec3(0.031, 0.043, 0.039);
    vec3 lightDot = vec3(0.055, 0.060, 0.052);
    vec3 darkDot = vec3(0.450, 0.620, 0.140);
    vec3 limeDot = vec3(0.619, 0.941, 0.102);

    vec3 base = mix(lightBase, darkBase, u_dark);
    vec3 dotColor = mix(lightDot, mix(darkDot, limeDot, 0.18), u_dark);
    float dotOpacity = mix(0.12, 0.34, u_dark);
    vec3 color = mix(base, dotColor, alpha * dotOpacity);

    float gridX = 1.0 - smoothstep(0.0, 1.1, abs(mod(frag.x, 48.0) - 0.5));
    float gridY = 1.0 - smoothstep(0.0, 1.1, abs(mod(frag.y, 48.0) - 0.5));
    float grid = max(gridX, gridY) * mix(0.06, 0.045, u_dark);
    color = mix(color, mix(lightDot, darkDot, u_dark), grid);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      stencil: false
    });

    if (!gl) {
      return;
    }

    const targetCanvas = canvas;
    const targetGl = gl;
    const vertexShader = createShader(targetGl, targetGl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(targetGl, targetGl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(targetGl, vertexShader, fragmentShader);
    const positionLocation = targetGl.getAttribLocation(program, "a_position");
    const resolutionLocation = targetGl.getUniformLocation(program, "u_resolution");
    const timeLocation = targetGl.getUniformLocation(program, "u_time");
    const darkLocation = targetGl.getUniformLocation(program, "u_dark");
    const mouseLocation = targetGl.getUniformLocation(program, "u_mouse");
    const buffer = targetGl.createBuffer();

    if (!buffer || !resolutionLocation || !timeLocation || !darkLocation || !mouseLocation) {
      return;
    }

    targetGl.bindBuffer(targetGl.ARRAY_BUFFER, buffer);
    targetGl.bufferData(
      targetGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      targetGl.STATIC_DRAW
    );

    let frame = 0;
    let width = 0;
    let height = 0;
    let dark = document.documentElement.classList.contains("dark");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      targetCanvas.width = Math.max(1, Math.floor(width * pixelRatio));
      targetCanvas.height = Math.max(1, Math.floor(height * pixelRatio));
      targetCanvas.style.width = `${width}px`;
      targetCanvas.style.height = `${height}px`;
      targetGl.viewport(0, 0, targetCanvas.width, targetCanvas.height);
    }

    function render(time: number) {
      targetGl.useProgram(program);
      targetGl.enableVertexAttribArray(positionLocation);
      targetGl.bindBuffer(targetGl.ARRAY_BUFFER, buffer);
      targetGl.vertexAttribPointer(positionLocation, 2, targetGl.FLOAT, false, 0, 0);
      targetGl.uniform2f(resolutionLocation, targetCanvas.width, targetCanvas.height);
      targetGl.uniform1f(timeLocation, reducedMotion.matches ? 0 : time);
      targetGl.uniform1f(darkLocation, dark ? 1 : 0);
      targetGl.uniform2f(
        mouseLocation,
        mouseRef.current.x * (targetCanvas.width / Math.max(width, 1)),
        mouseRef.current.y * (targetCanvas.height / Math.max(height, 1))
      );
      targetGl.drawArrays(targetGl.TRIANGLES, 0, 6);

      frame = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") {
        return;
      }

      mouseRef.current = { x: event.clientX, y: event.clientY };
    }

    const observer = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
    });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      targetGl.deleteBuffer(buffer);
      targetGl.deleteProgram(program);
      targetGl.deleteShader(vertexShader);
      targetGl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className="cyber-background pointer-events-none fixed inset-0 z-0" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create WebGL shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "Unable to compile WebGL shader.");
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();

  if (!program) {
    throw new Error("Unable to create WebGL program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(info || "Unable to link WebGL program.");
  }

  return program;
}
