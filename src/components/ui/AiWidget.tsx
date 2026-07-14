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
    "Smart India Hackathon project?",
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
      return "You can contact Shlok via email at shlokpandey.dev@gmail.com, or check out his social links (GitHub, LinkedIn, Twitter/X) available at the bottom of the page!";
    }
    if (q.includes("about") || q.includes("who is") || q.includes("background") || q.includes("education")) {
      return "Shlok Pandey is a B.Tech Computer Science student in his 4th semester at the Oriental Institute of Science and Technology, Bhopal. He is passionate about building scalable full-stack applications and integrating intelligent AI pipelines.";
    }
    if (q.includes("healer") || q.includes("api healing") || q.includes("middleware")) {
      return "The Autonomous API Healing Platform is a Node/Express middleware proxy. If an API call fails, the middleware invokes a LangChain agent to diagnose schema discrepancies, adjust parameters, and heal the request in real time.";
    }

    return "That's a great question! Shlok is continuously expanding his engineering skill set. You can ask me about: 'TrustShield', 'API Healer', 'SIH Hackathon', or 'Skills'. Or, feel free to email him directly at shlokpandey.dev@gmail.com!";
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
    <div className="fixed bottom-6 right-6 z-[99]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            className="w-[360px] h-[500px] glass-panel border border-luxury-border rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-zinc-950/80 border-b border-luxury-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bot className="w-5 h-5 text-accent" />
                <div>
                  <h4 className="text-sm font-display font-semibold text-foreground">AI Copilot</h4>
                  <span className="text-[10px] text-accent-green font-mono">Agent Active</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-foreground cursor-pointer outline-hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-sm"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-accent/20 text-white rounded-br-none border border-accent/30"
                        : "bg-zinc-900/60 text-zinc-300 rounded-bl-none border border-luxury-border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/60 text-zinc-300 rounded-2xl rounded-bl-none border border-luxury-border px-3.5 py-2.5 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                    <span className="text-xs font-mono text-zinc-400">Typing reply...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-luxury-border/30 bg-zinc-950/20">
                <p className="text-[10px] text-zinc-500 font-mono mb-1.5 uppercase tracking-wider">Suggested queries:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full border border-luxury-border/50 cursor-pointer transition-colors duration-150"
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
              className="p-3 border-t border-luxury-border bg-zinc-950/60 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask something about Shlok..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-zinc-900 text-foreground placeholder-zinc-500 rounded-xl px-3 py-2 text-sm outline-hidden border border-luxury-border/80 focus:border-accent/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/80 text-white p-2 rounded-xl cursor-pointer transition-colors outline-hidden"
                data-cursor="pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-accent to-amber-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all outline-hidden cursor-pointer duration-300"
        title="Chat with AI Assistant"
        data-cursor="pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
