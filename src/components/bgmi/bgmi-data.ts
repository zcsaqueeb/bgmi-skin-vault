// Centralized BGMI showcase data

export type Rarity = "mythic" | "legendary" | "epic" | "rare";

export const rarityMeta: Record<
  Rarity,
  { label: string; color: string; ring: string; chip: string; glow: string }
> = {
  mythic: {
    label: "Mythic",
    color: "text-mythic",
    ring: "ring-mythic/50",
    chip: "bg-mythic/15 text-mythic border-mythic/40",
    glow: "shadow-[0_0_45px_-5px_oklch(0.66_0.24_350/0.7)]",
  },
  legendary: {
    label: "Legendary",
    color: "text-legendary",
    ring: "ring-legendary/50",
    chip: "bg-legendary/15 text-legendary border-legendary/40",
    glow: "shadow-[0_0_45px_-5px_oklch(0.8_0.17_75/0.7)]",
  },
  epic: {
    label: "Epic",
    color: "text-epic",
    ring: "ring-epic/50",
    chip: "bg-epic/15 text-epic border-epic/40",
    glow: "shadow-[0_0_45px_-5px_oklch(0.62_0.2_300/0.6)]",
  },
  rare: {
    label: "Rare",
    color: "text-rare",
    ring: "ring-rare/50",
    chip: "bg-rare/15 text-rare border-rare/40",
    glow: "shadow-[0_0_45px_-5px_oklch(0.7_0.15_220/0.5)]",
  },
};

export interface GunSkin {
  id: string;
  name: string;
  weapon: string;
  rarity: Rarity;
  image: string;
  tier: string;
  upgrades: number;
  maxUpgrades: number;
  damage: number;
  recoil: number;
  range: number;
  capacity: number;
  effect: string;
  price: string;
  released: string;
}

export const gunSkins: GunSkin[] = [
  {
    id: "akm-dragon",
    name: "Glacier",
    weapon: "AKM",
    rarity: "mythic",
    image: "/images/skin-akm-glacier.png",
    tier: "Mythic (Upgradable)",
    upgrades: 7,
    maxUpgrades: 7,
    damage: 49,
    recoil: 72,
    range: 68,
    capacity: 30,
    effect: "Dragon Ignite — final kills spawn a fire-breathing wyvern animation.",
    price: "FREE",
    released: "Season C6S20",
  },
  {
    id: "m416-glacier",
    name: "Glacier",
    weapon: "M416",
    rarity: "mythic",
    image: "/images/skin-m416-glacier.png",
    tier: "Mythic (Upgradable)",
    upgrades: 7,
    maxUpgrades: 7,
    damage: 43,
    recoil: 38,
    range: 72,
    capacity: 30,
    effect: "Frost Bite — eliminated players shatter into ice shards.",
    price: "FREE",
    released: "Winter Royale",
  },
  {
    id: "awm-phoenix",
    name: "The Fool",
    weapon: "AWM",
    rarity: "mythic",
    image: "/images/skin-awm-fool.png",
    tier: "Mythic (Upgradable)",
    upgrades: 7,
    maxUpgrades: 7,
    damage: 105,
    recoil: 80,
    range: 100,
    capacity: 5,
    effect: "Rebirth — every 3rd kill restores 1 round and ignites the body.",
    price: "FREE",
    released: "Mythic Crate",
  },
  {
    id: "kar98k-emerald",
    name: "Dragon",
    weapon: "Kar98k",
    rarity: "legendary",
    image: "/images/skin-kar98k-dragon.png",
    tier: "Legendary (Upgradable)",
    upgrades: 6,
    maxUpgrades: 6,
    damage: 75,
    recoil: 70,
    range: 96,
    capacity: 5,
    effect: "Venom Bloom — vines sprout on elimination spot for 8s.",
    price: "FREE",
    released: "Forest Crate",
  },
  {
    id: "ump45-cyber",
    name: "The Fool",
    weapon: "UMP45",
    rarity: "legendary",
    image: "/images/skin-ump45-fool.png",
    tier: "Legendary (Upgradable)",
    upgrades: 6,
    maxUpgrades: 6,
    damage: 35,
    recoil: 30,
    range: 58,
    capacity: 25,
    effect: "Overclock — reloads leave a glitch trail behind you.",
    price: "FREE",
    released: "Neon Crate",
  },
  {
    id: "groza-inferno",
    name: "Blood & Bones",
    weapon: "Groza",
    rarity: "mythic",
    image: "/images/skin-groza-blood-bones.png",
    tier: "Mythic (Upgradable)",
    upgrades: 7,
    maxUpgrades: 7,
    damage: 49,
    recoil: 60,
    range: 70,
    capacity: 30,
    effect: "Magma Surge — headshots scorch the ground, slowing enemies.",
    price: "FREE",
    released: "Mythic Crate",
  },
  {
    id: "dp28-phoenix",
    name: "Starfall",
    weapon: "DP-28",
    rarity: "legendary",
    image: "/images/skin-dp28-starfall.png",
    tier: "Legendary (Upgradable)",
    upgrades: 6,
    maxUpgrades: 6,
    damage: 51,
    recoil: 45,
    range: 65,
    capacity: 47,
    effect: "Wing Flap — full-mag kills trigger a golden wing flare.",
    price: "FREE",
    released: "Orient Crate",
  },
  {
    id: "m416-onyx",
    name: "Onyx Sentinel",
    weapon: "M416",
    rarity: "legendary",
    image: "/images/skin-m416-onyx.png",
    tier: "Legendary (Upgradable)",
    upgrades: 6,
    maxUpgrades: 6,
    damage: 43,
    recoil: 36,
    range: 74,
    capacity: 30,
    effect: "Onyx Pulse — a dark energy ripple marks each elimination.",
    price: "FREE",
    released: "Shadow Crate",
  },
  {
    id: "scarlet-edge",
    name: "Scarlet Edge",
    weapon: "SCAR-L",
    rarity: "mythic",
    image: "/images/skin-scarlet-edge.jpg",
    tier: "Mythic (Upgradable)",
    upgrades: 7,
    maxUpgrades: 7,
    damage: 41,
    recoil: 34,
    range: 76,
    capacity: 30,
    effect: "Ember Wake — final eliminations leave a brief trail of sparks.",
    price: "FREE",
    released: "Crimson Crate",
  },
  {
    id: "m762-frostbite",
    name: "Frostbite",
    weapon: "M762",
    rarity: "mythic",
    image: "/images/skin-m762-frostbite.jpg",
    tier: "Mythic (Upgradable)",
    upgrades: 7,
    maxUpgrades: 7,
    damage: 47,
    recoil: 68,
    range: 62,
    capacity: 30,
    effect: "Cold Snap — eliminations burst into a ring of ice shards.",
    price: "FREE",
    released: "Frost Crate",
  },
  {
    id: "ace32-solar-flare",
    name: "Solar Flare",
    weapon: "ACE32",
    rarity: "legendary",
    image: "/images/skin-ace32-solar-flare.jpg",
    tier: "Legendary (Upgradable)",
    upgrades: 6,
    maxUpgrades: 6,
    damage: 43,
    recoil: 56,
    range: 70,
    capacity: 30,
    effect: "Sunburst — a warm flare pulses on each reload.",
    price: "FREE",
    released: "Solar Crate",
  },
  {
    id: "aug-neon-pulse",
    name: "Neon Pulse",
    weapon: "AUG",
    rarity: "epic",
    image: "/images/skin-aug-neon-pulse.jpg",
    tier: "Epic",
    upgrades: 0,
    maxUpgrades: 0,
    damage: 41,
    recoil: 32,
    range: 72,
    capacity: 30,
    effect: "Pulse Trace — the sights glow with a soft cyan shimmer.",
    price: "FREE",
    released: "Neon Crate",
  },
  {
    id: "mini14-crimson-raven",
    name: "Crimson Raven",
    weapon: "Mini14",
    rarity: "legendary",
    image: "/images/skin-mini14-crimson-raven.jpg",
    tier: "Legendary",
    upgrades: 0,
    maxUpgrades: 0,
    damage: 46,
    recoil: 28,
    range: 88,
    capacity: 20,
    effect: "Raven Mark — a feathered crimson emblem flashes on hit.",
    price: "FREE",
    released: "Raven Crate",
  },
];

export interface Suit {
  id: string;
  name: string;
  tag: string;
  rarity: Rarity;
  image: string;
  description: string;
  abilities: { label: string; value: string }[];
  price: string;
  accent: string;
}

export const suits: Suit[] = [
  {
    id: "x-suit",
    name: "X-Suit",
    tag: "Apex Operator",
    rarity: "mythic",
    image: "/images/skin-pharaoh-xsuit.png",
    description:
      "The pinnacle of BGMI battle wear. A self-powered exoskeleton forged from experimental alloys, the X-Suit shifts its energy signature in combat — switching between Aggressive and Stealth cores on the fly.",
    abilities: [
      { label: "Core", value: "Adaptive X-Core" },
      { label: "Armor", value: "Tier-4 Composite" },
      { label: "Emote", value: "Exclusive 5-stage Evolution" },
      { label: "Finish", value: "Cinematic Takedown" },
    ],
    price: "FREE — Claim Now",
    accent: "from-gold/30 via-ember/20 to-transparent",
  },
  {
    id: "mummy-suit",
    name: "Mummy Suit",
    tag: "Cursed Pharaoh",
    rarity: "mythic",
    image: "/images/skin-golden-pharaoh.png",
    description:
      "Awoken from a sealed tomb, the Mummy Suit wraps its bearer in golden bandages that pulse with cursed energy. Each elimination re-weaves the bandages and intensifies the green aura.",
    abilities: [
      { label: "Core", value: "Curse of Anubis" },
      { label: "Aura", value: "Soulflame (Lv.7 max)" },
      { label: "Emote", value: "Sandstorm Arrival" },
      { label: "Finish", value: "Mummify Takedown" },
    ],
    price: "FREE — Claim Now",
    accent: "from-mythic/30 via-epic/20 to-transparent",
  },
  {
    id: "pharaoh-suit",
    name: "Pharaoh Conqueror",
    tag: "Ruler of Sands",
    rarity: "legendary",
    image: "/images/skin-pharaoh-xsuit.png",
    description:
      "Clad in gold and turquoise, the Pharaoh Conqueror commands the desert. Hieroglyph runes glow brighter with every zone shrink.",
    abilities: [
      { label: "Core", value: "Sun Disc" },
      { label: "Aura", value: "Hieroglyph Flame" },
      { label: "Emote", value: "Throne of Ra" },
      { label: "Finish", value: "Sand Tomb Takedown" },
    ],
    price: "FREE — Claim Now",
    accent: "from-legendary/30 via-gold/20 to-transparent",
  },
  {
    id: "cyber-suit",
    name: "Blood Raven",
    tag: "Raven Reaper",
    rarity: "legendary",
    image: "/images/skin-blood-raven-xsuit.png",
    description:
      "A wandering ronin reborn in chrome and neon. The Cyber Samurai's katana glows with circuit-bound plasma, slicing through the final zone in silence.",
    abilities: [
      { label: "Core", value: "Plasma Katana" },
      { label: "Aura", value: "Neon Drift" },
      { label: "Emote", value: "Iaido Stance" },
      { label: "Finish", value: "Blade Rush Takedown" },
    ],
    price: "FREE — Claim Now",
    accent: "from-rare/30 via-epic/20 to-transparent",
  },
  {
    id: "celestial-vanguard-x-suit",
    name: "Celestial Vanguard X-Suit",
    tag: "Skyfire Guardian",
    rarity: "mythic",
    image: "/images/x-suit-celestial-vanguard.jpg",
    description:
      "A radiant exosuit built around a sky-blue X-Core. Its gold-edged armor brightens through each evolution and culminates in a celestial arrival effect.",
    abilities: [
      { label: "Core", value: "Celestial X-Core" },
      { label: "Armor", value: "Aetherguard Alloy" },
      { label: "Emote", value: "Wings of Dawn" },
      { label: "Finish", value: "Skyfire Descent" },
    ],
    price: "FREE",
    accent: "from-sky-400/30 via-gold/20 to-transparent",
  },
  {
    id: "inferno-warden-x-suit",
    name: "Inferno Warden X-Suit",
    tag: "Forge Sentinel",
    rarity: "mythic",
    image: "/images/x-suit-inferno-warden.jpg",
    description:
      "Forged around a molten reactor, the Inferno Warden channels ember energy through black steel plating. Its final evolution leaves a blazing forge sigil.",
    abilities: [
      { label: "Core", value: "Ember Reactor" },
      { label: "Armor", value: "Obsidian Forgeplate" },
      { label: "Emote", value: "Rite of the Forge" },
      { label: "Finish", value: "Cinderfall" },
    ],
    price: "FREE",
    accent: "from-orange-500/30 via-ember/20 to-transparent",
  },
  {
    id: "void-ranger-x-suit",
    name: "Void Ranger X-Suit",
    tag: "Eclipse Stalker",
    rarity: "mythic",
    image: "/images/x-suit-void-ranger.jpg",
    description:
      "A stealth exosuit tuned to the violet spectrum. Its layered armor gathers void energy as it evolves, ending with a brief eclipse-like arrival effect.",
    abilities: [
      { label: "Core", value: "Void X-Core" },
      { label: "Armor", value: "Eclipse Weave" },
      { label: "Emote", value: "Silent Orbit" },
      { label: "Finish", value: "Eventide Strike" },
    ],
    price: "FREE",
    accent: "from-violet-500/30 via-indigo-500/20 to-transparent",
  },
];

export interface VehicleSkin {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  image: string;
  topSpeed: string;
  effect: string;
  price: string;
}

export const vehicles: VehicleSkin[] = [
  {
    id: "car-dragon",
    name: "Dacia Gold Plate",
    type: "Sports Car (Dacia / Coupe)",
    rarity: "mythic",
    image: "/images/skin-dacia-gold.png",
    topSpeed: "142 km/h",
    effect: "Leaves a molten dragon trail that burns pursuers.",
    price: "FREE",
  },
  {
    id: "bike-neon",
    name: "Voltage Surge",
    type: "Motorcycle",
    rarity: "legendary",
    image: "/images/skin-neon-bike.png",
    topSpeed: "168 km/h",
    effect: "EMP pulse disables nearby vehicle HUDs on honk.",
    price: "FREE",
  },
  {
    id: "plane-phoenix",
    name: "Skyfall Phoenix",
    type: "Plane Skin",
    rarity: "mythic",
    image: "/images/plane.webp",
    topSpeed: "Mach 0.8",
    effect: "Golden feather trail follows every parachuting player.",
    price: "FREE",
  },
];

export interface StatItem {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
}

export const playerStats: StatItem[] = [
  { label: "Current Tier", value: "Conqueror", delta: "Top 0.04%", trend: "up" },
  { label: "Season Points", value: "6,842", delta: "+312 today", trend: "up" },
  { label: "KD Ratio", value: "9.74", delta: "+0.42", trend: "up" },
  { label: "Win Rate", value: "38.2%", delta: "+1.8%", trend: "up" },
  { label: "Matches", value: "1,284", delta: "+24", trend: "up" },
  { label: "Chicken Dinners", value: "491", delta: "+9", trend: "up" },
];

export const navLinks = [
  { label: "Arsenal", href: "#arsenal" },
  { label: "X-Suit", href: "#x-suit" },
  { label: "Mummy Suit", href: "#mummy-suit" },
  { label: "Suits", href: "#suits" },
  { label: "Vehicles", href: "#vehicles" },
];
