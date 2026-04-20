"use client";

import { useRef } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Navigation,
  ShieldCheck
} from "lucide-react";
import { mapsUrl } from "@/lib/site-config";

const trustCards = [
  {
    title: "Hamburg & Umgebung",
    text: "Unser Schwerpunkt liegt auf Fahrzeuganfragen aus Hamburg und dem nahen Umland.",
    icon: Navigation
  },
  {
    title: "Einfach anfragen",
    text: "Die wichtigsten Fahrzeugdaten werden Schritt für Schritt abgefragt – übersichtlich und ohne unnötig komplizierte Formulare.",
    icon: CheckCircle2
  },
  {
    title: "Auch bei Mängeln",
    text: "Auch Fahrzeuge ohne TÜV, mit Schäden, Reparaturbedarf oder hoher Laufleistung können bei uns angefragt werden.",
    icon: ShieldCheck
  },
  {
    title: "Direkt erreichbar",
    text: "Bei Fragen oder Rückmeldungen sind wir direkt erreichbar und melden uns persönlich bei Ihnen zurück.",
    icon: MessageCircle
  }
];

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = scrollRef.current.clientWidth * 0.82;

    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Vertrauen
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Darauf können Sie sich verlassen
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Autoankauf in Hamburg und Umgebung – mit direktem Kontakt, klaren
            Angaben und einem Ablauf, der verständlich bleibt.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Nach links scrollen"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {trustCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="min-w-[86%] rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm sm:min-w-[48%] xl:min-w-[24%]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-lg font-black leading-6 text-slate-950">
                    {card.title}
                  </h3>

                  <p className="mt-3 min-h-[88px] text-sm leading-6 text-slate-600">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Nach rechts scrollen"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-center">
          <p className="text-sm leading-6 text-slate-600">
            Sie möchten unseren Standort prüfen oder direkt Kontakt aufnehmen?
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Navigation className="h-4 w-4 text-sky-600" />
              Standort bei Google Maps
            </a>

            <a
              href="https://wa.me/491741977771"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4 text-sky-600" />
              Per WhatsApp schreiben
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}