"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps children in a 3-D perspective container. Mouse position
 * within the card drives rotateX / rotateY spring values for a
 * parallax tilt effect. Reduced-motion safe.
 */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const reduced = useReducedMotion();
  const { srX, srY, onMouseMove, onMouseLeave } = useParallaxTilt(
    reduced ? 0 : 7
  );

  return (
    <div
      className={`tilt-container ${className}`}
      onMouseMove={onMouseMove as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={
          reduced
            ? {}
            : { rotateX: srX, rotateY: srY, transformStyle: "preserve-3d" }
        }
        whileHover={reduced ? {} : { scale: 1.018 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
