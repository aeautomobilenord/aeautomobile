"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Menu, PhoneCall, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Startseite", href: "/" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "Fahrzeuge", href: "/#fahrzeuge" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Standorte", href: "/standorte" },
  { label: "FAQ", href: "/faq" }
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
      <div className="hidden border-b border-slate-200/70 bg-slate-50/90 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-medium text-slate-600 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-sky-600" />
            <span>Autoankauf in Hamburg &amp; Umgebung</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 transition hover:text-slate-950"
            >
              <PhoneCall className="h-3.5 w-3.5 text-sky-600" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[88px] items-center justify-between gap-4 xl:h-[76px]">
          <Link href="/" className="flex min-w-0 shrink items-center">
            <Image
              src="/logo.png"
              alt="A&E Automobile Nord"
              width={250}
              height={70}
              priority
              className="h-auto w-[250px] max-w-[calc(100vw-96px)] object-contain xl:w-[190px]"
            />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <PhoneCall className="h-4 w-4 text-sky-600" />
              {siteConfig.phoneDisplay}
            </a>

            <Button asChild className="h-10 gap-2 rounded-2xl px-5">
              <Link href="/bewertung">
                Fahrzeug anfragen
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200 py-4 xl:hidden">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <PhoneCall className="h-4 w-4 text-sky-600" />
                {siteConfig.phoneDisplay}
              </a>

              <Button asChild className="h-11 w-full gap-2 rounded-2xl">
                <Link href="/bewertung" onClick={() => setMobileOpen(false)}>
                  Fahrzeug anfragen
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}