"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function AiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Hi! I am Shlok's AI assistant. Ask me anything about his technical projects, skills, or hackathon experiences!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What is Shlok's tech stack?",
    "Tell me about TrustShield",
    "Smart India Hackathon?",
    "How to contact Shlok?",
  ];

  // Automated smart response rules matching questions about Shlok
  const getAiResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("stack") || q.includes("skills") || q.includes("languages") || q.includes("technologies")) {
      return "Shlok is proficient in React, Next.js, TypeScript, Tailwind CSS, GSAP, and Three.js on the frontend. For backend systems, he utilizes Node.js, Express, FastAPI, and Python, paired with PostgreSQL, MongoDB, and Firebase.";
    }
    if (q.includes("trustshield") || q.includes("wallet") || q.includes("ethereum") || q.includes("security")) {
      return "TrustShield is an AI-powered Ethereum Wallet Security Platform built with Next.js and Etherscan APIs. It performs wallet risk assessment, contract verification, and active allowance monitoring. Check it out in the Projects section!";
    }
    if (q.includes("hackathon") || q.includes("rake") || q.includes("smart india")) {
      return "Shlok participated in the Smart India Hackathon where his team built the AI Rake Optimizer Platform—a logistics route planner using NetworkX and FastAPI to solve NP-hard rail routing problems under capacity constraints.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
      return "You can contact Shlok via email at shlokpan930@gmail.com, or check out his social links (GitHub, LinkedIn, Instagram, Twitter/X) available at the bottom of the page!";
    }
    if (q.includes("about") || q.includes("who is") || q.includes("background") || q.includes("education")) {
      return "Shlok Pandey is a B.Tech Computer Science student in his 4th semester at the Oriental Institute of Science and Technology, Bhopal. He is passionate about building scalable full-stack applications and integrating intelligent AI pipelines.";
    }
    if (q.includes("healer") || q.includes("api healing") || q.includes("middleware")) {
      return "The Autonomous API Healing Platform is a Node/Express middleware proxy. If an API call fails, the middleware invokes a LangChain agent to diagnose schema discrepancies, adjust parameters, and heal the request in real time.";
    }

    return "That's a great question! Shlok is continuously expanding his engineering skill set. You can ask me about: 'TrustShield', 'API Healer', 'SIH Hackathon', or 'Skills'. Or, feel free to email him directly at shlokpan930@gmail.com!";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAiResponse(text);
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            className="w-[380px] md:w-[410px] h-[550px] md:h-[580px] glass-panel border border-luxury-border rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-5 relative"
          >
            {/* Background grid texture inside chatbot */}
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

            {/* Glowing amber backlight inside chatbot */}
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

            {/* Header - Gradient & glowing borders */}
            <div className="px-6 py-4.5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-accent/20 flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent/15 border border-accent/20">
                  <Bot className="w-5.5 h-5.5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-sans font-black text-white tracking-wide">Shlok's Copilot</h4>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-wider font-bold">Autonomous Agent</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-foreground cursor-pointer outline-hidden p-1.5 hover:bg-zinc-900/60 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar text-sm font-sans z-10 relative"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4.5 py-3.5 rounded-2xl leading-relaxed text-sm md:text-[14px] shadow-md transition-all ${
                      msg.sender === "user"
                        ? "bg-gradient-to-tr from-accent to-amber-600 text-white rounded-tr-none border border-accent/35 font-medium shadow-accent/10"
                        : "bg-zinc-900/80 backdrop-blur-md text-zinc-200 rounded-tl-none border border-luxury-border font-light"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/85 backdrop-blur-md text-zinc-350 rounded-2xl rounded-tl-none border border-luxury-border px-4.5 py-3 flex items-center gap-2.5 shadow-md">
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    <span className="text-xs font-mono text-zinc-400">Typing reply...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-5 py-4 border-t border-luxury-border/30 bg-zinc-950/40 z-10 relative">
                <p className="text-[10px] text-zinc-500 font-mono mb-2 uppercase tracking-wider">Suggested queries:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="text-xs bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-xl border border-luxury-border/80 cursor-pointer transition-all duration-200"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 border-t border-luxury-border bg-zinc-950/80 flex items-center gap-3 z-10 relative"
            >
              <input
                type="text"
                placeholder="Ask Shlok's agent..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-zinc-900/90 text-foreground placeholder-zinc-550 rounded-xl px-4.5 py-3 text-sm md:text-[14px] outline-hidden border border-luxury-border/90 focus:border-accent/50 focus:bg-zinc-900 transition-all"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/80 text-white p-3 rounded-xl cursor-pointer transition-all outline-hidden flex items-center justify-center shrink-0"
                data-cursor="pointer"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-accent to-amber-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all outline-hidden cursor-pointer duration-300 relative"
        title="Chat with AI Assistant"
        data-cursor="pointer"
      >
        <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-75 pointer-events-none" />
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
      </button>
    </div>
  );
}
