import type { Metadata } from "next";
import { ValuationWizard } from "@/components/valuation/valuation-wizard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fahrzeug kostenlos anfragen",
  description:
    "Fahrzeugangaben Schritt für Schritt eingeben und im letzten Schritt die Kontaktdaten ergänzen – für Autoankauf in Hamburg und Umgebung.",
  path: "/bewertung"
});

type SearchParams = Promise<{
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
}>;

export default async function ValuationPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="border-b border-slate-200 pb-5 text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Fahrzeug kostenlos anfragen
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Gib die wichtigsten Angaben zu deinem Fahrzeug ein. Im letzten
            Schritt ergänzt du nur noch deine Kontaktdaten und sendest deine
            Anfrage für den Autoankauf in Hamburg und Umgebung ab.
          </p>
        </section>

        <section className="mt-6">
          <ValuationWizard initialValues={params} />
        </section>
      </div>
    </main>
  );
}