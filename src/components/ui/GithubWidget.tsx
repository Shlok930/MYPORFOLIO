"use client";

import { useEffect, useState, useMemo } from "react";
import { Star, GitCommit, Eye, Users, Code2 } from "lucide-react";
import { visitorCounterInitial } from "@/data/portfolioData";

// Seeded pseudo-random so SSR and client always produce the same grid (no hydration mismatch)
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const CONTRIBUTION_GRID = Array.from({ length: 84 }, (_, i) => {
  const r = seededRandom(i);
  return r < 0.45 ? 0 : r < 0.75 ? 1 : r < 0.92 ? 2 : 3;
});

const LEVEL_COLORS = [
  "bg-zinc-900",       // 0 — empty
  "bg-emerald-950",    // 1 — low
  "bg-emerald-800",    // 2 — medium
  "bg-emerald-400",    // 3 — high
];

export default function GithubWidget() {
  const [visitors, setVisitors] = useState(visitorCounterInitial);
  const [githubData, setGithubData] = useState({
    followers: 12,
    publicRepos: 18,
    totalStars: 2,
    bio: "",
    loaded: false,
  });

  useEffect(() => {
    // Visitor counter
    const stored = localStorage.getItem("shlok_portfolio_visitors");
    if (stored) {
      const next = parseInt(stored, 10) + 1;
      localStorage.setItem("shlok_portfolio_visitors", next.toString());
      setVisitors(next);
    } else {
      const init = visitorCounterInitial + 1;
      localStorage.setItem("shlok_portfolio_visitors", init.toString());
      setVisitors(init);
    }

    // Fetch GitHub stats
    const fetchGithubData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/Shlok930");
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const user = await userRes.json();

        const reposRes = await fetch("https://api.github.com/users/Shlok930/repos?per_page=100");
        let totalStars = 2;
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
          bio: user.bio ?? "",
          loaded: true,
        });
      } catch (err) {
        console.error("Github API fetch error:", err);
      }
    };

    fetchGithubData();
  }, []);

  const stats = [
    { label: "Public Repos", value: githubData.loaded ? githubData.publicRepos : "18+", icon: Code2, color: "text-accent" },
    { label: "Stars Earned",  value: githubData.loaded ? githubData.totalStars  : "2",   icon: Star,  color: "text-yellow-500" },
    { label: "Followers",     value: githubData.loaded ? githubData.followers   : "12+", icon: Users, color: "text-purple-400" },
    { label: "Total Visitors",value: visitors.toLocaleString(),                           icon: Eye,   color: "text-cyan-400" },
  ];

  return (
    <div className="glass-panel border border-luxury-border rounded-2xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden">

      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Fixed profile picture */}
          <img
            src="https://kommodo.ai/i/bxL7KPovXJU2QA1XU8qC"
            alt="Shlok Pandey"
            className="w-12 h-12 rounded-full border border-luxury-border object-cover object-top"
          />
          <div>
            <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <span>GitHub Profile &amp; Activity</span>
              {githubData.loaded && (
                <span className="text-[9px] bg-accent/15 text-accent font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live
                </span>
              )}
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              {githubData.loaded && githubData.bio
                ? githubData.bio
                : "Commit frequency and real-time developer metrics fetched directly from API."}
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

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-zinc-950/60 border border-luxury-border/80 rounded-xl p-4 flex flex-col gap-1.5 hover:border-accent/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <span className="text-xl font-display font-bold text-foreground">{s.value}</span>
            </div>
          );
        })}
      </div>

      {/* Contribution Map — static grid, no framer-motion to avoid scroll jank */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
          <span>Contributions (Simulated Grid)</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-2.5 h-2.5 bg-zinc-900 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-emerald-950 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-emerald-800 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
            <span>More</span>
          </div>
        </div>

        <div className="grid grid-flow-col grid-rows-7 gap-1.5 p-3 bg-zinc-950/80 border border-luxury-border/60 rounded-xl overflow-x-auto no-scrollbar">
          {CONTRIBUTION_GRID.map((level, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-sm ${LEVEL_COLORS[level]} hover:brightness-125 transition-all duration-150`}
              title={`${level} contribution${level === 1 ? "" : "s"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
