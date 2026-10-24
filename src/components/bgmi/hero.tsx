"use client";

import { motion } from "framer-motion";
import { ArrowDown, Flame, Gift, Shield, Sparkles } from "lucide-react";
import { ClaimButton } from "./claim-button";
import { useLanguage } from "@/lib/i18n";

const badges = [
  { icon: Flame, label: "Mythic Drops", value: "24 / Day" },
  { icon: Shield, label: "Max Upgrades", value: "Lv.7 / Lv.7" },
  { icon: Gift, label: "Free Items", value: "All 0 UC" },
  { icon: Sparkles, label: "Total Skins", value: "23" },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src="/images/hero-bg.png" alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />
        <div className="absolute inset-0 bg-grid opacity-20 mask-fade-b" />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-foreground">{t("THE BEST OF")}</span>
            <span className="mt-2 block bg-gradient-to-r from-gold via-ember to-sky-300 bg-clip-text text-transparent">
              {t("BATTLEGROUNDS MOBILE INDIA")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200/80 sm:text-lg"
          >
            {t("Maxed-out gun skins, the legendary X-Suit, the cursed Mummy Suit, mythic vehicles and a Conqueror-tier loadout — all in one vault.")}
          </motion.p>

          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <ClaimButton
              item={{ id: "hero-arsenal", name: "Mythic Arsenal Pass", type: "suit" }}
              label={t("Claim FREE Arsenal")}
              className="h-12 w-full px-5 text-sm sm:w-auto sm:px-6 sm:text-base"
            />
            <ClaimButton
              item={{ id: "hero-xsuit", name: "X-Suit", type: "suit" }}
              label={t("Claim FREE X-Suit")}
              variant="outline"
              className="h-12 w-full px-5 sm:w-auto sm:px-6"
            />
          </div>

          <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
            <span>{t("100% FREE · 0 UC needed · Claim & Get")}</span>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
            {badges.map((badge) => (
              <div key={badge.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-3 backdrop-blur-md sm:p-3.5">
                <badge.icon className="h-4 w-4 text-gold" />
                <div className="mt-2 font-display text-base font-bold text-foreground sm:text-lg">{badge.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t(badge.label)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[27rem] lg:block">
          <div className="absolute -inset-8 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] border border-gold/20" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-800/70 to-background/90 p-3 shadow-2xl shadow-black/40">
            <img src="/images/skin-pharaoh-xsuit.png" alt="Pharaoh themed X-Suit" loading="lazy" decoding="async" className="h-full w-full rounded-[1.5rem] object-cover object-top" />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-background/85 p-4 backdrop-blur-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Featured outfit</div>
                  <div className="mt-1 font-display text-xl font-bold">Pharaoh X-Suit</div>
                </div>
                <span className="shrink-0 rounded-full border border-mythic/40 bg-mythic/15 px-3 py-1 text-xs font-semibold text-mythic">Mythic · Lv.7</span>
              </div>
            </div>
          </div>
          <div className="absolute -left-8 top-16 rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-lg">
            <div className="text-xs text-muted-foreground">{t("Max Upgrades")}</div>
            <div className="mt-0.5 font-display text-lg font-bold text-gold">7 / 7</div>
          </div>
          <a href="#arsenal" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-200/75 transition hover:text-gold">
            {t("Explore the vault")} <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
