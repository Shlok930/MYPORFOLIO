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

      {/* Radial mesh overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-luxury-bg via-luxury-bg/80 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-luxury-bg/60 via-transparent to-luxury-bg/20" />

      {/* Amber auroral backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/4 z-1 h-[70vh] w-[50vw] rounded-full opacity-15 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 z-1" />

      {/* Main Container */}
      <div className="site-container relative z-10 w-full">
        {/* Two-column hero layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full max-w-6xl">

          {/* ─── LEFT: Text content ─── */}
          <div className="flex flex-col gap-8 flex-1 min-w-0">

            {/* ── Mobile-only: compact photo + name row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex lg:hidden items-center gap-4"
            >
              {/* Mini portrait */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-accent/15 blur-xl pointer-events-none" />
                <div className="relative w-20 h-24 rounded-2xl overflow-hidden border border-accent/30 shadow-lg bg-zinc-950">
                  <img
                    src="/images/shlok-photo.jpg"
                    alt="Shlok Pandey"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                </div>
              </div>
              {/* Name + status pill beside photo */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">{personalInfo.location}</span>
                <p className="text-base font-sans font-black text-white leading-tight">Shlok Pandey</p>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-bold">Full Stack Dev · AI</span>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2.5 py-1 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Open to work</span>
                </div>
              </div>
            </motion.div>

            {/* Badge row — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex flex-col gap-2"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                {personalInfo.location}
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold">
                Full Stack Developer // Software Engineer // AI Enthusiast
              </span>
            </motion.div>

            {/* Massive name heading */}
            <div className="relative">
              <h1
                className="font-sans leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-300 flex flex-col"
                style={{ fontSize: "clamp(3.8rem, 8vw, 8rem)" }}
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

              {/* Cursive annotation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                transition={{ duration: 0.8, delay: 1.1, type: "spring" }}
                className="absolute -top-6 right-0 font-script text-accent text-2xl md:text-4xl select-none pointer-events-none hidden md:block"
              >
                hello recruiter!
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed font-sans font-light"
            >
              {personalInfo.mission}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex flex-wrap items-center gap-4 relative"
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

              <a
                href="/api/resume"
                download="Shlok_Pandey_Resume.pdf"
                className="px-8 py-4 rounded-full border border-luxury-border text-zinc-300 font-sans text-sm hover:border-accent hover:text-accent transition-colors outline-hidden cursor-pointer inline-flex items-center gap-2"
                data-cursor="pointer"
              >
                Résumé ↗
              </a>

              {/* Cursive footnote */}
              <div className="absolute -bottom-8 left-0 font-script text-zinc-500 text-xl hidden md:block">
                * updated for 2026
              </div>
            </motion.div>

            {/* Scroll anchor */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              href="#projects"
              onClick={(e) => { e.preventDefault(); handleScroll("projects"); }}
              className="mt-12 inline-flex items-center gap-3 text-xs text-zinc-500 hover:text-accent transition-colors w-fit group"
              data-cursor="pointer"
            >
              <span className="h-10 w-px animate-pulse bg-luxury-border group-hover:bg-accent" aria-hidden="true" />
              View my case studies
            </motion.a>
          </div>

          {/* ─── RIGHT: Portrait Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 80 }}
            className="relative shrink-0 hidden lg:flex"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-accent/10 rounded-[2.5rem] blur-3xl pointer-events-none" />

            {/* Card wrapper */}
            <div className="relative w-72 xl:w-80 overflow-hidden rounded-[2rem] border border-accent/25 shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(251,191,36,0.12)] bg-zinc-950">

              {/* Photo */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img
                  src="/images/shlok-photo.jpg"
                  alt="Shlok Pandey"
                  className="w-full h-full object-cover object-center"
                />
                {/* Bottom gradient fade into card footer */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              {/* Card Footer */}
              <div className="relative px-6 py-5 flex flex-col gap-1.5 -mt-10 z-10">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">Portfolio · 2026</p>
                <h2 className="text-xl font-sans font-black text-white tracking-tight">Shlok Pandey</h2>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">Full Stack Developer & AI Enthusiast</p>

                {/* Status pill */}
                <div className="mt-3 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3.5 py-1.5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Open to work</span>
                </div>
              </div>

              {/* Decorative corner accent lines */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-accent/50 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent/50 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent/50 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-accent/50 rounded-br-lg pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
