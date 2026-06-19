"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * SmoothScrollProvider
 *
 * Mounts Lenis on the window and keeps its RAF loop in sync with
 * Framer Motion's useScroll / ScrollProgress, which reads
 * document.documentElement.scrollTop — Lenis writes to this same
 * property, so everything stays in sync without any extra glue.
 *
 * Lenis intercepts native wheel/touch events and replaces them with a
 * lerp'd scroll, giving the premium Apple-Linear-Vercel feel.
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // seconds per "page" of scroll distance
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    // Keep Framer Motion's useScroll in sync by ticking Lenis
    // inside requestAnimationFrame rather than a separate Lenis RAF.
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Expose globally so anchor clicks (inside page.tsx) can call
    // lenis.scrollTo() instead of scrollIntoView for consistent easing.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Render nothing — this is a pure behaviour provider.
  return null;
}
