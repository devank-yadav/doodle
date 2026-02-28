import { LandingHero } from "@/components/LandingHero";
import { HowItWorks } from "@/components/HowItWorks";
import { ArtistCarousel } from "@/components/ArtistCarousel";
import { VoicePickerPreview } from "@/components/VoicePickerPreview";
import { MadeForChaos } from "@/components/MadeForChaos";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <LandingHero />
      <HowItWorks />
      <ArtistCarousel />
      <VoicePickerPreview />
      <MadeForChaos />
      <Footer />
    </main>
  );
}

