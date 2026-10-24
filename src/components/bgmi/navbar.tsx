"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "./bgmi-data";
import { LanguageSelect, useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "border-border/80 bg-background/95 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-white/10 bg-background/75 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Main navigation" className="flex min-h-16 items-center justify-between gap-3 pb-2 pt-[calc(env(safe-area-inset-top)+0.5rem)]">
          <Link href="#top" onClick={closeMenu} className="group flex min-w-0 shrink-0 items-center gap-2.5">
            <img
              src="/images/logo.png"
              alt="BGMI Mythic Rewards"
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-gold/40"
            />
            <span className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-display text-sm font-extrabold tracking-[0.12em] sm:text-base">
                <span className="text-gold">BGMI</span> REWARDS
              </span>
              <span className="hidden text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                Free mythic rewards
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSelect />
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSelect className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-card/80 text-foreground transition hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-border/60 bg-background/95 transition-[max-height,opacity] duration-200 xl:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6">
          <div className="grid gap-1 sm:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {t(link.label)}
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-border/60 pt-3 sm:hidden">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("Language")}
            </div>
            <LanguageSelect className="w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
