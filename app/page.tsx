"use client";

import HeroSection from "@/components/sections/HeroSection";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import MouseLight from "@/components/ui/MouseLight";
import FounderSection from "@/components/FounderSection";
import WhyOrionHelixSection from "@/components/WhyOrionHelixSection";
import TargetUsersSection from "@/components/TargetUsersSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import NeuralBackground from "@/components/NeuralBackground";
import ProblemSection from "@/components/ProblemSection";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);


export default function Home() {

  useEffect(() => {
    // Smooth Scrolling for Navigation
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          const lenis = (window as Window & { __lenis?: { scrollTo: (el: Element, opts: object) => void } }).__lenis;
          if (lenis) {
            lenis.scrollTo(element, { offset: -80, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleLinkClick as EventListener);
    });

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
      observer.observe(section);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleLinkClick as EventListener);
      });
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <NeuralBackground />
      <MouseLight />
      <SmoothScrollProvider />
      <PageTransition>

        <HeroSection />

        <FounderSection />
        <WhyOrionHelixSection />
        <ProblemSection />
        <TargetUsersSection />
        <ProjectsSection />
        <ContactSection />

        <motion.footer
          className="w-full py-20 bg-surface-container-lowest border-t border-outline-variant/30"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="font-headline font-semibold text-lg text-on-surface">Divyanshu Sisodiya</div>
              <div className="text-primary font-body text-body-md">© 2024 Divyanshu Sisodiya. Built for the Intelligence Age.</div>
            </div>
            <div className="flex gap-6 items-center">
              <a className="text-white/80 bg-white/5 border border-white/10 p-3 rounded-full transition-all duration-300 hover:text-primary hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-1" href="https://www.linkedin.com/in/divyanshu-sisodiya-69365838b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a className="text-white/80 bg-white/5 border border-white/10 p-3 rounded-full transition-all duration-300 hover:text-primary hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-1" href="https://github.com/AudaciousDivyanshu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a className="text-white/80 bg-white/5 border border-white/10 p-3 rounded-full transition-all duration-300 hover:text-primary hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-1" href="https://x.com/DivyanshuS2610" target="_blank" rel="noopener noreferrer" aria-label="X">
                <XIcon />
              </a>
            </div>
          </div>
        </motion.footer>

      </PageTransition>
    </>
  );
}