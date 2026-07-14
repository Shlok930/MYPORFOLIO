"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { name: "Email", value: "shlokpan930@gmail.com", link: "mailto:shlokpan930@gmail.com", icon: Mail, color: "hover:text-accent" },
    { name: "GitHub", value: "@Shlok930", link: personalInfo.github, icon: FaGithub, color: "hover:text-white" },
    { name: "LinkedIn", value: "Shlok Pandey", link: personalInfo.linkedin, icon: FaLinkedin, color: "hover:text-accent" },
    { name: "Instagram", value: "@itz_shlokkk", link: "https://www.instagram.com/itz_shlokkk/", icon: FaInstagram, color: "hover:text-rose-500" },
    { name: "Twitter/X", value: "@Shlok_ify", link: personalInfo.twitter, icon: FaTwitter, color: "hover:text-accent-cyan" },
  ];

  return (
    <section id="contact" className="py-36 md:py-48 relative w-full overflow-hidden">
      {/* Background highlight glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full filter blur-[120px] pointer-events-none" />

      {/* site-container padding and layout */}
      <div className="site-container relative z-10 w-full flex flex-col gap-16">
        
        {/* Title header */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">[ Connect ]</span>
          <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tight text-foreground leading-[0.98]">
            Get In <span className="font-serif italic text-zinc-500/90 font-normal">Touch.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Social details list */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-sans font-extrabold text-foreground tracking-tight">Let's build something epic</h3>
              <p className="text-zinc-400 text-base leading-relaxed font-light">
                Whether you're looking to hire a full stack engineer, collaborate on an open-source tool, or discuss AI agent middleware, feel free to reach out. I will respond within 24 hours.
              </p>
            </div>

            {/* Social channels grid */}
            <div className="flex flex-col gap-4">
              {socials.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-5 bg-zinc-950/60 border border-luxury-border/80 rounded-2xl hover:border-accent/20 hover:bg-zinc-950 transition-all group ${s.color}`}
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-6 h-6 text-zinc-400 group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{s.name}</span>
                        <span className="text-base font-sans font-medium text-foreground">{s.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-inherit transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form wrapper */}
          <div className="lg:col-span-7 bg-zinc-950/40 border border-luxury-border rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <h3 className="text-lg font-sans font-bold text-foreground">Send a secure message</h3>

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      disabled={loading}
                      className="bg-zinc-950/80 text-foreground placeholder-zinc-650 text-base rounded-xl px-4.5 py-4 outline-hidden border border-luxury-border/85 focus:border-accent/40 transition-colors"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-zinc-550 font-mono uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. johndoe@gmail.com"
                      disabled={loading}
                      className="bg-zinc-950/80 text-foreground placeholder-zinc-650 text-base rounded-xl px-4.5 py-4 outline-hidden border border-luxury-border/85 focus:border-accent/40 transition-colors"
                      required
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-zinc-555 font-mono uppercase tracking-wider">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can Shlok help you?"
                      disabled={loading}
                      rows={5}
                      className="bg-zinc-950/80 text-foreground placeholder-zinc-650 text-base rounded-xl px-4.5 py-4 outline-hidden border border-luxury-border/85 focus:border-accent/40 transition-colors resize-none"
                      required
                    />
                  </div>

                  {error && <span className="text-xs text-red-500 font-mono">{error}</span>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-4 px-5 rounded-xl bg-white text-black font-sans font-bold text-sm tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 outline-hidden cursor-pointer"
                    data-cursor="pointer"
                  >
                    {loading ? (
                      <span className="font-mono text-zinc-500 animate-pulse lowercase">Transmitting bytes...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 gap-5"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-sans font-bold text-foreground">Message Transmitted</h3>
                    <p className="text-base text-zinc-400 max-w-sm leading-relaxed font-light">
                      Thank you! Your payload was sent securely. Shlok will process it and reach out shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-sm text-zinc-500 hover:text-white underline font-mono cursor-pointer outline-hidden"
                    data-cursor="pointer"
                  >
                    Send another packet
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
