import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { ValuationStarterCard } from "@/components/valuation/valuation-starter-card";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
      <div className="absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-30" />
      <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.96fr]">
          <div className="flex flex-col">
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl md:leading-[1.05]">
              Autoankauf Hamburg – Auto schnell und sicher verkaufen
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 md:text-xl md:leading-8">
              Wir kaufen Gebrauchtwagen, Unfallwagen und Fahrzeuge mit Mängeln in
              Hamburg und Umgebung. Stellen Sie Ihre Fahrzeuganfrage online und
              erhalten Sie schnell eine persönliche Rückmeldung von A&amp;E
              Automobile Nord.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                variant="ghost"
                className="gap-2 border border-slate-200 bg-white/80"
              >
                <a
                  href="https://wa.me/491741977771"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Jetzt per WhatsApp schreiben"
                >
                  <MessageCircle className="h-4 w-4" />
                  Per WhatsApp schreiben
                </a>
              </Button>

              <Button asChild className="gap-2">
                <Link href="/bewertung">
                  Fahrzeug online anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="gap-2 border border-slate-200 bg-white/80"
              >
                <Link href="/ueber-uns">Mehr über A&amp;E Automobile Nord</Link>
              </Button>
            </div>

            <div className="mt-5 w-full">
              <Image
                src="/autoankauf-hamburg-hero.png"
                alt="Autoankauf Hamburg für Gebrauchtwagen, Unfallwagen und Fahrzeuge mit Mängeln"
                width={1600}
                height={1000}
                priority
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="relative lg:pl-2">
            <div className="absolute right-4 top-6 hidden h-[420px] w-[420px] rounded-full bg-sky-100/55 blur-3xl lg:block" />
            <div className="relative">
              <ValuationStarterCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}