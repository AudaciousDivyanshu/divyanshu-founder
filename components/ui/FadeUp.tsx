"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Entrance delay in seconds */
  delay?: number;
  /** Intersection threshold (0–1) that triggers the animation */
  amount?: number;
}

/**
 * Fades children in from below when they enter the viewport.
 * Uses Framer Motion's whileInView so it relies on IntersectionObserver —
 * no scroll listeners. Fires once; reduced-motion receives opacity-only fade.
 */
export default function FadeUp({
  children,
  className = "",
  delay = 0,
  amount = 0.15,
}: FadeUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduced ? 0.3 : 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1], // softer ease-out curve
      }}
    >
      {children}
    </motion.div>
  );
}
