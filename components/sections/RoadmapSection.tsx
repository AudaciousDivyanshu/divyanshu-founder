"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    description: "Establishing the core architecture, initial semantic search capabilities, and the fundamental knowledge graph infrastructure.",
    status: "Completed",
    color: "#3b82f6" // blue
  },
  {
    phase: "Phase 2",
    title: "Orion Helix Core",
    description: "Deploying the all-in-one cognitive workspace. Integrating multi-modal capabilities, code execution, and real-time synchronization.",
    status: "In Progress",
    color: "#8b5cf6" // purple
  },
  {
    phase: "Phase 3",
    title: "Multi-Agent Infrastructure",
    description: "Introducing autonomous specialized agents that handle parallel tasks, intelligent debugging, and continuous infrastructure health checks.",
    status: "Upcoming",
    color: "#ec4899" // pink
  },
  {
    phase: "Phase 4",
    title: "Local AI Ecosystem",
    description: "Running deep contextual models completely locally for zero-latency execution and unparalleled data privacy.",
    status: "Upcoming",
    color: "#10b981" // emerald
  },
  {
    phase: "Phase 5",
    title: "Sovereign Intelligence Layer",
    description: "The ultimate goal: an ambient, self-improving OS-level intelligence that seamlessly predicts and executes workflows.",
    status: "Future",
    color: "#06b6d4" // cyan
  }
];

function PhaseCard({ phase, index }: { phase: typeof roadmapPhases[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center gap-6 md:gap-12 w-full max-w-4xl mx-auto group"
    >
      {/* Node / Point on Timeline */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          className="w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center transition-all duration-500 group-hover:scale-125"
          style={{ borderColor: phase.color }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
        </motion.div>
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: phase.color }}
        />
      </div>

      {/* Content Side */}
      <div className={`w-full pl-16 md:pl-0 flex flex-col md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right md:items-end" : "md:pl-16 md:ml-auto md:text-left md:items-start"}`}>
        <div 
          className="glass-panel p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-md transition-all duration-300 w-full hover:border-white/20 group-hover:-translate-y-1 relative overflow-hidden"
          style={{ boxShadow: `0 10px 30px -15px ${phase.color}20` }}
        >
          {/* Inner ambient glow */}
          <div 
            className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] pointer-events-none opacity-20" 
            style={{ backgroundColor: phase.color }} 
          />

          <div className={`flex flex-col gap-2 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
            <span 
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 inline-block w-max"
              style={{ color: phase.color, backgroundColor: `${phase.color}15` }}
            >
              {phase.phase} • {phase.status}
            </span>
            <h3 className="font-headline font-bold text-2xl md:text-3xl text-on-surface mt-2 group-hover:text-white transition-colors">
              {phase.title}
            </h3>
            <p className="text-on-surface-variant/80 text-sm md:text-base leading-relaxed mt-2 max-w-sm">
              {phase.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="vision" className="py-32 px-8 relative overflow-hidden bg-background border-t border-outline-variant/10" ref={containerRef}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-24 flex flex-col items-center space-y-4 max-w-3xl">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Future Roadmap
            </div>
          </FadeUp>
          <RevealText as="h2" className="font-headline font-black text-4xl md:text-6xl text-white">
            The Singularity Horizon
          </RevealText>
          <FadeUp delay={0.1}>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl text-center leading-relaxed mt-4">
              Our masterplan to evolve from an intelligent workspace into a sovereign, omnipresent cognitive layer that powers the future of technology.
            </p>
          </FadeUp>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full py-10">
          
          {/* Center Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[1.5px] bg-white/5 z-0">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              style={{ scaleY }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {roadmapPhases.map((phase, i) => (
              <PhaseCard key={phase.phase} phase={phase} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
