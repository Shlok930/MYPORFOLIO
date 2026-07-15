"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Globe, Music, Compass, Sparkles, FileText, ArrowRight, ShieldCheck, HeartPulse, Train, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  toggleCursor: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  toggleCursor,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  interface CommandItem {
    id?: string;
    name: string;
    icon: React.ComponentType<any>;
    type: string;
    perform?: () => void;
  }

  const sections: CommandItem[] = [
    { id: "hero", name: "Go to Top / Hero", icon: Compass, type: "nav" },
    { id: "about", name: "Go to About & Journey", icon: Compass, type: "nav" },
    { id: "skills", name: "Go to Skills & Tech Stack", icon: Compass, type: "nav" },
    { id: "projects", name: "Go to Projects Portfolio", icon: Compass, type: "nav" },
    { id: "contact", name: "Go to Contact & Socials", icon: Compass, type: "nav" },
  ];

  const actions: CommandItem[] = [
    { name: "Toggle Custom Cursor (Shortcut: C)", icon: Sparkles, perform: () => { toggleCursor(); onClose(); }, type: "action" },
    { name: "View GitHub Profile", icon: Globe, perform: () => { window.open("https://github.com/Shlok930", "_blank"); onClose(); }, type: "action" },
    { name: "View LinkedIn Profile", icon: Globe, perform: () => { window.open("https://www.linkedin.com/in/shlok-pandey-b29190309/", "_blank"); onClose(); }, type: "action" },
    { name: "Download Resume", icon: FileText, perform: () => { handleDownloadResume(); onClose(); }, type: "action" },
  ];

  const projects: CommandItem[] = [
    { id: "trustshield", name: "Project: TrustShield (Wallet Security)", icon: ShieldCheck, type: "project" },
    { id: "health-chatbot", name: "Project: AI Public Health Chatbot", icon: HeartPulse, type: "project" },
    { id: "rake-optimizer", name: "Project: AI Rake Optimizer", icon: Train, type: "project" },
    { id: "api-healer", name: "Project: Autonomous API Healer", icon: Zap, type: "project" },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/api/resume";
    link.setAttribute("download", "Shlok_Pandey_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  // Combine items for filtering
  const allItems = [...sections, ...actions, ...projects];

  const filteredItems = allItems.filter((item) =>
    (item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Auto-focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setActiveIndex(0);
      setSearch("");
    }
  }, [isOpen]);

  // Handle keyboard events inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          triggerItem(filteredItems[activeIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredItems]);

  const triggerItem = (item: typeof allItems[0]) => {
    if (item.type === "nav") {
      handleNav(item.id!);
    } else if (item.type === "action") {
      item.perform!();
    } else if (item.type === "project") {
      handleNav("projects");
      // Give details panel some delay to scroll before simulating a click on the project card
      setTimeout(() => {
        const btn = document.getElementById(`proj-btn-${item.id}`);
        if (btn) btn.click();
      }, 350);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-[640px] glass-panel rounded-2xl border border-luxury-border shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Search Input wrapper */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-luxury-border">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search command, section or project... (Esc to exit)"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                className="w-full bg-transparent text-foreground placeholder-zinc-500 font-sans outline-hidden border-none text-base"
              />
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded-sm font-mono tracking-widest">
                ESC
              </span>
            </div>

            {/* List results */}
            <div className="max-h-[360px] overflow-y-auto p-2 no-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 font-mono text-sm">
                  No matching results found
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isHighlighted = activeIndex === index;

                  return (
                    <div
                      key={`${item.type}-${item.id || item.name}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => triggerItem(item)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-colors duration-150 ${
                        isHighlighted
                          ? "bg-accent/15 text-accent border-l-2 border-accent"
                          : "text-zinc-300 hover:bg-zinc-900/50"
                      }`}
                      data-cursor="pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-4 h-4 ${isHighlighted ? "text-accent" : "text-zinc-400"}`} />
                        <span className="font-sans text-sm font-medium">{item.name}</span>
                      </div>

                      {isHighlighted && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-accent/80">
                          <span>Execute</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer helper keys */}
            <div className="px-5 py-3.5 bg-zinc-950/80 border-t border-luxury-border flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-4">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
              <div>
                <span>Ctrl + K to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
