"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Audio Context and Synthesizer nodes
  const initSynth = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Filter to soften the sound
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.0, ctx.currentTime);
    filter.connect(ctx.destination);
    filterNodeRef.current = filter;
  };

  // Play a smooth ambient pad chord: base frequencies (Hz)
  const playChord = (notes: number[]) => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "suspended") return;

    // Stop current oscillators
    stopChord();

    const now = ctx.currentTime;
    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine"; // Clean base tone
      osc.frequency.setValueAtTime(freq, now);

      // Slow fade-in and fade-out envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 1.5); // very soft
      
      osc.connect(gain);
      if (filterNodeRef.current) {
        gain.connect(filterNodeRef.current);
      }

      osc.start(now);
      oscillatorsRef.current.push(osc);
      gainNodesRef.current.push(gain);
    });
  };

  const stopChord = (fadeTime = 1.5) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;

    gainNodesRef.current.forEach((gain) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + fadeTime);
      } catch {
        // Safe check
      }
    });

    const activeOscillators = [...oscillatorsRef.current];
    oscillatorsRef.current = [];
    gainNodesRef.current = [];

    setTimeout(() => {
      activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore if already stopped
        }
      });
    }, fadeTime * 1000 + 100);
  };

  // Chord progression definitions (ambient pad notes)
  // Cmaj9 (C3, G3, B3, D4, E4), Am9 (A2, E3, G3, C4, B4), Fmaj7 (F2, C3, E3, A3, C4)
  const chords = [
    [130.81, 196.00, 246.94, 293.66, 329.63], // Cmaj9
    [110.00, 164.81, 196.00, 261.63, 493.88], // Am9
    [87.31, 130.81, 164.81, 220.00, 261.63]   // Fmaj7
  ];

  useEffect(() => {
    if (isPlaying) {
      initSynth();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      let chordIndex = 0;
      const tick = () => {
        playChord(chords[chordIndex]);
        chordIndex = (chordIndex + 1) % chords.length;
      };

      tick();
      // Change chords every 6 seconds
      const id = setInterval(tick, 6000);
      intervalIdRef.current = id;
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      stopChord(0.8);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      // Clean stop on unmount
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch { }
      });
    };
  }, [isPlaying]);

  const handleToggle = () => {
    onToggle();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-[99] flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel glass-panel-hover border border-luxury-border text-foreground hover:text-accent transition-all cursor-pointer shadow-lg outline-hidden"
      title="Toggle Background Music (Shortcut: M)"
      data-cursor="pointer"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-accent animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-zinc-400" />
      )}
      
      {/* Visualizer bars */}
      <div className="flex items-end gap-[2px] h-5 w-7">
        <div
          className={`w-[3px] bg-accent rounded-xs ${
            isPlaying ? "audio-bar" : "h-1"
          }`}
          style={{ height: isPlaying ? undefined : "4px" }}
        />
        <div
          className={`w-[3px] bg-amber-600 rounded-xs ${
            isPlaying ? "audio-bar" : "h-1"
          }`}
          style={{ height: isPlaying ? undefined : "4px" }}
        />
        <div
          className={`w-[3px] bg-amber-700 rounded-xs ${
            isPlaying ? "audio-bar" : "h-1"
          }`}
          style={{ height: isPlaying ? undefined : "4px" }}
        />
        <div
          className={`w-[3px] bg-accent rounded-xs ${
            isPlaying ? "audio-bar" : "h-1"
          }`}
          style={{ height: isPlaying ? undefined : "4px" }}
        />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest hidden md:inline select-none">
        {isPlaying ? "Synth: On" : "Synth: Off"}
      </span>
    </button>
  );
}
