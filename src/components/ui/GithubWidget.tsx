"use client";

import { useEffect, useState } from "react";
import { Star, GitCommit, Eye, Users, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { visitorCounterInitial } from "@/data/portfolioData";

export default function GithubWidget() {
  const [visitors, setVisitors] = useState(visitorCounterInitial);
  const [githubData, setGithubData] = useState({
    followers: 12,
    publicRepos: 18,
    totalStars: 2,
    avatarUrl: "",
    bio: "",
    loaded: false,
  });

  useEffect(() => {
    // Visitor counter logic (simple increment per session/load)
    const stored = localStorage.getItem("shlok_portfolio_visitors");
    let currentVisitors = visitorCounterInitial;
    if (stored) {
      const num = parseInt(stored, 10);
      const nextNum = num + 1;
      localStorage.setItem("shlok_portfolio_visitors", nextNum.toString());
      setVisitors(nextNum);
      currentVisitors = nextNum;
    } else {
      localStorage.setItem("shlok_portfolio_visitors", (visitorCounterInitial + 1).toString());
      setVisitors(visitorCounterInitial + 1);
      currentVisitors = visitorCounterInitial + 1;
    }

    // Fetch actual Github data for Shlok930
    const fetchGithubData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/Shlok930");
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const user = await userRes.json();

        const reposRes = await fetch("https://api.github.com/users/Shlok930/repos?per_page=100");
        let totalStars = 2; // fallback baseline
        if (reposRes.ok) {
          const repos = await reposRes.json();
          if (Array.isArray(repos)) {
            totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
          }
        }

        setGithubData({
          followers: user.followers ?? 12,
          publicRepos: user.public_repos ?? 18,
          totalStars,
          avatarUrl: user.avatar_url ?? "",
          bio: user.bio ?? "",
          loaded: true,
        });
      } catch (err) {
        console.error("Github API fetch error:", err);
      }
    };

    fetchGithubData();
  }, []);

  // Generate mock contribution blocks (12 weeks * 7 days grid)
  const contributionGrid = (() => {
    const grid = [];
    for (let i = 0; i < 84; i++) {
      const r = Math.random();
      const level = r < 0.45 ? 0 : r < 0.75 ? 1 : r < 0.92 ? 2 : 3;
      grid.push(level);
    }
    return grid;
  })();

  const stats = [
    { label: "Public Repos", value: githubData.loaded ? githubData.publicRepos : "18+", icon: Code2, color: "text-accent" },
    { label: "Stars Earned", value: githubData.loaded ? githubData.totalStars : "2", icon: Star, color: "text-yellow-500" },
    { label: "Followers", value: githubData.loaded ? githubData.followers : "12+", icon: Users, color: "text-purple-400" },
    { label: "Total Visitors", value: visitors.toLocaleString(), icon: Eye, color: "text-cyan-400" },
  ];

  return (
    <div className="glass-panel border border-luxury-border rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {githubData.avatarUrl ? (
            <img
              src={githubData.avatarUrl}
              alt="Shlok Pandey"
              className="w-12 h-12 rounded-full border border-luxury-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-luxury-border flex items-center justify-center">
              <Code2 className="w-5 h-5 text-accent" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <span>GitHub Profile & Activity</span>
              {githubData.loaded && <span className="text-[9px] bg-accent/15 text-accent font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>}
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              {githubData.loaded && githubData.bio ? githubData.bio : "Commit frequency and real-time developer metrics fetched directly from API."}
            </p>
          </div>
        </div>
        <a
          href="https://github.com/Shlok930"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-accent border border-accent/30 bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-xl font-mono transition-all inline-flex items-center gap-1.5 w-fit cursor-pointer"
          data-cursor="pointer"
        >
          Follow @Shlok930
        </a>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-zinc-950/60 border border-luxury-border/80 rounded-xl p-4 flex flex-col gap-1.5 hover:border-accent/10 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <span className="text-xl font-display font-bold text-foreground">{s.value}</span>
            </div>
          );
        })}
      </div>

      {/* Contribution Map */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
          <span>Contributions (Real-Time Simulator)</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-2.5 h-2.5 bg-zinc-900 rounded-xs" />
            <div className="w-2.5 h-2.5 bg-emerald-950 rounded-xs" />
            <div className="w-2.5 h-2.5 bg-emerald-800 rounded-xs" />
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" />
            <span>More</span>
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 p-3 bg-zinc-950/80 border border-luxury-border/60 rounded-xl overflow-x-auto no-scrollbar">
          {contributionGrid.map((level, i) => {
            const colors = [
              "bg-zinc-900",          // level 0
              "bg-emerald-950/80",    // level 1
              "bg-emerald-800",       // level 2
              "bg-emerald-400",       // level 3
            ];
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.003 }}
                className={`w-3.5 h-3.5 rounded-sm ${colors[level]} transition-colors duration-150 hover:brightness-125`}
                title={`${level} contribution${level === 1 ? "" : "s"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
