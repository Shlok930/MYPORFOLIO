"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [traitIndex, setTraitIndex] = useState(0);

  // Counter animation
  useEffect(() => {
    const end = 100;
    const duration = 2000; // 2 seconds
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const val = Math.min(Math.floor((progress / duration) * end), end);
      setCount(val);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  // Trait cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTraitIndex((prev) => (prev + 1) % personalInfo.traits.length);
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 bg-luxury-bg z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          SYSTEM_BOOTING // SHLOK_PANDEY
        </span>
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          v2.0.26
        </span>
      </div>

      {/* Middle: Trait Display & Progress */}
      <div className="flex flex-col items-start gap-4">
        <div className="h-16 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={traitIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-4xl md:text-6xl font-display font-extrabold text-foreground tracking-tight uppercase"
            >
              {personalInfo.traits[traitIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
        <p className="text-zinc-500 font-mono text-sm max-w-sm leading-relaxed">
          Assembling full stack developer framework, smart neural modules, and high-fidelity layout blocks.
        </p>
      </div>

      {/* Bottom: Progress Counter & Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Loading Assets</span>
            <span className="text-zinc-300 font-mono text-xs">THREE_MESH.GLTF // SHADER_COMPILED</span>
          </div>
          <span className="text-6xl md:text-8xl font-display font-extrabold text-white tracking-tighter">
            {count}%
          </span>
        </div>

        {/* Dynamic progress bar */}
        <div className="w-full h-[2px] bg-zinc-900 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent via-amber-500 to-yellow-400"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
