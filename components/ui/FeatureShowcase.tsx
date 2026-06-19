"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

interface StoryStep {
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
  color: string;
  glow: string;
  visual: React.ReactNode;
}

export default function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for step transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mouse tracking for 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse values
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map smoothed mouse values to rotation (-10 to 10 degrees)
  const rotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const steps: StoryStep[] = [
    {
      title: "Orion Helix",
      subtitle: "India's first sovereign, context-aware AI workspace.",
      tagline: "The Sovereign Workspace",
      icon: "rocket_launch",
      color: "text-primary",
      glow: "rgba(24, 35, 80, 0.6)",
      visual: (
        <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-between font-mono text-[10px] space-y-4 shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#182350]" />
              <span className="font-semibold text-white/90">Orion Helix OS v1.0</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold shadow-[0_0_15px_rgba(24,35,80,0.5)]">READY</span>
          </div>
          <div className="space-y-4 flex-1 justify-center flex flex-col" style={{ transform: "translateZ(50px)" }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(24,35,80,0.3)]">
               <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_10px_rgba(24,35,80,0.8)]">memory</span>
            </div>
            <p className="text-white/80 font-bold text-center text-xs tracking-wider">
              Initializing Unified Cognitive Context...
            </p>
            <div className="w-3/4 mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary via-blue-400 to-primary shadow-[0_0_10px_#182350]"
              />
            </div>
          </div>
          <div className="text-[9px] text-white/40 text-center border-t border-white/10 pt-3" style={{ transform: "translateZ(20px)" }}>
            System Core Active
          </div>
        </div>
      )
    },
    {
      title: "Research Faster",
      subtitle: "Draft documentation, gather citations, and summarize papers with ScribeCore.",
      tagline: "Intelligent Scribe Engine",
      icon: "edit_note",
      color: "text-tertiary",
      glow: "rgba(122, 154, 184, 0.5)",
      visual: (
        <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-between font-sans text-[10px] space-y-4 shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-center border-b border-white/10 pb-3" style={{ transform: "translateZ(30px)" }}>
            <span className="font-mono text-white/50 uppercase tracking-wider text-[9px]">ScribeCore Workspace</span>
            <span className="text-tertiary font-bold font-mono drop-shadow-[0_0_8px_rgba(122,154,184,0.5)]">Processing...</span>
          </div>
          <div className="space-y-4 flex-1 justify-center flex flex-col" style={{ transform: "translateZ(50px)" }}>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 shadow-inner">
               <h4 className="font-headline font-bold text-sm text-white/90 mb-2">The Sovereign AI Architecture</h4>
               <div className="space-y-2">
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div className="h-full bg-tertiary/50" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, repeat: Infinity }} />
                 </div>
                 <div className="h-1.5 w-5/6 bg-white/10 rounded-full overflow-hidden">
                   <motion.div className="h-full bg-tertiary/50" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} />
                 </div>
                 <div className="h-1.5 w-4/6 bg-white/10 rounded-full overflow-hidden">
                   <motion.div className="h-full bg-tertiary/50" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} />
                 </div>
               </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2" style={{ transform: "translateZ(60px)" }}>
              <span className="px-2 py-1 bg-tertiary/20 border border-tertiary/30 text-tertiary rounded shadow-[0_0_10px_rgba(122,154,184,0.3)] text-[8px] font-mono backdrop-blur-md">[1] Neural Synthesis</span>
              <span className="px-2 py-1 bg-tertiary/20 border border-tertiary/30 text-tertiary rounded shadow-[0_0_10px_rgba(122,154,184,0.3)] text-[8px] font-mono backdrop-blur-md">[2] Context Modeling</span>
            </div>
          </div>
          <div className="bg-white/[0.05] border border-white/10 rounded-xl p-2 text-center text-white/50 text-[9px] font-mono" style={{ transform: "translateZ(20px)" }}>
            Analyzing 1.2M Tokens
          </div>
        </div>
      )
    },
    {
      title: "Collaborate Smarter",
      subtitle: "Sync prompts, logs, and files instantly in the collaborative Multiverse Room.",
      tagline: "Collaborative Workspace",
      icon: "hub",
      color: "text-primary",
      glow: "rgba(24, 35, 80, 0.6)",
      visual: (
        <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden select-none shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-white/50 border-b border-white/10 pb-3" style={{ transform: "translateZ(30px)" }}>
            <span>multiverse-room-01</span>
            <span className="text-primary font-bold drop-shadow-[0_0_8px_rgba(24,35,80,0.8)]">Live Sync</span>
          </div>
          <div className="relative h-32 flex items-center justify-center" style={{ transform: "translateZ(60px)" }}>
            {/* Center Node */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-16 h-16 rounded-full border border-primary/50 bg-primary/20 flex items-center justify-center shadow-[0_0_30px_rgba(24,35,80,0.6)] backdrop-blur-xl z-10"
            >
              <div className="w-8 h-8 rounded-full bg-primary/40 flex items-center justify-center">
                 <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
              </div>
            </motion.div>
            
            {/* Orbiting Nodes */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 h-40 rounded-full border border-white/5"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                   <div className="w-6 h-6 rounded-full bg-secondary/30 border border-secondary/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(94,64,116,0.5)]">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                   </div>
                   <span className="text-[8px] font-mono text-white/70 bg-black/50 px-1 rounded">Agent-X</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-1">
                   <div className="w-6 h-6 rounded-full bg-tertiary/30 border border-tertiary/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(122,154,184,0.5)]">
                      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                   </div>
                   <span className="text-[8px] font-mono text-white/70 bg-black/50 px-1 rounded">User-A</span>
                </div>
            </motion.div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
               <circle cx="50%" cy="50%" r="40" stroke="rgba(24,35,80,0.8)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="bg-primary/10 rounded-xl p-2 border border-primary/20 text-[9px] font-mono text-center text-white/60 shadow-inner" style={{ transform: "translateZ(20px)" }}>
            State unified across 4 peers
          </div>
        </div>
      )
    },
    {
      title: "Work With AI",
      subtitle: "Write, test, and deploy with DevCore's real-time compiler sandboxes.",
      tagline: "Live Execution Runtime",
      icon: "terminal",
      color: "text-secondary",
      glow: "rgba(94, 64, 116, 0.5)",
      visual: (
        <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-between font-mono text-[10px] shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-white/50" style={{ transform: "translateZ(30px)" }}>
            <span>devcore-runtime</span>
            <span className="text-secondary font-bold drop-shadow-[0_0_8px_rgba(94,64,116,0.8)]">ONLINE</span>
          </div>
          <div className="space-y-3 my-auto" style={{ transform: "translateZ(50px)" }}>
            <div className="bg-black/50 border border-white/5 rounded-lg p-3 shadow-inner">
               <p className="text-white/80"><span className="text-secondary">async function</span> <span className="text-blue-400">deployNode</span>() &#123;</p>
               <p className="text-white/80 ml-4"><span className="text-secondary">await</span> Engine.start(&#123;</p>
               <p className="text-white/80 ml-8">mode: <span className="text-green-400">&quot;sovereign&quot;</span>,</p>
               <p className="text-white/80 ml-8">workers: <span className="text-purple-400">4</span></p>
               <p className="text-white/80 ml-4">&#125;);</p>
               <p className="text-white/80">&#125;</p>
            </div>
            <div className="p-2.5 bg-secondary/10 rounded-xl border border-secondary/20 text-secondary shadow-[0_0_15px_rgba(94,64,116,0.2)]">
              &gt; Compiling sandbox bundles... <span className="animate-pulse">_</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[9px] text-white/50" style={{ transform: "translateZ(20px)" }}>
            <span>0 errors</span>
            <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" /> Synced</span>
          </div>
        </div>
      )
    },
    {
      title: "One Workspace. Infinite Possibilities.",
      subtitle: "Unify model chat, runtime, writing, and collaboration under one sovereign tab.",
      tagline: "Absolute Convergence",
      icon: "all_inclusive",
      color: "text-secondary",
      glow: "rgba(255, 255, 255, 0.2)",
      visual: (
        <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col justify-between font-mono text-[10px] space-y-4 shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3" style={{ transform: "translateZ(30px)" }}>
            <span className="font-semibold text-white/90">THE HELIX NEXUS</span>
            <span className="text-white/70 font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/20">CONNECTED</span>
          </div>
          <div className="relative flex-1 my-auto flex items-center justify-center" style={{ transform: "translateZ(60px)" }}>
            {/* 3D Floating Grid Representation */}
            <div className="grid grid-cols-2 gap-3 w-full">
               <motion.div whileHover={{ scale: 1.05, translateZ: 20 }} className="p-3 rounded-xl border border-primary/30 bg-primary/10 text-center flex flex-col justify-center items-center shadow-[0_0_20px_rgba(24,35,80,0.4)] backdrop-blur-md cursor-pointer transition-transform">
                 <span className="material-symbols-outlined text-primary text-xl mb-1">forum</span>
                 <span className="text-[9px] font-bold text-white/80">Chat Matrix</span>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05, translateZ: 20 }} className="p-3 rounded-xl border border-secondary/30 bg-secondary/10 text-center flex flex-col justify-center items-center shadow-[0_0_20px_rgba(94,64,116,0.4)] backdrop-blur-md cursor-pointer transition-transform">
                 <span className="material-symbols-outlined text-secondary text-xl mb-1">terminal</span>
                 <span className="text-[9px] font-bold text-white/80">Dev Engine</span>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05, translateZ: 20 }} className="p-3 rounded-xl border border-tertiary/30 bg-tertiary/10 text-center flex flex-col justify-center items-center shadow-[0_0_20px_rgba(122,154,184,0.4)] backdrop-blur-md cursor-pointer transition-transform">
                 <span className="material-symbols-outlined text-tertiary text-xl mb-1">edit_note</span>
                 <span className="text-[9px] font-bold text-white/80">Scribe Core</span>
               </motion.div>
               <motion.div whileHover={{ scale: 1.05, translateZ: 20 }} className="p-3 rounded-xl border border-white/20 bg-white/5 text-center flex flex-col justify-center items-center shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md cursor-pointer transition-transform">
                 <span className="material-symbols-outlined text-white/80 text-xl mb-1">hub</span>
                 <span className="text-[9px] font-bold text-white/80">Multiverse</span>
               </motion.div>
            </div>
            {/* Center glowing orb linking them */}
            <div className="absolute w-12 h-12 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] z-10">
               <span className="material-symbols-outlined text-white/80 animate-spin" style={{ animationDuration: '4s' }}>all_inclusive</span>
            </div>
          </div>
          <div className="text-[8px] text-white/40 text-center bg-white/5 p-1.5 rounded-lg border border-white/5" style={{ transform: "translateZ(20px)" }}>
            Ecosystem fully synchronized
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[600vh] bg-[#030303] selection:bg-primary/30"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 perspective-1000">
        
        {/* Deep 3D Ambient Background */}
        <div className="absolute inset-0 z-0">
           {/* Primary Glow */}
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(24,35,80,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none"
             style={{ x: useTransform(smoothMouseX, [-1, 1], [-50, 50]), y: useTransform(smoothMouseY, [-1, 1], [-50, 50]) }}
           />
           {/* Secondary Glow */}
           <motion.div 
             className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(94,64,116,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none"
             style={{ x: useTransform(smoothMouseX, [-1, 1], [30, -30]), y: useTransform(smoothMouseY, [-1, 1], [30, -30]) }}
           />
           {/* Particles grid effect */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 h-full max-h-[800px]">
          
          {/* Left panel: Floating text */}
          <div className="relative h-full flex items-center justify-center lg:justify-start">
            {steps.map((step, index) => (
              <StepText 
                key={step.title}
                step={step}
                index={index}
                total={steps.length}
                scrollYProgress={scrollYProgress}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
              />
            ))}
          </div>

          {/* Right panel: 3D Visual Mockups */}
          <div className="relative h-full flex items-center justify-center" style={{ perspective: "2000px" }}>
            {steps.map((step, index) => (
              <StepVisual 
                key={step.title}
                step={step}
                index={index}
                total={steps.length}
                scrollYProgress={scrollYProgress}
                rotateX={rotateX}
                rotateY={rotateY}
              />
            ))}
          </div>

        </div>

        {/* Scroll Progress Dot Navigation */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
          {steps.map((step, idx) => (
            <StepDot 
              key={idx}
              step={step}
              index={idx}
              total={steps.length}
              scrollYProgress={scrollYProgress}
              containerRef={containerRef}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// Child components to fix Rules of Hooks (useTransform inside map)
interface StepProps {
  step: any;
  index: number;
  total: number;
  scrollYProgress: any;
  smoothMouseX?: any;
  smoothMouseY?: any;
  rotateX?: any;
  rotateY?: any;
  containerRef?: any;
}

function StepText({ step, index, total, scrollYProgress, smoothMouseX, smoothMouseY }: StepProps) {
  const unit = 1 / total;
  const start = index * unit;
  const mid = start + unit * 0.5;
  const end = start + unit;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + unit * 0.15, mid, end - unit * 0.15, end],
    index === total - 1 ? [0, 1, 1, 1, 1] : [0, 1, 1, 1, 0]
  );
  const z = useTransform(
    scrollYProgress,
    [start, start + unit * 0.2, mid, end - unit * 0.2, end],
    index === total - 1 ? [200, 0, 0, 0, 0] : [200, 0, 0, 0, -200]
  );
  const y = useTransform(
    scrollYProgress,
    [start, start + unit * 0.2, mid, end - unit * 0.2, end],
    index === total - 1 ? [50, 0, 0, 0, 0] : [50, 0, 0, 0, -50]
  );

  return (
    <motion.div
      style={{ opacity, y, translateZ: z }}
      className="absolute left-0 w-full flex flex-col justify-center space-y-6 lg:space-y-8 pointer-events-none px-4 lg:px-0"
    >
      <div className="pointer-events-auto space-y-6 lg:space-y-8 max-w-xl mx-auto lg:mx-0">
        <motion.div 
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl text-xs font-bold tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${step.color}`}
          style={{ x: useTransform(smoothMouseX, [-1, 1], [-10, 10]), y: useTransform(smoothMouseY, [-1, 1], [-10, 10]) }}
        >
          <span className="material-symbols-outlined text-sm">{step.icon}</span>
          {step.tagline}
        </motion.div>

        <motion.h3 
          className="font-headline font-black text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight drop-shadow-2xl"
          style={{ x: useTransform(smoothMouseX, [-1, 1], [-20, 20]), y: useTransform(smoothMouseY, [-1, 1], [-20, 20]) }}
        >
          {step.title}
        </motion.h3>

        <motion.p 
          className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed font-medium"
          style={{ x: useTransform(smoothMouseX, [-1, 1], [-5, 5]), y: useTransform(smoothMouseY, [-1, 1], [-5, 5]) }}
        >
          {step.subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
}

function StepVisual({ step, index, total, scrollYProgress, rotateX, rotateY }: StepProps) {
  const unit = 1 / total;
  const start = index * unit;
  const mid = start + unit * 0.5;
  const end = start + unit;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + unit * 0.15, mid, end - unit * 0.15, end],
    index === total - 1 ? [0, 1, 1, 1, 1] : [0, 1, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + unit * 0.2, mid, end - unit * 0.2, end],
    index === total - 1 ? [0.8, 1, 1, 1, 1] : [0.8, 1, 1, 1, 1.2]
  );
  const filterBlur = useTransform(
    scrollYProgress,
    [start, start + unit * 0.2, mid, end - unit * 0.2, end],
    index === total - 1 ? ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(20px)"]
  );

  return (
    <motion.div
      style={{ 
        opacity, 
        scale,
        filter: filterBlur,
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-[540px] aspect-[16/10] relative rounded-[32px] p-[2px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto">
        <div 
          className="absolute -inset-10 blur-[80px] opacity-40 rounded-full transition-all pointer-events-none"
          style={{ background: step.glow, transform: "translateZ(-50px)" }}
        />
        <div className="relative w-full h-full bg-black/60 backdrop-blur-2xl rounded-[30px] overflow-hidden flex flex-col shadow-inner" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]" style={{ transform: "translateZ(10px)" }}>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-inner" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-inner" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-inner" />
            </div>
            <div className="flex-1 flex justify-center">
                <div className="px-3 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[9px] text-white/50 tracking-wider uppercase backdrop-blur-sm">
                  {step.title} - Environment
                </div>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-transparent to-black/40">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-50 pointer-events-none" />
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/[0.08] to-transparent rotate-[30deg] pointer-events-none" style={{ transform: "translateZ(80px)" }} />
            <div className="w-full h-full p-4 relative z-10" style={{ transformStyle: "preserve-3d" }}>
              {step.visual}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepDot({ step, index, total, scrollYProgress, containerRef }: StepProps) {
  const unit = 1 / total;
  const start = index * unit;
  const end = start + unit;

  const dotScale = useTransform(scrollYProgress, [start, start + unit * 0.25, end - unit * 0.25, end], index === total - 1 ? [1, 1.5, 1.5, 1.5] : [1, 1.5, 1.5, 1]);
  const dotOpacity = useTransform(scrollYProgress, [start, start + unit * 0.25, end - unit * 0.25, end], index === total - 1 ? [0.2, 1, 1, 1] : [0.2, 1, 1, 0.2]);

  return (
    <div className="flex items-center gap-4 group justify-end">
      <motion.span
        style={{ opacity: dotOpacity }}
        className="hidden lg:block text-[10px] font-mono uppercase tracking-widest text-white/50 font-semibold drop-shadow-md"
      >
        {step.title}
      </motion.span>
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="relative flex items-center justify-center cursor-pointer"
        onClick={() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const offset = window.scrollY + rect.top + (index / total) * rect.height;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
        <div className="absolute inset-[-4px] rounded-full border border-white/30" />
      </motion.div>
    </div>
  );
}