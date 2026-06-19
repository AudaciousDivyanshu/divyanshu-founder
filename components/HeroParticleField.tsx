"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  z: number; // Simulated depth (0 to 1000)
  vx: number;
  vy: number;
  vz: number;
  size: number;
}

export default function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 1000], [0, 100]); // 0.2x speed approx for canvas parallax

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    const mouseX = { current: 0 };
    const mouseY = { current: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000); // Density
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: (Math.random() - 0.5) * canvas.width * 2, // Wider spread for 3D projection
          y: (Math.random() - 0.5) * canvas.height * 2,
          z: Math.random() * 1000, // Z depth from 0 (near) to 1000 (far)
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: Math.random() * -0.5 - 0.1, // Move towards camera
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fov = 300; // Field of view multiplier
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Current scroll offset (since we can't easily read framer motion value directly in requestAnimationFrame without a ref, we'll just handle basic continuous motion here, and let the wrapper motion.div handle the scroll parallax)
      
      // Update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        
        // Loop back if it passes camera
        if (p.z <= 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * canvas.width * 2;
          p.y = (Math.random() - 0.5) * canvas.height * 2;
        }
      });

      // Draw Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.z < 10) continue;
        
        const scale1 = fov / p1.z;
        // Apply mouse parallax: closer objects shift more with mouse
        const x1 = (p1.x - mouseX.current * scale1) * scale1 + cx;
        const y1 = (p1.y - mouseY.current * scale1) * scale1 + cy;

        if (x1 < -200 || x1 > canvas.width + 200 || y1 < -200 || y1 > canvas.height + 200) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.z < 10) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < 100) {
            const scale2 = fov / p2.z;
            const x2 = (p2.x - mouseX.current * scale2) * scale2 + cx;
            const y2 = (p2.y - mouseY.current * scale2) * scale2 + cy;

            const alpha = (1 - dist3D / 100) * 0.3 * Math.min(1, scale1); 
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      particles.forEach((p) => {
        if (p.z < 10) return;
        const scale = fov / p.z;
        const x = (p.x - mouseX.current * scale) * scale + cx;
        const y = (p.y - mouseY.current * scale) * scale + cy;

        if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) return;

        const projectedSize = Math.max(0.1, p.size * scale);
        const alpha = Math.min(1, scale * 1.5); 

        ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, projectedSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.current = (e.clientX - cx) * 0.5; // Parallax intensity
      mouseY.current = (e.clientY - cy) * 0.5;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Pre-generate geometric shapes to render over canvas
  const shapes = Array.from({ length: 8 }).map((_, i) => {
    const isCube = i % 2 === 0;
    return (
      <motion.div
        key={i}
        className={`absolute border border-[#7c3aed]/20 ${isCube ? 'w-8 h-8' : 'w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#7c3aed]/20'}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transformStyle: "preserve-3d",
        }}
        animate={{ 
          y: ["0vh", "-100vh"],
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180],
          z: [Math.random() * -200, Math.random() * 200]
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * -20
        }}
      />
    );
  });

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen perspective-[1000px] overflow-hidden"
      style={{ y: yOffset, transformStyle: "preserve-3d" }}
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {shapes}
      </div>
    </motion.div>
  );
}
