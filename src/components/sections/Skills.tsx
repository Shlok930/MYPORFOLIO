"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/portfolioData";
import { FaReact, FaNodeJs, FaPython, FaGithub, FaDocker, FaAws } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiThreedotjs, SiFastapi, SiMongodb, SiFirebase, SiPostman, SiVercel, SiChainlink } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { IconType } from "react-icons";

// Map string keys to React Icons
const iconMap: Record<string, IconType> = {
  FaReact,
  TbBrandNextjs,
  SiTypescript,
  SiTailwindcss,
  FiWind,
  SiThreedotjs,
  FaNodeJs,
  SiFastapi,
  FaPython,
  BiLogoPostgresql,
  SiMongodb,
  SiFirebase,
  FaGithub,
  FaDocker,
  SiPostman,
  SiVercel,
  FaAws,
  GiBrain,
  MdOutlineSettingsSuggest,
  SiChainlink,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative w-full overflow-hidden">
      {/* Background neon glow elements */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full filter blur-[120px] pointer-events-none" />

      {/* site-container padding and layout */}
      <div className="site-container relative z-10 w-full flex flex-col gap-16">
        
        {/* Title header */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">[ Capabilities ]</span>
          <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tight text-foreground leading-[0.98]">
            Technical competence - <span className="font-serif italic text-zinc-500/90 font-normal">built on core standards.</span>
          </h2>
        </div>

        {/* Skills grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="glass-panel border border-luxury-border rounded-2xl p-6 flex flex-col gap-6"
            >
              <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                {category.title}
              </h3>

              <div className="flex flex-col gap-5">
                {category.skills.map((skill, skillIdx) => {
                  const IconComponent = iconMap[skill.icon] || FaReact;
                  
                  return (
                    <div key={skillIdx} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs md:text-sm font-mono">
                        <div className="flex items-center gap-2 text-zinc-300 font-medium">
                          <IconComponent className="w-4.5 h-4.5 text-accent" />
                          <span>{skill.name}</span>
                        </div>
                        <span className="text-zinc-500">{skill.percentage}%</span>
                      </div>

                      {/* Animated Glow Progress Bar */}
                      <div className="w-full h-2 bg-zinc-950/80 rounded-full overflow-hidden border border-luxury-border/30 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-accent to-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.35)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
