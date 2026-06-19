"use client";

import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgress
 *
 * A fixed 3px bar pinned to the very top of the viewport (above the navbar).
 * - useScroll tracks document scroll progress (0 → 1) natively via Framer Motion.
 * - useSpring smooths the raw value so rapid scrolls don't feel mechanical.
 * - scaleX drives the bar width via CSS transform-origin: left — GPU-composited,
 *   zero layout reflow on every scroll event.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress-bar"
      style={{ scaleX }}
    />
  );
}
