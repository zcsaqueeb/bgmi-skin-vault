"use client";

import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { suits, rarityMeta } from "./bgmi-data";
import { ClaimButton } from "./claim-button";
import { useLanguage } from "@/lib/i18n";

// Exclude X-Suit and Mummy Suit (they have their own sections)
const rest = suits.filter(
  (s) => s.id !== "x-suit" && s.id !== "mummy-suit"
);

export function MoreSuits() {
  const { t } = useLanguage();
  return (
    <section id="suits" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-epic/30 bg-epic/10 px-3 py-1 text-xs font-semibold text-epic">
              <Shirt className="h-3.5 w-3.5" />
              {t("CHARACTER VAULT")}
            </div>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-5xl">
              {t("More")}{" "}
              <span className="bg-gradient-to-r from-legendary via-gold to-ember bg-clip-text text-transparent">
                {t("Mythic Suits")}
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("Beyond the X-Suit and Mummy Suit, meet the rest of the apex-tier roster ready to drop into Erangel.")}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((s, i) => {
            const r = rarityMeta[s.rarity];
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm hover:border-gold/40 transition"
              >
                <div className="grid sm:grid-cols-2">
                  {/* image */}
                  <div className="relative aspect-[4/5] sm:aspect-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-background/60" />
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent sm:bg-gradient-to-r" />
                    <span
                      className={`absolute top-3 left-3 clip-tag inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${r.chip}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {r.label}
                    </span>
                  </div>

                  {/* content */}
                  <div className="p-5 sm:p-6 flex flex-col">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
                      {t(s.tag)}
                    </p>
                    <h3 className="mt-1 font-display font-extrabold text-2xl leading-tight">
                      {t(s.name)}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {t(s.description)}
                    </p>

                    {/* abilities */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {s.abilities.map((a) => (
                        <div
                          key={a.label}
                          className="rounded-lg border border-border/60 bg-background/40 p-2.5"
                        >
                          <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                            {t(a.label)}
                          </div>
                          <div className="text-xs font-semibold text-foreground mt-0.5">
                            {t(a.value)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {t(s.price)}
                      </span>
                      <ClaimButton
                        item={{ id: s.id, name: s.name, type: "suit" }}
                        label={t("Unlock FREE")}
                        variant="compact"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
