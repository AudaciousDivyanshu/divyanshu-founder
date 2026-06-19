"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

interface TimelineMilestone {
  title: string;
  period: string;
  tagline: string;
  description: string;
}

const milestones: TimelineMilestone[] = [
  {
    title: "Started Learning AI",
    period: "Early CSE Foundation",
    tagline: "Exploring Theoretical Frameworks",
    description: "Deep-dived into machine learning foundations, transformer architectures, and Grounded Context Retrieval logic.",
  },
  {
    title: "Built Code Inspector AI",
    period: "Hackathon Breakthrough",
    tagline: "First Major Developer Utility",
    description: "Architected a static AST analyser to scan code bases, catch architectural drifts, and suggest context-aware inline code refactors.",
  },
  {
    title: "Founded Singularity Horizon",
    period: "Creating the Entity",
    tagline: "Sovereign AI Infrastructure",
    description: "Founded a technology company focused on developing AI-powered workspaces, developer tools, and intelligent systems that bring context, collaboration, and execution into one unified experience.",
  },
  {
    title: "Building Orion Helix AI",
    period: "Flagship Product Release",
    tagline: "All-in-One Cognitive Workspace",
    description: "Orion Helix is the team room where developers plan, coordinate, and build projects together — with an AI that knows your entire project and gives specific guidance to every member.",
  }
];

function TimelineCard({ milestone }: { milestone: TimelineMilestone }) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.25)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden group cursor-default bg-surface/30 backdrop-blur-sm transition-colors duration-300"
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-4">
          <span className="text-primary font-sans text-xs font-semibold tracking-wider uppercase">
            {milestone.period}
          </span>
          <span className="text-on-surface-variant font-sans text-[11px] uppercase font-medium tracking-wider">
            {milestone.tagline}
          </span>
        </div>

        <h4 className="font-sans font-semibold text-xl md:text-2xl text-on-surface group-hover:text-primary transition-colors duration-300">
          {milestone.title}
        </h4>

        <p className="text-on-surface-variant/80 font-sans text-sm md:text-base leading-relaxed mt-3">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section ref={sectionRef} className="py-36 px-8 relative overflow-hidden bg-background border-t border-outline-variant/10 scroll-mt-24" id="about">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

        {/* Left Column: Founder Persona (Sticky) */}
        <div className="lg:col-span-5 relative h-full">
          <div className="lg:sticky lg:top-32 space-y-8">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary/20 text-primary text-xs font-medium tracking-wider uppercase">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                Founder &amp; Creator
              </div>
            </FadeUp>

            <div className="space-y-4">
              <RevealText as="h2" className="font-sans font-bold text-5xl md:text-6xl text-on-surface leading-tight tracking-tight">
                Divyanshu Sisodiya
              </RevealText>
              <p className="text-xl md:text-2xl font-medium text-primary font-sans">
                Co-Founder of Singularity Horizon Technologies
              </p>
            </div>

            <p className="text-on-surface-variant/90 text-lg leading-relaxed border-l-2 border-primary/20 pl-6 py-2 font-sans">
              Co-Founder of Singularity Horizon and creator of Orion Helix. I'm building intelligent systems that eliminate fragmented workflows, preserve context, and help people focus on what matters most — creating, building, and innovating.
            </p>
          </div>
        </div>

        {/* Right Column: Timeline Milestones */}
        <div className="lg:col-span-7 relative pl-12 md:pl-16 mt-16 lg:mt-0">
          {/* Vertical Progress Line */}
          <div className="absolute left-6 md:left-8 top-8 bottom-8 -translate-x-1/2 w-[1px] bg-white/10 pointer-events-none">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="w-full h-full bg-primary/30"
            />
          </div>

          <div className="space-y-24">
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Timeline bullet node */}
                <div className="absolute -left-12 md:-left-16 top-7 -translate-x-1/2 z-10 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0.4, borderColor: "rgba(255, 255, 255, 0.1)" }}
                    whileInView={{ scale: 1.2, opacity: 1, borderColor: "rgba(124, 58, 237, 0.6)" }}
                    viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-4 h-4 rounded-full border bg-background flex items-center justify-center transition-colors duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      whileInView={{ scale: 1, backgroundColor: "rgb(124, 58, 237)" }}
                      viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                      transition={{ delay: 0.1, duration: 0.4, ease: "backOut" }}
                      className="w-1.5 h-1.5 rounded-full"
                    />
                  </motion.div>
                </div>

                <TimelineCard milestone={milestone} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}