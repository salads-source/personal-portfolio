"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { ShaderMaterial, Vector2 } from "three";
import { AsciiEffect } from "./ascii-effect";
import { blackHoleShader } from "./black-hole-shader";
import { ReferencePostFX } from "./reference-postfx";

function BlackHole({ animate }: { animate: boolean }) {
  const { viewport, size, gl, invalidate } = useThree();
  const material = useMemo(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSize: { value: new Vector2(1, 1) }, uFraming: { value: 1 } },
    vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: blackHoleShader, toneMapped: false
  }), []);
  useEffect(() => {
    material.uniforms.uSize.value.set(size.width, size.height);
    // Crop the source's empty margins to match the supplied reference image.
    // Fit by width so portrait screens retain the complete disk, not its center.
    material.uniforms.uFraming.value = 0.74 * Math.sqrt(1.86 * size.height / size.width);
    invalidate();
  }, [material, size, invalidate]);
  useEffect(() => () => material.dispose(), [material]);
  useFrame((_, delta) => { if (animate) material.uniforms.uTime.value += Math.min(delta, 0.05); });
  return <>
    <mesh><planeGeometry args={[viewport.width, viewport.height]} /><primitive object={material} attach="material" /></mesh>
    {/* Match the reference's ~205 columns, scaling its 10px cells to this canvas. */}
    <EffectComposer multisampling={0}>
      <AsciiEffect cellSize={Math.max(4, Math.min(10, size.width / 205)) * gl.getPixelRatio()} color style="standard" />
      <ReferencePostFX />
    </EffectComposer>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function EffectScene({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    setSupported(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => setReducedMotion(preference.matches);
    onPreference();
    preference.addEventListener("change", onPreference);
    let intersects = true;
    const updateVisibility = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting; updateVisibility(); });
    if (containerRef.current) observer.observe(containerRef.current);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      preference.removeEventListener("change", onPreference);
    };
  }, []);
  const animate = visible && !paused && !reducedMotion;
  return <div ref={containerRef} className="effect-scene" aria-hidden="true">
    {supported === false && <div className="blackhole-fallback"><span /></div>}
    {supported && <SceneBoundary><Canvas dpr={[1, 1.5]} frameloop={animate ? "always" : "demand"}
      camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}>
      <color attach="background" args={["#000000"]} /><BlackHole animate={animate} />
    </Canvas></SceneBoundary>}
  </div>;
}
