import type { Metadata } from "next";
import Link from "next/link";
import { mapsUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Autoankauf Hamburg & Umgebung",
  description:
    "Autoankauf in Hamburg und Umgebung. Wir kaufen Gebrauchtwagen, Unfallwagen und Fahrzeuge mit Mängeln an und melden uns schnell persönlich auf Ihre Anfrage zurück.",
  alternates: {
    canonical: "/standorte"
  }
};

const standorteJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: siteConfig.name,
  url: `${siteConfig.siteUrl}/standorte`,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
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
};

export default function StandortePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(standorteJsonLd) }}
      />

      <main className="bg-white text-slate-900">
        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f3f8ff_55%,#ffffff_100%)]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Standorte
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 md:text-5xl md:leading-[1.05]">
              Autoankauf in Hamburg &amp; Umgebung
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              {siteConfig.name} ist Ihr Ansprechpartner für den Autoankauf in
              Hamburg und im nahen Umland. Wenn Sie Ihr Fahrzeug verkaufen
              möchten, erhalten Sie bei uns eine persönliche Rückmeldung statt
              eines unklaren Standardablaufs.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Unser Schwerpunkt liegt auf Hamburg, der Metropolregion Hamburg
              und ausgewählten angrenzenden Städten. Wichtig ist für uns ein
              klarer Ablauf, eine vollständige Fahrzeuganfrage und eine direkte
              Kommunikation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Google Maps öffnen
              </a>
              <Link
                href="/bewertung"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Fahrzeug online anfragen
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Hamburg</h2>
              <p className="mt-3 leading-7 text-slate-700">
                Unser klarer Schwerpunkt liegt auf dem Autoankauf in Hamburg.
                Viele Anfragen kommen direkt aus der Stadt, aus den Bezirken und
                aus den angrenzenden Stadtteilen.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Metropolregion Hamburg
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Auch im Umland von Hamburg und in angrenzenden Regionen sind wir
                für Fahrzeuganfragen erreichbar. Kurze Wege, klare Kommunikation
                und persönliche Rückmeldungen stehen dabei im Vordergrund.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Ausgewählte Regionen im Norden
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Darüber hinaus prüfen wir auch Anfragen aus weiteren passenden
                Regionen im Norden, wenn das Fahrzeug gut zu unserem Ankaufprofil
                passt und die Anfrage vollständig vorliegt.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                  Wo wir für Sie erreichbar sind
                </h2>

                <p className="mt-4 max-w-3xl leading-8 text-slate-700">
                  Unser Schwerpunkt liegt klar auf dem Autoankauf in Hamburg und
                  Umgebung. Gleichzeitig prüfen wir auch Anfragen aus weiteren
                  passenden Regionen, wenn Fahrzeugdaten, Zustand und
                  Ankaufprofil gut zusammenpassen.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {siteConfig.serviceAreas.map((area) => (
                    <div
                      key={area}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  Kontakt &amp; Erreichbarkeit
                </h2>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Region
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    Hamburg &amp; Umgebung
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Kontakt
                  </p>
                  <div className="mt-3 space-y-2 text-slate-800">
                    <p>
                      <a
                        href={siteConfig.phoneHref}
                        className="font-semibold hover:text-sky-700"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="font-semibold hover:text-sky-700"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                    <p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold hover:text-sky-700"
                      >
                        Standort bei Google Maps öffnen
                      </a>
                    </p>
                  </div>
                </div>

                <p className="mt-6 leading-7 text-slate-700">
                  Sie kommen aus Hamburg, dem Umland oder aus einer passenden
                  angrenzenden Region? Dann senden Sie uns Ihre Anfrage online
                  zu. Wir prüfen Ihr Fahrzeug und melden uns persönlich bei
                  Ihnen zurück.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            So läuft eine Anfrage ab
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                1. Fahrzeugdaten senden
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Sie senden uns online die wichtigsten Angaben zu Ihrem Fahrzeug.
                So können wir Ihre Anfrage direkt einordnen.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                2. Anfrage prüfen
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Wir prüfen die Fahrzeugdaten strukturiert und bewerten, wie die
                Anfrage zu unserem Ankaufprofil passt.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                3. Persönliche Rückmeldung
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Wir melden uns zeitnah bei Ihnen zurück und besprechen die
                nächsten Schritte verständlich und ohne Umwege.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold text-slate-950">
                4. Nächste Schritte abstimmen
              </h3>
              <p className="mt-2 leading-7 text-slate-700">
                Wenn alles passt, stimmen wir das weitere Vorgehen direkt mit
                Ihnen ab – klar, persönlich und unkompliziert.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}