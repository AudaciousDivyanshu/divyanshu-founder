"use client";

import FadeUp from "@/components/ui/FadeUp";
import LiftCard from "@/components/ui/LiftCard";
import RevealText from "@/components/ui/RevealText";

const features = [
  {
    icon: "smart_toy",
    title: "Main AI Chat",
    description:
      "Converse with frontier-class LLMs — GPT-4o, Gemini 2.5 Pro, Claude Opus & more — through a unified, context-aware chat interface with memory across sessions.",
    tags: ["Multi-Model", "Context Memory"],
    accent: "primary",
  },
  {
    icon: "code_blocks",
    title: "DevCore",
    description:
      "Full-stack coding companion with real-time code generation, debugging, refactoring and intelligent inline suggestions across 50+ languages.",
    tags: ["Code Gen", "Debugging", "50+ Lang"],
    accent: "secondary",
  },
  {
    icon: "edit_note",
    title: "ScribeCore",
    description:
      "AI-powered long-form writing engine for research papers, blogs, essays and documentation with tone control, grammar refinement and citation support.",
    tags: ["Long-Form", "Citations"],
    accent: "tertiary",
  },
  {
    icon: "image_search",
    title: "VisionCore",
    description:
      "Multimodal visual intelligence — analyze images, extract text from screenshots, generate diagrams and interpret complex visual data in real time.",
    tags: ["Image AI", "OCR", "Diagrams"],
    accent: "primary",
  },
  {
    icon: "dashboard_customize",
    title: "Workspace",
    description:
      "Unified project hub with file management, PDF tools, presentation builder and an integrated canvas for seamless workflow orchestration.",
    tags: ["Files", "Canvas", "PDFs"],
    accent: "secondary",
  },
  {
    icon: "group_work",
    title: "Multiverse Room",
    description:
      "Real-time collaborative environment where teams share AI sessions, co-edit documents and build together inside persistent shared workspaces.",
    tags: ["Real-Time", "Teams", "Collab"],
    accent: "tertiary",
  },
];

const accentStyles: Record<
  string,
  { iconBg: string; iconText: string; hoverBorder: string; glowColor: string }
> = {
  primary: {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    hoverBorder: "hover:border-primary/40",
    glowColor: "rgba(24, 35, 80, 0.35)",
  },
  secondary: {
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
    hoverBorder: "hover:border-secondary/40",
    glowColor: "rgba(94, 64, 116, 0.35)",
  },
  tertiary: {
    iconBg: "bg-tertiary/10",
    iconText: "text-tertiary",
    hoverBorder: "hover:border-tertiary/40",
    glowColor: "rgba(122, 154, 184, 0.25)",
  },
};

export default function OrionHelixSection() {
  return (
    <section
      className="py-32 bg-surface-container-lowest relative overflow-hidden"
      id="orion-helix"
    >
      {/* Atmospheric background glows */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.05)_0%,transparent_55%)]" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_bottom_right,rgba(94,64,116,0.07)_0%,transparent_55%)]" />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="mb-20 text-center max-w-3xl mx-auto space-y-5">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Flagship Product
            </div>
          </FadeUp>

          <RevealText
            as="h2"
            className="font-headline font-bold text-4xl md:text-5xl text-on-surface"
          >
            What is Orion Helix AI?
          </RevealText>

          <FadeUp delay={0.2}>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              India&apos;s first all-in-one AI workspace — unifying chat, code,
              writing, vision, file tools and real-time team collaboration into a
              single, powerful platform built for the next generation of
              creators.
            </p>
          </FadeUp>
        </div>

        {/* ── Feature Cards Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const style = accentStyles[feature.accent];

            return (
              <FadeUp key={feature.title} delay={index * 0.08}>
                <LiftCard
                  className={`glass-panel p-1 rounded-2xl h-full transition-colors duration-300 ${style.hoverBorder}`}
                  glowColor={style.glowColor}
                >
                  <div className="bg-surface p-8 rounded-2xl h-full border border-white/5 flex flex-col">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${style.iconBg} rounded-lg flex items-center justify-center mb-6`}
                    >
                      <span
                        className={`material-symbols-outlined ${style.iconText} text-2xl`}
                      >
                        {feature.icon}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline font-bold text-xl text-on-surface mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">
                      {feature.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] uppercase font-bold tracking-widest text-outline"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </LiftCard>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
