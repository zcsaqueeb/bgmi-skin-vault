"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  History,
  RefreshCw,
  Send,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StatusData {
  ok: boolean;
  stats?: {
    total: number;
    sent: number;
    failed: number;
    pending: number;
    successRate: string;
  };
  lastClaim?: {
    id: string;
    itemName: string;
    playerName: string;
    status: string;
    at: string;
  } | null;
  error?: string;
}

interface ClaimRow {
  id: string;
  itemName: string;
  itemType: string;
  playerName: string;
  playerLevel: string;
  bgmiUid: string;
  provider: string;
  telegramStatus: string;
  telegramMessageId: string | null;
  createdAt: string;
  sentAt: string | null;
}

type Tab = "status" | "recent" | "history";

const statusColor: Record<string, string> = {
  sent: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
  failed: "bg-destructive/15 text-destructive border-destructive/40",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/40",
};

const providerLabel: Record<string, string> = {
  x: "𝕏",
  facebook: "FB",
  gmail: "G",
};

export function TelegramPanel() {
  const [tab, setTab] = useState<Tab>("status");
  const [status, setStatus] = useState<StatusData | null>(null);
  const [recent, setRecent] = useState<ClaimRow[]>([]);
  const [history, setHistory] = useState<ClaimRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/telegram/status", { cache: "no-store" });
      const data = await res.json();
      setStatus(data);
      if (!data.ok) setError(data.error || "Failed to fetch status");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/telegram/recent?limit=10", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.ok) setRecent(data.claims);
      else setError(data.error || "Failed to fetch recent claims");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/telegram/history?limit=50", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.ok) setHistory(data.claims);
      else setError(data.error || "Failed to fetch history");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-load the active tab
  useEffect(() => {
    if (tab === "status") fetchStatus();
    else if (tab === "recent") fetchRecent();
    else fetchHistory();
  }, [tab, fetchStatus, fetchRecent, fetchHistory]);

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-72 w-[50rem] -translate-x-1/2 bg-[#229ED9]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        {/* heading */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#229ED9]/40 bg-[#229ED9]/10 px-3 py-1 text-xs font-semibold text-[#229ED9]">
            <Send className="h-3.5 w-3.5" />
            TELEGRAM COMMAND CENTER
          </div>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl">
            Track Every{" "}
            <span className="bg-gradient-to-r from-[#229ED9] to-gold bg-clip-text text-transparent">
              Delivery
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every claim is pushed live to the Telegram bot. Use the commands
            below to check status, recent deliveries, or full history.
          </p>
        </div>

        {/* command tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {[
            { key: "status" as Tab, label: "/status", icon: Activity, desc: "Bot & delivery stats" },
            { key: "recent" as Tab, label: "/recent", icon: Clock, desc: "Last 10 claims" },
            { key: "history" as Tab, label: "/history", icon: History, desc: "Full claim log" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                tab === t.key
                  ? "border-[#229ED9] bg-[#229ED9]/15 text-[#229ED9]"
                  : "border-border/70 bg-card/60 text-muted-foreground hover:text-foreground hover:border-[#229ED9]/40"
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span className="font-mono">{t.label}</span>
              <span className="hidden sm:inline text-[11px] text-muted-foreground font-normal">
                · {t.desc}
              </span>
            </button>
          ))}
          <Button
            onClick={() => {
              if (tab === "status") fetchStatus();
              else if (tab === "recent") fetchRecent();
              else fetchHistory();
            }}
            variant="outline"
            size="sm"
            disabled={loading}
            className="ml-1 border-border/70 bg-card/60"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-5 sm:p-6 min-h-[280px]"
        >
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* STATUS */}
          {tab === "status" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Claims", value: status?.stats?.total ?? 0, icon: Send },
                  { label: "Delivered", value: status?.stats?.sent ?? 0, icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Failed", value: status?.stats?.failed ?? 0, icon: XCircle, color: "text-destructive" },
                  { label: "Success Rate", value: status?.stats?.successRate ?? "0%", icon: Activity, color: "text-[#229ED9]" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border/60 bg-background/40 p-4"
                  >
                    <s.icon className={`h-4 w-4 ${s.color ?? "text-gold"}`} />
                    <div className="mt-2 font-display font-bold text-2xl">
                      {s.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {status?.lastClaim && (
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Last Claim
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{status.lastClaim.itemName}</div>
                      <div className="text-xs text-muted-foreground">
                        by {status.lastClaim.playerName}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={statusColor[status.lastClaim.status] ?? ""}
                    >
                      {status.lastClaim.status}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RECENT / HISTORY */}
          {(tab === "recent" || tab === "history") && (
            <ClaimList
              rows={tab === "recent" ? recent : history}
              emptyText={
                tab === "recent"
                  ? "No recent claims yet. Claim your first free item above!"
                  : "No claim history yet."
              }
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ClaimList({ rows, emptyText }: { rows: ClaimRow[]; emptyText: string }) {
  if (rows.length === 0) {
    return (
      <div className="grid place-items-center py-12 text-center">
        <History className="h-10 w-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }
  return (
    <ScrollArea className="max-h-96">
      <div className="space-y-2 pr-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 hover:border-gold/40 transition"
          >
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-[#229ED9]/15 text-[#229ED9] text-xs font-bold shrink-0">
              {providerLabel[r.provider] ?? "•"}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{r.itemName}</span>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  · Lv.{r.playerLevel}
                </span>
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {r.playerName} · UID {r.bgmiUid}
              </div>
            </div>
            <div className="text-right shrink-0">
              <Badge
                variant="outline"
                className={statusColor[r.telegramStatus] ?? ""}
              >
                {r.telegramStatus}
              </Badge>
              <div className="mt-1 text-[10px] text-muted-foreground">
                {new Date(r.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
