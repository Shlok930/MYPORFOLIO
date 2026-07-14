"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  enabled: boolean;
}

export default function CustomCursor({ enabled }: CustomCursorProps) {
  const [hoveredEl, setHoveredEl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorRingX = useSpring(cursorX, springConfig);
  const cursorRingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]");
      if (cursorAttr) {
        const value = cursorAttr.getAttribute("data-cursor");
        setHoveredEl(value);
      } else {
        setHoveredEl(null);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled, isVisible, cursorX, cursorY]);

  if (!enabled || !isVisible) return null;

  const isPointer = hoveredEl === "pointer" || hoveredEl === "click";
  const isText = hoveredEl === "text";
  const isImage = hoveredEl === "image";

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer morphing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/60 pointer-events-none z-[9998] hidden md:flex items-center justify-center font-display text-[9px] uppercase tracking-widest text-accent font-bold"
        style={{
          x: cursorRingX,
          y: cursorRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 56 : isText ? 72 : isImage ? 80 : 28,
          height: isPointer ? 56 : isText ? 72 : isImage ? 80 : 28,
          backgroundColor: isText
            ? "rgba(217, 119, 6, 0.08)"
            : isImage
            ? "rgba(217, 119, 6, 0.12)"
            : "rgba(0, 0, 0, 0)",
          borderColor: isPointer
            ? "rgba(217, 119, 6, 0.8)"
            : isText
            ? "rgba(217, 119, 6, 0.5)"
            : isImage
            ? "rgba(217, 119, 6, 0.8)"
            : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {isText && <span className="opacity-90">Read</span>}
        {isImage && <span className="opacity-90">View</span>}
      </motion.div>
    </>
  );
}
