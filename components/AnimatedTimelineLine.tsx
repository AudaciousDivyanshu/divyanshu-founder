"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * AnimatedTimelineLine
 *
 * A vertical line that grows from 0% to 100% height as the timeline
 * section scrolls into and through the viewport.
 *
 * Uses Framer Motion's useScroll with a `target` element so the
 * progress maps exactly to the section's scroll range.
 * useTransform maps [0,1] → scaleY [0,1] with transform-origin top.
 *
 * Replace the static <div> timeline line in page.tsx with this component.
 */
export default function AnimatedTimelineLine() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block" style={{ width: 1 }}>
      {/* Static track (very faint) */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Animated fill line */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: "100%",
          background: "linear-gradient(to bottom, #4a78d8, #5E4074, transparent)",
        }}
      />
    </div>
  );
}
