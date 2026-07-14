"use client";

import { Search, Keyboard, Sparkles, Code2 } from "lucide-react";

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
      // Offset scroll location to account for floating header height and margin (approx 120px)
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed top-6 left-0 w-full z-[999] px-6 md:px-12 pointer-events-none">
      <nav className="site-container bg-zinc-950/55 backdrop-blur-xl border border-luxury-border/95 rounded-3xl py-6 md:py-7 px-8 md:px-12 shadow-2xl pointer-events-auto flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-foreground hover:text-accent font-display font-black text-base md:text-lg lg:text-xl tracking-widest cursor-pointer outline-hidden uppercase"
          data-cursor="pointer"
        >
          <Code2 className="w-6 h-6 text-accent" />
          <span className="font-extrabold tracking-wider">
            SHLOK <span className="font-serif italic text-zinc-500 font-normal">PANDEY</span>
          </span>
        </button>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNav(item.id)}
              className="text-sm font-mono text-zinc-400 hover:text-foreground hover:scale-105 transition-all cursor-pointer outline-hidden uppercase tracking-wider font-bold"
              data-cursor="pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Global Toolbar buttons */}
        <div className="flex items-center gap-4">
          
          {/* Custom Cursor Selector */}
          <button
            onClick={onToggleCursor}
            className={`p-3 rounded-full cursor-pointer transition-colors outline-hidden ${
              cursorEnabled
                ? "bg-accent/15 text-accent hover:bg-accent/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Toggle Cursor Morphing (Shortcut: C)"
            data-cursor="pointer"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          {/* Keyboard Shortcuts cheat sheet toggle */}
          <button
            onClick={onOpenShortcuts}
            className="p-3 text-zinc-500 hover:text-zinc-300 rounded-full cursor-pointer transition-colors outline-hidden"
            title="Keyboard Shortcuts Cheat Sheet (Shortcut: ?)"
            data-cursor="pointer"
          >
            <Keyboard className="w-5 h-5" />
          </button>

          {/* Search Trigger Command Palette */}
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-luxury-border text-zinc-400 hover:text-foreground transition-all cursor-pointer text-sm font-mono outline-hidden"
            title="Search command list (Shortcut: Ctrl+K)"
            data-cursor="pointer"
          >
            <Search className="w-4.5 h-4.5 text-zinc-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] bg-zinc-800 border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>

      </nav>
    </div>
  );
}
