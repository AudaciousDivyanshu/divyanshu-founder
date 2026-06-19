"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps the entire page content in a smooth opacity entrance animation.
 * Uses a gentle ease-out so the first paint feels intentional and cinematic.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col flex-1 min-h-screen"
    >
      {children}
    </motion.div>
  );
}
