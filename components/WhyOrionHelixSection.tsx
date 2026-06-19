"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the 3D Canvas to avoid SSR issues
const AICoreCanvas = dynamic(() => import("./three/AICoreCanvas"), { ssr: false });

const ROTATING_WORDS = [
  "Build Together",
  "Research Together",
  "Collaborate Together",
  "Create Together",
  "Ship Together"
];

// Deep Space Background Component
const DeepSpaceBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#030014]">
      {/* Star field / moving particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: ["-10vh", "110vh"],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -40,
          }}
        />
      ))}

      {/* Grid distortion effect */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-100px)',
          transformOrigin: 'top center',
          maskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent 100%)'
        }}
      />
      
      {/* Subtle energy waves */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};

export default function WhyOrionHelixSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse Parallax for text
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max 20px movement
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking for AICore activation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"] // from when section enters viewport to when it's fully centered
  });

  // Convert scroll progress to a state to pass to the canvas
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  const welcomeText = "WELCOME TO ORION HELIX";
  const mainHeadingWords = ["The", "Future", "Of", "Human–AI", "Collaboration"];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-32 px-6 md:px-12 flex items-center scroll-mt-24" 
      id="insights"
    >
      <DeepSpaceBackground />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 relative z-10 items-center">
        
        {/* LEFT SIDE: TEXT */}
        <motion.div 
          className="space-y-8 text-left z-20 pointer-events-none"
          animate={{ x: -mousePosition.x, y: -mousePosition.y }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Subtle Uppercase Badge */}
          <div className="inline-block relative mb-2">
            <motion.span 
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-[16px] font-extrabold tracking-[0.4em] pl-4 border-l-[3px] border-[#a855f7] relative z-10 inline-block overflow-hidden" 
              style={{ 
                textShadow: "0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4)",
                background: "linear-gradient(90deg, #A855F7 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              WELCOME TO ORION HELIX
              
              {/* Light Sweep Animation Overlay */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  width: "50%",
                  height: "100%",
                  transform: "skewX(-20deg)"
                }}
                animate={{ x: ["-200%", "400%"] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.span>
          </div>
          
          {/* Main Heading - Word by Word Reveal */}
          <div className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] tracking-tight relative group flex flex-wrap gap-x-4 gap-y-2">
            {mainHeadingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </motion.span>
            ))}
            
            {/* Sweeping Glow Highlight */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent mix-blend-screen pointer-events-none"
              initial={{ x: "-100%", skewX: -20 }}
              whileInView={{ x: "200%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            />
          </div>
          
          {/* Subtitle with smooth fade-up and parallax */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4 mt-6"
            style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }} // Small extra parallax
          >
             <p className="text-on-surface-variant/90 text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
               Where developers, founders, researchers, and intelligent agents work together inside a single evolving ecosystem.
             </p>
             <p className="text-white/80 text-lg md:text-xl font-bold font-sans">
               Not another AI tool. <span className="text-primary ml-2">A new way to build.</span>
             </p>
          </motion.div>

          {/* Rotating Text System */}
          <div className="pt-4 flex items-center gap-4 text-xl md:text-2xl font-bold font-sans">
            <span className="text-white/40">&lt;</span>
            <div className="relative h-[40px] overflow-hidden flex-1">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentWordIndex}
                  initial={{ y: 40, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -40, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center"
                  style={{ transformOrigin: "center center -20px" }}
                >
                  <span className="gradient-text">{ROTATING_WORDS[currentWordIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="text-white/40">/&gt;</span>
          </div>
        </motion.div>

        {/* RIGHT SIDE: 3D AI CORE */}
        <div 
          className="relative h-[600px] w-full flex items-center justify-center lg:-ml-12 lg:-mr-12 xl:-mr-32"
          style={{ WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)", maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)" }}
        >
           <AICoreCanvas scrollProgress={progress} />
        </div>
      </div>
    </section>
  );
}
