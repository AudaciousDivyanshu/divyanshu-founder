"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import type { ReactNode, MouseEventHandler } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  /** rgba colour for the hover glow shadow */
  glowColor?: string;
  href?: string;
}

/**
 * A button that springs toward the cursor (magnetic pull) and
 * emits a Plum Wine glow on hover. Falls back gracefully when
 * prefers-reduced-motion is set.
 */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  glowColor = "rgba(94, 64, 116, 0.55)",
  href,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const { ref, sx, sy, onMouseMove, onMouseLeave } =
    useMagnetic<HTMLElement>(reduced ? 0 : 0.38);

  const sharedProps = {
    ref: ref as any,
    className: `magnetic-btn ${className}`,
    style: reduced ? {} : { x: sx, y: sy },
    onMouseMove: onMouseMove as React.MouseEventHandler<HTMLElement>,
    onMouseLeave,
    onClick: onClick as React.MouseEventHandler<HTMLElement>,
    whileHover: reduced ? {} : { boxShadow: `0 0 36px -4px ${glowColor}` },
    whileTap: reduced ? {} : { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 300, damping: 22 },
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...sharedProps}>
      {children}
    </motion.button>
  );
}
