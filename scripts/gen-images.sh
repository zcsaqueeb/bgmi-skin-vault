#!/bin/bash
# Generate each image as an isolated, timeout-bounded process so a hang
# never blocks the rest. Skips already-generated images.
cd /home/z/my-project
LOG=gen-images.log
: > "$LOG"

# name|size|prompt  (prompts kept short to avoid shell-escaping issues)
read -r -d '' SPEC <<'EOF' || true
logo.png|1024x1024|Premium battle royale esports logo, bold emblem with stylized helmet visor and crossed rifles, metallic gold and orange gradient with crimson red accents, glowing neon outline, dark background, ultra detailed vector style, 4k
hero-bg.png|1344x768|Epic battle royale battlefield at dusk, parachutes dropping from a military plane in a dramatic orange and red sky, armored soldiers in tactical gear with glowing mythic weapons, explosions and smoke in distance, cinematic wide shot, AAA game splash art, volumetric lighting, 4k
x-suit.png|768x1344|Mythic futuristic X-Suit battle armor character skin, sleek black and gold powered exoskeleton with glowing orange energy lines, intimidating full helmet with glowing visor, tactical cape, standing hero pose, dark studio background, dramatic rim lighting, ultra detailed AAA game character render, 4k
mummy-suit.png|768x1344|Mythic mummy suit character skin, ancient Egyptian mummy warrior with glowing golden bandages, ornate pharaoh mask with blue and gold ornaments, mystical green energy aura, holding a mythic weapon, dark tomb background with torches, ultra detailed AAA game character render, cinematic, 4k
gun-akm.png|1024x1024|Legendary mythic AKM assault rifle skin, golden dragon engravings coiling around the barrel, glowing red and orange ember effects, premium metallic finish, floating on dark background with particle effects, ultra detailed game weapon render, 4k studio shot
gun-m416.png|1024x1024|Legendary mythic M416 assault rifle skin, icy blue crystal design with frost effects, glowing cyan energy core, ornate silver and sapphire details, floating on dark background with ice particles, ultra detailed game weapon render, 4k studio shot
gun-awm.png|1024x1024|Legendary mythic AWM sniper rifle skin, purple and gold phoenix design with flame effects, glowing magenta energy, ornate engravings, floating on dark background with fire particles, ultra detailed game weapon render, 4k studio shot
gun-kar98k.png|1024x1024|Legendary mythic Kar98k sniper rifle skin, emerald green and gold leaf design with nature energy, glowing green core, ornate vine engravings, floating on dark background with leaf particles, ultra detailed game weapon render, 4k studio shot
gun-ump45.png|1024x1024|Legendary mythic UMP45 submachine gun skin, neon cyberpunk design with electric blue and pink, glowing circuit patterns, futuristic metallic finish, floating on dark background with electric particles, ultra detailed game weapon render, 4k studio shot
gun-groza.png|1024x1024|Legendary mythic Groza assault rifle skin, crimson red and black obsidian design with lava cracks, glowing orange magma core, ornate demonic engravings, floating on dark background with ember particles, ultra detailed game weapon render, 4k studio shot
gun-dp28.png|1024x1024|Legendary mythic DP28 light machine gun skin, golden phoenix design with fire wings, glowing yellow energy, ornate asian style engravings, floating on dark background with gold particles, ultra detailed game weapon render, 4k studio shot
suit-pharaoh.png|768x1344|Mythic Pharaoh conqueror suit character skin, golden armored warrior king with Egyptian ornaments, glowing blue eye mask, ornate gold and turquoise armor, holding a glowing staff, dark background with hieroglyphs, ultra detailed AAA game character render, 4k
suit-cyber.png|768x1344|Mythic cyber samurai suit character skin, sleek black tech armor with neon blue and purple glow, LED visor, futuristic katana on back, neon city background, ultra detailed AAA game character render, cinematic, 4k
vehicle-car.png|1024x1024|Mythic sports car skin for battle royale game, sleek supercar with golden dragon body paint, glowing orange energy trim, premium metallic finish with flames, dark background with particle effects, ultra detailed game vehicle render, 4k studio shot
vehicle-bike.png|1024x1024|Mythic motorcycle skin for battle royale game, futuristic sport bike with neon cyan and purple glow, glowing energy wheels, premium design, dark background with electric particles, ultra detailed game vehicle render, 4k studio shot
plane.png|1344x768|Mythic battle royale plane skin, military cargo plane with golden phoenix livery, glowing orange accents, flying through dramatic sunset sky with parachutes dropping, ultra detailed game render, cinematic, 4k
crate.png|1024x1024|Premium mythic loot crate for battle royale game, ornate golden chest with glowing orange runes, intricate engravings, energy particles rising, dark background, ultra detailed game render, 4k studio shot
EOF

TOTAL=$(echo "$SPEC" | grep -c .)
i=0
echo "$SPEC" | while IFS='|' read -r name size prompt; do
  i=$((i+1))
  out="public/images/$name"
  if [ -f "$out" ] && [ "$(stat -c%s "$out" 2>/dev/null)" -gt 5000 ]; then
    echo "[skip] ($i/$TOTAL) $name exists" | tee -a "$LOG"
    continue
  fi
  echo "[gen] ($i/$TOTAL) $name $size" | tee -a "$LOG"
  # timeout 150s per image; if it hangs, kill and continue
  timeout 150 bun -e '
    const [name, size, prompt] = process.argv.slice(2);
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const fs = await import("fs");
    const zai = await ZAI.create();
    const resp = await zai.images.generations.create({ prompt, size });
    const buf = Buffer.from(resp.data[0].base64, "base64");
    fs.writeFileSync("public/images/" + name, buf);
    console.log("[ok ] " + name + " " + (buf.length/1024).toFixed(0) + "KB");
  ' "$name" "$size" "$prompt" 2>>"$LOG" >>"$LOG"
  rc=$?
  if [ $rc -ne 0 ]; then
    echo "[err] $name exit=$rc (timeout/fail), will retry once" | tee -a "$LOG"
    sleep 5
    timeout 150 bun -e '
      const [name, size, prompt] = process.argv.slice(2);
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const fs = await import("fs");
      const zai = await ZAI.create();
      const resp = await zai.images.generations.create({ prompt, size });
      const buf = Buffer.from(resp.data[0].base64, "base64");
      fs.writeFileSync("public/images/" + name, buf);
      console.log("[ok ] (retry) " + name + " " + (buf.length/1024).toFixed(0) + "KB");
    ' "$name" "$size" "$prompt" 2>>"$LOG" >>"$LOG" || echo "[fail] $name gave up" | tee -a "$LOG"
  fi
  sleep 3
done
echo "[done] generation pass complete" | tee -a "$LOG"
