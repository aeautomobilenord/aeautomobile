import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Mail, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { businessAddressLine, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Datenschutz",
  description: `Datenschutzhinweise von ${siteConfig.legalName}.`,
  path: "/datenschutz",
  noIndex: true
});

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fcff_0%,#eef7ff_24%,#ffffff_100%)] py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-sky-100 bg-white p-6 shadow-soft md:p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
            <ShieldCheck className="h-4 w-4" />
            Datenschutz
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Datenschutzerklärung
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Diese Website dient der Fahrzeuganfrage und der Kontaktaufnahme mit{" "}
            {siteConfig.legalName}. Im Rahmen der Nutzung dieser Website können
            personenbezogene Daten verarbeitet werden.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Kontakt"
              text={siteConfig.email}
            />
            <InfoCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Verantwortlich"
              text={`${siteConfig.legalName}, ${businessAddressLine}`}
            />
          </div>
        </section>

        <section className="mt-8 space-y-6">
          <LegalCard title="Verantwortlicher">
            <p>
              <strong>{siteConfig.legalName}</strong>
            </p>
            <p>{siteConfig.address.streetAddress}</p>
            <p>
              {siteConfig.address.postalCode}{" "}
              {siteConfig.address.addressLocality}
            </p>
            <p>
              E-Mail: <strong>{siteConfig.email}</strong>
            </p>
            <p>
              Telefon: <strong>{siteConfig.phoneDisplay}</strong>
            </p>
          </LegalCard>

          <LegalCard title="Welche Daten verarbeitet werden">
            <p>
              Bei der Nutzung unserer Website können insbesondere folgende Daten
              verarbeitet werden:
            </p>
            <ul className="list-disc pl-5">
              <li>Fahrzeugdaten wie Marke, Modell, Erstzulassung und Kilometerstand</li>
              <li>Kontaktdaten wie Name, Telefonnummer, E-Mail-Adresse und Postleitzahl</li>
              <li>freiwillig hochgeladene Fahrzeugbilder</li>
              <li>technische Daten, die für den Betrieb und die Sicherheit der Website erforderlich sind</li>
            </ul>
          </LegalCard>

          <LegalCard title="Zweck der Verarbeitung">
            <p>
              Die Verarbeitung erfolgt zur Bearbeitung von Fahrzeuganfragen, zur
              Kontaktaufnahme, zur ersten Einschätzung des angefragten
              Fahrzeugs sowie zur Vorbereitung eines möglichen Fahrzeugankaufs.
            </p>
          </LegalCard>

          <LegalCard title="Kontaktaufnahme und Formular">
            <p>
              Wenn Sie uns über das Anfrageformular, per E-Mail oder telefonisch
              kontaktieren, werden Ihre Angaben zur Bearbeitung Ihrer Anfrage
              verwendet. Dazu zählen insbesondere die von Ihnen übermittelten
              Fahrzeugdaten, Kontaktdaten und gegebenenfalls hochgeladene Bilder.
            </p>
          </LegalCard>

          <LegalCard title="Versand von Anfragen per E-Mail">
            <p>
              Fahrzeuganfragen, die über das Formular auf dieser Website
              übermittelt werden, können technisch per E-Mail an uns
              weitergeleitet werden. Dabei werden die im Formular gemachten
              Angaben sowie eventuelle Dateianhänge verarbeitet, damit wir Ihre
              Anfrage prüfen und beantworten können.
            </p>
          </LegalCard>

          <LegalCard title="Speicherdauer">
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie dies
              für die Bearbeitung der Anfrage, die Kommunikation mit Ihnen oder
              zur Erfüllung gesetzlicher Pflichten erforderlich ist.
            </p>
          </LegalCard>

          <LegalCard title="Ihre Rechte">
            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Vorschriften
              grundsätzlich das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung sowie auf Widerspruch gegen die
              Verarbeitung Ihrer personenbezogenen Daten.
            </p>
          </LegalCard>

          <LegalCard title="Hinweis">
            <p>
              Diese Datenschutzerklärung dient als allgemeine Information zur
              Verarbeitung personenbezogener Daten auf dieser Website. Je nach
              tatsächlicher technischer Einbindung weiterer Dienste kann eine
              weitergehende rechtliche Prüfung sinnvoll sein.
            </p>
          </LegalCard>
        </section>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}

function LegalCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
        {icon}
      </div>
      <h2 className="mt-4 text-base font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}