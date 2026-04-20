import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  MapPin,
  Navigation,
  PhoneCall
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { businessAddressLine, mapsUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: `Impressum von ${siteConfig.legalName}.`,
  path: "/impressum",
  noIndex: true
});

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fcff_0%,#eef7ff_24%,#ffffff_100%)] py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-sky-100 bg-white p-6 shadow-soft md:p-8 lg:p-10">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
            Impressum
          </h1>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Adresse"
              text={businessAddressLine}
            />
            <InfoCard
              icon={<PhoneCall className="h-5 w-5" />}
              title="Telefon"
              text={siteConfig.phoneDisplay}
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="E-Mail"
              text={siteConfig.email}
            />
            <InfoCard
              icon={<Navigation className="h-5 w-5" />}
              title="Google Maps"
              text="Standort öffnen"
              href={mapsUrl}
            />
          </div>
        </section>

        <section className="mt-8 space-y-6">
          <LegalCard title="Angaben">
            <p>
              <strong>{siteConfig.legalName}</strong>
            </p>
            <p>{siteConfig.address.streetAddress}</p>
            <p>
              {siteConfig.address.postalCode}{" "}
              {siteConfig.address.addressLocality}
            </p>
            <p>Deutschland</p>
          </LegalCard>

          <LegalCard title="Kontakt">
            <p>
              Telefon: <strong>{siteConfig.phoneDisplay}</strong>
            </p>
            <p>
              E-Mail: <strong>{siteConfig.email}</strong>
            </p>
          </LegalCard>

          <LegalCard title="Verantwortlich für den Inhalt">
            <p>
              <strong>{siteConfig.legalName}</strong>
            </p>
            <p>{siteConfig.address.streetAddress}</p>
            <p>
              {siteConfig.address.postalCode}{" "}
              {siteConfig.address.addressLocality}
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
  text,
  href
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
        {icon}
      </div>
      <h2 className="mt-4 text-base font-bold text-slate-950">{title}</h2>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-sm leading-7 text-slate-600 hover:text-sky-700"
        >
          {text}
        </a>
      ) : (
        <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
      )}
    </div>
  );
}