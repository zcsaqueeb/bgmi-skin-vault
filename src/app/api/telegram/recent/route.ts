import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/telegram/recent?limit=10
 * Returns the N most recent claims.
 */
export async function GET(req: NextRequest) {
  try {
    const limit = Math.min(
      Number(req.nextUrl.searchParams.get("limit") || "10"),
      50
    );
    const claims = await db.claim.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        itemId: true,
        itemName: true,
        itemType: true,
        playerName: true,
        playerLevel: true,
        bgmiUid: true,
        provider: true,
        telegramStatus: true,
        telegramMessageId: true,
        createdAt: true,
        sentAt: true,
      },
    });
    return NextResponse.json({ ok: true, count: claims.length, claims });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "server error" },
      { status: 500 }
    );
  }
}
