"use client";

import { supabase } from "@/lib/supabase";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

type RoleType = "Founder" | "Developer" | "Researcher" | "Designer" | "Investor" | "Student" | "";

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * 0.22; // pull factor
    const y = (clientY - centerY) * 0.22;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type="submit"
      className="group relative w-full overflow-hidden rounded-2xl py-4 font-headline font-bold text-white transition-all duration-300 border border-white/10 backdrop-blur-md cursor-pointer bg-white/[0.02] shadow-[0_0_20px_rgba(124,58,237,0.1)] hover:shadow-[0_0_35px_rgba(124,58,237,0.3)] mt-4"
    >
      {/* Soft gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/15 via-[#3b82f6]/15 to-[#7c3aed]/15 opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
      <span className="relative z-10 flex items-center justify-center gap-2.5 text-lg">
        {children}
        <ArrowRight size={20} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
      </span>
    </motion.button>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "" as RoleType,
    project: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [headerMousePosition, setHeaderMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 45;
      const y = (e.clientY - rect.top - rect.height / 2) / 45;
      setHeaderMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const roles: RoleType[] = ["Founder", "Developer", "Researcher", "Designer", "Investor", "Student"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) return;

    try {
      setIsLoading(true);

      const { error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: form.name,
            email: form.email,
            role: form.role,
            message: `
Project: ${form.project}

${form.message}
          `,
          },
        ]);

      if (error) {
        console.error(error);
        alert("Failed to send message.");
        return;
      }

      setIsSubmitted(true);

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="py-16 md:py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col items-center justify-center min-h-screen bg-[#020202] scroll-mt-24"
      id="contact"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-60 z-0"></div>

      {/* Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#7c3aed]/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3b82f6]/10 blur-[120px] rounded-full"
        />

        {/* Floating Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1400),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight + 1000 : 2000),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="w-full mx-auto relative z-10 flex flex-col items-center">

        {/* Header Section (Outside Card Box) */}
        <motion.div
          ref={headerRef}
          className="text-center mb-10 mt-6 max-w-4xl relative z-10 flex flex-col items-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150px] bg-[#7c3aed]/10 blur-[90px] rounded-full pointer-events-none z-0" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-gray-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg backdrop-blur-sm"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
            Collaboration Portal
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black text-white tracking-tighter leading-[0.95] select-none mb-4">
            Let's Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#3b82f6] to-[#7c3aed]" style={{ backgroundSize: "200% auto", animation: "text-gradient-sweep 3s linear infinite" }}>Future</span> Together
          </h2>

          <p className="text-white/60 font-body text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
            Whether you're building a startup, researching AI, exploring Orion Helix, or looking for collaboration opportunities — I'd love to hear what you're working on.
          </p>
        </motion.div>

        {/* Structured Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[600px] relative rounded-[1.5rem] border border-white/[0.1] bg-gradient-to-br from-[#13072e]/80 via-[#0a0a0c]/80 to-[#07132e]/80 backdrop-blur-[40px] shadow-[0_8px_40px_0_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[0_20px_80px_-10px_rgba(124,58,237,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:border-white/[0.15] transition-all duration-500 p-6 sm:p-8 md:p-8 overflow-hidden group"
        >
          {/* Card Accent Lines & Internal Glows */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#3b82f6]/50 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#7c3aed]/25 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#7c3aed]/40 transition-colors duration-500" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#3b82f6]/25 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#3b82f6]/40 transition-colors duration-500" />

          {/* Form & Success States */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form-fields"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-5 relative z-10"
              >
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex flex-col gap-2 relative group">
                    <label htmlFor="name" className="text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase pl-1 transition-colors group-focus-within:text-[#7c3aed]">Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      value={form.name}
                      placeholder="Divyanshu Sisodiya"
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[15px] font-medium tracking-wide outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-[#7c3aed]/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] placeholder-white/20"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex flex-col gap-2 relative group">
                    <label htmlFor="email" className="text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase pl-1 transition-colors group-focus-within:text-[#7c3aed]">Email</label>
                    <input
                      required
                      type="email"
                      id="email"
                      value={form.email}
                      placeholder="divyanshu@example.com"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[15px] font-medium tracking-wide outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-[#7c3aed]/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] placeholder-white/20"
                    />
                  </motion.div>
                </div>

                {/* Role selection pills */}
                <motion.div whileHover={{ scale: 1.005 }} className="flex flex-col gap-3">
                  <span className="text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase pl-1">I'm a:</span>
                  <div className="flex flex-wrap gap-2.5">
                    {roles.map((role) => {
                      const isSelected = form.role === role;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={role}
                          type="button"
                          onClick={() => setForm({ ...form, role: isSelected ? "" : role })}
                          className={`px-5 py-2.5 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer select-none ${isSelected
                            ? "border-[#7c3aed] bg-gradient-to-r from-[#7c3aed]/20 to-[#3b82f6]/20 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                            : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                          {role}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* What are you building? */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex flex-col gap-2 relative group">
                  <label htmlFor="project" className="text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase pl-1 transition-colors group-focus-within:text-[#7c3aed]">What are you building?</label>
                  <input
                    type="text"
                    id="project"
                    value={form.project}
                    placeholder="AI Startup, SaaS Product, Research Project, Developer Tool..."
                    onFocus={() => setFocusedField("project")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[15px] font-medium tracking-wide outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-[#7c3aed]/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] placeholder-white/20"
                  />
                </motion.div>

                {/* How can we collaborate? */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex flex-col gap-2 relative group">
                  <label htmlFor="message" className="text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase pl-1 transition-colors group-focus-within:text-[#7c3aed]">How can we collaborate?</label>
                  <textarea
                    id="message"
                    value={form.message}
                    placeholder="Tell me about your idea, project, or collaboration opportunity..."
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[15px] font-medium tracking-wide outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-[#7c3aed]/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] placeholder-white/20 resize-none"
                  />
                </motion.div>

                {/* Submit Trigger */}
                <MagneticButton>
                  {isLoading ? "Sending..." : "Start The Conversation"}
                </MagneticButton>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-10"
              >
                <div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-headline font-black text-3xl text-white tracking-tight">Message Received</h3>
                  <p className="text-gray-300 font-body text-base max-w-md leading-relaxed">
                    Thank you for reaching out. I'll personally review your submission and get back to you.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ name: "", email: "", role: "", project: "", message: "" });
                  }}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-semibold text-white tracking-wider uppercase hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer select-none"
                >
                  Send another message
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* BOTTOM SECTION: Currently Building */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-32 pt-12 flex flex-col items-center relative w-full"
        >
          {/* Subtle top border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <span className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-8">Currently Building</span>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {[
              { name: "Orion Helix AI", active: true },
              { name: "Jarvis AI Assistant", active: true },
              { name: "Code Inspector AI", active: true }
            ].map((project, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors duration-300 rounded-full px-5 py-2.5 backdrop-blur-sm cursor-default">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] z-10" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#10b981] animate-ping opacity-75" />
                </div>
                <span className="text-gray-300 text-sm font-medium">{project.name}</span>
                <span className="text-[#10b981]/70 text-[10px] font-bold uppercase tracking-wider ml-1">Status: Active</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Global CSS Style tag to force-override autofill styles and font families */}
      <style dangerouslySetInnerHTML={{
        __html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 5000s ease-in-out 0s !important;
          box-shadow: inset 0 0 20px 20px rgba(0, 0, 0, 0.8) !important;
        }
        input, textarea, button, select {
          font-family: var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }
      ` }} />
    </section>
  );
}
