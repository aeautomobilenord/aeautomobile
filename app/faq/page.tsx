import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/lib/faqs";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ zum Autoankauf in Hamburg & Umgebung",
  description:
    "Antworten auf häufige Fragen zum Autoankauf, zur Fahrzeuganfrage und zum Ablauf in Hamburg und Umgebung.",
  path: "/faq",
  keywords: [
    "FAQ Autoankauf Hamburg",
    "Autoankauf Hamburg Fragen",
    "Auto verkaufen Hamburg FAQ",
    "Fahrzeuganfrage Hamburg",
    "Unfallwagen verkaufen Hamburg"
  ]
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Startseite", path: "/" },
  { name: "FAQ", path: "/faq" }
]);

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="border-b border-slate-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            FAQ
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Häufige Fragen zum Autoankauf in Hamburg &amp; Umgebung
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            Hier finden Sie Antworten auf häufige Fragen zur Fahrzeuganfrage,
            zum Ablauf, zu möglichen Fahrzeugbildern und zum Autoankauf in
            Hamburg und Umgebung.
          </p>

          <div className="mt-5">
            <Button asChild className="gap-2">
              <Link href="/bewertung">
                Fahrzeug online anfragen
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <FaqAccordion items={faqItems} />
      </div>
    </main>
  );
}