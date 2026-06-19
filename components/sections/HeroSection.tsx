"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useMotionValueEvent } from "framer-motion";

/* ========================================================================
   ADVANCED CONSTELLATION NETWORK & 3D PARALLAX FIELD
   ======================================================================== */

const HolographicCoreBackground = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      w = window.innerWidth;
      h = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Get mouse position relative to canvas size
      const mx = (mouseX.get() + 0.5) * w;
      const my = (mouseY.get() + 0.5) * h;

      const cols = 22;
      const rows = 14;
      const cellW = w / (cols - 1);
      const cellH = h / (rows - 1);

      const points: { x: number; y: number; scale: number; factor: number }[][] = [];

      // Calculate 3D projected coordinate mesh points
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * cellW;
          const baseY = r * cellH;

          const dx = mx - baseX;
          const dy = my - baseY;
          const dist = Math.hypot(dx, dy);

          // Bulge mesh forward in Z-space near the cursor
          const maxDist = 320;
          const factor = Math.max(0, 1 - dist / maxDist);
          const z = -140 * Math.sin(factor * (Math.PI / 2)); // Move closer (negative Z in camera space)

          // Attract nodes slightly in X and Y towards cursor
          const pull = 0.08 * factor;
          const x3d = baseX + dx * pull;
          const y3d = baseY + dy * pull;

          // Camera focal length perspective projection
          const fov = 450;
          const scale = fov / (fov + z);

          const px = mx + (x3d - mx) * scale;
          const py = my + (y3d - my) * scale;

          points[r][c] = { x: px, y: py, scale, factor };
        }
      }

      // Draw mesh connection wires
      ctx.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          // Draw horizontal wire
          if (c < cols - 1) {
            const nextPt = points[r][c + 1];
            const avgF = (pt.factor + nextPt.factor) / 2;
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.015 + avgF * 0.05})`;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }

          // Draw vertical wire
          if (r < rows - 1) {
            const nextPt = points[r + 1][c];
            const avgF = (pt.factor + nextPt.factor) / 2;
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.015 + avgF * 0.05})`;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }
        }
      }

      // Draw mathematical coordinate crosses at intersections
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          const size = 3 * pt.scale;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + pt.factor * 0.12})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(pt.x - size, pt.y);
          ctx.lineTo(pt.x + size, pt.y);
          ctx.moveTo(pt.x, pt.y - size);
          ctx.lineTo(pt.x, pt.y + size);
          ctx.stroke();
        }
      }

      // Faint central projected OS radar scopes
      const px = mouseX.get() * 30;
      const py = mouseY.get() * 30;
      const centerX = w * 0.75 + px;
      const centerY = h * 0.5 + py;

      ctx.strokeStyle = "rgba(6, 182, 212, 0.03)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
      ctx.stroke();

      const scanAngle = (Date.now() * 0.00025) % (Math.PI * 2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.04)";
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(scanAngle) * 280, centerY + Math.sin(scanAngle) * 280);
      ctx.stroke();

      animFrame = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ mixBlendMode: "screen" }} />;
};

/* ========================================================================
   INTERACTIVE CYBER GRID PLANE & CURSOR LIGHTING
   ======================================================================== */

const CyberGrid = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const gridRotateX = useTransform(mouseY, [-0.5, 0.5], [76, 70]);
  const gridSkewX = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);
  const gridTranslateX = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

  const rx = useSpring(gridRotateX, { damping: 30, stiffness: 80 });
  const sx = useSpring(gridSkewX, { damping: 30, stiffness: 80 });
  const tx = useSpring(gridTranslateX, { damping: 30, stiffness: 80 });

  const transformTemplate = useMotionTemplate`perspective(500px) rotateX(${rx}deg) skewX(${sx}deg) translateX(${tx}px) translateZ(0)`;

  return (
    <div className="absolute bottom-0 left-0 w-full h-[35vh] overflow-hidden pointer-events-none z-0">
      <motion.div
        className="w-[200%] h-[200%] absolute left-1/2 bottom-0 origin-bottom border-t border-purple-500/10"
        style={{
          left: "-50%",
          transform: transformTemplate,
          background: `linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)`,
          backgroundSize: `50px 50px`,
          maskImage: `linear-gradient(to top, black, transparent 80%)`,
          WebkitMaskImage: `linear-gradient(to top, black, transparent 80%)`
        }}
      />
    </div>
  );
};

const CursorSpotlight = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 mix-blend-screen"
      style={{
        background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.03), transparent 80%)`
      }}
    />
  );
};

/* ========================================================================
   CTA BUTTON COMPONENTS WITH MAGNETIC & SCANNER ANIMATIONS
   ======================================================================== */

const ExploreButton = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const pullX = (e.clientX - cx) * 0.3;
    const pullY = (e.clientY - cy) * 0.3;
    x.set(Math.min(Math.max(pullX, -20), 20));
    y.set(Math.min(Math.max(pullY, -20), 20));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-[1000px] z-20">
      <motion.a
        href="#insights"
        ref={btnRef}
        className="magnetic-btn relative px-8 py-3.5 rounded-xl bg-[#7c3aed] text-white font-bold text-base border border-[#7c3aed]/50 overflow-hidden cursor-pointer group flex items-center justify-center"
        style={{ x: sx, y: sy, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 30, scale: 1.05 }}
        whileTap={{ z: -15, scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-[#a855f7] opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300 scale-95 group-hover:scale-110 blur-sm pointer-events-none -z-10 shadow-[0_0_50px_rgba(168,85,247,0.8)]" />

        <span className="relative z-10 flex items-center gap-1.5 pointer-events-none">
          View Orion Helix <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      </motion.a>
    </div>
  );
};

const RoadmapButton = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-[1000px] z-10">
      <motion.a
        href="#about"
        ref={btnRef}
        className="roadmap-btn relative px-8 py-3.5 rounded-xl text-white/90 font-bold text-base cursor-pointer overflow-hidden border border-white/10 bg-[#0c0c16]/50 group flex items-center justify-center"
        style={{ x: sx, y: sy, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 20, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" xmlns="http://www.w3.org/2000/svg">
          <rect
            className="svg-border-rect"
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="url(#purpleScanner)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="purpleScanner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <span className="relative z-10">View Roadmap</span>
      </motion.a>
    </div>
  );
};

/* ========================================================================
   PORTRAIT IMAGE WRAPPER (TILT, FLOAT, AURA, SCAN SHEEN)
   ======================================================================== */

const PortraitImage = ({ opacity, y }: { opacity: any; y: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reorganizeState, setReorganizeState] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), { damping: 25, stiffness: 90 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), { damping: 25, stiffness: 90 });

  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { damping: 25, stiffness: 100 });
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-2, 2]), { damping: 25, stiffness: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setReorganizeState((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const panels = useMemo(() => {
    const panelConfigs = [
      { id: 1, title: "NEURAL_NET_01", w: 130, h: 70, content: "SYS_LOAD: 21%\nRESONANCE: 99.4%" },
      { id: 2, title: "CONTEXT_RESOLVER", w: 145, h: 80, content: "IP_ROUTE: 192.1.8\nSTATUS: ONLINE" },
      { id: 3, title: "MEM_BUFFER", w: 120, h: 60, content: "BUFF_SIZE: 4.8MB\nSECTORS: ACTIVE" },
      { id: 4, title: "LOGIC_MATRIX", w: 150, h: 75, content: "MATRIX: RUNNING\nTHREADS: 256/256" }
    ];

    return panelConfigs.map((cfg, i) => {
      const mode = (reorganizeState + i) % 3;
      let x = 0;
      let y = 0;
      let z = 0;
      let rx = 0;
      let ry = 0;

      if (mode === 0) {
        x = i % 2 === 0 ? -200 - (i * 10) : 200 + (i * 10);
        y = i < 2 ? -130 : 130;
        z = 50;
        rx = i % 2 === 0 ? 10 : -10;
        ry = i % 2 === 0 ? 25 : -25;
      } else if (mode === 1) {
        x = i % 2 === 0 ? -230 : 220;
        y = i < 2 ? -60 : 180;
        z = 80;
        rx = i % 2 === 0 ? -15 : 15;
        ry = i % 2 === 0 ? 15 : -15;
      } else {
        x = i % 2 === 0 ? -180 : 240;
        y = i < 2 ? -180 : 50;
        z = 40;
        rx = i % 2 === 0 ? 5 : -5;
        ry = i % 2 === 0 ? 30 : -30;
      }

      return {
        ...cfg,
        x,
        y,
        z,
        rx,
        ry
      };
    });
  }, [reorganizeState]);

  const shards = useMemo(() => {
    const texts = ["0x89A", "SYNAPSE", "ORION_V", "CORE_OS", "HELIX", "ACTIVE"];
    return texts.map((txt, i) => {
      const mode = (reorganizeState + i) % 4;
      let x = 0;
      let y = 0;
      if (mode === 0) {
        x = i % 2 === 0 ? -160 : 160;
        y = i < 3 ? -220 : 220;
      } else if (mode === 1) {
        x = i % 2 === 0 ? -260 : 260;
        y = i < 3 ? 0 : -100;
      } else if (mode === 2) {
        x = i % 2 === 0 ? -80 : 80;
        y = i < 3 ? -260 : 260;
      } else {
        x = i % 2 === 0 ? -280 : 280;
        y = i < 3 ? 150 : -150;
      }
      return { id: i, text: txt, x, y };
    });
  }, [reorganizeState]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[280px] h-[380px] md:w-[310px] md:h-[410px] lg:w-[320px] lg:h-[420px] z-20 flex items-center justify-center cursor-pointer perspective-[1500px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.85, rotateY: 15, z: -50 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
      transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ y, opacity, transformStyle: "preserve-3d" }}
    >
      {/* ORION HELIX CORE DECORATIVE LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ transformStyle: "preserve-3d" }}>

        {/* Soft intelligence field radial glow */}
        <div className="absolute w-[550px] h-[550px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#7c3aed]/10 via-transparent to-transparent blur-3xl animate-[pulse-glow_6s_ease-in-out_infinite]" />

        {/* Floating holographic rings */}
        <div className="absolute w-[450px] h-[450px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-purple-500/10 opacity-30 animate-[rotate-clockwise_35s_linear_infinite]" />
        <div className="absolute w-[470px] h-[470px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/5 opacity-20 animate-[rotate-counter_45s_linear_infinite]" />

        {/* Telemetry data rings */}
        <svg className="absolute w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 animate-[rotate-clockwise_50s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.4" strokeDasharray="4, 15, 2, 8" />
        </svg>

        {/* Floating Glass Panels */}
        {panels.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] p-3 shadow-xl overflow-hidden pointer-events-none flex flex-col justify-between"
            style={{
              width: p.w,
              height: p.h,
              left: "50%",
              top: "50%",
              marginLeft: -p.w / 2,
              marginTop: -p.h / 2,
              transformStyle: "preserve-3d",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.05), inset 0 0 10px rgba(255, 255, 255, 0.02)"
            }}
            animate={{
              x: p.x,
              y: p.y,
              z: p.z,
              rotateX: p.rx,
              rotateY: p.ry
            }}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 15,
              mass: 0.8
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[sheen_6s_infinite]" />
            <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-[#a855f7]/70 font-bold border-b border-white/5 pb-1">
              <span>{p.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <pre className="text-[7.5px] font-mono text-white/50 leading-normal mt-1 whitespace-pre">
              {p.content}
            </pre>
          </motion.div>
        ))}

        {/* Shards removed for a cleaner visual layout */}
      </div>

      {/* FOUNDER PORTRAIT GLASS FRAME */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [-5, 5, -5],
          rotateZ: [-0.5, 0.5, -0.5]
        }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.div
          className="relative w-full h-full group"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ y: -5, scale: 1.015 }}
        >
          <div className="absolute inset-[-4px] rounded-[30px] z-0 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-shadow duration-300 group-hover:shadow-[0_0_55px_rgba(168,85,247,0.35)] group-hover:inset-[-5px]">
            <motion.div
              className="absolute inset-[-50%]"
              style={{
                background: "conic-gradient(from 0deg, rgba(168,85,247,0.5), rgba(99,102,241,0.3), rgba(6,182,212,0.5), rgba(236,72,153,0.3), rgba(168,85,247,0.5))",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            />
            <div className="absolute inset-[3px] bg-[#020205]/90 rounded-[27px] backdrop-blur-md" />
          </div>

          <div
            className="absolute inset-[-10px] rounded-[38px] opacity-30 pointer-events-none blur-[18px] -z-10 bg-purple-600/20 transition-all duration-300 group-hover:opacity-50 group-hover:blur-[22px]"
            style={{ transform: "translateZ(-12px)" }}
          />

          <motion.div
            className="relative w-full h-full rounded-[26px] overflow-hidden bg-[#020205]/40 z-10 border border-white/10 backdrop-blur-md"
            style={{
              boxShadow: useTransform(
                [shadowX, shadowY],
                (vals: any[]) => {
                  const sxVal = vals[0] as number;
                  const syVal = vals[1] as number;
                  return `${-sxVal * 1.1}px ${-syVal * 1.1}px 35px -5px rgba(0,0,0,0.85)`;
                }
              ),
              transform: "translateZ(15px)",
              transformStyle: "preserve-3d"
            }}
          >
            <div className="relative w-full h-full">
              <img
                src="/images/profile-photo.jpeg"
                alt="Divyanshu Sisodiya"
                className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100 filter contrast-[1.02] brightness-[0.96]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-white/[0.02] pointer-events-none z-20" />
              <div className="absolute inset-0 bg-grid-sheen opacity-10 mix-blend-overlay pointer-events-none z-20" />

              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-cyan-400/70 z-30 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-cyan-400/70 z-30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-cyan-400/70 z-30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-cyan-400/70 z-30 pointer-events-none" />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded border border-cyan-500/30 bg-[#020205]/80 text-[7px] font-mono text-cyan-400 font-bold tracking-widest uppercase z-30 pointer-events-none">
                SYS_OPERATOR: SISODIYA.D
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-20 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const NavbarLink = ({ label, href, isActive }: { label: string; href: string; isActive: boolean }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Subtle magnetic pull (max 3px)
    const pullX = (e.clientX - cx) * 0.05;
    const pullY = (e.clientY - cy) * 0.15;
    x.set(Math.min(Math.max(pullX, -3), 3));
    y.set(Math.min(Math.max(pullY, -3), 3));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`group relative py-1 text-sm font-medium transition-colors duration-[250ms] ease-in-out select-none ${
        isActive ? "text-[#c084fc]" : "text-white/60 hover:text-[#c084fc]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#a855f7] transition-transform duration-[250ms] ease-in-out origin-center ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </motion.a>
  );
};

/* ========================================================================
   MAIN HERO SECTION WRAPPER
   ======================================================================== */

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const speedBoost = useRef(0);

  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 600], [0, 150]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textRotateX = useTransform(scrollY, [0, 600], [0, 15]);
  const textZ = useTransform(scrollY, [0, 600], [0, -80]);

  const photoY = useTransform(scrollY, [0, 600], [0, 20]);
  const photoOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  let prevScroll = 0;
  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = Math.abs(latest - prevScroll);
    prevScroll = latest;
    speedBoost.current = Math.min(delta * 0.2, 4.0);
  });

  useEffect(() => {
    const decayInterval = setInterval(() => {
      if (speedBoost.current > 0) {
        speedBoost.current *= 0.90;
        if (speedBoost.current < 0.01) speedBoost.current = 0;
      }
    }, 30);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(decayInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const headlineWords = ["Building", "India's", "First", "All-In-One", "AI", "Workspace"];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Determine which section is currently active for navbar highlighting
    const sections = ["hero", "about", "insights", "projects", "contact"];
    
    const handleScroll = () => {
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is somewhat near the top of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-12 overflow-hidden px-8 bg-[#020205] perspective-[1500px]">

      <HolographicCoreBackground mouseX={mouseX} mouseY={mouseY} />

      <CyberGrid mouseX={mouseX} mouseY={mouseY} />

      <CursorSpotlight />

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-50">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px] top-[5%] left-[15%] animate-[nebula-1_22s_ease-in-out_infinite]" />
        <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-[150px] bottom-[15%] right-[5%] animate-[nebula-2_28s_ease-in-out_infinite]" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-ray-1 w-[200%] h-[200%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-[#7c3aed]/5 to-transparent blur-[90px]" />
        <div className="ambient-ray-2 w-[200%] h-[200%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-[#a855f7]/5 to-transparent blur-[90px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen flex items-center justify-center">
        <motion.div
          className="absolute w-[700px] h-[700px] bg-purple-600/[0.05] rounded-full blur-[120px]"
          animate={{ scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <motion.nav 
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-[#020205]/60 backdrop-blur-xl border-b border-white/5 shadow-sm" 
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex justify-between items-center px-8 py-4 max-w-[1280px] mx-auto">
          {/* PREMIUM FOUNDER BRAND LOGO */}
          <motion.div
            className="font-headline font-bold text-xl select-none cursor-pointer relative group flex items-center gap-0"
            style={{ letterSpacing: "0.02em" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.3)]">
              Divyanshu
            </span>
            <span className="text-purple-400/60 mx-2 font-light">•</span>
            <span className="text-[#c084fc] transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(192,132,252,0.5)] group-hover:text-[#d8b4fe]">
              Singularity Horizon
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 font-body text-white/80 perspective-[1000px] preserve-3d">
            {[
              { label: "About", href: "#about", targetSection: "about" },
              { label: "Projects", href: "#projects", targetSection: "projects" }
            ].map((item) => {
              const isActive = activeSection === item.targetSection;
              return (
                <NavbarLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  isActive={isActive}
                />
              );
            })}
          </div>

          <div className="perspective-[1000px] preserve-3d">
            <motion.a
              href="#contact"
              className="px-6 py-2.5 rounded-lg font-semibold text-white bg-[#7c3aed] hover:bg-[#a855f7] transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] text-sm"
              animate={{ z: [-10, 10, -10] }}
              transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
              whileHover={{ scale: 1.08 }}
            >
              Join The Journey &rarr;
            </motion.a>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <motion.div
          className="space-y-6"
          style={{ y: textY, z: textZ, rotateX: textRotateX, opacity: textOpacity, transformStyle: "preserve-3d" }}
        >
          <motion.h1
            className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.15] text-white select-none whitespace-normal"
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Building India's <br className="hidden sm:inline" />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#e4e4e7] to-[#a1a1aa] drop-shadow-[0_0_15px_rgba(255,255,255,0.12)]">
              First All-In-One AI Workspace
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-[#e2b489] font-mono text-xs uppercase tracking-[0.25em] font-semibold select-none drop-shadow-[0_0_8px_rgba(226,180,137,0.2)]">
              Co-Founder of Singularity Horizon
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed select-none">
              Building intelligent systems, AI products, and innovative technology solutions that push the boundaries of human potential.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-5 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ExploreButton />
            <RoadmapButton />
          </motion.div>
        </motion.div>

        <div className="relative flex justify-center items-center w-full h-[350px] md:h-[390px] lg:h-[420px] overflow-visible perspective-[1500px]" style={{ transformStyle: "preserve-3d" }}>
          <PortraitImage opacity={photoOpacity} y={photoY} />
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes ripple {
          0% { width: 0px; height: 0px; opacity: 1; }
          100% { width: 350px; height: 350px; opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes text-glow-sweep {
          0% { background-position: 250% 0; }
          25%, 100% { background-position: -250% 0; }
        }
        @keyframes rotate-clockwise {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rotate-counter {
          0% { transform: translate(-50%, -50%) rotate(360deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.65; transform: translate(-50%, -50%) scale(0.95); }
          50% { opacity: 1.0; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes pulse-wave {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0; }
          8% { opacity: 0.4; }
          80% { opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
        }
        @keyframes intelligence-breathing-pulse {
          0%, 100% {
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.1), 0 0 2px rgba(168, 85, 247, 0.05);
            opacity: 0.95;
          }
          50% {
            text-shadow: 0 0 25px rgba(168, 85, 247, 0.35), 0 0 8px rgba(6, 182, 212, 0.25);
            opacity: 1.0;
          }
        }
        @keyframes sheen {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(150%) skewX(-25deg); }
        }
        .glow-text-white {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 35%,
            #c084fc 46%,
            #22d3ee 50%,
            #c084fc 54%,
            #ffffff 65%,
            #ffffff 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-glow-sweep 10s ease-in-out infinite, intelligence-breathing-pulse 6s ease-in-out infinite;
        }
        .glow-text-purple {
          background: linear-gradient(
            90deg,
            #a855f7 0%,
            #6366f1 25%,
            #06b6d4 50%,
            #ec4899 75%,
            #a855f7 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite, intelligence-breathing-pulse 6s ease-in-out infinite;
          position: relative;
        }
        .glow-text-purple::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0) 0%,
            rgba(168, 85, 247, 0) 35%,
            #00f0ff 50%,
            rgba(168, 85, 247, 0) 65%,
            rgba(168, 85, 247, 0) 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-glow-sweep 10s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        .bg-conic-gradient-1 {
          background: conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.05), transparent 70%);
        }
        .bg-conic-gradient-2 {
          background: conic-gradient(from 180deg, transparent, rgba(6, 182, 212, 0.05), transparent 70%);
        }
        .bg-gradient-conic-trail {
          background: conic-gradient(from 0deg, #7c3aed 0%, transparent 20%, transparent 100%);
        }
        .bg-grid-sheen {
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        .svg-border-rect {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 0.8s ease;
        }
        .roadmap-btn:hover .svg-border-rect {
          animation: borderScan 0.8s linear infinite;
        }
        @keyframes borderScan {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes sweep-ray-1 {
          0% { transform: translate(-30%, -30%) rotate(-45deg); opacity: 0; }
          50% { opacity: 0.04; }
          100% { transform: translate(30%, 30%) rotate(-45deg); opacity: 0; }
        }
        @keyframes sweep-ray-2 {
          0% { transform: translate(30%, -30%) rotate(45deg); opacity: 0; }
          50% { opacity: 0.04; }
          100% { transform: translate(-30%, 30%) rotate(45deg); opacity: 0; }
        }
        @keyframes nebula-1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes nebula-2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -60px) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .nav-link:hover .nav-underline {
          width: 100%;
          left: 0;
        }
        .nav-underline {
          left: 50%;
        }
        .ambient-ray-1 {
          animation: sweep-ray-1 12s ease-in-out infinite;
        }
        .ambient-ray-2 {
          animation: sweep-ray-2 15s ease-in-out infinite;
        }
        .roadmap-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(124, 58, 237, 0.2);
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 12px;
          z-index: 0;
        }
        .roadmap-btn:hover::before {
          transform: scale(1);
        }
      `}} />
    </header>
  );
}
