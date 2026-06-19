"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface LiftCardProps {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
  glowColor?: string;
  /** Extra Framer Motion props passed through */
  [key: string]: unknown;
}

/**
 * A transparent wrapper that lifts its children upward and emits a
 * Plum Wine box-shadow on hover. Uses spring physics for a natural feel.
 * Reduced-motion safe.
 */
export default function LiftCard({
  children,
  className = "",
  liftAmount = 6,
  glowColor = "rgba(94, 64, 116, 0.30)",
  ...rest
}: LiftCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={
        reduced
          ? { opacity: 0.92 }
          : {
              y: -liftAmount,
              scale: 1.012,
              boxShadow: `0 24px 64px -12px ${glowColor}`,
            }
      }
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
