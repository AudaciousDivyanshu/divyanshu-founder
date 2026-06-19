"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroImage() {
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt (max 12 deg)
  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Dynamic 3D depth shadow shifting opposite to tilt direction
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalized to -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative w-[320px] h-[440px] md:w-[420px] md:h-[540px] lg:w-[480px] lg:h-[620px] z-20 flex items-center justify-center cursor-pointer perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Diffused pulsing purple aura */}
      <motion.div
        className="absolute inset-[-20%] rounded-full z-0 pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.5) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(-100px)"
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Floating 3D Geometric shapes */}
      <div className="absolute inset-[-40%] pointer-events-none z-0 overflow-visible" style={{ transformStyle: "preserve-3d" }}>
        {[...Array(6)].map((_, i) => {
          const isCube = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`absolute border border-white/10 ${isCube ? 'w-10 h-10' : 'w-0 h-0 border-l-[20px] border-r-[20px] border-b-[34px] border-l-transparent border-r-transparent border-b-white/10'}`}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-20%",
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: ["0%", "-400%"],
                opacity: [0, 0.4, 0],
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 180],
                translateZ: [Math.random() * 100 - 50, Math.random() * 100 - 50]
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          );
        })}
      </div>

      {/* Tilt Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Continuous 3D Floating Bob & Hover Zoom Container */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ z: [0, 20, 0], rotateX: [0, -2, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          whileHover={{ y: -8, z: 20 }}
        >
          {/* Animated 3D Gradient Border */}
          <div className="absolute inset-[-6px] rounded-[30px] z-0 overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <motion.div
              className="absolute inset-[-50%] opacity-90"
              style={{
                background: "conic-gradient(from 0deg, #a855f7, #3b82f6, #6366f1, #ec4899, #a855f7)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            />
            {/* Inner mask to carve out the center, leaving only the border */}
            <div className="absolute inset-[6px] bg-[#050508] rounded-[24px]" />
          </div>

          {/* Main Image Frame with dynamic 3D drop shadow */}
          <motion.div
            className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0a0a12] z-10"
            style={{
              boxShadow: useTransform(
                [shadowX, shadowY],
                ([x, y]) => `${x}px ${y}px 70px -10px rgba(0,0,0,0.9)`
              ) as any,
              transform: "translateZ(1px)" // Force stacking context in 3d space
            }}
          >
            <img
              src="/images/profile-photo.jpeg"
              alt="Divyanshu Sisodiya"
              className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.95]"
            />

            {/* Subtle gradient to ground the photo */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent pointer-events-none" />

            {/* Soft inner shadow for depth */}
            <div className="absolute inset-0 z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none" />

            {/* Light glassmorphism overlay at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/[0.05] to-transparent backdrop-blur-[2px] border-t border-white/[0.05] pointer-events-none z-20" />

            {/* Very soft inner border */}
            <div className="absolute inset-0 z-30 border border-white/[0.1] rounded-[24px] pointer-events-none mix-blend-overlay" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}