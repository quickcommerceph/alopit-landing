import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { TopRoomSection } from "./components/TopRoomSection";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { PromotionsSection } from "./components/PromotionsSection";
import { LiveRoomsSection } from "./components/LiveRoomsSection";
import { StatsStrip } from "./components/StatsStrip";
import { Footer } from "./components/Footer";
import { Variant2 } from "./components/Variant2";
import { Variant3 } from "./components/Variant3";
import { Variant4 } from "./components/Variant4";
import { VariantPicker } from "./components/VariantPicker";
import { useVariant } from "./lib/variant";

function Variant1() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(225,51,79,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(31,94,255,0.12),transparent_28%),linear-gradient(180deg,#f7f9fd_0%,#f4f7fc_38%,#edf3fb_100%)]" />
      <div className="pointer-events-none absolute left-[-10rem] top-[-8rem] -z-10 h-[20rem] w-[20rem] rounded-full bg-[#e1334f]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[18rem] -z-10 h-[22rem] w-[22rem] rounded-full bg-[#1f5eff]/12 blur-3xl" />

      <Navigation />

      <main>
        <HeroSection />
        <TopRoomSection />
        <FeaturesGrid />
        <PromotionsSection />
        <LiveRoomsSection />
        <StatsStrip />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  const [variant, setVariant] = useVariant();

  return (
    <>
      {variant === "1" ? (
        <Variant1 />
      ) : variant === "2" ? (
        <Variant2 />
      ) : variant === "3" ? (
        <Variant3 />
      ) : (
        <Variant4 />
      )}
      <VariantPicker variant={variant} onChange={setVariant} />
    </>
  );
}
