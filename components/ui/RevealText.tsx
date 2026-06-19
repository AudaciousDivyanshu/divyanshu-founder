"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface RevealTextProps {
  children: string;
  className?: string;
  /** Stagger start delay in seconds */
  delay?: number;
  /** HTML element to render as */
  as?: HeadingTag;
}

const wordVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 170, damping: 22 },
  },
};


/**
 * Splits a plain-text string into words and reveals each word with a
 * spring-animated slide-up, triggered when the element enters the viewport.
 * Reduced-motion safe — renders as a plain element with no transforms.
 */
export default function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "span",
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const words = String(children).split(" ");

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        aria-hidden="true"
        className="inline-flex flex-wrap"
        style={{ gap: "0 0.3em" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.055, delayChildren: delay },
          },
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
