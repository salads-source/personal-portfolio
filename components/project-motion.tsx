"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function ProjectMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => setReducedMotion(preference.matches);
    onPreference();
    preference.addEventListener("change", onPreference);
    let intersects = false;
    const onVisibility = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      onVisibility();
    });
    if (container.current) observer.observe(container.current);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div ref={container} className="project-motion" data-running={visible && !paused && !reducedMotion}>
    <div className="project-motion-toolbar">
      <button type="button" className="project-motion-toggle micro" disabled={reducedMotion}
        aria-pressed={paused || reducedMotion} onClick={() => setPaused(value => !value)}
        aria-label={reducedMotion ? "Project animations disabled by reduced motion preference" : paused ? "Play project animations" : "Pause project animations"}>
        {paused || reducedMotion ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        {reducedMotion ? "REDUCED MOTION" : paused ? "PLAY DIAGRAMS" : "PAUSE DIAGRAMS"}
      </button>
    </div>
    {children}
  </div>;
}
