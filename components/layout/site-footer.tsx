import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Navigation, PhoneCall } from "lucide-react";
import { mapsUrl, siteConfig } from "@/lib/site-config";

const pageLinks = [
  { label: "Startseite", href: "/" },
  { label: "Fahrzeug anfragen", href: "/bewertung" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "Fahrzeuge", href: "/#fahrzeuge" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Standorte", href: "/standorte" },
  { label: "FAQ", href: "/faq" }
];

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" }
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="A&E Automobile Nord"
                width={220}
                height={60}
                className="h-auto w-[180px] object-contain"
                priority
              />
            </Link>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              A&amp;E Automobile Nord ist Ihr Ansprechpartner für Autoankauf in
              Hamburg und Umgebung. Fahrzeuge einfach online anfragen und schnell
              persönlich zurückgemeldet bekommen.
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
            >
              <Navigation className="h-4 w-4 text-sky-600" />
              Google Maps öffnen
            </a>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950">
              Kontakt
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 font-semibold text-slate-800 transition hover:text-sky-700"
              >
                <PhoneCall className="h-4 w-4 text-sky-600" />
                {siteConfig.phoneDisplay}
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 font-semibold text-slate-800 transition hover:text-sky-700"
              >
                <Mail className="h-4 w-4 text-sky-600" />
                {siteConfig.email}
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <span>Hamburg &amp; Umgebung</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950">
                Seiten
              </h3>

              <nav className="mt-4 space-y-2">
                {pageLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-slate-600 transition hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-950">
                Rechtliches
              </h3>

              <nav className="mt-4 space-y-2">
                {legalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-slate-600 transition hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4">
          <div className="flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {year} A&amp;E Automobile Nord. Alle Rechte vorbehalten.</p>
            <p>Autoankauf Hamburg &amp; Umgebung.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}