"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Stars } from "lucide-react";
import { CrateOpenModal } from "./crate-open-modal";
import { useLanguage } from "@/lib/i18n";

const odds = [
  { tier: "Mythic", pct: 1.2, color: "from-mythic to-ember" },
  { tier: "Legendary", pct: 8.5, color: "from-legendary to-gold" },
  { tier: "Epic", pct: 27, color: "from-epic to-mythic" },
  { tier: "Rare", pct: 63.3, color: "from-rare to-epic" },
];

export function CrateCTA() {
  const { t } = useLanguage();
  const [crateOpen, setCrateOpen] = useState(false);
  const [crateCount, setCrateCount] = useState(1);

  const openCrate = (count: number) => {
    setCrateCount(count);
    setCrateOpen(true);
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-25 mask-fade-b" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Crate visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-md"
          >
            <div className="relative aspect-square">
              {/* rotating ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/25 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-dashed border-ember/25 animate-spin-slow" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-12 rounded-full bg-gold/10 blur-2xl animate-pulse-glow" />
              <img
                src="/images/crate.png"
                alt="Mythic loot crate"
                className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain animate-float drop-shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
              />
              {/* floating sparkles */}
              {[
                { top: "8%", left: "10%" },
                { top: "18%", right: "12%", left: "auto" },
                { bottom: "12%", left: "8%" },
                { bottom: "20%", right: "10%", left: "auto" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
                  className="absolute"
                  style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
                >
                  <Stars className="h-4 w-4 text-gold" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              <Gift className="h-3.5 w-3.5" />
              {t("MYTHIC CRATE · LIVE NOW")}
            </div>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-5xl leading-[1.05]">
              {t("Open the")}{" "}
              <span className="bg-gradient-to-r from-gold via-ember to-mythic bg-clip-text text-transparent text-glow-gold">
                {t("Mythic Crate")}
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("A guaranteed mythic pull within 10 opens. Every crate can drop an X-Suit shard, Mummy Suit bandage, or a maxed legendary gun skin.")}
            </p>

            {/* odds */}
            <div className="mt-7 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-semibold">
                <Sparkles className="h-4 w-4" />
                {t("Drop Rates")}
              </div>
              {odds.map((o, i) => (
                <motion.div
                  key={o.tier}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold">{t(o.tier)}</span>
                    <span className="font-mono text-muted-foreground">
                      {o.pct}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/70 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${o.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.07 }}
                      className={`h-full rounded-full bg-gradient-to-r ${o.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openCrate(1)}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 text-base rounded-md bg-gradient-to-r from-gold via-ember to-mythic text-background font-bold border-0 hover:brightness-110 hover:shadow-[0_0_40px_-6px_oklch(0.62_0.2_38/0.85)] transition cursor-pointer"
              >
                <Gift className="h-5 w-5" />
                {t("Open Crate FREE")}
              </button>
              <button
                onClick={() => openCrate(10)}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md border border-border/80 bg-card/40 hover:border-gold/40 hover:bg-card/70 transition cursor-pointer font-semibold"
              >
                <Sparkles className="h-5 w-5 text-gold" />
                {t("Open x10 FREE")}
              </button>
            </div>
            <p className="mt-3 text-xs text-emerald-400 font-semibold">{t("No UC required; both crates are completely free.")}</p>
          </motion.div>
        </div>
      </div>

      <CrateOpenModal
        open={crateOpen}
        onClose={() => setCrateOpen(false)}
        count={crateCount}
      />
    </section>
  );
}
