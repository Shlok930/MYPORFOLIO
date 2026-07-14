"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Compass, Goal } from "lucide-react";
import { personalInfo, timelineData } from "@/data/portfolioData";
import dynamic from "next/dynamic";

// Dynamically import Canvas 3D Globe to avoid SSR problems
const InteractiveGlobe = dynamic(() => import("../3d/InteractiveGlobe"), { ssr: false });

export default function About() {
  return (
    <section id="about" className="py-36 md:py-48 relative w-full overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent/3 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Main Gutter Gutter aligned container (.site-container) */}
      <div className="site-container relative z-10 w-full flex flex-col gap-20">
        
        {/* Title header */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">[ Profile story ]</span>
          <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tight text-foreground leading-[0.98]">
            Full Stack <span className="font-serif italic text-zinc-500/90 font-normal">software engineering.</span>
          </h2>
        </div>

        {/* Narrative & Location grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Text content details */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-sans font-extrabold text-foreground tracking-tight">
                Hi, I'm Shlok Pandey
              </h3>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg lg:text-xl font-light text-justify text-balance">
                I am a B.Tech Computer Science student in my 4th semester at the Oriental Institute of Science and Technology, Bhopal. My engineering focus centers around building robust full-stack web applications and integrating secure, scalable AI capabilities.
              </p>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg lg:text-xl font-light text-justify text-balance">
                With a mindset that bridges minimalist product design and software architecture, I build projects that target actual real-world needs, from blockchain wallet checkers to logistics solvers.
              </p>
            </div>

            {/* Mission & Vision cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission */}
              <div className="group relative bg-zinc-950/40 border border-luxury-border p-8 rounded-3xl flex flex-col gap-4 hover:border-accent/35 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif italic text-3xl text-zinc-400 group-hover:text-accent transition-colors font-medium">
                    Our Mission
                  </h4>
                  <span className="font-script text-accent text-2xl select-none rotate-3">Impact</span>
                </div>
                <div className="h-px bg-luxury-border/60 w-full" />
                <p className="text-base text-zinc-400 leading-relaxed font-light text-balance pt-2">
                  {personalInfo.mission}
                </p>
              </div>

              {/* Vision */}
              <div className="group relative bg-zinc-950/40 border border-luxury-border p-8 rounded-3xl flex flex-col gap-4 hover:border-accent-purple/35 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif italic text-3xl text-zinc-400 group-hover:text-accent-purple transition-colors font-medium">
                    Our Vision
                  </h4>
                  <span className="font-script text-accent-purple text-2xl select-none -rotate-3">Startup</span>
                </div>
                <div className="h-px bg-luxury-border/60 w-full" />
                <p className="text-base text-zinc-400 leading-relaxed font-light text-balance pt-2">
                  {personalInfo.vision}
                </p>
              </div>
            </div>
          </div>

          {/* 3D Globe Location Card */}
          <div className="lg:col-span-5 bg-zinc-950/40 border border-luxury-border rounded-2xl p-6 flex flex-col justify-between gap-6 h-full relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-red-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Location</span>
                  <span className="text-base font-sans font-semibold text-foreground">{personalInfo.location}</span>
                </div>
              </div>
              
              {/* Handwritten script badge */}
              <div className="font-script text-accent text-2xl -rotate-6 select-none">
                India 🇮🇳
              </div>
            </div>

            {/* 3D Globe Render */}
            <div className="w-full h-[280px] relative">
              <InteractiveGlobe />
            </div>

            <div className="flex items-center gap-3.5 z-10 text-xs text-zinc-400 font-mono bg-zinc-950/80 p-4 rounded-xl border border-luxury-border/60">
              <GraduationCap className="w-5 h-5 text-accent" />
              <div className="flex flex-col">
                <span className="font-bold text-foreground">OIST, Bhopal</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">B.Tech CS • 4th Semester</span>
              </div>
            </div>
          </div>

        </div>



      </div>
    </section>
  );
}
