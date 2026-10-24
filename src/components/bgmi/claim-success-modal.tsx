"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Gift,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClaimSuccessModalProps {
  open: boolean;
  onClose: () => void;
  itemName: string;
  itemType: "gun" | "suit" | "vehicle";
}

export function ClaimSuccessModal({
  open,
  onClose,
  itemName,
  itemType,
}: ClaimSuccessModalProps) {
  const [phase, setPhase] = useState<"burst" | "content">("burst");

  useEffect(() => {
    if (open) {
      setPhase("burst");
      const t = setTimeout(() => setPhase("content"), 900);
      return () => clearTimeout(t);
    }
  }, [open]);

  const typeIcon =
    itemType === "gun" ? "🔫" : itemType === "suit" ? "🦾" : "🚗";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md overflow-hidden border-gold/40 bg-card/95 backdrop-blur-xl p-0 [&>button]:hidden">
        {/* Accessibility: required DialogTitle (visually hidden) */}
        <DialogTitle className="sr-only">
          Claim Successful — {itemName}
        </DialogTitle>
        <div className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
          {/* ambient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[100px]" />
            <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-mythic/15 blur-3xl" />
          </div>

          <AnimatePresence mode="wait">
            {/* BURST phase — radial explosion + sparkles */}
            {phase === "burst" && (
              <motion.div
                key="burst"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 grid place-items-center"
              >
                {/* expanding gold ring */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 8, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute h-24 w-24 rounded-full border-4 border-gold"
                />
                {/* second expanding ring */}
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 6, opacity: 0 }}
                  transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
                  className="absolute h-24 w-24 rounded-full border-2 border-emerald-400"
                />
                {/* center glow flash */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-gold via-ember to-mythic blur-xl"
                />
                {/* light rays */}
                <motion.div
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 120, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9 }}
                  className="absolute h-72 w-72"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-36 w-1 origin-top bg-gradient-to-b from-gold/70 to-transparent"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    />
                  ))}
                </motion.div>
                {/* sparkle particles */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((i / 24) * Math.PI * 2) * (80 + Math.random() * 60),
                      y: Math.sin((i / 24) * Math.PI * 2) * (80 + Math.random() * 60),
                      opacity: 0,
                      scale: 0.2,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.9, delay: i * 0.015, ease: "easeOut" }}
                    className="absolute"
                  >
                    <Star className="h-3 w-3 text-gold" />
                  </motion.div>
                ))}
                {/* center icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                  className="relative z-10 grid place-items-center h-20 w-20 rounded-full bg-gradient-to-br from-gold via-ember to-mythic shadow-[0_0_40px_-5px_oklch(0.62_0.2_38/0.9)]"
                >
                  <CheckCircle2 className="h-10 w-10 text-background" />
                </motion.div>
              </motion.div>
            )}

            {/* CONTENT phase — success message + delivery info */}
            {phase === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full px-8 py-10 text-center"
              >
                {/* floating sparkle accents */}
                <motion.div
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute left-6 top-10"
                >
                  <Sparkles className="h-4 w-4 text-gold" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute right-6 top-12"
                >
                  <Star className="h-3 w-3 text-gold" />
                </motion.div>

                {/* success badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="mx-auto grid place-items-center h-20 w-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 mb-5 shadow-[0_0_30px_-5px_oklch(0.72_0.19_150/0.6)]"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </motion.div>

                {/* title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-3"
                >
                  <Gift className="h-3 w-3" />
                  Claim Successful
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display font-extrabold text-3xl bg-gradient-to-r from-gold via-ember to-mythic bg-clip-text text-transparent"
                >
                  Claimed!
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-4 py-2.5"
                >
                  <span className="text-2xl">{typeIcon}</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Item
                    </div>
                    <div className="font-semibold text-sm">{itemName}</div>
                  </div>
                </motion.div>

                {/* delivery message — animated */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 relative rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 overflow-hidden"
                >
                  <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-400/20 blur-2xl animate-pulse-glow" />
                  <div className="relative flex items-start gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="grid place-items-center h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0"
                    >
                      <Zap className="h-5 w-5" />
                    </motion.div>
                    <div className="text-left">
                      <div className="font-semibold text-emerald-400 text-sm">
                        Delivery Scheduled
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        Deliver this item to the player&apos;s in-game mail
                        within{" "}
                        <span className="font-bold text-emerald-400">24h</span>.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* progress bar animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5"
                >
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
                    <span>Processing</span>
                    <span className="text-emerald-400 font-semibold">Done</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary/70 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-gold"
                    />
                  </div>
                </motion.div>

                {/* close button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  onClick={onClose}
                  className="mt-7 w-full h-11 rounded-lg bg-gradient-to-r from-gold via-ember to-mythic text-background font-bold text-sm hover:brightness-110 transition shadow-[0_0_30px_-6px_oklch(0.62_0.2_38/0.85)]"
                >
                  Awesome!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
