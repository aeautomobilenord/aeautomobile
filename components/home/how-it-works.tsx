import Image from "next/image";

const points = [
  "Fahrzeug online anfragen und die wichtigsten Daten in wenigen Schritten senden.",
  "Marke, Modell, Erstzulassung, Kilometerstand und weitere Fahrzeugangaben ergänzen.",
  "Wir prüfen Ihre Anfrage und melden uns zeitnah persönlich bei Ihnen zurück."
];

export function HowItWorks() {
  return (
    <section id="ablauf" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-5 shadow-soft md:px-6 md:py-6">
          <div className="grid items-center gap-5 md:grid-cols-[110px_1fr]">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/ablauf-icon.png"
                alt="Ablauf beim Autoankauf"
                width={120}
                height={120}
                className="h-auto w-[78px] object-contain md:w-[95px]"
                priority
              />
            </div>

            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-950 md:text-3xl md:leading-[1.08]">
                So läuft Ihre{" "}
                <span className="text-sky-700">Fahrzeuganfrage</span> ab
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
                Für den Autoankauf in Hamburg und Umgebung können Sie Ihre
                Fahrzeugdaten direkt online übermitteln. So erhalten wir schnell
                einen ersten Überblick und können Ihre Anfrage strukturiert
                prüfen.
              </p>

              <div className="mt-4 space-y-3">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 text-xl font-bold leading-none text-emerald-600">
                      ✓
                    </span>
                    <p className="text-[15px] font-medium leading-6 text-slate-900 md:text-lg md:leading-7">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}