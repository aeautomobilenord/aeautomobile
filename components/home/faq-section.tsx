import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqPreview = [
  {
    question: "Kaufen Sie auch Unfallwagen oder Fahrzeuge mit Mängeln an?",
    answer:
      "Ja, auch Fahrzeuge mit Unfallschäden, technischen Mängeln oder Reparaturbedarf können bei uns angefragt werden."
  },
  {
    question: "Ist eine Anfrage auch ohne TÜV möglich?",
    answer:
      "Ja, auch Fahrzeuge ohne gültige Hauptuntersuchung oder abgemeldete Autos kommen grundsätzlich infrage."
  },
  {
    question: "Wie läuft die Fahrzeuganfrage ab?",
    answer:
      "Sie senden uns die wichtigsten Fahrzeugdaten online. Danach prüfen wir die Anfrage und melden uns mit dem nächsten Schritt zurück."
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              FAQ
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              Häufige Fragen zum Autoankauf
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Antworten auf häufige Fragen zur Fahrzeuganfrage, zum Ablauf und
              zum Autoankauf in Hamburg und Umgebung.
            </p>

            <div className="mt-5">
              <Button asChild className="gap-2">
                <Link href="/faq">
                  Alle Fragen ansehen
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {faqPreview.map((item) => (
              <div
                key={item.question}
                className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <h3 className="text-sm font-bold text-slate-950 md:text-base">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}