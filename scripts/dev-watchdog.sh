#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[watchdog] starting dev..."
  bun run dev
  echo "[watchdog] dev exited (rc=$?), restarting in 3s..."
  sleep 3
done
