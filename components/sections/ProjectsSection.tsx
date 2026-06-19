"use client";

import React, { useEffect, useState, useRef, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { Play, CheckCircle2, ShieldAlert, Cpu, Sparkles, Code2, AlertTriangle, Disc, Volume2 } from "lucide-react";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

// Mouse Context to pass card motion values to deep visual simulations for parallax depth
const CardMouseContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>({
  x: new MotionValue(0),
  y: new MotionValue(0)
});

const projects = [
  {
    id: "orion-helix-ai",
    title: "Orion Helix AI",
    status: "Building",
    statusColor: "text-primary bg-primary/10 border-primary/20",
    description: "India's first all-in-one sovereign AI workspace. Unifying multi-model chat, full-stack code execution, documentation with ScribeCore, and real-time team synchronization.",
    tags: ["Next.js", "Python", "Rust", "LLMs", "WebSockets"],
    metrics: { value: "40%", label: "Context Overhead Reduction" },
    accent: "rgba(168, 85, 247, 0.45)"
  },
  {
    id: "code-inspector-ai",
    title: "Code Inspector AI",
    status: "Hackathon Finalist",
    statusColor: "text-secondary bg-secondary/10 border-secondary/20",
    description: "An AI-powered static analysis tool that scans repository patterns, identifies architectural deviations, and generates unified code improvement recommendations.",
    tags: ["TypeScript", "AST Parsing", "ESLint API", "Tailwind CSS"],
    metrics: { value: "Top 3", label: "National Hackathon" },
    accent: "rgba(59, 130, 246, 0.45)"
  },
  {
    id: "jarvis-ai",
    title: "Jarvis",
    status: "In Development",
    statusColor: "text-tertiary bg-tertiary/10 border-tertiary/20",
    description: "An agentic developer assistant optimized for ambient, voice-command triggered background tasks. Monitors local compilation states and handles small code modifications automatically.",
    tags: ["Rust", "Tauri", "Audio API", "Whisper", "Local LLMs"],
    metrics: { value: "Ambient", label: "Zero-latency UI" },
    accent: "rgba(244, 63, 94, 0.35)"
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ========================================================================
   SHOWCASE BACKGROUND PATTERN
   ======================================================================== */
function ShowcaseBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05] z-0 select-none">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
      {/* Drifting background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.3 + 0.1, 
              x: Math.random() * 1400, 
              y: Math.random() * 800,
              scale: Math.random() * 1.5 + 0.5
            }}
            animate={{
              y: [Math.random() * 800, Math.random() * 800],
              x: [Math.random() * 1400, Math.random() * 1400]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-white"
          />
        ))}
      </div>
      {/* Subtle moving energy waves / gradients */}
      <motion.div 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_50%)]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_50%)]"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

/* ========================================================================
   3D PERSPECTIVE TILT WRAPPER WITH GENTLE FLOAT
   ======================================================================== */
function InteractiveCardWrapper({ 
  children, 
  accentColor, 
  delay = 0,
  isHovered
}: { 
  children: React.ReactNode; 
  accentColor: string; 
  delay?: number; 
  isHovered: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D Tilt Springs
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 120 });

  const xPercent = useTransform(x, [-0.5, 0.5], [0, 100]);
  const yPercent = useTransform(y, [-0.5, 0.5], [0, 100]);

  // Glow radial gradient templates (Glow increases on hover)
  const glowBg = useMotionTemplate`radial-gradient(${isHovered ? 400 : 300}px circle at ${xPercent}% ${yPercent}%, ${accentColor} 0%, transparent 80%)`;
  const glareBg = useMotionTemplate`radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,${isHovered ? 0.08 : 0.04}) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      className="w-full h-full relative"
      animate={{
        y: [0, -6, 0]
      }}
      transition={{
        duration: 4.5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="group preserve-3d w-full h-full relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.85)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {/* Glow expansion under card */}
        <motion.div 
          className="absolute inset-0 -z-10 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glowBg }}
        />
        {/* Glare overlay */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-3xl mix-blend-overlay"
          style={{ background: glareBg }}
        />
        <CardMouseContext.Provider value={{ x, y }}>
          {children}
        </CardMouseContext.Provider>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="pb-32 pt-8 px-6 md:px-12 bg-surface-container-low relative border-t border-outline-variant/30 overflow-hidden scroll-mt-24" id="projects">
      {/* Background glow elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />
      
      {/* Premium Animated Background */}
      <ShowcaseBackground />

      <div className="max-w-[1400px] mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl">
          <div className="space-y-4">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-secondary/20 text-secondary text-sm font-semibold tracking-wider uppercase">
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                Featured Artifacts
              </div>
            </FadeUp>
            <div className="relative">
              <RevealText as="h2" className="font-headline font-black text-4xl md:text-5xl lg:text-6xl animate-text-glow">
                Interactive Product Showcase
              </RevealText>
              {/* Underline energy sweep */}
              <div className="h-[2px] w-full bg-gradient-to-r from-secondary/50 via-primary to-transparent mt-3 rounded-full relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-1/3"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
          <FadeUp delay={0.1}>
            <p className="text-on-surface-variant text-base md:text-lg max-w-md leading-relaxed">
              Experience the core mechanics of our AI products through live, real-time visual sandbox simulations.
            </p>
          </FadeUp>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="w-full"
            >
              <InteractiveCardWrapper 
                accentColor={project.accent} 
                delay={idx * 0.5} 
                isHovered={hoveredCard === project.id}
              >
                <div
                  className="flex flex-col justify-between glass-panel border border-white/5 rounded-3xl p-6 hover:border-white/15 transition-all duration-300 h-full relative overflow-hidden bg-[#030107]/50"
                  style={{
                    boxShadow: "0 20px 40px -25px rgba(0, 0, 0, 0.4)"
                  }}
                >
                  <div className="space-y-6">
                    {/* Visual Panel Showcase */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-[#080510]/80 flex items-center justify-center p-1">
                      {project.id === "orion-helix-ai" && (
                        <OrionHelixVisual isHovered={hoveredCard === "orion-helix-ai"} />
                      )}
                      {project.id === "code-inspector-ai" && (
                        <CodeInspectorVisual isHovered={hoveredCard === "code-inspector-ai"} />
                      )}
                      {project.id === "jarvis-ai" && (
                        <JarvisVisual isHovered={hoveredCard === "jarvis-ai"} />
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center gap-3">
                        <h3 className="font-headline font-bold text-2xl text-on-surface group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${project.statusColor}`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-on-surface-variant/90 text-sm leading-relaxed min-h-[72px]">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags and Metrics */}
                  <div className="space-y-6 mt-8 pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-surface-container-high/60 rounded-lg text-[9px] uppercase font-bold tracking-wider text-outline border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                      <span className="text-[10px] text-outline uppercase tracking-wider font-semibold">
                        {project.metrics.label}
                      </span>
                      <span className="font-headline font-black text-lg text-primary group-hover:scale-105 transition-transform duration-300">
                        {project.metrics.value}
                      </span>
                    </div>
                  </div>
                </div>
              </InteractiveCardWrapper>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================================
   1. ORION HELIX LIVE WORKSPACE SIMULATOR
   ======================================================================== */
function OrionHelixVisual({ isHovered }: { isHovered: boolean }) {
  const { x, y } = useContext(CardMouseContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  // Parallax shifts to create real 3D depth based on mouse movement
  const leftX = useTransform(x || fallbackX, [-0.5, 0.5], [6, -6]);
  const leftY = useTransform(y || fallbackY, [-0.5, 0.5], [4, -4]);
  const rightX = useTransform(x || fallbackX, [-0.5, 0.5], [-6, 6]);
  const rightY = useTransform(y || fallbackY, [-0.5, 0.5], [-4, 4]);

  const rooms = ["Frontend", "Backend", "Research", "Docs"];
  const [activeRoom, setActiveRoom] = useState(0);
  const [typingState, setTypingState] = useState("");
  const [suggestion, setSuggestion] = useState(false);

  const [randomParticles, setRandomParticles] = useState<any[]>([]);

  useEffect(() => {
    setRandomParticles(Array.from({ length: 6 }).map(() => ({
      initialX: Math.random() * 200,
      animX1: Math.random() * 200,
      animX2: Math.random() * 200 + (Math.random() - 0.5) * 30,
      duration: 3 + Math.random() * 3,
    })));
  }, []);

  useEffect(() => {
    const roomTimer = setInterval(() => {
      setActiveRoom((prev) => (prev + 1) % rooms.length);
      setSuggestion(false);
    }, 4500);

    return () => clearInterval(roomTimer);
  }, []);

  useEffect(() => {
    let baseText = "";
    if (activeRoom === 0) baseText = "const api = new HelixClient();";
    if (activeRoom === 1) baseText = "def solve_ast(tree):";
    if (activeRoom === 2) baseText = "Querying semantic graph index...";
    if (activeRoom === 3) baseText = "# Orion Helix Architecture Plan";

    let i = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypingState("");
    
    // Typing animation runs faster when hovered
    const delay = isHovered ? 25 : 55;

    const typeTimer = setInterval(() => {
      setTypingState(baseText.substring(0, i));
      i++;
      if (i > baseText.length) {
        clearInterval(typeTimer);
        setTimeout(() => setSuggestion(true), 400);
      }
    }, delay);

    return () => clearInterval(typeTimer);
  }, [activeRoom, isHovered]);

  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[9px] text-left p-3 space-y-2 select-none relative overflow-hidden">
      
      {/* Floating particles appear on hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {randomParticles.map((particle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 120, x: particle.initialX }}
                animate={{
                  opacity: [0, 0.4, 0.4, 0],
                  y: [120, -10],
                  x: [particle.animX1, particle.animX2]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear"
                }}
                className="absolute w-1 h-1 bg-primary rounded-full"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Top Workspace Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-outline-variant relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${isHovered ? "duration-500 scale-150" : ""}`} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </div>
          <span>helix-multiverse-room</span>
        </div>
        <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase transition-all duration-300 ${
          isHovered 
            ? "text-white bg-primary/40 border border-primary/50 shadow-[0_0_8px_rgba(168,85,247,0.4)]" 
            : "text-primary bg-primary/10 border border-primary/20"
        }`}>
          Syncing Context
        </span>
      </div>

      {/* Main Grid: Rooms panel left, Workspace panel right */}
      <div className="flex-1 grid grid-cols-12 gap-3 items-stretch relative z-10">
        
        {/* Left Side: Rooms list */}
        <motion.div 
          style={{ x: leftX, y: leftY }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="col-span-4 border-r border-white/5 pr-2 flex flex-col justify-between py-1"
        >
          <div className="space-y-1">
            {rooms.map((room, idx) => (
              <div
                key={room}
                className={`px-2 py-1 rounded transition-colors duration-300 font-bold flex items-center justify-between ${
                  activeRoom === idx
                    ? "bg-primary/20 text-white border-l-2 border-primary"
                    : "text-on-surface-variant/40"
                }`}
              >
                <span>{room} Room</span>
                {activeRoom === idx && (
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            ))}
          </div>
          <div className="text-[7px] text-outline-variant/60 flex items-center gap-1">
            <span className={`w-1 h-1 rounded-full bg-green-500 ${isHovered ? "animate-pulse" : ""}`} />
            3 active peers
          </div>
        </motion.div>

        {/* Right Side: Coding/Docs pane */}
        <motion.div 
          style={{ x: rightX, y: rightY }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="col-span-8 flex flex-col justify-between py-1 relative"
        >
          <div className="space-y-1.5">
            <div className="text-[8px] text-outline-variant/40 uppercase tracking-widest">Active File Edit</div>
            <pre className="text-white bg-[#030107]/90 p-1.5 rounded border border-white/5 min-h-[35px] text-wrap">
              {typingState}
              <span className="w-1 h-3 bg-primary ml-0.5 animate-pulse inline-block align-middle" />
            </pre>
          </div>

          {/* AI Suggestion Box */}
          <AnimatePresence>
            {suggestion && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute bottom-1 left-0 right-0 p-2 rounded-lg bg-primary/20 border border-primary/30 text-[8px] flex items-center justify-between gap-1 shadow-lg shadow-black/45"
              >
                <div className="flex items-center gap-1">
                  <Sparkles size={10} className="text-primary flex-shrink-0 animate-pulse" />
                  <span className="text-white truncate">AI Suggestion: Inject unified db context</span>
                </div>
                <span className="text-[7px] bg-white/10 px-1 py-0.5 rounded text-white font-bold cursor-pointer hover:bg-white/20">Apply</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* SVG Connecting lines visualization across the rooms */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <line x1="20%" y1="35%" x2="55%" y2="45%" stroke="rgba(168,85,247,0.5)" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="20%" y1="75%" x2="55%" y2="85%" stroke="rgba(168,85,247,0.5)" strokeWidth="0.75" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

/* ========================================================================
   2. CODE INSPECTOR AI SIMULATOR
   ======================================================================== */
function CodeInspectorVisual({ isHovered }: { isHovered: boolean }) {
  const { x, y } = useContext(CardMouseContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  
  // Parallax shifting for AST architecture graph
  const graphX = useTransform(x || fallbackX, [-0.5, 0.5], [8, -8]);
  const graphY = useTransform(y || fallbackY, [-0.5, 0.5], [6, -6]);

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [warningsCount, setWarningsCount] = useState(3);
  const [filesScanned, setFilesScanned] = useState(182);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % 3;
        if (next === 0) setProgress(0);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === 0) {
      let currentProg = 0;
      const progTimer = setInterval(() => {
        currentProg += isHovered ? 12 : 8; // scans faster on hover
        if (currentProg >= 100) {
          setProgress(100);
          clearInterval(progTimer);
        } else {
          setProgress(currentProg);
        }
      }, 200);
      return () => clearInterval(progTimer);
    }
  }, [step, isHovered]);

  // Dynamic counter updates on hover
  useEffect(() => {
    if (isHovered) {
      const counterTimer = setInterval(() => {
        setFilesScanned((prev) => prev + 1);
        if (Math.random() > 0.8) {
          setWarningsCount((prev) => prev + 1);
        }
      }, 150);
      return () => clearInterval(counterTimer);
    } else {
      setFilesScanned(182);
      setWarningsCount(3);
    }
  }, [isHovered]);

  return (
    <div className="w-full h-full flex flex-col justify-between font-mono text-[9px] text-left p-3 space-y-2 select-none relative overflow-hidden">
      
      {/* Code analyzer beam sweeping on hover */}
      {isHovered && (
        <motion.div 
          className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-secondary to-transparent z-20 pointer-events-none"
          animate={{ y: [0, 150, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Architecture AST Graph that pulses */}
      <motion.div 
        style={{ x: graphX, y: graphY }}
        className="absolute right-2 top-8 w-24 h-24 pointer-events-none opacity-25 z-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="50" y1="20" x2="25" y2="50" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
          <line x1="50" y1="20" x2="75" y2="50" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
          <line x1="25" y1="50" x2="15" y2="80" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
          <line x1="25" y1="50" x2="35" y2="80" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
          <line x1="75" y1="50" x2="65" y2="80" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
          <line x1="75" y1="50" x2="85" y2="80" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />

          {/* Root node */}
          <motion.circle 
            cx="50" cy="20" r="5" 
            fill={isHovered ? "#3b82f6" : "#1e40af"} 
            animate={isHovered ? { r: [5, 7, 5], filter: ["drop-shadow(0 0 1px #3b82f6)", "drop-shadow(0 0 5px #3b82f6)", "drop-shadow(0 0 1px #3b82f6)"] } : {}}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {/* Child nodes */}
          <motion.circle 
            cx="25" cy="50" r="4" 
            fill={isHovered ? "#3b82f6" : "#1e40af"} 
            animate={isHovered ? { r: [4, 5.5, 4], filter: ["drop-shadow(0 0 1px #3b82f6)", "drop-shadow(0 0 4px #3b82f6)", "drop-shadow(0 0 1px #3b82f6)"] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
          />
          <motion.circle 
            cx="75" cy="50" r="4" 
            fill={isHovered ? "#3b82f6" : "#1e40af"} 
            animate={isHovered ? { r: [4, 5.5, 4], filter: ["drop-shadow(0 0 1px #3b82f6)", "drop-shadow(0 0 4px #3b82f6)", "drop-shadow(0 0 1px #3b82f6)"] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
          />
          {/* Leaf nodes */}
          <circle cx="15" cy="80" r="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="0.5" />
          <circle cx="35" cy="80" r="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="0.5" />
          <circle cx="65" cy="80" r="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="0.5" />
          <circle cx="85" cy="80" r="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-outline-variant relative z-10">
        <div className="flex items-center gap-1.5">
          <Code2 size={12} className="text-secondary animate-pulse" />
          <span>code-inspector-core</span>
        </div>
        <span className={`text-[8px] font-bold transition-all duration-300 ${isHovered ? "text-secondary shadow-[0_0_8px_rgba(59,130,246,0.4)]" : "text-secondary"}`}>
          ACTIVE CODE INSPECT
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-2 relative z-10">
        {step === 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] text-white">
              <span>Scanning workspace repos...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-secondary transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[7px] text-outline-variant/60">Parsing AST nodes in app/api/auth...</span>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px]">
              <ShieldAlert size={12} className={isHovered ? "scale-110 animate-bounce" : ""} />
              <span>{warningsCount} Architectural Warnings</span>
            </div>
            <div className="space-y-1 bg-amber-500/5 border border-amber-500/20 p-1.5 rounded text-[8px] text-on-surface-variant relative overflow-hidden">
              <motion.p 
                initial={{ opacity: 0.3 }}
                animate={isHovered ? { opacity: 1, x: [0, 2, 0] } : { opacity: 0.3 }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
                className="text-white flex items-center gap-1"
              >
                <span className="text-amber-400 font-semibold">[WARN]</span> Cyclic import: page.tsx &rarr; ProjectsSection
              </motion.p>
              <motion.p 
                initial={{ opacity: 0.3 }}
                animate={isHovered ? { opacity: 1, x: [0, 2, 0] } : { opacity: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
                className="text-white flex items-center gap-1"
              >
                <span className="text-amber-400 font-semibold">[WARN]</span> Unused React import in SmoothScrollProvider
              </motion.p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] text-emerald-400 font-bold">
              <span>Suggested Fixes Generated</span>
              <span>Conf Score: 98.4%</span>
            </div>
            <div className="space-y-1 bg-emerald-500/5 border border-emerald-500/20 p-1.5 rounded text-[8px] text-on-surface-variant">
              <p className="text-emerald-300">&gt; Refactoring cyclic imports into central /types directory.</p>
              <p className="text-emerald-300">&gt; Pruning SmoothScrollProvider imports.</p>
            </div>
          </div>
        )}
      </div>

      {/* AST nodes representation at bottom right */}
      <div className="absolute right-3 bottom-8 flex gap-1 z-10">
        <motion.div 
          animate={isHovered ? { scale: [1, 1.3, 1], backgroundColor: ["rgba(59,130,246,0.2)", "rgba(59,130,246,0.6)", "rgba(59,130,246,0.2)"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full border border-secondary bg-secondary/20"
        />
        <motion.div 
          animate={isHovered ? { scale: [1, 1.3, 1], backgroundColor: ["rgba(59,130,246,0.2)", "rgba(59,130,246,0.6)", "rgba(59,130,246,0.2)"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="w-2 h-2 rounded-full border border-secondary bg-secondary/20"
        />
        <motion.div 
          animate={isHovered ? { scale: [1, 1.3, 1], backgroundColor: ["rgba(59,130,246,0.2)", "rgba(59,130,246,0.6)", "rgba(59,130,246,0.2)"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          className="w-2 h-2 rounded-full border border-secondary bg-secondary/20"
        />
      </div>

      <div className="border-t border-white/5 pt-2 flex justify-between text-[7px] text-outline-variant/60 relative z-10">
        <span>Files indexed: {filesScanned} files</span>
        <span>AST parsing: 45ms</span>
      </div>
    </div>
  );
}

/* ========================================================================
   3. JARVIS AMBIENT VOICE ASSISTANT SIMULATOR
   ======================================================================== */
function JarvisVisual({ isHovered }: { isHovered: boolean }) {
  const { x, y } = useContext(CardMouseContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  // Parallax displacement of the orb based on mouse
  const orbX = useTransform(x || fallbackX, [-0.5, 0.5], [5, -5]);
  const orbY = useTransform(y || fallbackY, [-0.5, 0.5], [5, -5]);

  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Bouncing sound frequency bars react faster and jump higher on hover
      const maxVal = isHovered ? 40 : 25;
      const minVal = isHovered ? 8 : 4;
      const frequencies = Array.from({ length: 14 }).map(() => Math.floor(Math.random() * maxVal) + minVal);
      setBars(frequencies);
    }, isHovered ? 75 : 120);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-3 text-[9px] font-mono relative overflow-hidden select-none">
      
      {/* Floating particles orbits */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-rose-400 rounded-full animate-ping" />
        <div className="absolute bottom-[20%] right-[20%] w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: "1s" }} />
        {isHovered && (
          <>
            <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-rose-400 rounded-full animate-ping" style={{ animationDelay: "0.3s" }} />
            <div className="absolute top-[30%] right-[25%] w-1.2 h-1.2 bg-primary rounded-full animate-ping" style={{ animationDelay: "0.7s" }} />
          </>
        )}
      </div>

      <div className="w-full flex items-center justify-between border-b border-white/5 pb-2 text-outline-variant relative z-10">
        <div className="flex items-center gap-1.5">
          <Volume2 size={12} className="text-rose-400 animate-bounce" />
          <span>jarvis-ambient-service</span>
        </div>
        <span className="text-rose-400 font-bold text-[8px] flex items-center gap-1">
          <span className={`w-1.5 h-1.5 bg-rose-500 rounded-full ${isHovered ? "animate-[ping_0.6s_infinite] shadow-[0_0_8px_#f43f5e]" : "animate-ping"}`} />
          LISTENING
        </span>
      </div>

      {/* Holographic Jarvis Centerpiece */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10">
        {/* Floating holographic orb */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          animate={{
            scale: isHovered ? [1.05, 1.25, 1.05] : [1, 1.15, 1],
            y: isHovered ? [-6, 6, -6] : [-4, 4, -4],
            boxShadow: isHovered ? [
              "0 0 25px rgba(244,63,94,0.5)",
              "0 0 45px rgba(244,63,94,0.9)",
              "0 0 25px rgba(244,63,94,0.5)"
            ] : [
              "0 0 20px rgba(244,63,94,0.3)",
              "0 0 35px rgba(244,63,94,0.6)",
              "0 0 20px rgba(244,63,94,0.3)"
            ]
          }}
          transition={{
            duration: isHovered ? 2 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 via-primary to-rose-400 flex items-center justify-center border border-white/20 relative z-10"
        >
          {/* Inner core */}
          <div className="w-7 h-7 rounded-full bg-[#030008] border border-white/5 flex items-center justify-center">
            <span className={`w-2.5 h-2.5 bg-rose-500 rounded-full ${isHovered ? "animate-[pulse_0.5s_infinite] scale-110" : "animate-pulse"}`} />
          </div>

          {/* Rotating dashed rings */}
          <motion.div 
            animate={{ rotate: isHovered ? 360 : 180 }}
            transition={{ duration: isHovered ? 3 : 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200%] h-[200%] border border-dashed border-rose-400/30 rounded-full pointer-events-none" 
          />
          <motion.div 
            animate={{ rotate: isHovered ? -360 : -180 }}
            transition={{ duration: isHovered ? 2.5 : 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[160%] h-[160%] border border-dashed border-rose-400/20 rounded-full pointer-events-none" 
          />

          {/* Ambient AI activity: orbiting energy nodes */}
          {isHovered && (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-[240%] h-[240%] rounded-full border border-rose-500/5 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
              </motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-[280%] h-[280%] rounded-full border border-primary/5 pointer-events-none"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#a855f7]" />
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Voice waves charts container */}
        <div className="flex items-end gap-1 h-8 mt-5">
          {bars.map((barHeight, idx) => (
            <div
              key={idx}
              className="w-[3px] bg-gradient-to-t from-rose-500 to-primary rounded-full transition-all duration-100"
              style={{ height: `${barHeight}px` }}
            />
          ))}
        </div>
      </div>

      <div className="text-[8px] text-outline-variant/60 flex items-center gap-1.5 relative z-10">
        <Disc size={10} className="text-rose-400 animate-spin" />
        <span>Jarvis: Listening for hotkey &ldquo;Hey Jarvis&rdquo;...</span>
      </div>
    </div>
  );
}
