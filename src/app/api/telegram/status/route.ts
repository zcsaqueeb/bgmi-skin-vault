import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/telegram/status
 * Returns overall vault delivery stats from the database.
 * (Bot identity / online check is intentionally NOT exposed in the UI.)
 */
export async function GET() {
  try {
    const [total, sent, failed, pending, last] = await Promise.all([
      db.claim.count(),
      db.claim.count({ where: { telegramStatus: "sent" } }),
      db.claim.count({ where: { telegramStatus: "failed" } }),
      db.claim.count({ where: { telegramStatus: "pending" } }),
      db.claim.findFirst({ orderBy: { createdAt: "desc" } }),
    ]);

    return NextResponse.json({
      ok: true,
      stats: {
        total,
        sent,
        failed,
        pending,
        successRate: total > 0 ? ((sent / total) * 100).toFixed(1) + "%" : "0%",
      },
      lastClaim: last
        ? {
            id: last.id,
            itemName: last.itemName,
            playerName: last.playerName,
            status: last.telegramStatus,
            at: last.createdAt,
          }
        : null,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "server error" },
      { status: 500 }
    );
  }
}
