"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = container.querySelectorAll(".floating-shape");

    // GSAP floating animation for each shape
    shapes.forEach((shape, index) => {
      // Randomize movement parameters for an organic antigravity feel
      const xOffset = (Math.random() - 0.5) * 150;
      const yOffset = (Math.random() - 0.5) * 150;
      const rotateOffset = (Math.random() - 0.5) * 90;
      const duration = 20 + Math.random() * 20;

      gsap.to(shape, {
        x: `+=${xOffset}`,
        y: `+=${yOffset}`,
        rotation: `+=${rotateOffset}`,
        scale: 1 + (Math.random() * 0.1),
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: -Math.random() * 10,
      });
    });

    // Subtle parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const depth = (i + 1) * 0.05;
        gsap.to(shape, {
          x: x * 80 * depth,
          y: y * 80 * depth,
          duration: 2.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(shapes);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Background base layer */}
      <div className="absolute inset-0 bg-[#020202]" />

      {/* Subtle Grid pattern for technical but clean executive feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-40" />

      {/* Floating Abstract Shapes for Antigravity Depth */}
      
      {/* Large deep blue soft orb */}
      <div className="floating-shape absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#3b82f6]/5 blur-[120px] rounded-full mix-blend-screen" />
      
      {/* Deep purple abstract shape */}
      <div className="floating-shape absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#7c3aed]/5 blur-[120px] rounded-full mix-blend-screen" />

      {/* Geometric thin rings for elegant technical depth */}
      <div className="floating-shape absolute top-[25%] right-[25%] w-[400px] h-[400px] rounded-full border border-white/[0.02] opacity-60" />
      <div className="floating-shape absolute bottom-[35%] left-[10%] w-[250px] h-[250px] rounded-full border border-[#7c3aed]/[0.04] opacity-80" />
      <div className="floating-shape absolute top-[60%] left-[45%] w-[500px] h-[500px] rounded-full border border-[#3b82f6]/[0.02] opacity-40" />

      {/* Sleek diagonal lines for modern dynamic feel */}
      <div className="floating-shape absolute -top-[10%] -left-[10%] w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent rotate-[35deg]" />
      <div className="floating-shape absolute top-[50%] -right-[20%] w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/[0.05] to-transparent -rotate-[45deg]" />
    </div>
  );
}
