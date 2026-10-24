"use client";

import { motion } from "framer-motion";
import { Car, Gauge, Plane, Sparkles } from "lucide-react";
import { vehicles, rarityMeta } from "./bgmi-data";
import { ClaimButton } from "./claim-button";
import { useLanguage } from "@/lib/i18n";

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  car: Car,
  bike: Car,
  plane: Plane,
};

export function Vehicles() {
  const { t } = useLanguage();
  return (
    <section id="vehicles" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[60rem] -translate-x-1/2 bg-gold/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            <Car className="h-3.5 w-3.5" />
            {t("MYTHIC GARAGE")}
          </div>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-5xl">
            {t("Drive the")}{" "}
            <span className="bg-gradient-to-r from-gold via-ember to-mythic bg-clip-text text-transparent">
              {t("Apex Fleet")}
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("Maxed vehicle skins that turn every Erangel rotation into a flex.")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {vehicles.map((v, i) => {
            const r = rarityMeta[v.rarity];
            const Icon = typeIcon[v.type.split(" ")[0].toLowerCase()] ?? Car;
            return (
              <motion.article
                key={v.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-gold/40 transition"
              >
                {/* image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-background/60" />
                  <img
                    src={v.image}
                    alt={v.name}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain p-4 transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                  <span
                    className={`absolute top-3 left-3 clip-tag inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${r.chip}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {r.label}
                  </span>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-border/60 bg-background/70 backdrop-blur px-2 py-1 text-[10px] font-mono text-gold">
                    <Gauge className="h-3 w-3" />
                    {v.topSpeed}
                  </div>
                </div>

                {/* body */}
                <div className="relative p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid place-items-center h-10 w-10 rounded-xl bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">
                        {v.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{t(v.type)}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-border/60 bg-background/40 p-3">
                    <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(v.effect)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {v.price}
                    </span>
                    <ClaimButton
                      item={{ id: v.id, name: v.name, type: "vehicle" }}
                      label={t("Claim FREE")}
                      variant="compact"
                    />
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
