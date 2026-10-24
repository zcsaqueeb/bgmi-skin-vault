// BGMI image generation script using z-ai-web-dev-sdk
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/images';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const jobs = [
  {
    name: 'logo.png',
    size: '1024x1024',
    prompt:
      'Premium battle royale esports logo, bold emblem with a stylized helmet visor and crossed rifles, metallic gold and orange gradient with crimson red accents, glowing neon outline, dark background, ultra detailed vector style, game studio quality, cinematic lighting, 4k'
  },
  {
    name: 'hero-bg.png',
    size: '1344x768',
    prompt:
      'Epic battle royale battlefield at dusk, parachutes dropping from a military plane in a dramatic orange and red sky, armored soldiers in tactical gear with glowing mythic weapons, explosions and smoke in distance, cinematic wide shot, ultra detailed, AAA game splash art, volumetric lighting, 4k'
  },
  {
    name: 'x-suit.png',
    size: '768x1344',
    prompt:
      'Mythic futuristic X-Suit battle armor character skin, sleek black and gold powered exoskeleton with glowing orange energy lines, intimidating full helmet with glowing visor, tactical cape, standing hero pose, dark studio background with dramatic rim lighting, ultra detailed AAA game character render, 4k'
  },
  {
    name: 'mummy-suit.png',
    size: '768x1344',
    prompt:
      'Mythic mummy suit character skin, ancient Egyptian mummy warrior with glowing golden bandages, ornate pharaoh mask with blue and gold ornaments, mystical green energy aura, holding a mythic weapon, dark tomb background with torches, ultra detailed AAA game character render, cinematic, 4k'
  },
  {
    name: 'gun-akm.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic AKM assault rifle skin, golden dragon engravings coiling around the barrel, glowing red and orange ember effects, premium metallic finish, floating on dark background with particle effects, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'gun-m416.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic M416 assault rifle skin, icy blue crystal design with frost effects, glowing cyan energy core, ornate silver and sapphire details, floating on dark background with ice particles, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'gun-awm.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic AWM sniper rifle skin, purple and gold phoenix design with flame effects, glowing magenta energy, ornate engravings, floating on dark background with fire particles, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'gun-kar98k.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic Kar98k sniper rifle skin, emerald green and gold leaf design with nature energy, glowing green core, ornate vine engravings, floating on dark background with leaf particles, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'gun-ump45.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic UMP45 submachine gun skin, neon cyberpunk design with electric blue and pink, glowing circuit patterns, futuristic metallic finish, floating on dark background with electric particles, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'gun-groza.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic Groza assault rifle skin, crimson red and black obsidian design with lava cracks, glowing orange magma core, ornate demonic engravings, floating on dark background with ember particles, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'gun-dp28.png',
    size: '1024x1024',
    prompt:
      'Legendary mythic DP28 light machine gun skin, golden phoenix design with fire wings, glowing yellow energy, ornate asian style engravings, floating on dark background with gold particles, ultra detailed game weapon render, 4k studio shot'
  },
  {
    name: 'suit-pharaoh.png',
    size: '768x1344',
    prompt:
      'Mythic Pharaoh conqueror suit character skin, golden armored warrior king with Egyptian ornaments, glowing blue eye mask, ornate gold and turquoise armor, holding a glowing staff, dark background with hieroglyphs, ultra detailed AAA game character render, 4k'
  },
  {
    name: 'suit-cyber.png',
    size: '768x1344',
    prompt:
      'Mythic cyber samurai suit character skin, sleek black tech armor with neon blue and purple glow, LED visor, futuristic katana on back, neon city background, ultra detailed AAA game character render, cinematic, 4k'
  },
  {
    name: 'vehicle-car.png',
    size: '1024x1024',
    prompt:
      'Mythic sports car skin for battle royale game, sleek supercar with golden dragon body paint, glowing orange energy trim, premium metallic finish with flames, dark background with particle effects, ultra detailed game vehicle render, 4k studio shot'
  },
  {
    name: 'vehicle-bike.png',
    size: '1024x1024',
    prompt:
      'Mythic motorcycle skin for battle royale game, futuristic sport bike with neon cyan and purple glow, glowing energy wheels, premium design, dark background with electric particles, ultra detailed game vehicle render, 4k studio shot'
  },
  {
    name: 'plane.png',
    size: '1344x768',
    prompt:
      'Mythic battle royale plane skin, military cargo plane with golden phoenix livery, glowing orange accents, flying through dramatic sunset sky with parachutes dropping, ultra detailed game render, cinematic, 4k'
  },
  {
    name: 'crate.png',
    size: '1024x1024',
    prompt:
      'Premium mythic loot crate for battle royale game, ornate golden chest with glowing orange runes, intricate engravings, energy particles rising, dark background, ultra detailed game render, 4k studio shot'
  }
];

async function run() {
  const zai = await ZAI.create();
  let done = 0;
  const concurrency = 1;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let idx = 0;
  async function worker() {
    while (idx < jobs.length) {
      const myIdx = idx++;
      const job = jobs[myIdx];
      const outPath = path.join(OUT_DIR, job.name);
      if (fs.existsSync(outPath)) {
        console.log(`[skip] ${job.name} already exists`);
        done++;
        continue;
      }
      try {
        console.log(`[gen] (${myIdx + 1}/${jobs.length}) ${job.name} ${job.size}`);
        const resp = await zai.images.generations.create({
          prompt: job.prompt,
          size: job.size
        });
        const b64 = resp.data[0].base64;
        const buf = Buffer.from(b64, 'base64');
        fs.writeFileSync(outPath, buf);
        done++;
        console.log(`[ok ] ${job.name} (${(buf.length / 1024).toFixed(0)} KB)`);
      } catch (e) {
        console.error(`[err] ${job.name}: ${e.message}`);
      }
      await sleep(4000);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log(`DONE. ${done}/${jobs.length} images ready in ${OUT_DIR}`);
}

run().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
