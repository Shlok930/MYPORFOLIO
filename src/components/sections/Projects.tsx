"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Server, Layers, Cpu, ShieldAlert } from "lucide-react";
import { projectsData, Project } from "@/data/portfolioData";
import GithubWidget from "../ui/GithubWidget";



export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Helper to render customized inline SVG architecture diagrams
  const renderArchitectureDiagram = (id: string) => {
    switch (id) {
      case "trustshield":
        return (
          <svg className="w-full h-32 text-zinc-400" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="35" width="80" height="50" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="50" y="65" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Next.js UI</text>
            
            <path d="M 90 60 L 140 60" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="140" y="35" width="100" height="50" rx="8" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="190" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Middleware</text>
            <text x="190" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">APIs & Cache</text>
            
            <path d="M 240 60 L 290 60" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="290" y="35" width="100" height="50" rx="8" fill="#18181b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="340" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">EVM Nodes</text>
            <text x="340" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">& Etherscan</text>
          </svg>
        );
      case "health-chatbot":
        return (
          <svg className="w-full h-32 text-zinc-400" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="35" width="85" height="50" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="52" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Next.js</text>
            <text x="52" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Voice & Audio</text>
            
            <path d="M 95 60 L 145 60" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="145" y="35" width="100" height="50" rx="8" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="195" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">FastAPI Server</text>
            <text x="195" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Python Router</text>
            
            <path d="M 245 60 L 295 60" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="295" y="35" width="95" height="50" rx="8" fill="#18181b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="342" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Gemini API</text>
            <text x="342" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">WHO Embeddings</text>
          </svg>
        );
      case "rake-optimizer":
        return (
          <svg className="w-full h-32 text-zinc-400" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="35" width="80" height="50" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="50" y="65" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">React Web</text>
            
            <path d="M 90 60 L 140 60" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="140" y="35" width="110" height="50" rx="8" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="195" y="55" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">FastAPI Server</text>
            <text x="195" y="68" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">NetworkX Optimizer</text>
            <text x="195" y="78" fill="#a1a1aa" fontSize="7" fontFamily="monospace" textAnchor="middle">Heuristics Engine</text>
            
            <path d="M 250 60 L 300 60" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="300" y="35" width="90" height="50" rx="8" fill="#18181b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="345" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">PostgreSQL</text>
            <text x="345" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Rake database</text>
          </svg>
        );
      case "api-healer":
        return (
          <svg className="w-full h-32 text-zinc-400" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="35" width="85" height="50" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="52" y="60" fill="#f4f4f5" fontSize="10" fontFamily="monospace" textAnchor="middle">Express App</text>
            <text x="52" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">API Client</text>
            
            <path d="M 95 60 L 145 60" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="145" y="35" width="105" height="50" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
            <text x="197" y="55" fill="#f4f4f5" fontSize="9" fontFamily="monospace" textAnchor="middle">Proxy Middleware</text>
            <text x="197" y="68" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">Error Interceptor</text>
            <text x="197" y="78" fill="#a1a1aa" fontSize="7" fontFamily="monospace" textAnchor="middle">Response Cache</text>
            
            <path d="M 250 60 L 295 60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
            
            <rect x="295" y="35" width="95" height="50" rx="8" fill="#18181b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="342" y="60" fill="#f4f4f5" fontSize="9" fontFamily="monospace" textAnchor="middle">Healing LLM</text>
            <text x="342" y="72" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">(LangChain Agent)</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-36 md:py-48 relative w-full overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-accent/3 rounded-full filter blur-[150px] pointer-events-none" />

      {/* site-container padding and layout */}
      <div className="site-container relative z-10 w-full flex flex-col gap-16">
        
        {/* Title header */}
        <div className="flex flex-col gap-3 relative">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">[ Selected creations ]</p>
          
          <h2 className="max-w-3xl font-sans text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[0.98]">
            Full stack modules and hackathon solutions - <span className="font-serif italic text-zinc-500/90 font-normal">built at scale.</span>
          </h2>

          {/* Cursive tip */}
          <div className="absolute top-2 right-4 md:right-16 lg:right-28 font-script text-accent text-xl md:text-2xl rotate-3 hidden md:block">
            * click card for full architecture!
          </div>
        </div>

        {/* Projects cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setSelectedProject(project)}
              className="group relative block overflow-hidden rounded-3xl border border-luxury-border bg-zinc-950/20 p-5 shadow-lg cursor-pointer hover:border-accent/30 transition-all duration-300"
            >
              {/* Media Aspect container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-luxury-border/60">
                {/* Fallback architectural diagram display on card */}
                <div className="absolute inset-0 flex items-center justify-center p-6 opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out">
                  {renderArchitectureDiagram(project.id)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-transparent to-transparent opacity-60"></div>
                
                {/* Case Study Index */}
                <span className="absolute right-6 top-6 font-mono text-sm text-zinc-500 font-bold">
                  0{idx + 1}
                </span>
              </div>

              {/* Title & subtitle details */}
              <div className="flex items-start justify-between gap-4 pt-5 px-2">
                <div>
                  <h3 className="font-sans font-black text-xl leading-tight tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1.5 font-light">{project.subtitle}</p>
                </div>
                <span aria-hidden="true" className="mt-1 translate-x-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent font-bold text-lg">
                  ↗
                </span>
              </div>

              {/* Core Metric Highlights */}
              <div className="mt-4 flex items-baseline gap-2.5 px-2 border-t border-luxury-border/20 pt-4">
                <span className="font-serif italic text-2xl leading-none text-accent font-black">
                  {project.metric.split(" ")[0]}
                </span>
                <span className="line-clamp-1 text-xs font-mono uppercase tracking-[0.15em] text-zinc-400">
                  {project.metric.split(" ").slice(1).join(" ")}
                </span>
              </div>

              {/* Technologies footer */}
              <div className="mt-4 flex flex-wrap gap-2 px-2 pb-2">
                {project.tags.slice(0, 3).map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="rounded-full border border-luxury-border px-3.5 py-1 text-xs text-zinc-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read detail trigger identifier */}
              <button
                id={`proj-btn-${project.id}`}
                className="hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* GitHub stats integration card */}
        <GithubWidget />

      </div>

      {/* Details overlay modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-[680px] max-h-[85vh] overflow-y-auto glass-panel border border-luxury-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-foreground cursor-pointer outline-hidden border border-luxury-border p-1.5 rounded-full bg-zinc-950/60"
                data-cursor="pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & tags */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-accent uppercase tracking-wider">{selectedProject.subtitle}</span>
                <h3 className="text-2xl md:text-3xl font-sans font-black text-white">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedProject.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-zinc-950/80 text-zinc-300 px-2 py-0.5 rounded-sm border border-luxury-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project explanation */}
              <div className="flex flex-col gap-4 border-t border-luxury-border/60 pt-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-sans font-bold text-foreground flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-accent-blue" />
                    <span>Project Description</span>
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {/* Core Features */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-sans font-bold text-foreground">Core Features</h4>
                  <ul className="list-disc pl-5 text-zinc-400 text-sm flex flex-col gap-1.5 leading-relaxed">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Challenges Panel */}
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex flex-col gap-2">
                  <h4 className="text-sm font-sans font-bold text-amber-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-4.5 h-4.5" />
                    <span>Challenges & Resolution</span>
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selectedProject.challenges}</p>
                </div>

                {/* Architecture Diagram */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-sans font-bold text-foreground flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-accent" />
                    <span>System Architecture Overview</span>
                  </h4>
                  <div className="bg-zinc-950/80 border border-luxury-border/60 rounded-xl p-4 flex items-center justify-center">
                    {renderArchitectureDiagram(selectedProject.id)}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono text-center">{selectedProject.architecture}</span>
                </div>

                {/* Role Details */}
                <div className="flex flex-col gap-2 border-t border-luxury-border/30 pt-4">
                  <h4 className="text-sm font-sans font-bold text-foreground flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-accent-purple" />
                    <span>My Role</span>
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selectedProject.role}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-4 border-t border-luxury-border/60 pt-6">
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 bg-accent hover:bg-accent/80 text-white rounded-xl text-center font-sans font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
                  data-cursor="pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
