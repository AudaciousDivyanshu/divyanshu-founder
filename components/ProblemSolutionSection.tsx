"use client";

import React from "react";
import { motion } from "framer-motion";
import LiftCard from "@/components/ui/LiftCard";
import FadeUp from "@/components/ui/FadeUp";

// ─── Section 2: The Problem ─────────────────────────────────────────────────

const toolChain = [
  { name: "ChatGPT", icon: "forum", color: "text-blue-400 border-blue-400/30 bg-blue-500/10" },
  { name: "Grammarly", icon: "spellcheck", color: "text-green-400 border-green-400/30 bg-green-500/10" },
  { name: "Notion", icon: "article", color: "text-white border-white/20 bg-white/5" },
  { name: "PDF Tool", icon: "picture_as_pdf", color: "text-red-400 border-red-400/30 bg-red-500/10" },
  { name: "Slack", icon: "chat_bubble", color: "text-purple-400 border-purple-400/30 bg-purple-500/10" },
];

const orionFeatures = [
  { label: "Main AI Chat", icon: "forum" },
  { label: "DevCore", icon: "terminal" },
  { label: "ScribeCore", icon: "edit_note" },
  { label: "Workspace", icon: "database" },
  { label: "PDF Tools", icon: "picture_as_pdf" },
  { label: "Multiverse Room", icon: "hub" },
];

// ─── Section 4: Why Different ─────────────────────────────────────────────

const differences = [
  {
    competitor: "Replit",
    point:
      "Replit helps individuals code.\nOrion Helix helps entire teams coordinate.",
    icon: "terminal",
    direction: -1,
  },
  {
    competitor: "Jira",
    point:
      "Jira tracks tasks.\nOrion Helix guides execution with AI.",
    icon: "bug_report",
    direction: 1,
  },
  {
    competitor: "Slack + Notion + ChatGPT",
    point:
      "Those tools do not share context.\nOrion Helix AI understands the entire project.",
    icon: "stacks",
    direction: -1,
  },
];

export default function ProblemSolutionSection() {
  return (
    <div className="bg-background">
      {/* ── Section 2: The Problem ── */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,64,116,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto space-y-20 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">The Problem</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-headline font-bold text-4xl md:text-5xl text-on-surface">
                Your Workflow Is Broken
              </h2>
            </FadeUp>
          </div>

          {/* Tool chain */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {toolChain.map((tool, i) => (
                <React.Fragment key={tool.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border glass-panel font-semibold text-sm ${tool.color}`}
                  >
                    <span className="material-symbols-outlined text-lg">{tool.icon}</span>
                    {tool.name}
                  </motion.div>
                  {i < toolChain.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.15 }}
                      className="text-outline text-xl font-bold hidden sm:block"
                    >
                      →
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="text-center space-y-3">
              <p className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
                Five tools. Five subscriptions.{" "}
                <span className="text-error">Constant context switching.</span>
              </p>
              <p className="text-on-surface-variant">
                Every switch breaks your flow. Every new tool requires a new login, a new monthly charge, and a new mental context reset.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Section 3: The Orion Helix Solution ── */}
      <section className="py-32 px-8 relative bg-surface-container-lowest overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[900px] mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">The Solution</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight">
                Everything in <span className="gradient-text">One Workspace</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-on-surface-variant text-lg">
                One platform. One subscription. One persistent AI that understands your entire project.
              </p>
            </FadeUp>
          </div>

          {/* Central solution card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-[2px] rounded-3xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(24,35,80,0.8), rgba(94,64,116,0.8), rgba(158,120,192,0.4))",
            }}
          >
            <div className="bg-surface-dim rounded-3xl p-10 md:p-14 border border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {orionFeatures.map((feat, i) => (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-white/8 bg-white/[0.03] hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-base">{feat.icon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="font-semibold text-on-surface text-sm">{feat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
              >
                <div>
                  <p className="text-xs text-outline font-mono uppercase tracking-widest">Orion Helix AI</p>
                  <p className="text-on-surface font-headline font-bold text-xl mt-1">One coherent system that remembers everything.</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel border border-primary/20 text-primary text-xs font-mono shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Active Context
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Why Different ── */}
      <section className="py-32 px-8 relative overflow-hidden" id="comparison">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1280px] mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Why Different</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-headline font-bold text-4xl md:text-5xl text-on-surface">
                We Are Not Just{" "}
                <span className="gradient-text">Another Tool</span>
              </h2>
            </FadeUp>
          </div>

          <div className="space-y-8">
            {differences.map((diff, i) => (
              <motion.div
                key={diff.competitor}
                initial={{ opacity: 0, x: diff.direction * 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <LiftCard className="glass-panel rounded-2xl border border-white/5 overflow-hidden hover:border-primary/20 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {/* Competitor */}
                    <div className="md:col-span-5 p-8 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-error/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-error text-xl">{diff.icon}</span>
                        </div>
                        <p className="font-bold text-on-surface">{diff.competitor}</p>
                      </div>
                      <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
                        {diff.point.split("\n")[0]}
                      </p>
                    </div>

                    {/* VS divider */}
                    <div className="md:col-span-2 flex items-center justify-center p-4">
                      <span className="px-3 py-1 rounded-full glass-panel text-xs font-bold text-outline border border-white/10">
                        VS
                      </span>
                    </div>

                    {/* Orion */}
                    <div className="md:col-span-5 p-8 flex flex-col gap-3 bg-primary/[0.03]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-xl">grain</span>
                        </div>
                        <p className="font-bold text-primary">Orion Helix</p>
                      </div>
                      <p className="text-on-surface text-sm leading-relaxed font-medium whitespace-pre-line">
                        {diff.point.split("\n")[1]}
                      </p>
                    </div>
                  </div>
                </LiftCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
