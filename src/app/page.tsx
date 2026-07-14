"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import Lenis from "lenis";

// Custom helper hooks
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

// UI/3D elements
import CustomCursor from "@/components/ui/CustomCursor";
import MusicToggle from "@/components/ui/MusicToggle";
import CommandPalette from "@/components/ui/CommandPalette";
import AiWidget from "@/components/ui/AiWidget";

// Sections
import Loader from "@/components/sections/Loader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      prevent: (node) => node.classList.contains("no-scrollbar"), // Avoid conflicting scroll locks
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  // Define global keyboard shortcuts
  useKeyboardShortcuts({
    c: () => setCursorEnabled((prev) => !prev),
    m: () => setMusicPlaying((prev) => !prev),
    "ctrl+k": () => setPaletteOpen((prev) => !prev),
    k: () => setPaletteOpen((prev) => !prev),
    h: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "?": () => setShortcutsOpen((prev) => !prev),
  });

  return (
    <main className="relative min-h-screen w-full bg-luxury-bg text-foreground overflow-x-hidden selection:bg-accent/30 selection:text-white grain">
      {/* 1. Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* 2. Background Aurora meshes & gradients */}
          <div className="aurora-mesh" />

          {/* 3. Global Helpers */}
          <CustomCursor enabled={cursorEnabled} />
          
          <MusicToggle
            isPlaying={musicPlaying}
            onToggle={() => setMusicPlaying(!musicPlaying)}
          />

          <CommandPalette
            isOpen={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            toggleCursor={() => setCursorEnabled(!cursorEnabled)}
            toggleMusic={() => setMusicPlaying(!musicPlaying)}
          />

          <AiWidget />

          {/* 4. Navigation */}
          <Navbar
            onOpenPalette={() => setPaletteOpen(true)}
            onOpenShortcuts={() => setShortcutsOpen(true)}
            cursorEnabled={cursorEnabled}
            onToggleCursor={() => setCursorEnabled(!cursorEnabled)}
          />

          {/* 5. Content Layout */}
          <div className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </div>

          {/* 6. Keyboard Shortcuts cheatsheet Overlay Dialog */}
          <AnimatePresence>
            {shortcutsOpen && (
              <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShortcutsOpen(false)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md"
                />

                {/* Dialog Content */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="w-full max-w-[420px] glass-panel border border-luxury-border rounded-2xl p-6 shadow-2xl relative"
                >
                  <button
                    onClick={() => setShortcutsOpen(false)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-foreground cursor-pointer outline-hidden"
                    data-cursor="pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2.5 mb-5">
                    <Keyboard className="w-5 h-5 text-accent" />
                    <h3 className="text-base font-display font-bold text-foreground">Keyboard Shortcuts</h3>
                  </div>

                  <div className="flex flex-col gap-4 font-mono text-xs text-zinc-300">
                    <div className="flex justify-between items-center py-2 border-b border-luxury-border/50">
                      <span>Toggle Command Palette</span>
                      <kbd className="px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">Ctrl + K / K</kbd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-luxury-border/50">
                      <span>Toggle Morphing Cursor</span>
                      <kbd className="px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">C</kbd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-luxury-border/50">
                      <span>Toggle Ambient Synth</span>
                      <kbd className="px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">M</kbd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-luxury-border/50">
                      <span>Scroll to Top / Hero</span>
                      <kbd className="px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">H</kbd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-luxury-border/50">
                      <span>Toggle Shortcuts Cheatsheet</span>
                      <kbd className="px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">?</kbd>
                    </div>
                  </div>

                  <div className="mt-6 text-[10px] text-zinc-500 text-center font-mono uppercase tracking-wider">
                    Designed for optimal key accessibility
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}
