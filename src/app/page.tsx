import { Navbar } from "@/components/bgmi/navbar";
import { Hero } from "@/components/bgmi/hero";
import { GunSkins } from "@/components/bgmi/gun-skins";
import { XSuit } from "@/components/bgmi/x-suit";
import { MummySuit } from "@/components/bgmi/mummy-suit";
import { MoreSuits } from "@/components/bgmi/more-suits";
import { Vehicles } from "@/components/bgmi/vehicles";
import { CrateCTA } from "@/components/bgmi/crate-cta";
import { Footer } from "@/components/bgmi/footer";
import { LoginModal } from "@/components/bgmi/login-modal";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <GunSkins />
        <XSuit />
        <MummySuit />
        <MoreSuits />
        <Vehicles />
        <CrateCTA />
      </main>
      <Footer />
      {/* Login modal — triggered by ANY claim action */}
      <LoginModal />
    </div>
  );
}
