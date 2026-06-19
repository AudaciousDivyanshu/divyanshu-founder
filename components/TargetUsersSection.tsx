"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useSpring, useMotionValue, useMotionTemplate, useScroll, MotionValue } from "framer-motion";
import { ChevronDown, Search, Code2, LayoutDashboard, Database, Network, Cpu, Layers, LineChart } from "lucide-react";

/* ========================================================================
   HEADER TITLE COMPONENT
   ======================================================================== */
const AnimatedText = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full px-4 relative z-50 pointer-events-none">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter leading-[1.1] mb-4">
        <span className="text-white">BUILT FOR PEOPLE WHO</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-400 to-blue-400">CREATE THE FUTURE</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg font-body font-normal text-white/50 tracking-wide">
        Different workflows. <span className="font-semibold italic text-white/70">One intelligence layer.</span>
      </p>
    </div>
  );
};

/* ========================================================================
   HOVER PHYSICS WRAPPER (SPRING DRIVEN PARALLAX + TILTED BASE SURFACE)
   ======================================================================== */
const Hover3DCardWrapper = ({ 
  children, 
  className = "",
  glowColor = "rgba(168, 85, 247, 0.35)",
  isActive = false,
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
  isActive?: boolean;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 100 });
  const translateZ = useSpring(useTransform(y, [-0.5, 0.5], [5, 10]), { damping: 30, stiffness: 100 });

  const xPercent = useTransform(x, [-0.5, 0.5], [0, 100]);
  const yPercent = useTransform(y, [-0.5, 0.5], [0, 100]);

  const glowBg = useMotionTemplate`radial-gradient(400px circle at ${xPercent}% ${yPercent}%, ${glowColor} 0%, transparent 80%)`;
  const glareBg = useMotionTemplate`radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={`group preserve-3d w-full h-full relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: rotateX, 
        rotateY: rotateY, 
        z: translateZ,
        transformStyle: "preserve-3d"
      }}
      whileHover={isActive ? { scale: 1.02 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`absolute -inset-10 rounded-full blur-[80px] opacity-30 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none -z-20 ${
        glowColor.includes("20, 184, 166") ? "bg-teal-500/15" :
        glowColor.includes("168, 85, 247") ? "bg-purple-500/15" :
        "bg-blue-500/15"
      }`} />

      <motion.div 
        className="absolute inset-0 -z-10 pointer-events-none rounded-[1.5rem] transition-opacity duration-500 opacity-20 group-hover:opacity-100"
        style={{ background: glowBg }}
      />
      <motion.div 
        className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-[1.5rem] mix-blend-overlay"
        style={{ background: glareBg, translateZ: 50 }}
      />
      {children}
    </motion.div>
  );
};

/* ========================================================================
   PROFESSIONAL CARD CONTENTS
   ======================================================================== */

// 1. Research Card (Teal)
const ResearchCardContent = ({ active }: { active: boolean }) => {
  return (
    <div className="w-[300px] sm:w-[350px] md:w-[420px] lg:w-[460px] h-[480px] sm:h-[500px] relative p-5 sm:p-6 flex flex-col justify-between preserve-3d glass-card border border-white/5 rounded-[1.5rem] overflow-hidden">
      <div className={`absolute inset-0 rounded-[1.5rem] pointer-events-none border transition-colors duration-500 ${active ? "border-teal-500/30 shadow-[inset_0_0_20px_rgba(20,184,166,0.1)]" : "border-transparent"}`} />

      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-teal-500/30 bg-teal-950/30 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <Database className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg font-headline font-bold text-white tracking-tight">Research Teams</h4>
            <span className="text-[11px] font-body text-white/50">Turn knowledge into collective intelligence.</span>
          </div>
        </div>
        <span className="text-[8px] font-mono border border-emerald-500/40 text-emerald-400 bg-emerald-950/40 rounded-full px-2 py-0.5 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SYNCED
        </span>
      </div>

      <div className="flex-1 my-6 relative z-10 flex flex-col justify-center">
        <div className="bg-[#050508]/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5 mb-3">
            <Search className="w-4 h-4 text-teal-400" />
            <span className="text-[11px] font-mono text-white/80">Semantic query: "Neural pathways"</span>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[10px]">
            <div className="flex items-center justify-between p-2.5 bg-teal-900/20 border border-teal-500/20 rounded-xl">
              <span className="text-teal-300 flex items-center gap-2"><Network className="w-3 h-3"/> brain_mapping.md</span>
              <span className="text-teal-400 bg-teal-950/50 px-2 py-1 rounded-md font-bold">99.2%</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl">
              <span className="text-white/60 flex items-center gap-2"><Layers className="w-3 h-3"/> visual_cortex_v2.json</span>
              <span className="text-white/40 px-2 py-1">87.5%</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-3 text-[13px] font-body text-white/70 relative z-10 pl-1">
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          <span>Semantic search & vector database</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          <span>Dynamic Knowledge graph visualization</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          <span>Collaborative Research workspace</span>
        </li>
      </ul>
    </div>
  );
};

// 2. Developer Card (Purple)
const DevCardContent = ({ active }: { active: boolean }) => {
  return (
    <div className="w-[300px] sm:w-[350px] md:w-[420px] lg:w-[460px] h-[480px] sm:h-[500px] relative p-5 sm:p-6 flex flex-col justify-between preserve-3d glass-card border border-white/5 rounded-[1.5rem] overflow-hidden">
      <div className={`absolute inset-0 rounded-[1.5rem] pointer-events-none border transition-colors duration-500 ${active ? "border-purple-500/30 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]" : "border-transparent"}`} />

      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-purple-500/30 bg-purple-950/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg font-headline font-bold text-white tracking-tight">Developers</h4>
            <span className="text-[11px] font-body text-white/50">Build pipelines powered by intelligence.</span>
          </div>
        </div>
        <span className="text-[8px] font-mono border border-purple-500/40 text-purple-400 bg-purple-950/40 rounded-full px-2 py-0.5 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          ACTIVE
        </span>
      </div>

      <div className="flex-1 my-6 relative z-10 flex flex-col justify-center">
        <div className="bg-[#050508]/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-3">
            <span className="text-[10px] font-mono text-white/50 flex items-center gap-2"><Cpu className="w-3 h-3 text-purple-400"/> pipeline.yaml</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md">Passing</span>
          </div>
          <pre className="font-mono text-[10px] leading-loose text-white/90 overflow-hidden">
            <code>
              <span className="text-purple-400">deploy:</span><br />
              &nbsp;&nbsp;<span className="text-blue-400">agent:</span> orion-core-v2<br />
              &nbsp;&nbsp;<span className="text-blue-400">steps:</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-emerald-400">build_artifacts</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-emerald-400">run_tests</span><br />
              &nbsp;&nbsp;<span className="text-white/40"># Auto-reverts on failure</span>
            </code>
          </pre>
        </div>
      </div>

      <ul className="flex flex-col gap-3 text-[13px] font-body text-white/70 relative z-10 pl-1">
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          <span>Dev Core with real-time compilation</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          <span>Automated Build pipelines</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          <span>Agent execution & Deployment dashboard</span>
        </li>
      </ul>
    </div>
  );
};

// 3. Startup Founders Card (Blue)
const FounderCardContent = ({ active }: { active: boolean }) => {
  return (
    <div className="w-[300px] sm:w-[350px] md:w-[420px] lg:w-[460px] h-[480px] sm:h-[500px] relative p-5 sm:p-6 flex flex-col justify-between preserve-3d glass-card border border-white/5 rounded-[1.5rem] overflow-hidden">
      <div className={`absolute inset-0 rounded-[1.5rem] pointer-events-none border transition-colors duration-500 ${active ? "border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]" : "border-transparent"}`} />

      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-blue-500/30 bg-blue-950/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg font-headline font-bold text-white tracking-tight">Startup Founders</h4>
            <span className="text-[11px] font-body text-white/50">Execute visions with clear oversight.</span>
          </div>
        </div>
        <span className="text-[8px] font-mono border border-blue-500/40 text-blue-400 bg-blue-950/40 rounded-full px-2 py-0.5 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          ON TRACK
        </span>
      </div>

      <div className="flex-1 my-6 relative z-10 flex flex-col justify-center">
        <div className="bg-[#050508]/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col">
               <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1">Velocity</span>
               <span className="text-lg font-mono font-bold text-blue-400 flex items-center gap-1"><LineChart className="w-3 h-3"/> +32%</span>
             </div>
             <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col">
               <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1">Burn Rate</span>
               <span className="text-lg font-mono font-bold text-emerald-400">Stable</span>
             </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-mono text-white/60 px-1">
              <span>Q3 Roadmap Execution</span>
              <span className="text-blue-400">78%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full w-[78%]" />
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-3 text-[13px] font-body text-white/70 relative z-10 pl-1">
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span>Multiverse Room for scenario planning</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span>Cross-functional Team collaboration</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span>Live Execution tracking & analytics</span>
        </li>
      </ul>
    </div>
  );
};

/* ========================================================================
   LEFT SIDE TIMELINE SIDEBAR
   ======================================================================== */
const ScrollTimelineProgress = ({ scrollProgress, activeMode }: { scrollProgress: MotionValue<number>, activeMode: string }) => {
  // Map progress (0 to 1) to height (0% to 100%) and ball position
  const rawHeight = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  const smoothHeight = useSpring(rawHeight, { damping: 25, stiffness: 120 });
  
  const rawBallY = useTransform(scrollProgress, [0, 1], [36, 164]); // coordinates match the 3 steps perfectly
  const smoothBallY = useSpring(rawBallY, { damping: 25, stiffness: 120 });

  return (
    <div className="w-[140px] h-[200px] relative pl-4 select-none font-mono">
      <div className="absolute left-[0px] top-[36px] bottom-[36px] w-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-teal-500 via-purple-500 to-blue-500 origin-top"
          style={{ height: smoothHeight }}
        />
      </div>

      <motion.div 
        className="absolute left-[-4px] w-2.5 h-2.5 rounded-full z-10 transition-colors duration-300"
        style={{
          y: smoothBallY,
          backgroundColor: 
            activeMode === "research" ? "#14b8a6" : 
            activeMode === "developer" ? "#a855f7" : 
            "#3b82f6",
          boxShadow: 
            activeMode === "research" ? "0 0 16px #14b8a6, 0 0 32px rgba(20,184,166,0.3)" : 
            activeMode === "developer" ? "0 0 16px #a855f7, 0 0 32px rgba(168,85,247,0.3)" : 
            "0 0 16px #3b82f6, 0 0 32px rgba(59,130,246,0.3)"
        }}
      >
        <div 
          className="absolute inset-[-4px] rounded-full border animate-[pulseRing_2s_ease-out_infinite]"
          style={{
            borderColor: 
              activeMode === "research" ? "rgba(20,184,166,0.5)" : 
              activeMode === "developer" ? "rgba(168,85,247,0.5)" : 
              "rgba(59,130,246,0.5)"
          }}
        />
      </motion.div>

      <div className="text-[8.5px] uppercase tracking-wider text-white/30 font-bold mb-4">
        Scroll Progress
      </div>

      <div className="flex flex-col gap-6 relative">
        <div className="h-10 flex flex-col justify-center">
          <span className={`font-mono text-[10px] transition-all duration-500 origin-left ${activeMode === "research" ? "text-teal-400 font-black scale-[1.15] drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" : "text-white/40 opacity-40 font-bold"}`}>
            01
          </span>
          <span className={`text-[8.5px] font-sans mt-0.5 transition-all duration-300 ${activeMode === "research" ? "text-teal-400 font-bold" : "text-white/40 opacity-40"}`}>
            Research Teams
          </span>
        </div>

        <div className="h-10 flex flex-col justify-center">
          <span className={`font-mono text-[10px] transition-all duration-500 origin-left ${activeMode === "developer" ? "text-purple-400 font-black scale-[1.15] drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "text-white/40 opacity-40 font-bold"}`}>
            02
          </span>
          <span className={`text-[8.5px] font-sans mt-0.5 transition-all duration-300 ${activeMode === "developer" ? "text-purple-400 font-bold" : "text-white/40 opacity-40"}`}>
            Developers
          </span>
        </div>

        <div className="h-10 flex flex-col justify-center">
          <span className={`font-mono text-[10px] transition-all duration-500 origin-left ${activeMode === "founder" ? "text-blue-400 font-black scale-[1.15] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "text-white/40 opacity-40 font-bold"}`}>
            03
          </span>
          <span className={`text-[8.5px] font-sans mt-0.5 transition-all duration-300 ${activeMode === "founder" ? "text-blue-400 font-bold" : "text-white/40 opacity-40"}`}>
            Startup Founders
          </span>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   BOTTOM MOUSE SCROLL EXPLORE INDICATOR
   ======================================================================== */
const ScrollToExplore = () => {
  return (
    <div className="flex flex-col items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase mt-4 select-none">
      <span>Scroll to explore</span>
      <div className="w-5 h-8 border border-white/10 rounded-full flex justify-center p-1.5 relative overflow-hidden">
        <motion.div 
          className="w-1.2 h-2.5 bg-white/40 rounded-full" 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.div 
        animate={{ y: [0, 4, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-0.5"
      >
        <ChevronDown className="w-3.5 h-3.5 text-white/35" />
      </motion.div>
    </div>
  );
};

/* ========================================================================
   BACKGROUND NOISE / PARTICLES
   ======================================================================== */
const BackgroundParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.parentElement?.clientWidth ? canvas.parentElement.clientWidth * dpr : window.innerWidth * dpr;
      canvas.height = canvas.parentElement?.clientHeight ? canvas.parentElement.clientHeight * dpr : window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const count = Math.min(Math.floor((w * h) / 30000), 30);
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const vx = (Math.random() - 0.5) * 0.15;
        const vy = (Math.random() - 0.5) * 0.15;
        const radius = Math.random() * 1.2 + 0.6;
        
        let color = "rgba(20, 184, 166, 0.2)";
        if (x > w * 0.35 && x < w * 0.65) {
          color = "rgba(168, 85, 247, 0.2)";
        } else if (x >= w * 0.65) {
          color = "rgba(59, 130, 246, 0.2)";
        }
        
        particles.push({ x, y, vx, vy, radius, color });
      }
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-10" style={{ mixBlendMode: "screen" }} />;
};

/* ========================================================================
   MAIN COMPONENT WITH NATIVE CSS STICKY SCROLLING
   ======================================================================== */
export default function TargetUsersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use pure framer motion scroll progress tied to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeMode, setActiveMode] = useState<"research" | "developer" | "founder">("research");

  // Efficient state update for active mode tracking
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) {
        if (activeMode !== "research") setActiveMode("research");
      } else if (latest < 0.66) {
        if (activeMode !== "developer") setActiveMode("developer");
      } else {
        if (activeMode !== "founder") setActiveMode("founder");
      }
    });
  }, [scrollYProgress, activeMode]);

  // Smoothed progress for physics
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  // Complex interpolations for overlapping cards
  // Card 1 (Research) fades out and scales down as scroll increases past 0.3
  const card1Opacity = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const card1Scale = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 0.95, 0.85]);
  const card1Y = useTransform(smoothProgress, [0, 0.25, 0.35], [0, 0, -40]);

  // Card 2 (Developer) enters at 0.2, peaks at 0.5, exits at 0.7
  const card2Opacity = useTransform(smoothProgress, [0.2, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const card2Scale = useTransform(smoothProgress, [0.2, 0.35, 0.6, 0.7], [0.85, 1, 1, 0.85]);
  const card2Y = useTransform(smoothProgress, [0.2, 0.35, 0.6, 0.7], [40, 0, 0, -40]);

  // Card 3 (Founder) enters at 0.55, peaks at 0.75
  const card3Opacity = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);
  const card3Scale = useTransform(smoothProgress, [0.55, 0.7], [0.85, 1]);
  const card3Y = useTransform(smoothProgress, [0.55, 0.7], [40, 0]);

  return (
    // Tall wrapper to create scroll space (400vh) - eliminates overlap naturally
    <section ref={containerRef} className="relative w-full h-[350vh] bg-[#030108]">
      
      {/* Sticky viewport that stays fixed while scrolling through the section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start perspective-[1500px] pt-8 md:pt-16 pb-4">
        
        {/* Cosmic Nebula Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520] via-[#030108] to-[#030118]" />
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(120,40,200,0.12)_0%,transparent_70%)] blur-[40px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(30,60,180,0.1)_0%,transparent_70%)] blur-[40px]" />
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(80,40,160,0.06)_0%,transparent_60%)] blur-[60px]" />
          <div className="cosmic-stars absolute inset-0 opacity-30" />
          <div className="moving-grid w-[120%] h-[120%] opacity-10" />
          <BackgroundParticles />
        </div>

        {/* Header Title */}
        <div className="w-full flex-shrink-0 z-50 mb-12">
          <AnimatedText />
        </div>

        {/* Central Overlay Showcase */}
        <div className="w-full max-w-[1360px] flex-1 flex items-center justify-between gap-4 xl:gap-6 relative z-20 px-4 preserve-3d origin-center" style={{ perspective: "1500px" }}>
          
          {/* Left Timeline Progress tracker */}
          <div className="w-[120px] flex-shrink-0 z-30 hidden md:block">
            <ScrollTimelineProgress scrollProgress={smoothProgress} activeMode={activeMode} />
          </div>

          {/* Cards Centered Overlapping Stacking Container */}
          <div className="flex-1 flex justify-center items-center relative preserve-3d h-[500px] w-full max-w-[1100px]">
            
            {/* Card 1: Research Teams */}
            <motion.div 
              style={{ opacity: card1Opacity, scale: card1Scale, y: card1Y }}
              className={`absolute preserve-3d flex-shrink-0 origin-center transition-all duration-300 ${activeMode === "research" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <Hover3DCardWrapper glowColor="rgba(20, 184, 166, 0.25)" isActive={activeMode === "research"}>
                <ResearchCardContent active={activeMode === "research"} />
              </Hover3DCardWrapper>
            </motion.div>

            {/* Card 2: Developers */}
            <motion.div 
              style={{ opacity: card2Opacity, scale: card2Scale, y: card2Y }}
              className={`absolute preserve-3d flex-shrink-0 origin-center transition-all duration-300 ${activeMode === "developer" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <Hover3DCardWrapper glowColor="rgba(168, 85, 247, 0.25)" isActive={activeMode === "developer"}>
                <DevCardContent active={activeMode === "developer"} />
              </Hover3DCardWrapper>
            </motion.div>

            {/* Card 3: Startup Founders */}
            <motion.div 
              style={{ opacity: card3Opacity, scale: card3Scale, y: card3Y }}
              className={`absolute preserve-3d flex-shrink-0 origin-center transition-all duration-300 ${activeMode === "founder" ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <Hover3DCardWrapper glowColor="rgba(59, 130, 246, 0.25)" isActive={activeMode === "founder"}>
                <FounderCardContent active={activeMode === "founder"} />
              </Hover3DCardWrapper>
            </motion.div>

          </div>

          <div className="w-[120px] hidden md:block" />
        </div>

        {/* Bottom Scroll indicator */}
        <div className="w-full flex-shrink-0 z-40 mt-4 md:mt-0 mb-8">
          <ScrollToExplore />
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .moving-grid {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          position: absolute;
          top: -60px;
          left: -60px;
          right: -60px;
          bottom: -60px;
          animation: gridMove 20s linear infinite;
        }
        .cosmic-stars {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.2px 1.2px at 50% 10%, rgba(200,180,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.5) 0%, transparent 100%);
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .glass-card {
          background: rgba(10, 8, 25, 0.6);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.8), 
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}} />
    </section>
  );
}
