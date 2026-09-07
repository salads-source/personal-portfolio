"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Mesh, Vector2 } from "three";
import { AsciiEffect } from "./ascii-effect";

function Torus({ animate }: { animate: boolean }) {
  const mesh = useRef<Mesh>(null);
  const [interacting, setInteracting] = useState(false);
  const { size, gl } = useThree();
  const resolution = useMemo(() => new Vector2(), []);
  resolution.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio());

  useFrame((state, delta) => {
    if (!mesh.current || !animate || interacting) return;
    mesh.current.rotation.y += delta * 0.22;
    mesh.current.rotation.x = 0.18 + Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    mesh.current.rotation.z = -0.18 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return <>
    <ambientLight intensity={0.35} />
    <directionalLight position={[4, 5, 6]} color="#ffffff" intensity={3.6} />
    <pointLight position={[-4, 2, 3]} color="#ff2818" intensity={18} distance={9} />
    <pointLight position={[4, -2, 3]} color="#00d9ff" intensity={22} distance={9} />
    <pointLight position={[0, 4, -2]} color="#fff000" intensity={14} distance={8} />
    <mesh ref={mesh} rotation={[0.18, 0.72, -0.18]} scale={0.98}>
      <torusGeometry args={[1.15, 0.42, 48, 180]} />
      <meshStandardMaterial color="#f4f1ff" roughness={0.24} metalness={0.08} />
    </mesh>
    <OrbitControls
      enablePan={false}
      enableZoom
      enableDamping
      dampingFactor={0.08}
      minDistance={3.6}
      maxDistance={6.2}
      rotateSpeed={0.65}
      zoomSpeed={0.7}
      onStart={() => setInteracting(true)}
      onEnd={() => setInteracting(false)}
    />
    <EffectComposer multisampling={0}>
      <AsciiEffect
        cellSize={Math.max(6, Math.min(9, size.width / 78)) * gl.getPixelRatio()}
        color
        resolution={resolution}
        postfx={{ aberrationStrength: 0.009, brightnessAdjust: 0.025, contrastAdjust: 1.16 }}
      />
    </EffectComposer>
  </>;
}

class TorusBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function AsciiTorusScene() {
  const container = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2") ?? probe.getContext("webgl");
    setSupported(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);

    let intersects = false;
    const updateVisibility = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      updateVisibility();
    }, { rootMargin: "120px" });
    if (container.current) observer.observe(container.current);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const animate = visible && !reducedMotion;
  return <div ref={container} className="ascii-torus-scene" aria-hidden="true">
    {supported === false && <div className="torus-fallback" />}
    {supported && <TorusBoundary>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        camera={{ position: [0, 0, 4.8], fov: 48 }}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      >
        <color attach="background" args={["#000000"]} />
        <Torus animate={animate} />
      </Canvas>
    </TorusBoundary>}
  </div>;
}
