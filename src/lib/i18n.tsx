"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type Language = "en" | "hi";
export type LanguagePreference = "auto" | Language;

const hindi: Record<string, string> = {
  "Arsenal": "हथियार",
  "X-Suit": "एक्स-सूट",
  "Mummy Suit": "ममी सूट",
  "Suits": "सूट",
  "Vehicles": "वाहन",
  "Language": "भाषा",
  "Auto (device)": "डिवाइस के अनुसार",
  "English": "अंग्रेज़ी",
  "Hindi": "हिन्दी",
  "MYTHIC ARSENAL": "मिथिक आर्सेनल",
  "Maxed-Out": "मैक्स्ड-आउट",
  "Gun Skins": "गन स्किन्स",
  "All Drops": "सभी ड्रॉप",
  "Mythic": "मिथिक",
  "Legendary": "लेजेंडरी",
  "Epic": "एपिक",
  "Rare": "रेयर",
  "Damage": "डैमेज",
  "Range": "रेंज",
  "Recoil": "रीकॉइल",
  "Capacity": "क्षमता",
  "Upgrade Lv.": "अपग्रेड स्तर",
  "Price": "कीमत",
  "Kill Effect": "किल इफेक्ट",
  "Preview": "प्रीव्यू",
  "Claim FREE": "मुफ़्त पाएं",
  "MYTHIC GARAGE": "मिथिक गैराज",
  "Drive the": "चलाएं",
  "Apex Fleet": "एपेक्स फ्लीट",
  "CHARACTER VAULT": "कैरेक्टर वॉल्ट",
  "More": "और",
  "Mythic Suits": "मिथिक सूट",
  "MYTHIC CRATE · LIVE NOW": "मिथिक क्रेट · अभी उपलब्ध",
  "Open the": "खोलें",
  "Mythic Crate": "मिथिक क्रेट",
  "Drop Rates": "ड्रॉप रेट",
  "Open Crate FREE": "क्रेट मुफ़्त खोलें",
  "Open x10 FREE": "10 क्रेट मुफ़्त खोलें",
  "No UC required — both crates are 100% free.": "UC की ज़रूरत नहीं — दोनों क्रेट पूरी तरह मुफ़्त हैं।",
  "THE BEST OF": "सबसे शानदार",
  "BATTLEGROUNDS MOBILE INDIA": "बैटलग्राउंड्स मोबाइल इंडिया",
  "Mythic Drops": "मिथिक ड्रॉप",
  "Max Upgrades": "अधिकतम अपग्रेड",
  "Free Items": "मुफ़्त आइटम",
  "Total Skins": "कुल स्किन",
  "Claim FREE Arsenal": "आर्सेनल मुफ़्त पाएं",
  "Claim FREE X-Suit": "एक्स-सूट मुफ़्त पाएं",
  "100% FREE · 0 UC needed · Claim & Get": "100% मुफ़्त · UC की ज़रूरत नहीं · अभी पाएं",
  "SEASON C6S20 • MYTHIC VAULT LIVE": "सीज़न C6S20 • मिथिक वॉल्ट लाइव",
  "Maxed-out gun skins, the legendary X-Suit, the cursed Mummy Suit, mythic vehicles and a Conqueror-tier loadout — all in one vault.": "मैक्स्ड-आउट गन स्किन, शानदार एक्स-सूट, ममी सूट, मिथिक वाहन और कॉन्करर-स्तर का लोडआउट — सब एक ही वॉल्ट में।",
  "Every weapon below is fully upgraded to its maximum tier, with mythic-level finishers, kill effects, and exclusive muzzle flares.": "नीचे दिए गए सभी हथियार अधिकतम स्तर तक अपग्रेड हैं, जिनमें मिथिक फिनिशर, किल इफेक्ट और खास मज़ल फ्लेयर हैं।",
  "Maxed vehicle skins that turn every Erangel rotation into a flex.": "मैक्स्ड वाहन स्किन, जो एरंगल के हर रोटेशन को खास बना दें।",
  "Beyond the X-Suit and Mummy Suit, meet the rest of the apex-tier roster ready to drop into Erangel.": "एक्स-सूट और ममी सूट के अलावा, एरंगल में उतरने के लिए तैयार बाकी एपेक्स-स्तर के किरदार देखें।",
  "A guaranteed mythic pull within 10 opens. Every crate can drop an X-Suit shard, Mummy Suit bandage, or a maxed legendary gun skin.": "10 बार खोलने के भीतर एक मिथिक आइटम पक्का। हर क्रेट से एक्स-सूट शार्ड, ममी सूट बैंडेज या मैक्स्ड लेजेंडरी गन स्किन मिल सकती है।",
  "View the collection": "कलेक्शन देखें",
  "Explore the vault": "वॉल्ट देखें",
  "Scroll to explore": "देखने के लिए नीचे जाएं",
  "Current Tier": "मौजूदा टियर",
  "Season Points": "सीज़न पॉइंट",
  "KD Ratio": "KD अनुपात",
  "Win Rate": "जीत दर",
  "Matches": "मैच",
  "Chicken Dinners": "चिकन डिनर",
  "Airdrop incoming...": "एयरड्रॉप आ रहा है...",
  "Claim Successful": "क्लेम सफल",
  "Delivery Scheduled": "डिलीवरी तय",
  "Close": "बंद करें",
  "Apex Operator": "एपेक्स ऑपरेटर",
  "Cursed Pharaoh": "शापित फ़राओ",
  "Ruler of Sands": "रेगिस्तान का शासक",
  "Raven Reaper": "रेवन रीपर",
  "Pharaoh Conqueror": "फ़राओ विजेता",
  "Blood Raven": "ब्लड रेवन",
  "Voltage Surge": "वोल्टेज सर्ज",
  "Skyfall Phoenix": "स्काईफॉल फ़ीनिक्स",
  "Sports Car (Dacia / Coupe)": "स्पोर्ट्स कार (डेसिया / कूपे)",
  "Motorcycle": "मोटरसाइकिल",
  "Plane Skin": "प्लेन स्किन",
  "Mythic (Upgradable)": "मिथिक (अपग्रेड योग्य)",
  "Legendary (Upgradable)": "लेजेंडरी (अपग्रेड योग्य)",
  "Vehicle Skins": "वाहन स्किन",
  "Claim": "पाएं",
  "Featured outfit": "खास पोशाक",
  "THE FLAGSHIP MYTHIC SUIT": "मुख्य मिथिक सूट",
  "Evolution Track": "इवोल्यूशन ट्रैक",
  "Claim X-Suit FREE": "एक्स-सूट मुफ़्त पाएं",
  "View Finisher": "फिनिशर देखें",
  "Apex Operator · Lucky Spin Exclusive": "एपेक्स ऑपरेटर · लकी स्पिन एक्सक्लूसिव",
  "Curse of Anubis": "अनूबिस का श्राप",
  "Sandstorm Arrival": "सैंडस्टॉर्म एंट्री",
  "Mummify Takedown": "ममीफाई टेकडाउन",
  "Soulflame Aura": "सोलफ्लेम ऑरा",
  "CURSED PHARAOH · TOMB-BOUND": "शापित फ़राओ · मकबरे का रक्षक",
  "Awoken from a sealed tomb": "बंद मकबरे से जागा",
  "The": "यह",
  "Core": "कोर",
  "Awakened": "जागृत",
  "Charged": "ऊर्जित",
  "Overdrive": "ओवरड्राइव",
  "Apex": "एपेक्स",
  "Claim Mummy Suit FREE": "ममी सूट मुफ़्त पाएं",
  "Aura Lv.7 MAX": "ऑरा स्तर 7 अधिकतम",
  "Mythic Gun Skins": "मिथिक गन स्किन",
  "Legendary Upgrades": "लेजेंडरी अपग्रेड",
  "Kill Effects": "किल इफेक्ट",
  "Finishers": "फिनिशर",
  "Garage": "गैराज",
  "Dragon Emperor Car": "ड्रैगन एम्परर कार",
  "Voltage Surge Bike": "वोल्टेज सर्ज बाइक",
  "Plane Skins": "प्लेन स्किन",
  "Privacy": "गोपनीयता",
  "Terms": "नियम",
  "Leaves a molten dragon trail that burns pursuers.": "पीछा करने वालों के लिए पिघले ड्रैगन की आग की लकीर छोड़ती है।",
  "EMP pulse disables nearby vehicle HUDs on honk.": "हॉर्न बजाने पर EMP पल्स पास के वाहनों के HUD बंद कर देती है।",
  "Golden feather trail follows every parachuting player.": "हर पैराशूट करते खिलाड़ी के पीछे सुनहरे पंखों की लकीर रहती है।",
  "Unlock FREE": "मुफ़्त अनलॉक करें",
  "Armor": "कवच",
  "Emote": "इमोट",
  "Finish": "फिनिश",
  "Aura": "ऑरा",
  "Charge": "चार्ज",
  "A powered exosuit with shifting energy cores and a five-stage evolution that ends in a cinematic finisher.": "शक्ति से चलने वाला एक्सोसूट, बदलते एनर्जी कोर और पांच चरणों के विकास के साथ, जिसका अंत सिनेमैटिक फिनिशर से होता है।",
  "Golden bandages pulse with cursed energy and grow brighter with every elimination, surrounding the final zone in a green soulflame aura.": "सुनहरी पट्टियां शापित ऊर्जा से चमकती हैं और हर एलिमिनेशन के साथ तेज़ होती जाती हैं, जिससे आखिरी ज़ोन हरे सोलफ्लेम ऑरा में घिर जाता है।",
  "A curated Battlegrounds Mobile India collection of mythic gun skins, signature outfits, and vehicles.": "बैटलग्राउंड्स मोबाइल इंडिया की मिथिक गन स्किन, खास पोशाकों और वाहनों का चुना हुआ कलेक्शन।",
  "No UC required; both crates are completely free.": "UC की ज़रूरत नहीं; दोनों क्रेट पूरी तरह मुफ़्त हैं।",

};

interface LanguageContextValue {
  language: Language;
  preference: LanguagePreference;
  setPreference: (preference: LanguagePreference) => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLanguage(): Language {
  return typeof navigator !== "undefined" && navigator.languages?.some((locale) => locale.toLowerCase().startsWith("hi"))
    ? "hi"
    : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<LanguagePreference>(() => {
    try {
      const saved = localStorage.getItem("bgmi-vault-language");
      if (saved === "en" || saved === "hi") return saved;
    } catch {
      /* ignore */
    }
    return "auto";
  });
  const [deviceLanguage, setDeviceLanguage] = useState<Language>(() => detectLanguage());

  useEffect(() => {
    if (preference !== "auto") return;
    const updateLanguage = () => setDeviceLanguage(detectLanguage());
    window.addEventListener("languagechange", updateLanguage);
    return () => window.removeEventListener("languagechange", updateLanguage);
  }, [preference]);

  const language = preference === "auto" ? deviceLanguage : preference;
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    preference,
    setPreference: (next) => {
      setPreferenceState(next);
      try {
        if (next === "auto") localStorage.removeItem("bgmi-vault-language");
        else localStorage.setItem("bgmi-vault-language", next);
      } catch {
        // The preference still applies for this session when storage is unavailable.
      }
    },
    t: (text) => language === "hi" ? hindi[text] ?? text : text,
  }), [language, preference]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function LanguageSelect({ className = "" }: { className?: string }) {
  const { preference, setPreference, t } = useLanguage();
  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <span className="sr-only">{t("Language")}</span>
      <span className="relative">
        <select
          aria-label={t("Language")}
          value={preference}
          onChange={(event) => setPreference(event.target.value as LanguagePreference)}
          className="h-11 min-w-28 appearance-none rounded-xl border border-border/70 bg-card/80 py-2 pl-3 pr-8 text-sm font-medium text-foreground outline-none transition hover:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold"
        >
          <option value="auto">{t("Auto (device)")}</option>
          <option value="en">{t("English")}</option>
          <option value="hi">{t("Hindi")}</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}
