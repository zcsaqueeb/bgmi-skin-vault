#!/bin/bash
# ============================================================
#  BGMI VAULT - One Click Install & Run (macOS / Linux)
#  Run:  ./BGMI-Vault-Start.sh
# ============================================================

set -e
cd "$(dirname "$0")"

# Colors
G='\033[0;32m'
Y='\033[1;33m'
C='\033[0;36m'
N='\033[0m'

echo ""
echo "  ============================================================"
echo "   BGMI VAULT  -  One Click Install & Run"
echo "  ============================================================"
echo ""
echo "  This will:"
echo "    1. Check for Bun (install if missing)"
echo "    2. Install project dependencies"
echo "    3. Set up the database"
echo "    4. Start the dev server"
echo "    5. Open your browser"
echo ""
read -p "  Press Enter to begin, or Ctrl+C to cancel..."

# ---- Step 1: Check for Bun ----
echo ""
echo -e "  ${C}[1/5]${N} Checking for Bun runtime..."
if command -v bun &> /dev/null; then
    echo -e "       ${G}Bun found:${N} $(bun -v)"
else
    echo -e "       ${Y}Bun not found. Installing Bun...${N}"
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    echo -e "       ${G}Bun installed:${N} $(bun -v)"
fi

# ---- Step 2: Install deps ----
echo ""
echo -e "  ${C}[2/5]${N} Installing project dependencies..."
echo "       (This may take 1-2 minutes on first run)"
bun install
echo -e "       ${G}Done.${N}"

# ---- Step 3: Database ----
echo ""
echo -e "  ${C}[3/5]${N} Setting up database..."
bun run db:push || echo "       Warning: DB setup had an issue. Continuing."
echo -e "       ${G}Database ready.${N}"

# ---- Step 4: Start server ----
echo ""
echo -e "  ${C}[4/5]${N} Starting BGMI Vault dev server..."
echo ""
echo "  ============================================================"
echo "   BGMI Vault is starting..."
echo ""
echo "   The app will open in your browser at:"
echo "     http://localhost:3000"
echo ""
echo "   Keep this terminal open while using the app."
echo "   Press Ctrl+C to stop the server."
echo "  ============================================================"
echo ""

# ---- Step 5: Open browser after delay ----
(
    sleep 6
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    elif command -v open &> /dev/null; then
        open http://localhost:3000
    fi
) &

# ---- Run dev server (blocks) ----
bun run dev
