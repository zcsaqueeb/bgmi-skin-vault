@echo off
chcp 65001 >nul 2>&1
title BGMI Vault - One Click Install ^& Run
color 0E

REM ============================================================
REM  BGMI VAULT - ONE CLICK INSTALL & RUN (Windows)
REM  Double-click this file to set up everything and launch
REM ============================================================

cd /d "%~dp0"

echo.
echo  ============================================================
echo   BGMI VAULT  -  One Click Install ^& Run
echo  ============================================================
echo.
echo  This will:
echo    1. Check for Bun (install if missing)
echo    2. Install project dependencies
echo    3. Set up the database
echo    4. Start the dev server
echo    5. Open your browser
echo.
echo  Press any key to begin, or close this window to cancel.
echo.
pause >nul

REM ---- Step 1: Check for Bun ----
echo  [1/5] Checking for Bun runtime...
where bun >nul 2>&1
if %errorlevel%==0 (
    echo       Bun found: 
    bun -v
    goto :INSTALL_DEPS
)

echo       Bun not found. Installing Bun...
echo.
echo  ============================================================
echo   Bun is required to run BGMI Vault.
echo.
echo   Option A (recommended): Install Bun via PowerShell
echo     - A PowerShell window will open
echo     - Run:  irm bun.sh/install.ps1 ^| iex
echo     - Close it and re-run this file
echo.
echo   Option B: Install via npm (if Node.js installed)
echo     - Run:  npm install -g bun
echo.
echo   Option C: Download from https://bun.sh
echo  ============================================================
echo.
echo  Opening https://bun.sh for download...
start "" "https://bun.sh"
echo.
echo  After installing Bun, run this file again.
pause
exit /b 1

:INSTALL_DEPS
echo.
echo  [2/5] Installing project dependencies...
echo       (This may take 1-2 minutes on first run)
call bun install
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: Failed to install dependencies.
    pause
    exit /b 1
)
echo       Done.

REM ---- Step 3: Database setup ----
echo.
echo  [3/5] Setting up database...
call bun run db:push
if %errorlevel% neq 0 (
    echo       Warning: DB setup had an issue. Continuing anyway.
) else (
    echo       Database ready.
)

REM ---- Step 4: Start dev server ----
echo.
echo  [4/5] Starting BGMI Vault dev server...
echo.
echo  ============================================================
echo   BGMI Vault is starting...
echo.
echo   The app will open in your browser at:
echo     http://localhost:3000
echo.
echo   Keep this window open while using the app.
echo   Press Ctrl+C in this window to stop the server.
echo  ============================================================
echo.

REM ---- Step 5: Open browser after server starts ----
start "" cmd /c "timeout /t 6 /nobreak >nul && start http://localhost:3000"

REM ---- Run the dev server (this blocks) ----
call bun run dev

echo.
echo  Server stopped. Press any key to close.
pause >nul
