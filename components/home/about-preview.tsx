import Link from "next/link";
import { ChevronRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mapsUrl } from "@/lib/site-config";

export function AboutPreview() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Über uns
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            A&amp;E Automobile Nord – Autoankauf für Hamburg &amp; Umgebung
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 md:px-6 md:py-6">
          <div className="max-h-[250px] overflow-hidden md:max-h-[270px]">
            <div className="space-y-4 text-base leading-8 text-slate-700">
              <p>
                A&amp;E Automobile Nord ist Ihr Ansprechpartner, wenn Sie Ihr
                Auto in Hamburg oder im nahen Umland verkaufen möchten. Wir
                setzen auf direkten Kontakt, klare Kommunikation und einen
                Ablauf, der für Sie verständlich und nachvollziehbar bleibt.
              </p>

              <p>
                Wir kaufen Gebrauchtwagen ebenso an wie Fahrzeuge mit hoher
                Laufleistung, Mängeln oder technischem Reparaturbedarf. Statt
                unpersönlicher Standardabläufe prüfen wir jede Anfrage
                individuell und melden uns persönlich bei Ihnen zurück.
              </p>

              <p>
                Unser Schwerpunkt liegt auf dem Autoankauf in Hamburg und
                Umgebung. Darüber hinaus prüfen wir auch Anfragen aus weiteren
                passenden Regionen, wenn Fahrzeugdaten, Zustand und
                Ankaufprofil gut zusammenpassen.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent" />

          <div className="relative mt-5 flex flex-wrap gap-3">
            <Button asChild className="gap-2 rounded-2xl">
              <Link href="/ueber-uns">
                Mehr über A&amp;E Automobile Nord
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="secondary" className="gap-2 rounded-2xl">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                <Navigation className="h-4 w-4" />
                Standort ansehen
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}