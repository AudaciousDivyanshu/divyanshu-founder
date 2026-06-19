"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const storySlides = [
  { word: "Code", sub: "Write every line with AI at your side." },
  { word: "Write", sub: "Craft reports, docs and emails in seconds." },
  { word: "Research", sub: "Go deep on any topic. Instantly." },
  { word: "Collaborate", sub: "Coordinate your team with shared AI context." },
  { word: "Build Together", sub: "Frontend. Backend. Database. All in sync." },
  { word: "Welcome to Orion Helix AI", sub: "Your intelligent workspace. One tab. Everything.", isFinal: true },
];

function StorySlide({
  slide,
  index,
  scrollYProgress,
}: {
  slide: (typeof storySlides)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const total = storySlides.length;
  const step = 1 / total;
  const start = index * step;
  const mid = start + step * 0.5;
  const end = start + step;

  const isLast = slide.isFinal;

  // Fade in smoothly, fade out smoothly (last slide stays visible until end of scroll)
  const opacity = useTransform(
    scrollYProgress,
    isLast 
      ? [start, start + step * 0.15, mid, 1.0] 
      : [start, start + step * 0.15, mid, end - step * 0.15, end],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 1, 0]
  );

  // Incoming: scales from 0.8 to 1. Outgoing: scales from 1 to 0.8
  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [start, start + step * 0.2, mid, 1.0]
      : [start, start + step * 0.2, mid, end - step * 0.2, end],
    isLast ? [0.8, 1, 1, 1] : [0.8, 1, 1, 1, 0.8]
  );

  // Incoming: slides up from 80 to 0. Outgoing: slides up from 0 to -80
  const y = useTransform(
    scrollYProgress,
    isLast
      ? [start, start + step * 0.2, mid, 1.0]
      : [start, start + step * 0.2, mid, end - step * 0.2, end],
    isLast ? [80, 0, 0, 0] : [80, 0, 0, 0, -80]
  );

  // Stronger glow pulse behind the word
  const glowOpacity = useTransform(
    scrollYProgress,
    isLast
      ? [start + step * 0.1, start + step * 0.2, mid, 1.0]
      : [start + step * 0.1, start + step * 0.2, mid, end - step * 0.2, end],
    isLast ? [0, 0.8, 0.8, 0.8] : [0, 0.8, 0.8, 0, 0]
  );
  
  const glowScale = useTransform(
    scrollYProgress,
    isLast
      ? [start + step * 0.1, mid, 1.0]
      : [start + step * 0.1, mid, end],
    isLast ? [0.8, 1.2, 1.2] : [0.8, 1.2, 0.8]
  );

  const letters = Array.from(slide.word);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8"
    >
      <motion.div style={{ scale, y }} className="relative z-10">
        {/* Glow behind active word */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full pointer-events-none"
        />

        {!slide.isFinal ? (
          <>
            <h2 className="font-headline font-black text-[clamp(4rem,15vw,12rem)] tracking-tight leading-none text-on-surface mb-6 flex justify-center">
              {letters.map((letter, i) => {
                const letterStart = start + step * 0.01 + (step * 0.1) * (i / letters.length);
                const letterEnd = letterStart + (step * 0.05);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const letterOpacity = useTransform(scrollYProgress, [start, letterStart, letterEnd], [0, 0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const letterY = useTransform(scrollYProgress, [start, letterStart, letterEnd], [20, 20, 0]);

                return (
                  <motion.span key={i} style={{ opacity: letterOpacity, y: letterY, display: "inline-block" }}>
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                );
              })}
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto drop-shadow-md">
              {slide.sub}
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary/30 text-primary text-sm font-bold tracking-wider uppercase mb-8 mx-auto">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now in development
            </div>
            <h2 className="font-headline font-black text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-tight text-white drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] mb-6 flex justify-center flex-wrap">
              {slide.word.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex mr-4 last:mr-0">
                  {Array.from(word).map((letter, i) => {
                    const totalLetters = slide.word.length;
                    const letterGlobalIndex = slide.word.indexOf(word) + i;
                    const letterStart = start + step * 0.01 + (step * 0.1) * (letterGlobalIndex / totalLetters);
                    const letterEnd = letterStart + (step * 0.05);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const letterOpacity = useTransform(scrollYProgress, [start, letterStart, letterEnd], [0, 0, 1]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const letterY = useTransform(scrollYProgress, [start, letterStart, letterEnd], [20, 20, 0]);

                    return (
                      <motion.span key={i} style={{ opacity: letterOpacity, y: letterY, display: "inline-block" }}>
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto drop-shadow-md">
              {slide.sub}
            </p>
          </>
        )}
      </motion.div>

      {/* Progress dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {storySlides.map((_, i) => (
          <motion.div
            key={i}
            style={{
              // eslint-disable-next-line react-hooks/rules-of-hooks
              opacity: useTransform(
                scrollYProgress,
                i === total - 1
                  ? [i * step, i * step + step * 0.15, 1.0]
                  : [i * step, i * step + step * 0.15, (i + 1) * step - step * 0.15, (i + 1) * step],
                i === total - 1
                  ? [0.25, 1, 1]
                  : [0.25, 1, 1, 0.25]
              ),
              // eslint-disable-next-line react-hooks/rules-of-hooks
              width: useTransform(
                scrollYProgress,
                i === total - 1
                  ? [i * step, i * step + step * 0.15, 1.0]
                  : [i * step, i * step + step * 0.15, (i + 1) * step - step * 0.15, (i + 1) * step],
                i === total - 1
                  ? ["8px", "24px", "24px"]
                  : ["8px", "24px", "24px", "8px"]
              ),
            }}
            className="h-1.5 bg-primary rounded-full transition-all"
          />
        ))}
      </div>
    </motion.div>
  );
}

interface ParticleData {
  id: number;
  size: number;
  startX: number;
  startY: number;
  duration: number;
  xTarget1: number;
  xTarget2: number;
  delay: number;
}

// Background Particles Component
function BackgroundParticles() {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      xTarget1: Math.random() * 50 - 25,
      xTarget2: Math.random() * 50 - 25,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) {
    return null; // Avoid rendering on server or initial client render to prevent hydration mismatch
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.startX}%`,
            top: `${p.startY}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, p.xTarget1, p.xTarget2],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function FinalStorySection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={trackRef}
      className="relative bg-surface-container-lowest scroll-mt-24"
      style={{ height: `${storySlides.length * 100}vh` }}
      id="vision"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,35,80,0.3)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(94,64,116,0.15)_0%,transparent_60%)] pointer-events-none z-0" />

        <BackgroundParticles />

        {storySlides.map((slide, index) => (
          <StorySlide
            key={slide.word}
            slide={slide}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
