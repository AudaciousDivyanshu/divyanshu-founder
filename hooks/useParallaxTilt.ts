"use client";

import { useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const SPRING_CONFIG = { stiffness: 200, damping: 20 };

/**
 * Returns spring-animated rotateX/rotateY MotionValues based on
 * mouse position within the element, creating a parallax 3D tilt.
 */
export function useParallaxTilt(maxAngle = 8) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srX = useSpring(rotateX, SPRING_CONFIG);
  const srY = useSpring(rotateY, SPRING_CONFIG);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      // Normalise to [-0.5, 0.5]
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * maxAngle * 2);
      rotateX.set(-py * maxAngle * 2);
    },
    [rotateX, rotateY, maxAngle]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { srX, srY, onMouseMove, onMouseLeave };
}
