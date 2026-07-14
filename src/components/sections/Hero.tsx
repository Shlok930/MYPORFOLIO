"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { useMousePosition } from "@/hooks/useMousePosition";
import dynamic from "next/dynamic";

// Dynamically import Canvas particle background to bypass SSR errors
const GalaxyBg = dynamic(() => import("../3d/GalaxyBg"), { ssr: false });

export default function Hero() {
  const mouse = useMousePosition();

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-start overflow-hidden py-32 select-none"
    >
      {/* 3D WebGL Starfield Particle Canvas */}
      <GalaxyBg mouseX={mouse.x} mouseY={mouse.y} />

      {/* Radial mesh overlay to soften the dark palette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-luxury-bg via-luxury-bg/75 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-luxury-bg/50 via-transparent to-luxury-bg/30" />

      {/* Amber glowing auroral backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-1/4 z-1 h-[65vh] w-[65vh] rounded-full opacity-20 blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)"
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 z-1" />

      {/* Main Container with generous left padding gutter (.site-container) */}
      <div className="site-container relative z-10 w-full">
        <div className="max-w-3xl flex flex-col gap-8 relative">
          
          {/* Top Badging indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
              {personalInfo.location}
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Full Stack Developer // Software Engineer // AI Enthusiast
            </span>
          </motion.div>

          {/* Cursive Handwriting Annotation (Next Level Detail) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.8, delay: 1.1, type: "spring" }}
            className="absolute top-10 right-4 md:right-16 lg:right-32 font-script text-accent text-3xl md:text-5xl select-none pointer-events-none"
          >
            hello recruiter!
          </motion.div>

          {/* Hero Title: Massive Display Typography */}
          <div className="flex flex-col relative">
            <h1
              className="font-sans leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-300 flex flex-col"
              style={{ fontSize: "clamp(3.8rem, 8.5vw, 8.5rem)" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block font-black"
              >
                Shlok
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="block font-serif italic text-zinc-500/85 mt-2 font-normal"
              >
                Pandey
              </motion.span>
            </h1>
          </div>

          {/* Brief description: Scaled up font-size */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-zinc-400 text-lg md:text-2xl max-w-2xl leading-relaxed text-balance font-sans font-light"
          >
            {personalInfo.mission} Currently building intelligent neural applications at Oriental Institute of Science and Technology.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-wrap items-center gap-5 mt-4 relative"
          >
            <button
              onClick={() => handleScroll("projects")}
              className="px-8 py-4 rounded-full bg-white text-black font-sans font-bold text-sm tracking-wide transition-transform hover:-translate-y-0.5 outline-hidden cursor-pointer"
              data-cursor="pointer"
            >
              View work
            </button>

            <button
              onClick={() => handleScroll("contact")}
              className="px-8 py-4 rounded-full border border-accent text-accent font-sans font-bold text-sm tracking-wide transition-all hover:bg-accent hover:text-white outline-hidden cursor-pointer"
              data-cursor="pointer"
            >
              Get in touch
            </button>

            <button
              onClick={() => {
                // Simulate resume download
                const link = document.createElement("a");
                link.href = "#";
                link.setAttribute("download", "Shlok_Pandey_Resume.pdf");
                const content = new Blob(["Shlok Pandey - Resume"], { type: "text/plain" });
                link.href = URL.createObjectURL(content);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-8 py-4 rounded-full border border-luxury-border text-zinc-300 font-sans text-sm hover:border-accent hover:text-accent transition-colors outline-hidden cursor-pointer"
              data-cursor="pointer"
            >
              Résumé ↗
            </button>

            {/* Cursive note pointing to Resume */}
            <div className="absolute -bottom-8 left-1/3 font-script text-zinc-500 text-xl hidden md:block">
              * updated for 2026
            </div>
          </motion.div>

          {/* Bottom Case Study anchor link */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("projects");
            }}
            className="mt-20 inline-flex items-center gap-3 text-xs text-zinc-500 hover:text-accent transition-colors w-fit group"
            data-cursor="pointer"
          >
            <span className="h-10 w-px animate-pulse bg-luxury-border group-hover:bg-accent" aria-hidden="true"></span>
            View my case studies
          </motion.a>
        </div>
      </div>
    </section>
  );
}
