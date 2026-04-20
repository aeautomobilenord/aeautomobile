"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "/gallery/gebrauchtwagen-ankauf-hamburg.jpg",
    alt: "Gebrauchtwagen ankaufen in Hamburg und Umgebung"
  },
  {
    src: "/gallery/unfallwagen-ankauf-hamburg.jpg",
    alt: "Fahrzeuge mit Mängeln oder hoher Laufleistung anfragen"
  },
  {
    src: "/gallery/transporter-ankauf-hamburg.jpg",
    alt: "Transporter und weitere Fahrzeuge für den Ankauf"
  },
  {
    src: "/gallery/autoankauf-reinbek-hamburg.jpg",
    alt: "Autoankauf in Hamburg und Umgebung"
  }
];

export function VehicleGalleryStrip() {
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
            Einblicke
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Beispiele für Fahrzeuge, die wir ankaufen
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Einige Beispiele aus verschiedenen Fahrzeugkategorien für den
            Autoankauf in Hamburg und Umgebung.
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
            {galleryImages.map((image) => (
              <article
                key={image.src}
                className="min-w-[86%] rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm sm:min-w-[48%] xl:min-w-[24%]"
              >
                <div className="relative overflow-hidden rounded-[16px]">
                  <div className="relative h-[150px] w-full md:h-[170px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
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
      </div>
    </section>
  );
}