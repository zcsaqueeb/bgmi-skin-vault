"use client";

import { motion } from "framer-motion";
import { Cpu, Crown, Sparkles, Zap } from "lucide-react";
import { rarityMeta } from "./bgmi-data";
import { ClaimButton } from "./claim-button";
import { useLanguage } from "@/lib/i18n";

const evolution = [
  { lv: "Lv.1", title: "Awakened", desc: "Base exosuit activates X-Core glow." },
  { lv: "Lv.3", title: "Charged", desc: "Cape unfurls, energy lines intensify." },
  { lv: "Lv.5", title: "Overdrive", desc: "Full battle mode, dual energy cores online." },
  { lv: "Lv.7", title: "Apex", desc: "Cinematic finisher unlocked — 'Final Verdict'." },
];

export function XSuit() {
  const { t } = useLanguage();
  const r = rarityMeta.mythic;
  return (
    <section id="x-suit" className="relative py-20 sm:py-28 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-mythic/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative mx-auto max-w-md aspect-[4/5]">
              {/* hex / frame */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-gold/30 via-transparent to-mythic/20 blur-xl" />
              <div className="absolute inset-2 rounded-[1.6rem] border border-gold/30 bg-card/40 backdrop-blur-sm overflow-hidden">
                <img
                  src="/images/skin-pharaoh-xsuit.png"
                  alt="BGMI X-Suit"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover animate-float-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* corner accents */}
              <div className="absolute top-0 left-0 h-10 w-10 border-l-2 border-t-2 border-gold rounded-tl-[1.6rem]" />
              <div className="absolute top-0 right-0 h-10 w-10 border-r-2 border-t-2 border-gold rounded-tr-[1.6rem]" />
              <div className="absolute bottom-0 left-0 h-10 w-10 border-l-2 border-b-2 border-gold rounded-bl-[1.6rem]" />
              <div className="absolute bottom-0 right-0 h-10 w-10 border-r-2 border-b-2 border-gold rounded-br-[1.6rem]" />

              {/* floating chips */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-1/4 rounded-xl border border-gold/40 bg-background/85 backdrop-blur px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-gold" />
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      {t("Core")}
                    </div>
                    <div className="text-xs font-bold">X-Core</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 bottom-1/4 rounded-xl border border-mythic/40 bg-background/85 backdrop-blur px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-mythic" />
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      Mode
                    </div>
                    <div className="text-xs font-bold">Overdrive</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-mythic/40 bg-mythic/10 px-3 py-1 text-xs font-semibold text-mythic">
              <Crown className="h-3.5 w-3.5" />
              {t("THE FLAGSHIP MYTHIC SUIT")}
            </div>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-4xl sm:text-6xl leading-[1.05]">
              {t("The")}{" "}
              <span className="bg-gradient-to-r from-gold via-ember to-mythic bg-clip-text text-transparent text-glow-gold">
                {t("X-Suit")}
              </span>
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {t("Apex Operator · Lucky Spin Exclusive")}
            </p>
            <p className="mt-5 text-muted-foreground leading-relaxed">{t("A powered exosuit with shifting energy cores and a five-stage evolution that ends in a cinematic finisher.")}</p>

            {/* evolution track */}
            <div className="mt-7 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-semibold">
                <Sparkles className="h-4 w-4" />
                {t("Evolution Track")}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {evolution.map((e, i) => (
                  <motion.div
                    key={e.lv}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative rounded-xl border border-border/70 bg-card/50 p-3.5 hover:border-gold/40 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gold">{e.lv}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
                    </div>
                    <div className="mt-1 font-display font-bold">{t(e.title)}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(e.desc)}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ClaimButton
                item={{ id: "x-suit", name: "X-Suit", type: "suit" }}
                label={t("Claim X-Suit FREE")}
                className="h-12 px-6 text-base"
              />
              <ClaimButton
                item={{ id: "x-suit-finisher", name: "X-Suit Finisher", type: "suit" }}
                label={t("View Finisher")}
                variant="outline"
                className="h-12 px-6"
              />
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${r.chip}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Mythic · Maxed Lv.7
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
