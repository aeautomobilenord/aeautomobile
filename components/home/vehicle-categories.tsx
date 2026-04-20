import { CheckCircle2 } from "lucide-react";

const categories = [
  {
    title: "Gebrauchtwagen",
    text: "Wir kaufen Gebrauchtwagen vieler Marken und Modelle an – auch bei höherer Laufleistung."
  },
  {
    title: "Unfallwagen",
    text: "Auch Fahrzeuge mit Unfallschäden oder Reparaturbedarf können bei uns angefragt werden."
  },
  {
    title: "Fahrzeuge mit Motorschaden",
    text: "Auch bei Motorproblemen oder größeren technischen Defekten ist eine Anfrage sinnvoll."
  },
  {
    title: "Fahrzeuge ohne TÜV",
    text: "Auch abgemeldete Fahrzeuge oder Autos ohne gültige Hauptuntersuchung kommen grundsätzlich infrage."
  },
  {
    title: "Fahrzeuge mit Mängeln",
    text: "Auch Fahrzeuge mit optischen oder technischen Mängeln prüfen wir anhand der Fahrzeugdaten im Einzelfall."
  },
  {
    title: "Transporter und Nutzfahrzeuge",
    text: "Auch Transporter und ausgewählte Nutzfahrzeuge prüfen wir je nach Zustand, Daten und Ankaufprofil."
  }
];

export function VehicleCategories() {
  return (
    <section id="fahrzeuge" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Fahrzeuge
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Welche Fahrzeuge wir ankaufen
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            A&amp;E Automobile Nord kauft Fahrzeuge verschiedener Marken und
            Modelle an. Auch Autos mit hoher Laufleistung, Schäden, Mängeln
            oder technischem Reparaturbedarf können bei uns angefragt werden.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
          {categories.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 border-b border-slate-200 py-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />

              <div>
                <h3 className="text-sm font-bold text-slate-950 md:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="pt-4 text-sm leading-6 text-slate-600">
          Für eine erste Einschätzung helfen uns vollständige Fahrzeugdaten und,
          wenn möglich, aktuelle Bilder vom Fahrzeug.
        </p>
      </div>
    </section>
  );
}