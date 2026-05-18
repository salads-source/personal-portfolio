"use client";

import { useEffect, useRef } from "react";

export function CursorCoordinates() {
  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const latest = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    function paint() {
      const { x, y } = latest.current;

      if (verticalRef.current) {
        verticalRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      if (horizontalRef.current) {
        horizontalRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${x + 10}px, ${y + 10}px, 0)`;
        labelRef.current.textContent = `x: ${Math.round(x)}\ny: ${Math.round(y)}`;
      }

      frame.current = 0;
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") {
        return;
      }

      latest.current = { x: event.clientX, y: event.clientY };
      document.documentElement.dataset.cursor = "visible";

      if (!frame.current) {
        frame.current = window.requestAnimationFrame(paint);
      }
    }

    function handlePointerLeave() {
      document.documentElement.dataset.cursor = "hidden";
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, []);

  return (
    <div className="cursor-coordinates pointer-events-none fixed inset-0 z-[60] hidden md:block" aria-hidden>
      <div ref={verticalRef} className="absolute left-0 top-0 h-full border-l border-zinc-950/18 dark:border-lime-300/18" />
      <div ref={horizontalRef} className="absolute left-0 top-0 w-full border-t border-zinc-950/18 dark:border-lime-300/18" />
      <div ref={dotRef} className="absolute left-0 top-0 size-2 rounded-full bg-zinc-950 dark:bg-lime-200" />
      <div
        ref={labelRef}
        className="absolute left-0 top-0 whitespace-pre border border-zinc-950/15 bg-fog/80 px-2 py-1 font-mono text-[10px] leading-4 text-zinc-600 backdrop-blur dark:border-lime-300/15 dark:bg-ink/78 dark:text-zinc-400"
      />
    </div>
  );
}
