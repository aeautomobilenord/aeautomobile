import type { Metadata } from "next";
import Link from "next/link";
import { mapsUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Über ${siteConfig.name} | Autoankauf Hamburg & Umgebung`,
  description:
    "Erfahren Sie mehr über A&E Automobile Nord. Wir stehen für persönlichen Autoankauf in Hamburg und Umgebung sowie für eine direkte und verlässliche Fahrzeuganfrage.",
  alternates: {
    canonical: "/ueber-uns"
  }
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `Über uns | ${siteConfig.name}`,
  url: `${siteConfig.siteUrl}/ueber-uns`,
  description:
    "Über A&E Automobile Nord – persönlicher Ansprechpartner für Autoankauf in Hamburg und Umgebung.",
  mainEntity: {
    "@type": "AutoDealer",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    image: `${siteConfig.siteUrl}${siteConfig.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area
    })),
    sameAs: [mapsUrl]
  }
};

export default function UeberUnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <main className="bg-white text-slate-900">
        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f8ff_55%,#ffffff_100%)]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Über uns
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl md:leading-[1.05]">
              Persönlicher Autoankauf für Hamburg &amp; Umgebung
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              {siteConfig.name} ist Ihr Ansprechpartner, wenn Sie Ihr Auto ohne
              unnötigen Aufwand verkaufen möchten. Wir kaufen Gebrauchtwagen,
              Unfallwagen und Fahrzeuge mit Mängeln an und legen Wert auf eine
              direkte, verlässliche Kommunikation.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Unser Schwerpunkt liegt auf Hamburg und Umgebung. Statt
              unpersönlicher Standardabläufe setzen wir auf eine klare Anfrage,
              eine persönliche Rückmeldung und einen Ablauf, der für Verkäufer
              nachvollziehbar bleibt.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bewertung"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Fahrzeug online anfragen
              </Link>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Standort bei Google Maps öffnen
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Direkter Kontakt
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Bei uns sprechen Sie nicht mit einer anonymen Plattform,
                sondern mit einem festen Ansprechpartner. Rückfragen,
                Fahrzeugdaten und nächste Schritte werden direkt mit Ihnen
                abgestimmt.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Ehrliche Einschätzung
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Wir prüfen jede Anfrage einzeln. Zustand, Laufleistung,
                Ausstattung und Besonderheiten fließen in die Einschätzung ein –
                ohne leere Versprechen und ohne unnötige Umwege.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Schwerpunkt Hamburg
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Unser Fokus liegt auf Hamburg und dem nahen Umland. Genau dort
                möchten wir für Verkäufer gut erreichbar, schnell ansprechbar
                und unkompliziert sein.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                  So arbeiten wir
                </h2>

                <div className="mt-8 space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                      01
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      Anfrage stellen
                    </h3>
                    <p className="mt-2 leading-7 text-slate-700">
                      Sie senden uns die wichtigsten Daten zu Ihrem Fahrzeug.
                      Damit haben wir eine saubere Grundlage für die erste
                      Einschätzung.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                      02
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      Persönliche Rückmeldung
                    </h3>
                    <p className="mt-2 leading-7 text-slate-700">
                      Nach der ersten Prüfung melden wir uns direkt bei Ihnen.
                      Dabei klären wir offen, wie wir das Fahrzeug einordnen und
                      welche Informationen noch hilfreich sind.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                      03
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      Fahrzeug realistisch bewerten
                    </h3>
                    <p className="mt-2 leading-7 text-slate-700">
                      Wir betrachten nicht nur Grunddaten, sondern auch Zustand,
                      Historie und besondere Merkmale. So bleibt die
                      Einschätzung nachvollziehbar und praxisnah.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                      04
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">
                      Nächste Schritte abstimmen
                    </h3>
                    <p className="mt-2 leading-7 text-slate-700">
                      Wenn alles passt, stimmen wir das weitere Vorgehen direkt
                      mit Ihnen ab. Unser Ziel ist ein Ablauf, der praktisch,
                      klar und gut planbar bleibt.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  Warum viele Verkäufer einen direkten Ansprechpartner bevorzugen
                </h2>

                <p className="mt-4 leading-7 text-slate-700">
                  Viele Fahrzeughalter möchten keine komplizierte Plattform,
                  sondern einen verlässlichen Kontakt. Genau darauf ist unser
                  Ablauf ausgerichtet: persönliche Rückmeldung, klare Abstimmung
                  und eine Anfrage, die ohne unnötige Umwege funktioniert.
                </p>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Telefon
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    <a
                      href={siteConfig.phoneHref}
                      className="hover:text-sky-700"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    E-Mail
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-sky-700"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Google Maps
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-sky-700"
                    >
                      Standort öffnen
                    </a>
                  </p>
                </div>

                <p className="mt-6 leading-7 text-slate-700">
                  Wenn Sie Ihr Auto in Hamburg oder im nahen Umland verkaufen
                  möchten, können Sie uns Ihre Anfrage direkt online senden. Wir
                  melden uns persönlich bei Ihnen zurück.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Für wen wir da sind
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                Gebrauchtwagen verkaufen
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Sie möchten Ihr Auto ohne langen Aufwand anbieten und wünschen
                sich einen direkten Ansprechpartner statt eines unpersönlichen
                Standardprozesses.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                Unfallwagen oder Fahrzeuge mit Mängeln
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Auch bei älteren Fahrzeugen, höherer Laufleistung oder
                erklärungsbedürftigen Details ist eine persönliche Prüfung oft
                sinnvoll.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                Anfragen aus Hamburg und Umgebung
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Viele unserer Anfragen kommen aus Hamburg und dem nahen Umland.
                Genau dort liegt auch unser regionaler Schwerpunkt.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                Verkäufer, die es unkompliziert mögen
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Nicht jeder möchte mehrere Plattformen vergleichen oder lange
                hin und her schreiben. Oft reicht ein verlässlicher Kontakt,
                der direkt erreichbar ist.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}