import Link from "next/link";
import { ChevronRight, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapsUrl } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="border-t border-slate-200 pt-8 lg:pt-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Anfrage
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              Jetzt Fahrzeug online anfragen
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Senden Sie uns online die wichtigsten Fahrzeugdaten und erhalten
              Sie schnell eine persönliche Rückmeldung. A&amp;E Automobile Nord
              bearbeitet Anfragen zum Autoankauf in Hamburg und Umgebung
              unkompliziert und übersichtlich.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild className="gap-2">
              <Link href="/bewertung">
                Fahrzeug online anfragen
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>

            <a
              href="https://wa.me/491741977771"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4 text-sky-600" />
              Per WhatsApp schreiben
            </a>

            <Button asChild variant="secondary" className="gap-2">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                <Navigation className="h-4 w-4" />
                Standort bei Google Maps
              </a>
            </Button>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Autoankauf in Hamburg und Umgebung.
          </p>
        </div>
      </div>
    </section>
  );
}