"use client";

import { Search, Keyboard, Sparkles, Code2 } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

interface NavbarProps {
  onOpenPalette: () => void;
  onOpenShortcuts: () => void;
  cursorEnabled: boolean;
  onToggleCursor: () => void;
}

export default function Navbar({
  onOpenPalette,
  onOpenShortcuts,
  cursorEnabled,
  onToggleCursor,
}: NavbarProps) {
  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] w-[90%] max-w-[960px]">
      <div className="glass-panel border border-luxury-border/60 rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-xl">
        
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-foreground hover:text-accent font-display font-black text-sm tracking-widest cursor-pointer outline-hidden uppercase"
          data-cursor="pointer"
        >
          <Code2 className="w-4 h-4 text-accent" />
          <span>SHLOK // P</span>
        </button>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNav(item.id)}
              className="text-xs font-mono text-zinc-400 hover:text-foreground hover:scale-105 transition-all cursor-pointer outline-hidden uppercase tracking-wider"
              data-cursor="pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Global Toolbar buttons */}
        <div className="flex items-center gap-2">
          
          {/* Custom Cursor Selector */}
          <button
            onClick={onToggleCursor}
            className={`p-2 rounded-full cursor-pointer transition-colors outline-hidden ${
              cursorEnabled
                ? "bg-accent/15 text-accent hover:bg-accent/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Toggle Cursor Morphing (Shortcut: C)"
            data-cursor="pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Keyboard Shortcuts cheat sheet toggle */}
          <button
            onClick={onOpenShortcuts}
            className="p-2 text-zinc-500 hover:text-zinc-300 rounded-full cursor-pointer transition-colors outline-hidden"
            title="Keyboard Shortcuts Cheat Sheet (Shortcut: ?)"
            data-cursor="pointer"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Search Trigger Command Palette */}
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-luxury-border text-zinc-400 hover:text-foreground transition-all cursor-pointer text-xs font-mono outline-hidden"
            title="Search command list (Shortcut: Ctrl+K)"
            data-cursor="pointer"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-xs text-[9px] bg-zinc-800 border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>

      </div>
    </nav>
  );
}
