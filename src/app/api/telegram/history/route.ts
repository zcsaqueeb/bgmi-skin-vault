import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/telegram/history?limit=100&offset=0
 * Returns full paginated claim history.
 */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const limit = Math.min(Number(sp.get("limit") || "50"), 200);
    const offset = Math.max(Number(sp.get("offset") || "0"), 0);

    const [claims, total] = await Promise.all([
      db.claim.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.claim.count(),
    ]);

    return NextResponse.json({
      ok: true,
      total,
      limit,
      offset,
      hasMore: offset + claims.length < total,
      claims,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "server error" },
      { status: 500 }
    );
  }
}
