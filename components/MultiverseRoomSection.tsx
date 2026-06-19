"use client";

import React from "react";
import { motion } from "framer-motion";
import LiftCard from "@/components/ui/LiftCard";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

interface Zone {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  icon: string;
  xOffset: string;
}

const zones: Zone[] = [
  {
    id: "frontend",
    name: "Frontend Zone",
    role: "Visuals & UI Layout",
    description: "Generates semantic layouts, structures state flows, and writes Tailwind code from mockups.",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-500/30",
    icon: "code_blocks",
    xOffset: "-lg:translate-x-12",
  },
  {
    id: "backend",
    name: "Backend Zone",
    role: "APIs & Orchestration",
    description: "Synthesizes endpoints, schedules async routines, and guarantees service reliability.",
    color: "from-purple-500/10 to-pink-500/10 border-purple-500/30",
    icon: "dns",
    xOffset: "lg:translate-y-8",
  },
  {
    id: "database",
    name: "Database Zone",
    role: "Schemas & Queries",
    description: "Optimizes indexing configurations, constructs migrations, and runs real-time queries safely.",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30",
    icon: "database",
    xOffset: "lg:translate-x-12",
  },
];

export default function MultiverseRoomSection() {
  return (
    <section className="py-32 px-8 relative overflow-hidden bg-background" id="multiverse-room">
      {/* Background visual lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">hub</span>
              Coordinated Agents
            </div>
          </FadeUp>

          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight text-on-surface">
            <RevealText as="span">Inside the</RevealText>{" "}
            <span className="gradient-text">Multiverse Room</span>
          </h2>

          <FadeUp delay={0.2}>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              Real-time collaboration across multiple autonomous zones, working concurrently to write, configure, and maintain code under a unified cognitive core.
            </p>
          </FadeUp>
        </div>

        {/* Visual Map Layout */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          
          {/* Animated connections using SVG paths */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
              {/* Left Path: Frontend to AI Engine */}
              <motion.path
                d="M 240 200 H 450"
                stroke="rgba(24, 35, 80, 0.4)"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <motion.path
                d="M 240 200 H 450"
                stroke="url(#blue-pulse)"
                strokeWidth="3"
                strokeDasharray="40 160"
                animate={{ strokeDashoffset: [0, -200] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />

              {/* Right Path: Database to AI Engine */}
              <motion.path
                d="M 760 200 H 550"
                stroke="rgba(16, 24, 40, 0.4)"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <motion.path
                d="M 760 200 H 550"
                stroke="url(#green-pulse)"
                strokeWidth="3"
                strokeDasharray="40 160"
                animate={{ strokeDashoffset: [0, 200] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              />

              {/* Bottom Path: Backend to AI Engine */}
              <motion.path
                d="M 500 320 V 260"
                stroke="rgba(94, 64, 116, 0.4)"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <motion.path
                d="M 500 320 V 260"
                stroke="url(#purple-pulse)"
                strokeWidth="3"
                strokeDasharray="30 120"
                animate={{ strokeDashoffset: [0, -150] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              />

              {/* Definitions for gradients */}
              <defs>
                <linearGradient id="blue-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4a78d8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#4a78d8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4a78d8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="green-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="purple-pulse" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#9e78c0" stopOpacity="0" />
                  <stop offset="50%" stopColor="#9e78c0" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9e78c0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Zone Cards: Left/Right/Bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full relative z-10 items-stretch">
            
            {/* Frontend Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <LiftCard className={`glass-panel p-8 rounded-3xl h-full border bg-gradient-to-br ${zones[0].color} ${zones[0].xOffset}`}>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">{zones[0].icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-on-surface">{zones[0].name}</h3>
                  <p className="text-xs text-primary font-mono">{zones[0].role}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{zones[0].description}</p>
                </div>
              </LiftCard>
            </motion.div>

            {/* Central Node (AI Context Engine) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center lg:order-2 self-center py-8 lg:py-0"
            >
              <div className="relative p-1 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-3xl shadow-2xl">
                <div className="bg-surface-dim p-8 rounded-[22px] text-center space-y-6 max-w-sm border border-white/5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary relative">
                    <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <span className="material-symbols-outlined text-3xl">psychology</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-2xl text-on-surface">AI Context Engine</h3>
                    <p className="text-xs text-secondary font-mono tracking-widest uppercase">Central Cognitive Core</p>
                  </div>
                  <p className="text-on-surface-variant text-xs leading-relaxed">
                    Bridges semantic memory and repository structures. It guides the Zones, maintaining consistency and preventing conflict.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-outline">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Synthesizing context
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Database Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:order-3"
            >
              <LiftCard className={`glass-panel p-8 rounded-3xl h-full border bg-gradient-to-br ${zones[2].color} ${zones[2].xOffset}`}>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">{zones[2].icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-on-surface">{zones[2].name}</h3>
                  <p className="text-xs text-primary font-mono">{zones[2].role}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{zones[2].description}</p>
                </div>
              </LiftCard>
            </motion.div>

          </div>
        </div>

        {/* Backend Card (Centered underneath on desktop) */}
        <div className="max-w-[400px] mx-auto relative z-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <LiftCard className={`glass-panel p-8 rounded-3xl border bg-gradient-to-br ${zones[1].color} ${zones[1].xOffset}`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">{zones[1].icon}</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface">{zones[1].name}</h3>
                <p className="text-xs text-primary font-mono">{zones[1].role}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{zones[1].description}</p>
              </div>
            </LiftCard>
          </motion.div>
        </div>

        {/* Mobile Backend Card */}
        <div className="block lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <LiftCard className={`glass-panel p-8 rounded-3xl border bg-gradient-to-br ${zones[1].color}`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">{zones[1].icon}</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface">{zones[1].name}</h3>
                <p className="text-xs text-primary font-mono">{zones[1].role}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{zones[1].description}</p>
              </div>
            </LiftCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
