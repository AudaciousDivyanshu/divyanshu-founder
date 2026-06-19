"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import LiftCard from "@/components/ui/LiftCard";

interface TimelineEntry {
  title: string;
  period: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
}

const entries: TimelineEntry[] = [
  {
    title: "Idea Phase",
    period: "Early 2024",
    tagline: "Reimagining the Workspace",
    description: "The concept of a singular AI-driven developer workflow was born, aiming to integrate isolated tools under a shared cognitive core.",
    icon: "lightbulb",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  },
  {
    title: "Deep AI Research",
    period: "Mid 2024",
    tagline: "Orchestration & Context Memory",
    description: "Built custom agent orchestration layers, experimenting with sub-100ms LLM routing and grounded memory pipelines.",
    icon: "science",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  },
  {
    title: "Active Development",
    period: "Late 2024",
    tagline: "Coding & Document Workspace",
    description: "Assembled DevCore and ScribeCore, creating a workspace where files, outputs, and model selections are dynamically synchronized.",
    icon: "developer_board",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
  },
  {
    title: "Orion Helix Alpha",
    period: "Early 2025",
    tagline: "Multi-Agent Multiverse",
    description: "Launched the Multiverse Room, enabling developers to co-write application code in real time alongside specialized AI roles.",
    icon: "grain",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
  },
  {
    title: "The Cognitive Future",
    period: "Beyond 2025",
    tagline: "India's Premiere Workspace",
    description: "Scaling the platform to host custom enterprise environments, zero-trust data sovereignty, and custom local model inference.",
    icon: "rocket_launch",
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30",
  },
];

function TimelineCard({ entry, index, total }: { entry: TimelineEntry; index: number; total: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 group w-full my-16">
      
      {/* Left side card or blank */}
      <div className={`flex-1 w-full md:text-right ${!isEven ? "md:order-3 md:text-left" : "md:order-1"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-primary font-mono font-bold tracking-widest uppercase mb-2 block">
            {entry.period}
          </span>
          <h4 className="font-headline font-bold text-2xl mb-1 text-on-surface">{entry.title}</h4>
          <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-3">{entry.tagline}</p>
          <p className={`text-on-surface-variant text-sm leading-relaxed max-w-md ${isEven ? "md:ml-auto" : "md:mr-auto"}`}>
            {entry.description}
          </p>
        </motion.div>
      </div>

      {/* Central Connector Node */}
      <div className="relative z-10 flex items-center justify-center shrink-0 md:order-2">
        <div className="w-12 h-12 rounded-full glass-panel border-primary border-2 flex items-center justify-center bg-surface-dim shadow-xl group-hover:scale-110 transition-transform duration-300">
          <span className="material-symbols-outlined text-primary text-xl">{entry.icon}</span>
        </div>
      </div>

      {/* Right side spacer or blank */}
      <div className={`flex-1 hidden md:block ${!isEven ? "md:order-1" : "md:order-3"}`} />

    </div>
  );
}

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth scroll height transform
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-32 px-8 max-w-[1280px] mx-auto relative overflow-hidden" id="journey">
      
      {/* Title */}
      <div className="mb-24 text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
          <span className="material-symbols-outlined text-sm">timeline</span>
          Our Trajectory
        </div>
        <h2 className="text-5xl font-headline font-bold text-on-surface">
          Building <span className="gradient-text">Orion Helix</span>
        </h2>
        <p className="text-on-surface-variant text-lg">
          Follow the milestones of Singularity Horizon from early theory to our vision for automated building.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Center Line */}
        <div className="absolute left-6 md:left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-white/5 pointer-events-none">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-primary via-secondary to-tertiary shadow-[0_0_12px_1px_rgba(94,64,116,0.5)]"
          />
        </div>

        {/* Timeline Entries */}
        <div className="space-y-4 relative">
          {entries.map((entry, index) => (
            <TimelineCard key={entry.title} entry={entry} index={index} total={entries.length} />
          ))}
        </div>
      </div>

    </section>
  );
}
