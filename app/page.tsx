import type { Metadata } from "next";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { VehicleCategories } from "@/components/home/vehicle-categories";
import { VehicleGalleryStrip } from "@/components/home/vehicle-gallery-strip";
import { ReviewsSection } from "@/components/home/reviews-section";
import { AboutPreview } from "@/components/home/about-preview";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Autoankauf Hamburg | Auto schnell und sicher verkaufen",
  description:
    "Autoankauf in Hamburg und Umgebung. Wir kaufen Gebrauchtwagen, Unfallwagen und Fahrzeuge mit Mängeln. Jetzt Fahrzeug online anfragen und schnell verkaufen.",
  path: "/",
  keywords: [
    "Autoankauf Hamburg",
    "Auto verkaufen Hamburg",
    "Gebrauchtwagen verkaufen Hamburg",
    "Unfallwagen verkaufen Hamburg",
    "Autoankauf Umgebung Hamburg",
    "Fahrzeugankauf Hamburg"
  ]
});

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <HowItWorks />
      <VehicleGalleryStrip />
      <VehicleCategories />
      <AboutPreview />
      <ReviewsSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
