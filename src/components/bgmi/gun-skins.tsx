"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Crosshair,
  Eye,
  Gauge,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  gunSkins,
  rarityMeta,
  type Rarity,
} from "./bgmi-data";
import { ClaimButton } from "./claim-button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const filters: { key: Rarity | "all"; label: string }[] = [
  { key: "all", label: "All Drops" },
  { key: "mythic", label: "Mythic" },
  { key: "legendary", label: "Legendary" },
];

function StatBar({
  icon: Icon,
  label,
  value,
  max,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="font-mono font-semibold text-foreground">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary/70 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

function SkinPreviewButton({ name, weapon, image }: { name: string; weapon: string; image: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-border/70 bg-card/60 hover:border-gold/40">
          <Eye className="mr-1.5 h-4 w-4 text-gold" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-gold/30 bg-card/95 backdrop-blur-xl">
        <DialogTitle className="pr-8 font-display">
          {name} <span className="text-muted-foreground">({weapon})</span>
        </DialogTitle>
        <div className="grid h-[min(70vh,42rem)] place-items-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-secondary/60 to-background/80 p-3 sm:p-6">
          <img
            src={image}
            alt={`${name} ${weapon} skin preview`}
            className="max-h-full max-w-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GunSkins() {
  const [filter, setFilter] = useState<Rarity | "all">("all");
  const { t } = useLanguage();

  const list = useMemo(
    () =>
      filter === "all"
        ? gunSkins
        : gunSkins.filter((g) => g.rarity === filter),
    [filter]
  );

  return (
    <section id="arsenal" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              <Crosshair className="h-3.5 w-3.5" />
              {t("MYTHIC ARSENAL")}
            </div>
            <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-5xl">
              {t("Maxed-Out")}{" "}
              <span className="bg-gradient-to-r from-gold via-ember to-mythic bg-clip-text text-transparent">
                {t("Gun Skins")}
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("Every weapon below is fully upgraded to its maximum tier, with mythic-level finishers, kill effects, and exclusive muzzle flares.")}</p>
          </div>

          {/* filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-xs font-semibold border transition ${
                  filter === f.key
                    ? "bg-gold text-background border-gold shadow-[0_0_24px_-6px_oklch(0.62_0.2_38/0.8)]"
                    : "bg-card/60 text-muted-foreground border-border/60 hover:text-foreground hover:border-gold/40"
                }`}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g, i) => {
            const r = rarityMeta[g.rarity];
            return (
              <motion.article
                key={g.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className={`group relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-gold/40 transition ${r.glow}`}
              >
                {/* glow bg */}
                <div
                  className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${
                    g.rarity === "mythic"
                      ? "from-mythic/15 via-transparent to-ember/15"
                      : "from-legendary/15 via-transparent to-gold/15"
                  } opacity-0 group-hover:opacity-100 transition`}
                />

                {/* image */}
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-background/60" />
                  <img
                    src={g.image}
                    alt={`${g.name} ${g.weapon}`}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain p-6 transition duration-500 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`clip-tag inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${r.chip}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {r.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 rounded-md border border-border/60 bg-background/70 backdrop-blur px-2 py-1 text-[10px] font-mono text-muted-foreground">
                    {g.weapon}
                  </div>
                  {/* upgrade level */}
                  <div className="absolute bottom-3 inset-x-3">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground uppercase tracking-wider">
                        {t("Upgrade Lv.")}
                      </span>
                      <span className="font-mono font-bold text-gold">
                        {g.upgrades}/{g.maxUpgrades} MAX
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: g.maxUpgrades }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 flex-1 rounded-full ${
                            idx < g.upgrades
                              ? "bg-gradient-to-r from-gold to-ember"
                              : "bg-secondary/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* body */}
                <div className="relative p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">
                        {g.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{t(g.tier)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {t("Price")}
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {g.price}
                      </div>
                    </div>
                  </div>

                  {/* stats */}
                  <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
                    <StatBar
                      icon={Crosshair}
                      label={t("Damage")}
                      value={g.damage}
                      max={110}
                      color="bg-gradient-to-r from-ember to-mythic"
                    />
                    <StatBar
                      icon={Gauge}
                      label={t("Range")}
                      value={g.range}
                      max={100}
                      color="bg-gradient-to-r from-gold to-ember"
                    />
                    <StatBar
                      icon={TrendingUp}
                      label={t("Recoil")}
                      value={100 - g.recoil}
                      max={100}
                      color="bg-gradient-to-r from-rare to-epic"
                    />
                    <StatBar
                      icon={Layers}
                      label={t("Capacity")}
                      value={g.capacity}
                      max={50}
                      color="bg-gradient-to-r from-epic to-mythic"
                    />
                  </div>

                  {/* effect */}
                  <div className="mt-4 rounded-lg border border-border/60 bg-background/40 p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold font-semibold">
                      <Sparkles className="h-3 w-3" />
                      Kill Effect · Lv.{g.upgrades}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {t(g.effect)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <ClaimButton
                      item={{ id: g.id, name: `${g.name} (${g.weapon})`, type: "gun" }}
                      label={t("Claim FREE")}
                      variant="compact"
                      className="flex-1"
                    />
                    <SkinPreviewButton name={g.name} weapon={g.weapon} image={g.image} />
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
