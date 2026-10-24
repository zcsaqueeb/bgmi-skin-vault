"use client";

import { motion } from "framer-motion";
import {
  Ghost,
  Skull,
  Sparkles,
  Wind,
} from "lucide-react";
import { ClaimButton } from "./claim-button";
import { useLanguage } from "@/lib/i18n";

const curse = [
  { icon: Skull, title: "Curse of Anubis", value: "Each kill re-weaves the bandages +5% aura intensity." },
  { icon: Wind, title: "Sandstorm Arrival", value: "Spawn emote blinds nearby enemies for 1.2s." },
  { icon: Ghost, title: "Mummify Takedown", value: "Finisher wraps the enemy in a sarcophagus." },
  { icon: Sparkles, title: "Soulflame Aura", value: "Lv.7 max — green soulflame trails on sprint." },
];

export function MummySuit() {
  const { t } = useLanguage();
  return (
    <section
      id="mummy-suit"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* tomb ambiance */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-epic/20 blur-[130px]" />
        <div className="absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-mythic/15 blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-20 mask-fade-b" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text first (left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-epic/40 bg-epic/10 px-3 py-1 text-xs font-semibold text-epic">
              <Ghost className="h-3.5 w-3.5" />
              {t("CURSED PHARAOH · TOMB-BOUND")}
            </div>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-4xl sm:text-6xl leading-[1.05]">
              {t("The")}{" "}
              <span className="bg-gradient-to-r from-epic via-mythic to-ember bg-clip-text text-transparent text-glow-ember">
                {t("Mummy Suit")}
              </span>
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {t("Awoken from a sealed tomb")}
            </p>
            <p className="mt-5 text-muted-foreground leading-relaxed">{t("Golden bandages pulse with cursed energy and grow brighter with every elimination, surrounding the final zone in a green soulflame aura.")}</p>

            {/* curse list */}
            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {curse.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group rounded-xl border border-border/70 bg-card/50 p-3.5 hover:border-mythic/40 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-mythic/15 text-mythic group-hover:bg-mythic/25 transition">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div className="font-display font-bold text-sm">{t(c.title)}</div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {t(c.value)}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ClaimButton
                item={{ id: "mummy-suit", name: "Mummy Suit", type: "suit" }}
                label={t("Claim Mummy Suit FREE")}
                className="h-12 px-6 text-base"
              />
              <ClaimButton
                item={{ id: "mummy-suit-aura", name: "Mummy Suit Aura Lv.7", type: "suit" }}
                label={t("Aura Lv.7 MAX")}
                variant="outline"
                className="h-12 px-6"
              />
            </div>
          </motion.div>

          {/* Image (right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md aspect-[4/5]">
              {/* rotating sarcophagus ring */}
              <div className="absolute -inset-6 rounded-full border border-dashed border-mythic/20 animate-spin-slow" />
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-b from-epic/30 via-transparent to-mythic/25 blur-xl" />
              <div className="absolute inset-0 rounded-[2rem] border border-mythic/30 bg-card/40 backdrop-blur-sm overflow-hidden">
                <img
                  src="/images/skin-golden-pharaoh.png"
                  alt="BGMI Mummy Suit"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>

              {/* hieroglyph strip */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-3 top-1/3 rounded-xl border border-mythic/40 bg-background/85 backdrop-blur px-3 py-2 shadow-xl"
              >
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Aura
                </div>
                <div className="text-xs font-bold text-mythic">Soulflame · Lv.7</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 bottom-1/4 rounded-xl border border-ember/40 bg-background/85 backdrop-blur px-3 py-2 shadow-xl"
              >
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Finisher
                </div>
                <div className="text-xs font-bold text-ember">Mummify</div>
              </motion.div>

              {/* corner accents */}
              <div className="absolute top-0 left-0 h-10 w-10 border-l-2 border-t-2 border-mythic rounded-tl-[2rem]" />
              <div className="absolute bottom-0 right-0 h-10 w-10 border-r-2 border-b-2 border-mythic rounded-br-[2rem]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
