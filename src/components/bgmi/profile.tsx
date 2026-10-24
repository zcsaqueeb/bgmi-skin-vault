"use client";

import { motion } from "framer-motion";
import { Crown, Flame, Medal, TrendingUp, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { playerStats } from "./bgmi-data";

const leaderboard = [
  { rank: 1, name: "ScoutOP", tier: "Conqueror", points: "8,940", you: false },
  { rank: 2, name: "Mortal", tier: "Conqueror", points: "8,210", you: false },
  { rank: 3, name: "Dynamo", tier: "Conqueror", points: "7,790", you: false },
  { rank: 4, name: "You · GhostOps", tier: "Conqueror", points: "6,842", you: true },
  { rank: 5, name: "Jonathan", tier: "Ace Dominator", points: "6,510", you: false },
  { rank: 6, name: "ClutchGod", tier: "Ace Dominator", points: "6,120", you: false },
];

const trendColor: Record<string, string> = {
  up: "text-emerald-400",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

export function Profile() {
  return (
    <section id="profile" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Player card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-gold via-ember to-mythic p-[2px]">
                    <div className="h-full w-full rounded-2xl bg-card grid place-items-center">
                      <span className="font-display font-extrabold text-2xl text-gold">
                        G
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 grid place-items-center h-7 w-7 rounded-full bg-background border-2 border-gold">
                    <Crown className="h-3.5 w-3.5 text-gold" />
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
                    Conqueror · #4 India
                  </div>
                  <h3 className="mt-1 font-display font-extrabold text-2xl">
                    GhostOps
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Squad · TPP · Season C6S20
                  </p>
                </div>
              </div>

              {/* tier progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">
                    Conqueror Retention
                  </span>
                  <span className="font-mono font-bold text-gold">82%</span>
                </div>
                <Progress value={82} className="h-2 bg-secondary/70" />
                <p className="mt-2 text-[11px] text-muted-foreground">
                  412 points above the Conqueror cut-off. Next milestone:{" "}
                  <span className="text-foreground font-semibold">Top 1</span>.
                </p>
              </div>

              {/* quick stats */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  { icon: Flame, label: "Streak", value: "17W" },
                  { icon: Trophy, label: "Wins", value: "491" },
                  { icon: Medal, label: "MVP", value: "318" },
                ].map((q) => (
                  <div
                    key={q.label}
                    className="rounded-xl border border-border/60 bg-background/40 p-3 text-center"
                  >
                    <q.icon className="h-4 w-4 text-gold mx-auto" />
                    <div className="mt-1 font-display font-bold text-lg">
                      {q.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {q.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 grid sm:grid-cols-2 gap-4"
          >
            {playerStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-5 hover:border-gold/40 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="mt-1 font-display font-extrabold text-3xl">
                      {s.value}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${trendColor[s.trend]}`}
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                    {s.delta}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-border/70">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" />
              <h3 className="font-display font-bold text-lg">India Leaderboard</h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Season C6S20
            </span>
          </div>
          <div className="divide-y divide-border/60">
            {leaderboard.map((row) => (
              <div
                key={row.rank}
                className={`flex items-center gap-4 px-5 py-3.5 transition ${
                  row.you
                    ? "bg-gold/10 border-l-2 border-gold"
                    : "hover:bg-secondary/40"
                }`}
              >
                <div
                  className={`grid place-items-center h-9 w-9 rounded-lg font-display font-bold ${
                    row.rank === 1
                      ? "bg-gold text-background"
                      : row.rank === 2
                        ? "bg-legendary/20 text-legendary"
                        : row.rank === 3
                          ? "bg-ember/20 text-ember"
                          : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {row.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold truncate">{row.name}</span>
                    {row.you && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold border border-gold/40 rounded px-1.5 py-0.5">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{row.tier}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-gold">
                    {row.points}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
