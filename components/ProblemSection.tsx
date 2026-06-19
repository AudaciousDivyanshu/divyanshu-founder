"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

/* ========================================================================
   PRODUCT SHOWCASE PANEL
   ======================================================================== */
const ShowcasePanel = ({
  title,
  description,
  imageSrc,
  opacity,
  scale,
  x,
  z
}: {
  title: string,
  description: string,
  imageSrc: string,
  opacity: any,
  scale: any,
  x: any,
  z: any
}) => (
  <motion.div
    style={{ opacity, scale, x, z, transformStyle: "preserve-3d" }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
  >
    <div className="w-full max-w-[1200px] h-[65vh] md:h-[70vh] max-h-[800px] flex flex-col md:flex-row rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden pointer-events-auto relative">

      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_50%)] animate-[spin_30s_linear_infinite]" />
      </div>

      {/* Screenshot side (70%) */}
      <div className="w-full md:w-[70%] h-[55%] md:h-full relative p-4 md:p-8 flex items-center justify-center bg-black/40 border-b md:border-b-0 md:border-r border-white/10 z-10">
        <div className="w-full h-full relative rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)] bg-[#050505]">
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10" />
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-contain relative z-0"
          />
        </div>
      </div>

      {/* Description side (30%) */}
      <div className="w-full md:w-[30%] p-6 md:p-10 flex flex-col justify-center gap-4 md:gap-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-[10px] uppercase font-bold tracking-widest">Orion Helix UI</span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight">
          {title}
        </h3>
        <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ========================================================================
   MAIN COMPONENT
   ======================================================================== */
export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  /* =======================================================
     CHAPTER 1: THE PROBLEM (0.00 - 0.12)
     ======================================================= */
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.10, 0.12], [0, 1, 1, 0]);

  // Floating Tools Nodes (with 3D animation)
  const toolSpread = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const node1X = useTransform(toolSpread, [0, 1], [0, -200]);
  const node1Y = useTransform(toolSpread, [0, 1], [0, -150]);
  const node1Z = useTransform(toolSpread, [0, 1], [0, 100]);
  const node1Rotate = useTransform(toolSpread, [0, 1], [0, -15]);

  const node2X = useTransform(toolSpread, [0, 1], [0, 200]);
  const node2Y = useTransform(toolSpread, [0, 1], [0, -120]);
  const node2Z = useTransform(toolSpread, [0, 1], [0, -50]);
  const node2Rotate = useTransform(toolSpread, [0, 1], [0, 20]);

  const node3X = useTransform(toolSpread, [0, 1], [0, -160]);
  const node3Y = useTransform(toolSpread, [0, 1], [0, 160]);
  const node3Z = useTransform(toolSpread, [0, 1], [0, 50]);
  const node3Rotate = useTransform(toolSpread, [0, 1], [0, 10]);

  const node4X = useTransform(toolSpread, [0, 1], [0, 180]);
  const node4Y = useTransform(toolSpread, [0, 1], [0, 150]);
  const node4Z = useTransform(toolSpread, [0, 1], [0, 150]);
  const node4Rotate = useTransform(toolSpread, [0, 1], [0, -25]);

  /* =======================================================
     CHAPTER 2: THE COST (0.12 - 0.24)
     ======================================================= */
  const ch2Opacity = useTransform(scrollYProgress, [0.12, 0.15, 0.22, 0.24], [0, 1, 1, 0]);
  const brokenLinesOpacity = useTransform(scrollYProgress, [0.12, 0.16, 0.20, 0.24], [0, 1, 0.2, 0]);

  /* =======================================================
     CHAPTER 3: THE INSIGHT (0.24 - 0.40)
     ======================================================= */
  const ch3Opacity = useTransform(scrollYProgress, [0.24, 0.27, 0.37, 0.40], [0, 1, 1, 0]);
  const ch3Scale = useTransform(scrollYProgress, [0.24, 0.40], [0.95, 1.05]);

  /* =======================================================
     CHAPTER 4 & 5: THE SHOWCASE EXPERIENCE (0.40 - 0.85)
     ======================================================= */
  const showcaseOpacity = useTransform(scrollYProgress, [0.40, 0.43, 0.82, 0.85], [0, 1, 1, 0]);

  // Phase 1: Architecture Graph (0.40 - 0.52)
  const graphOpacity = useTransform(scrollYProgress, [0.40, 0.48, 0.52], [0, 1, 0]);
  const graphScale = useTransform(scrollYProgress, [0.40, 0.52], [0.8, 1.2]);

  // Phase 2: Dev Core Panel (0.50 - 0.65)
  const devCoreOpacity = useTransform(
    scrollYProgress,
    [0.50, 0.53, 0.58, 0.61],
    [0, 1, 1, 0]
  );

  const devCoreScale = useTransform(
    scrollYProgress,
    [0.50, 0.53, 0.58, 0.61],
    [0.8, 1, 1, 0.9]
  );

  const devCoreX = useTransform(
    scrollYProgress,
    [0.58, 0.61],
    ["0%", "-20%"]
  );

  const devCoreZ = useTransform(
    scrollYProgress,
    [0.58, 0.61],
    [0, -150]
  );
  // Phase 3: Multiverse Room Panel (0.60 - 0.75)
  const multiOpacity = useTransform(
    scrollYProgress,
    [0.63, 0.66, 0.71, 0.74],
    [0, 1, 1, 0]
  );

  const multiScale = useTransform(
    scrollYProgress,
    [0.63, 0.66, 0.71, 0.74],
    [0.8, 1, 1, 0.9]
  );

  const multiX = useTransform(
    scrollYProgress,
    [0.71, 0.74],
    ["0%", "-20%"]
  );

  const multiZ = useTransform(
    scrollYProgress,
    [0.71, 0.74],
    [0, -150]
  );
  // Phase 4: Research Room Panel (0.70 - 0.85)
  // Phase 4: Research Room Panel
  const researchOpacity = useTransform(
    scrollYProgress,
    [0.76, 0.79, 0.85, 0.88],
    [0, 1, 1, 0]
  );

  const researchScale = useTransform(
    scrollYProgress,
    [0.76, 0.79, 0.85],
    [0.8, 1, 1.05]
  );

  const researchX = useTransform(
    scrollYProgress,
    [0.76, 0.79, 0.85],
    ["0%", "0%", "0%"]
  );

  const researchZ = useTransform(
    scrollYProgress,
    [0.76, 0.79, 0.85],
    [0, 0, 0]
  );

  /* =======================================================
     CHAPTER 6: FINAL REVEAL (0.85 - 1.00)
     ======================================================= */
  const revealSeq1Opacity = useTransform(scrollYProgress, [0.85, 0.88], [0, 1]);
  const revealSeq2Opacity = useTransform(scrollYProgress, [0.87, 0.90], [0, 1]);
  const revealSeq3Opacity = useTransform(scrollYProgress, [0.89, 0.92], [0, 1]);

  const finalLogoOpacity = useTransform(scrollYProgress, [0.94, 0.97], [0, 1]);
  const finalLogoY = useTransform(scrollYProgress, [0.94, 0.97], [30, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#020005] h-[1000vh] w-full"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden px-6 perspective-[1000px]">

        {/* Universal Ambience */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
          <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-white rounded-full animate-[pulse_4s_infinite]" />
          <div className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-blue-400 rounded-full animate-[pulse_3s_infinite]" />
        </div>

        {/* ============================================
            CHAPTER 1: THE PROBLEM
            ============================================ */}
        <motion.div style={{ opacity: ch1Opacity }} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center absolute top-[15%] max-w-2xl px-6">
            <h2 className="font-sans font-medium text-2xl md:text-3xl lg:text-4xl text-white/90 leading-tight">
              Developers use Slack, Notion, GitHub, ChatGPT<br />every single day.
            </h2>
          </div>
          <div className="relative w-[300px] h-[300px] flex items-center justify-center preserve-3d">
            <motion.div style={{ x: node1X, y: node1Y, z: node1Z, rotateX: node1Rotate, rotateY: node1Rotate }} className="absolute w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <span className="text-white/60 text-xs font-mono">Slack</span>
            </motion.div>
            <motion.div style={{ x: node2X, y: node2Y, z: node2Z, rotateX: node2Rotate, rotateY: node2Rotate }} className="absolute w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <span className="text-white/60 text-xs font-mono">Notion</span>
            </motion.div>
            <motion.div style={{ x: node3X, y: node3Y, z: node3Z, rotateX: node3Rotate, rotateY: node3Rotate }} className="absolute w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <span className="text-white/60 text-xs font-mono">GitHub</span>
            </motion.div>
            <motion.div style={{ x: node4X, y: node4Y, z: node4Z, rotateX: node4Rotate, rotateY: node4Rotate }} className="absolute w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <span className="text-white/60 text-xs font-mono">ChatGPT</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ============================================
            CHAPTER 2: THE COST
            ============================================ */}
        <motion.div style={{ opacity: ch2Opacity }} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center absolute top-[15%] max-w-3xl px-6 space-y-4">
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-red-400/90 leading-tight drop-shadow-[0_0_20px_rgba(248,113,113,0.3)]">
              Context breaking. Ideas lost.<br />Decisions forgotten.
            </h2>
            <p className="text-white/50 text-xl md:text-2xl font-light">
              AI restarting from zero.
            </p>
          </div>
          <motion.svg style={{ opacity: brokenLinesOpacity }} className="absolute w-[400px] h-[400px]">
            <line x1="20%" y1="20%" x2="40%" y2="40%" stroke="rgba(248,113,113,0.4)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="80%" y1="20%" x2="60%" y2="40%" stroke="rgba(248,113,113,0.4)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="rgba(248,113,113,0.4)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="80%" y1="80%" x2="60%" y2="60%" stroke="rgba(248,113,113,0.4)" strokeWidth="1" strokeDasharray="4 8" />
          </motion.svg>
        </motion.div>

        {/* ============================================
            CHAPTER 3: THE INSIGHT
            ============================================ */}
        <motion.div style={{ opacity: ch3Opacity, scale: ch3Scale }} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <h2 className="font-sans font-light text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
              The problem isn't AI.<br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">The problem is context.</span>
            </h2>
          </div>
        </motion.div>

        {/* ============================================
            CHAPTER 4 & 5: PRODUCT SHOWCASE EXPERIENCE
            ============================================ */}
        <motion.div style={{ opacity: showcaseOpacity }} className="absolute inset-0 flex items-center justify-center perspective-[1500px]">

          {/* Phase 1: Architecture Visualization Graph */}
          <motion.div style={{ opacity: graphOpacity, scale: graphScale }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center absolute top-[15%] max-w-4xl px-6">
              <h2 className="font-sans font-medium text-2xl md:text-3xl text-white/80">
                Introducing an intelligence layer that unifies it all.
              </h2>
            </div>

            <div className="relative w-[500px] h-[500px] flex items-center justify-center mt-12">
              {/* Central Hub */}
              <div className="absolute w-24 h-24 bg-primary/20 rounded-full border border-primary/50 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)] z-20">
                <span className="text-white text-xs font-bold tracking-widest text-center leading-tight">ORION<br />HELIX</span>
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="15%" y2="75%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              </svg>

              {/* Peripheral Nodes (Updated Labels) */}
              <div className="absolute top-[10%] w-40 p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center shadow-xl z-20">
                <span className="text-white text-sm font-bold">Dev Core</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Strategy & Code</span>
              </div>

              <div className="absolute bottom-[20%] left-[5%] w-40 p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center shadow-xl z-20">
                <span className="text-white text-sm font-bold">Multiverse Room</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Collaboration</span>
              </div>

              <div className="absolute bottom-[20%] right-[5%] w-40 p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center shadow-xl z-20">
                <span className="text-white text-sm font-bold text-center">Research Room</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Discovery</span>
              </div>
            </div>
          </motion.div>

          {/* Phase 2: Dev Core Preview */}
          <ShowcasePanel
            title="Dev Core"
            description="The command center where builders create, deploy, and coordinate intelligent systems."
            imageSrc="/images/dev-core-screenshot.png"
            opacity={devCoreOpacity}
            scale={devCoreScale}
            x={devCoreX}
            z={devCoreZ}
          />

          {/* Phase 3: Multiverse Room Preview */}
          <ShowcasePanel
            title="Multiverse Room"
            description="Collaborative workspaces where teams, agents, and knowledge converge in real time."
            imageSrc="/images/multiverse-room-screenshot.png"
            opacity={multiOpacity}
            scale={multiScale}
            x={multiX}
            z={multiZ}
          />

          {/* Phase 4: Research Room Preview */}
          <ShowcasePanel
            title="Research Room"
            description="The environment for exploration, experimentation, and rapid AI discovery."
            imageSrc="/images/research-room-screenshot.jpeg"
            opacity={researchOpacity}
            scale={researchScale}
            x={researchX}
            z={researchZ}
          />

        </motion.div>

        {/* ============================================
            CHAPTER 6: FINAL REVEAL
            ============================================ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
          <div className="absolute top-[20%] flex flex-col items-center gap-6">
            <motion.h3 style={{ opacity: revealSeq1Opacity }} className="font-sans font-bold text-3xl md:text-4xl text-white/80">
              One Team
            </motion.h3>
            <motion.h3 style={{ opacity: revealSeq2Opacity }} className="font-sans font-bold text-3xl md:text-4xl text-white/80">
              One Shared Context
            </motion.h3>
            <motion.h3 style={{ opacity: revealSeq3Opacity }} className="font-sans font-black text-3xl md:text-4xl text-primary">
              One Intelligent Workspace
            </motion.h3>
          </div>

          <motion.div
            style={{ opacity: finalLogoOpacity, y: finalLogoY }}
            className="absolute top-[55%] text-center w-full px-6"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full animate-pulse -z-10" />

            <h1 className="text-white font-sans font-light tracking-[0.4em] uppercase text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] relative inline-block">
              ORION <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">HELIX</span>
            </h1>
            <p className="text-white/60 font-sans text-lg md:text-xl tracking-widest font-light uppercase mt-6">
              Where Teams And AI Work As One
            </p>
          </motion.div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
        .perspective-\\[1500px\\] {
          perspective: 1500px;
        }
      `}} />
    </section>
  );
}
