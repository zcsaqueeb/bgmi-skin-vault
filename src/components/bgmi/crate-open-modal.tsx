"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { gunSkins, suits, vehicles, rarityMeta, type Rarity } from "./bgmi-data";
import { useAuth } from "./auth-store";

interface Reward {
  id: string;
  name: string;
  type: "gun" | "suit" | "vehicle";
  image: string;
  rarity: Rarity;
  tag: string;
}

// Build reward pool from all items, weighted by rarity
const pool: Reward[] = [
  ...gunSkins.map((g) => ({
    id: g.id,
    name: `${g.name} (${g.weapon})`,
    type: "gun" as const,
    image: g.image,
    rarity: g.rarity,
    tag: g.tier,
  })),
  ...suits.map((s) => ({
    id: s.id,
    name: s.name,
    type: "suit" as const,
    image: s.image,
    rarity: s.rarity,
    tag: s.tag,
  })),
  ...vehicles.map((v) => ({
    id: v.id,
    name: v.name,
    type: "vehicle" as const,
    image: v.image,
    rarity: v.rarity,
    tag: v.type,
  })),
];

// Weighted random pick — mythic rarest
const rarityWeight: Record<Rarity, number> = {
  mythic: 1,
  legendary: 4,
  epic: 12,
  rare: 30,
};

function pickRandomReward(count: number): Reward[] {
  const weighted: { reward: Reward; weight: number }[] = pool.map((r) => ({
    reward: r,
    weight: rarityWeight[r.rarity],
  }));
  const total = weighted.reduce((s, w) => s + w.weight, 0);
  const results: Reward[] = [];
  for (let i = 0; i < count; i++) {
    let rand = Math.random() * total;
    for (const w of weighted) {
      rand -= w.weight;
      if (rand <= 0) {
        results.push(w.reward);
        break;
      }
    }
  }
  return results;
}

type Phase = "dropping" | "impact" | "opening" | "revealed";

interface CrateOpenModalProps {
  open: boolean;
  onClose: () => void;
  count: number; // 1 or 10
}

export function CrateOpenModal({ open, onClose, count }: CrateOpenModalProps) {
  const [phase, setPhase] = useState<Phase>("dropping");
  const [rewards, setRewards] = useState<Reward[]>([]);
  const { handleAction } = useAuth();

  const start = useCallback(() => {
    setPhase("dropping");
    setRewards([]);
    // Pick rewards immediately but reveal after animation
    const picked = pickRandomReward(count);
    // Animation timeline
    // 0ms: crate drops from top
    // 800ms: impact (lands)
    // 1100ms: opening (burst)
    // 1600ms: revealed
    setTimeout(() => setPhase("impact"), 800);
    setTimeout(() => setPhase("opening"), 1150);
    setTimeout(() => {
      setRewards(picked);
      setPhase("revealed");
    }, 1700);
  }, [count]);

  useEffect(() => {
    if (open) start();
  }, [open, start]);

  const close = () => {
    onClose();
    // reset after close animates
    setTimeout(() => {
      setPhase("dropping");
      setRewards([]);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="flex h-[min(80vh,42rem)] max-h-[90vh] flex-col overflow-hidden border-gold/30 bg-card/95 backdrop-blur-xl p-0 max-w-[24rem] sm:max-w-lg">
        {/* Accessibility: required DialogTitle (visually hidden) */}
        <DialogTitle className="sr-only">
          {count === 1 ? "Opening Airdrop" : `Opening ${count} Airdrops`}
        </DialogTitle>
        {/* header strip */}
        <div className="relative h-12 sm:h-14 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/30 via-ember/20 to-mythic/30" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <button
            onClick={close}
            className="absolute right-2.5 top-2.5 grid place-items-center h-7 w-7 rounded-lg border border-border/60 bg-background/60 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="absolute bottom-2 left-4 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="font-display font-bold text-xs sm:text-sm">
              {count === 1 ? "Opening Airdrop" : `Opening ${count} Airdrops`}
            </span>
          </div>
        </div>

        {/* animation + reveal area — compact */}
        <div className={`relative min-h-0 flex-1 flex justify-center overflow-y-auto overflow-x-hidden ${phase === "revealed" ? "items-start" : "items-center"}`}>
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 sm:h-56 sm:w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[80px]" />
          </div>

          <AnimatePresence mode="wait">
            {/* DROPPING — airdrop falls from top */}
            {phase === "dropping" && (
              <motion.div
                key="dropping"
                initial={{ y: -200, opacity: 0, rotate: -8 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeIn" }}
                className="relative z-10"
              >
                <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/40 to-mythic/30 blur-xl animate-pulse-glow" />
                  <img
                    src="/images/crate.png"
                    alt="Airdrop"
                    className="relative h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />
                  {/* parachute lines */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 origin-bottom"
                  >
                    <div className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
                  </motion.div>
                </div>
                <p className="mt-3 text-center text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                  Airdrop incoming...
                </p>
              </motion.div>
            )}

            {/* IMPACT — crate lands, screen shakes */}
            {phase === "impact" && (
              <motion.div
                key="impact"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.15, 0.9, 1.05, 1],
                  y: [0, 6, -3, 2, 0],
                }}
                transition={{ duration: 0.35, times: [0, 0.2, 0.4, 0.6, 1] }}
                className="relative z-10"
              >
                <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                  <div className="absolute inset-0 rounded-2xl bg-gold/40 blur-2xl" />
                  <img
                    src="/images/crate.png"
                    alt="Airdrop"
                    className="relative h-full w-full object-contain"
                  />
                  {/* impact ring */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-full border-4 border-gold"
                  />
                </div>
              </motion.div>
            )}

            {/* OPENING — burst of light + particles */}
            {phase === "opening" && (
              <motion.div
                key="opening"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.3, 1], opacity: [0, 1, 1] }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* expanding burst */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-gradient-to-br from-gold via-ember to-mythic blur-md"
                />
                {/* light rays */}
                <motion.div
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 90, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 m-auto h-48 w-48 sm:h-56 sm:w-56"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-24 w-1 origin-top bg-gradient-to-b from-gold/60 to-transparent"
                      style={{ transform: `rotate(${i * 45}deg)` }}
                    />
                  ))}
                </motion.div>
                {/* sparkles */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: (i % 2 ? 1 : -1) * (30 + Math.random() * 60),
                      y: (Math.random() - 0.5) * 150,
                      opacity: 0,
                      scale: 0.3,
                    }}
                    transition={{ duration: 0.7, delay: i * 0.02 }}
                    className="absolute left-1/2 top-1/2"
                  >
                    <Star className="h-2.5 w-2.5 text-gold" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* REVEALED — show won item(s) */}
            {phase === "revealed" && (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full px-3 sm:px-5 pb-3 pt-1"
              >
                <div className="text-center mb-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-gold uppercase tracking-wider"
                  >
                    <Sparkles className="h-3 w-3" />
                    You Won!
                  </motion.div>
                </div>
                <div className={count > 1 ? "grid grid-cols-5 gap-1.5 max-h-44 overflow-y-auto pr-0.5" : "grid grid-cols-1 gap-2"}>
                  {rewards.map((r, i) => {
                    const meta = rarityMeta[r.rarity];
                    return (
                      <motion.div
                        key={`${r.id}-${i}`}
                        initial={{ opacity: 0, y: 16, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 120 }}
                        className={`relative rounded-lg border bg-card/80 overflow-hidden ${meta.ring} ring-1 ${meta.glow}`}
                      >
                        <div className={`relative ${count === 1 ? "h-[min(42vh,22rem)] w-full" : "aspect-square"}`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-background/60" />
                          <img
                            src={r.image}
                            alt={r.name}
                            className="relative h-full w-full object-contain p-2"
                          />
                          <span
                            className={`absolute top-1 left-1 inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[7px] font-bold uppercase border ${meta.chip}`}
                          >
                            <span className="h-0.5 w-0.5 rounded-full bg-current" />
                            {meta.label}
                          </span>
                        </div>
                        {count === 1 && (
                          <div className="p-1.5">
                            <div className="text-[11px] font-bold leading-tight truncate">
                              {r.name}
                            </div>
                            <div className="text-[8px] text-muted-foreground truncate">
                              {r.tag}
                            </div>
                          </div>
                        )}
                        {count > 1 && (
                          <div className="p-1 text-center text-[8px] font-semibold truncate">
                            {r.name.split(" (")[0]}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer actions — compact */}
        <div className="border-t border-border/60 p-3 sm:p-4 shrink-0 bg-card/95">
          {phase === "revealed" && rewards.length > 0 ? (
            <>
              <p className="mb-2 text-center text-[11px] sm:text-xs text-muted-foreground">
                {rewards.length} item{rewards.length > 1 ? "s" : ""} dropped! Claim
                to receive in your in-game mail within 24h.
              </p>
              <div className="flex flex-col gap-2">
                {/* Claim the best item (first reward) */}
                <ClaimRewardButton reward={rewards[0]} onClaim={handleAction} />
                <Button
                  variant="outline"
                  onClick={close}
                  className="w-full h-9 border-border/70 bg-card/60 hover:border-gold/40 text-sm"
                >
                  Close
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-[11px] sm:text-xs text-muted-foreground">
              {phase === "dropping" && "Airdrop descending to the battlefield..."}
              {phase === "impact" && "Landed! Unlocking..."}
              {phase === "opening" && "Revealing your reward..."}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ClaimRewardButton({
  reward,
  onClaim,
}: {
  reward: Reward;
  onClaim: (item: { id: string; name: string; type: "gun" | "suit" | "vehicle" }) => void;
}) {
  const [sending, setSending] = useState(false);

  const onClick = async () => {
    if (sending) return;
    // No login session is saved — always open the login modal
    // (provider selection + credentials form → sends to Telegram).
    // Users can claim unlimited times — no "Already Claimed" state.
    onClaim({
      id: reward.id,
      name: reward.name,
      type: reward.type,
    });
  };

  return (
    <Button
      onClick={onClick}
      disabled={sending}
      className="w-full h-12 bg-gradient-to-r from-gold via-ember to-mythic text-background font-bold text-base border-0 hover:brightness-110 hover:shadow-[0_0_30px_-6px_oklch(0.62_0.2_38/0.85)]"
    >
      {sending ? (
        <>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="h-3.5 w-3.5 rounded-full border-2 border-background/40 border-t-background"
          />
          Claiming...
        </>
      ) : (
        <>
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          Claim {reward.name.split(" (")[0]}
        </>
      )}
    </Button>
  );
}
