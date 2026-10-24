"use client";

import { navLinks } from "./bgmi-data";
import { useLanguage } from "@/lib/i18n";

interface FooterLink {
  label: string;
  href: string;
}
interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    title: "Arsenal",
    links: [
      { label: "Mythic Gun Skins", href: "#arsenal" },
      { label: "Legendary Upgrades", href: "#arsenal" },
      { label: "Kill Effects", href: "#arsenal" },
      { label: "Finishers", href: "#arsenal" },
    ],
  },
  {
    title: "Suits",
    links: [
      { label: "X-Suit", href: "#x-suit" },
      { label: "Mummy Suit", href: "#mummy-suit" },
      { label: "Pharaoh Conqueror", href: "#suits" },
      { label: "Cyber Samurai", href: "#suits" },
    ],
  },
  {
    title: "Garage",
    links: [
      { label: "Dragon Emperor Car", href: "#vehicles" },
      { label: "Voltage Surge Bike", href: "#vehicles" },
      { label: "Skyfall Phoenix", href: "#vehicles" },
      { label: "Plane Skins", href: "#vehicles" },
    ],
  },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-auto border-t border-gold/15 bg-card/40 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.png"
                alt="BGMI Mythic Rewards"
                className="h-9 w-9 rounded-lg ring-1 ring-gold/40"
              />
              <div className="leading-none">
                <div className="font-display font-extrabold tracking-tight">
                  <span className="text-gold text-glow-gold">BGMI</span>{" "}
                  <span className="text-foreground">REWARDS</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground mt-0.5">
                  {t("MYTHIC ARSENAL")}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">{t("A curated Battlegrounds Mobile India collection of mythic gun skins, signature outfits, and vehicles.")}</p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="font-display font-bold text-sm text-foreground">
                  {t(c.title)}
                </h4>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground hover:text-gold transition-colors"
                      >
                        {t(l.label)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              {t(l.label)}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
