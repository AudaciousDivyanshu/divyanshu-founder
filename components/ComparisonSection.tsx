"use client";

import React from "react";
import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

interface FeaturePoint {
  text: string;
  isStrength: boolean;
}

interface ComparisonBlock {
  competitor: string;
  competitorPoints: FeaturePoint[];
  orionPoints: FeaturePoint[];
  verdict: string;
  bgGradient: string;
}

const comparisonBlocks: ComparisonBlock[] = [
  {
    competitor: "Slack + Notion + ChatGPT + Jira",
    competitorPoints: [
      { text: "Four separate bills and subscriptions", isStrength: false },
      { text: "Context lost switching between chat, docs, and tickets", isStrength: false },
      { text: "No shared memory across tools", isStrength: false },
    ],
    orionPoints: [
      { text: "Unified subscription and single tool surface", isStrength: true },
      { text: "Universal context: docs, code, and chat communicate in real time", isStrength: true },
      { text: "Shared AI memory grounded to your active workspace files", isStrength: true },
    ],
    verdict: "Replace your fragmented tools with one cohesive, collaborative engine.",
    bgGradient: "from-blue-600/10 to-indigo-600/10 border-blue-500/20",
  },
  {
    competitor: "Traditional IDEs & Replit",
    competitorPoints: [
      { text: "Focused entirely on execution; no native document space", isStrength: false },
      { text: "Lack of advanced visual/design analysis systems", isStrength: false },
      { text: "AI limits on model switching (locked into specific models)", isStrength: false },
    ],
    orionPoints: [
      { text: "DevCore code execution matched with rich markdown canvases", isStrength: true },
      { text: "Workspace syncs files, notes and code output in one location", isStrength: true },
      { text: "Multi-model flexibility: switch GPT, Gemini, and Claude instantly", isStrength: true },
    ],
    verdict: "Move beyond simple coding sandboxes into an AI-driven development ecosystem.",
    bgGradient: "from-emerald-600/10 to-teal-600/10 border-emerald-500/20",
  },
  {
    competitor: "Jira & Traditional Agile Boards",
    competitorPoints: [
      { text: "Heavy setup, configuration overload, and steep learning curves", isStrength: false },
      { text: "Manual estimation, sprint planning, and writing tickets", isStrength: false },
      { text: "Team alignment happens offline, completely detached from code", isStrength: false },
    ],
    orionPoints: [
      { text: "Zero configuration; intuitive design focused on building", isStrength: true },
      { text: "Automated task planning, summaries, and agentic prioritization", isStrength: true },
      { text: "Multiverse Room integrates live database, backend, and frontend context", isStrength: true },
    ],
    verdict: "Eliminate administrative overhead. Let AI organize tasks while you write code.",
    bgGradient: "from-purple-600/10 to-fuchsia-600/10 border-purple-500/20",
  },
];

export default function ComparisonSection() {
  return (
    <section className="py-32 px-8 relative bg-surface-container-lowest" id="comparison">
      {/* Background accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Sticky Left Info Panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-secondary/20 text-secondary text-xs font-semibold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
              Head-to-Head Comparison
            </div>
          </FadeUp>

          <h2 className="font-headline font-bold text-4xl lg:text-5xl text-on-surface tracking-tight leading-[1.2]">
            <RevealText as="span">Why Orion Helix Stands</RevealText>{" "}
            <span className="gradient-text">Apart</span>
          </h2>

          <FadeUp delay={0.2}>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              We did not build another tab or widget. Orion Helix completely replaces fragmented setups with a cohesive environment built for speed.
            </p>
          </FadeUp>
        </div>

        {/* Scrolling Right Comparison Blocks */}
        <div className="lg:col-span-8 space-y-12">
          {comparisonBlocks.map((block, idx) => (
            <motion.div
              key={block.competitor}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`glass-panel p-8 md:p-10 rounded-3xl border bg-gradient-to-tr ${block.bgGradient} flex flex-col justify-between space-y-8 shadow-xl`}
            >
              <div>
                <h3 className="font-headline font-bold text-2xl md:text-3xl text-on-surface mb-6">
                  {block.competitor} <span className="text-on-surface-variant font-normal">vs</span> <span className="text-primary font-bold">Orion Helix</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Competitor Side */}
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-outline">
                      The Old Fragmented Way
                    </p>
                    <ul className="space-y-3">
                      {block.competitorPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-error text-lg mt-0.5 shrink-0">
                            cancel
                          </span>
                          <span className="text-on-surface-variant text-sm leading-relaxed">
                            {point.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Orion Helix Side */}
                  <div className="space-y-4 bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-primary">
                      The Orion Helix Advantage
                    </p>
                    <ul className="space-y-3">
                      {block.orionPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-green-400 text-lg mt-0.5 shrink-0">
                            check_circle
                          </span>
                          <span className="text-on-surface text-sm font-medium leading-relaxed">
                            {point.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Verdict Bottom Row */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-outline font-mono uppercase tracking-widest">Decision Verdict</p>
                  <p className="text-sm text-on-surface-variant font-medium mt-1">
                    {block.verdict}
                  </p>
                </div>
                <div className="flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">insights</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
