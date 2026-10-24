import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "BGMI Mythic Rewards | Free Skins & X-Suits",
  description:
    "The ultimate Battlegrounds Mobile India showcase. Explore mythic gun skins, the legendary X-Suit, the cursed Mummy Suit, mythic vehicles, Conqueror-tier stats and more.",
  keywords: [
    "BGMI",
    "Battlegrounds Mobile India",
    "BGMI skins",
    "X-Suit",
    "Mummy Suit",
    "Mythic gun skins",
    "Conqueror tier",
    "BGMI Mythic Rewards",
  ],
  authors: [{ name: "BGMI Mythic Rewards" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "BGMI Mythic Rewards | Free Skins & X-Suits",
    description:
      "The ultimate Battlegrounds Mobile India showcase of mythic gun skins, X-Suit, Mummy Suit and more.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1223",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        <LanguageProvider>
          {children}
          <Toaster />
          <Sonner />
        </LanguageProvider>
      </body>
    </html>
  );
}
