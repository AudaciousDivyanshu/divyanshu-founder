"use client";

import { useEffect, useRef } from "react";

/**
 * CursorGlow
 *
 * A 900×900px blurred radial-gradient orb (Deep Blue + Plum Wine) that
 * smoothly follows the cursor via a requestAnimationFrame lerp loop.
 *
 * Key performance choices:
 *  - Direct DOM style mutation — never touches React state, zero re-renders.
 *  - will-change: transform — GPU compositor layer, no layout or paint.
 *  - passive mousemove listener — never blocks scroll.
 *  - Bails out on mobile (touch-only devices) and prefers-reduced-motion.
 *  - pointer-events: none in CSS so it never intercepts clicks.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Skip on touch-only / mobile devices (no fine pointer)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = glowRef.current;
    if (!el) return;

    // Make visible only after passing all checks
    el.style.opacity = "1";

    // Initialise positions to viewport centre so the orb doesn't
    // snap from (0,0) before the first mousemove fires.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };

    // Lerp factor — lower = more lag / silkier. 0.07 ≈ 70ms settling time.
    const LERP = 0.07;

    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Set initial position immediately so the glow doesn't appear at (0,0)
    el.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;

    const tick = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      // translate(-50%, -50%) centres the orb on the cursor
      el.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cursor-glow"
      style={{ opacity: 0 }}
    />
  );
}
