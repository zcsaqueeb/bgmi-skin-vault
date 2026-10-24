@echo off
chcp 65001 >nul 2>&1
title BGMI Vault - Quick Run
color 0E

REM ============================================================
REM  BGMI VAULT - QUICK RUN (Windows)
REM  Use this AFTER the first install (BGMI-Vault-Start.bat)
REM  Just starts the server and opens the browser
REM ============================================================

cd /d "%~dp0"

echo.
echo  ============================================================
echo   BGMI Vault  -  Quick Run
echo  ============================================================
echo.
echo  Starting server... Browser will open shortly.
echo  Keep this window open. Press Ctrl+C to stop.
echo.

start "" cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:3000"
call bun run dev

echo.
echo  Server stopped. Press any key to close.
pause >nul
