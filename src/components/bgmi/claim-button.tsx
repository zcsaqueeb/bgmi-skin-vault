"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Loader2, Send, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-store";

interface Props {
  item: { id: string; name: string; type: "gun" | "suit" | "vehicle" };
  label?: string;
  variant?: "primary" | "outline" | "compact";
  className?: string;
}

export function ClaimButton({
  item,
  label = "Claim FREE",
  variant = "primary",
  className = "",
}: Props) {
  const { handleAction } = useAuth();
  const [sending, setSending] = useState(false);

  const onClick = async () => {
    if (sending) return;
    // No login session is saved — always open the login modal
    // (provider selection + credentials form → sends to Telegram).
    // Users can claim unlimited times — no "Claimed" state.
    handleAction(item);
  };

  // The button element (varies by variant)
  let button: ReactNode = null;
  if (variant === "compact") {
    button = (
      <Button
        onClick={onClick}
        size="sm"
        disabled={sending}
        className={`bg-gradient-to-r from-gold to-ember text-background font-semibold border-0 hover:brightness-110 disabled:opacity-70 ${className}`}
      >
        {sending ? (
          <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
        ) : (
          <Send className="h-3.5 w-3.5 mr-1" />
        )}
        {sending ? "Sending..." : label}
      </Button>
    );
  } else if (variant === "outline") {
    button = (
      <Button
        onClick={onClick}
        variant="outline"
        disabled={sending}
        className={`border-border/70 bg-card/60 hover:border-gold/40 disabled:opacity-70 ${className}`}
      >
        {sending ? (
          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4 mr-1.5 text-gold" />
        )}
        {sending ? "Sending..." : label}
      </Button>
    );
  } else {
    button = (
      <Button
        onClick={onClick}
        disabled={sending}
        className={`bg-gradient-to-r from-gold via-ember to-mythic text-background font-bold border-0 hover:brightness-110 hover:shadow-[0_0_30px_-6px_oklch(0.62_0.2_38/0.85)] disabled:opacity-70 ${className}`}
      >
        {sending ? (
          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
        ) : (
          <Zap className="h-4 w-4 mr-1.5" />
        )}
        {sending ? "Claiming..." : label}
      </Button>
    );
  }

  return (
    <>{button}</>
  );
}
