"use client";

import { ArrowUp, Code2 } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-luxury-border/60 bg-zinc-950/20 py-16">
      {/* site-container layout wrapper */}
      <div className="site-container w-full flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-foreground font-sans font-black text-base tracking-widest uppercase">
            <Code2 className="w-5 h-5 text-accent" />
            <span>SHLOK // PANDEY</span>
          </div>
          <p className="text-xs text-zinc-500 font-mono">
            © {currentYear} Shlok Pandey. Crafted in Bhopal, India. All rights reserved.
          </p>
        </div>

        {/* Back to Top & keyboard info */}
        <div className="flex flex-col md:items-end gap-4">
          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-fit p-3 bg-zinc-900 hover:bg-zinc-800 border border-luxury-border rounded-full hover:scale-105 transition-all text-zinc-400 hover:text-white cursor-pointer outline-hidden flex items-center justify-center gap-2 text-xs font-mono"
            title="Back to Top (Shortcut: H)"
            data-cursor="pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-accent" />
          </button>
          
          <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            press ? to display keys cheatsheet
          </span>
        </div>

      </div>
    </footer>
  );
}
