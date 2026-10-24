"use client";

import { LogOut, ShieldCheck, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-store";
import { toast } from "sonner";

function GmailAvatar({ email }: { email: string }) {
  const initial = email.charAt(0).toUpperCase();
  return (
    <span className="grid place-items-center h-full w-full rounded-full bg-gradient-to-br from-[#EA4335] via-[#FBBC05] to-[#34A853] text-white text-xs font-bold">
      {initial}
    </span>
  );
}

function XAvatar({ email }: { email: string }) {
  const initial = email.charAt(0).toUpperCase();
  return (
    <span className="grid place-items-center h-full w-full rounded-full bg-foreground text-background text-xs font-bold">
      {initial}
    </span>
  );
}

function FBAvatar({ email }: { email: string }) {
  const initial = email.charAt(0).toUpperCase();
  return (
    <span className="grid place-items-center h-full w-full rounded-full bg-[#1877F2] text-white text-xs font-bold">
      {initial}
    </span>
  );
}

export function UserBadge() {
  const { account, player, claimed, logout } = useAuth();

  if (!account) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => useAuth.getState().openLogin()}
        className="border-gold/40 bg-card/60 text-foreground hover:border-gold/70 hover:bg-card"
      >
        <ShieldCheck className="h-4 w-4 mr-1.5 text-gold" />
        Login
      </Button>
    );
  }

  const Avatar =
    account.provider === "gmail"
      ? GmailAvatar
      : account.provider === "facebook"
        ? FBAvatar
        : XAvatar;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border/70 bg-card/60 pl-1 pr-3 py-1 hover:border-gold/40 transition">
          <span className="h-7 w-7 rounded-full overflow-hidden ring-1 ring-gold/30">
            <Avatar email={account.email} />
          </span>
          <span className="hidden sm:flex flex-col items-start leading-none">
            <span className="text-xs font-semibold">{player ? account.displayName : "Operator"}</span>
            <span className="text-[10px] text-muted-foreground">
              {player ? `Lv.${player.level}` : account.email}
            </span>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 bg-card/95 backdrop-blur-xl border-gold/20"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">{account.displayName}</span>
            <span className="text-xs text-muted-foreground">{account.email}</span>
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">
              <Star className="h-3 w-3" />
              {claimed.length} items claimed
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {player && (
          <>
            <DropdownMenuItem className="flex items-center justify-between">
              <span className="text-muted-foreground">IGN</span>
              <span className="font-medium">{account.displayName}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <span className="text-muted-foreground">Level</span>
              <span className="font-medium">{player.level}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <span className="text-muted-foreground">UID</span>
              <span className="font-mono">{player.uid}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-mono">+{player.number}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={() => {
            logout();
            toast("Logged out");
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
