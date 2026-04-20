# A&E Automobile — Next.js Projekt (SEO / Google Maps überarbeitet)

Dieses Projekt ist die überarbeitete Version der Website für **A&E Automobile**.

## Enthaltene Verbesserungen

- einheitliche Markenbezeichnung im gesamten Projekt
- saubere Seiten-Metadaten für Next.js
- `robots.ts`, `sitemap.ts` und `manifest.ts`
- strukturierte Daten für `WebSite`, `AutoDealer`, `BreadcrumbList` und `FAQPage`
- stärkere lokale Ausrichtung für **Google Suche** und **Google Maps**
- überarbeitete Header-/Footer-Navigation mit `Über uns` und Google-Maps-Link
- vertrauenswürdigerer Inhalt statt künstlich wirkender Bewertungs-Claims
- verbesserte Seiten für Startseite, Standorte, Über uns, FAQ, Impressum und Datenschutz
- `noindex` für die interne Zwischenseite `/bewertung/kontakt`
- bereinigtes Projekt ohne `node_modules`, `.next` und unnötige macOS-Artefakte

## Was bewusst noch **nicht** umgesetzt ist

Der Anfrageabschluss ist aktuell weiterhin **nur visuell**.
Die letzte Formularstufe speichert bzw. sendet noch **keine echten Daten** an:

- E-Mail
- Datenbank
- API / Webhook
- CRM

Diese Funktion war auf Wunsch **die letzte Ausbaustufe** und ist in dieser Version noch offen.

## Start lokal

```bash
npm install
npm run dev
```

Dann im Browser öffnen:

```bash
http://localhost:3000
```

## Wichtige Umgebungsvariable

Lege eine `.env.local` an oder nutze die vorhandene `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://www.deine-domain.de
```

Beispiel:

```bash
cp .env.example .env.local
```

## Projektstruktur

- `app/page.tsx` → Startseite
- `app/bewertung/page.tsx` → Fahrzeuganfrage
- `app/bewertung/kontakt/*` → letzte Kontaktstufe (aktuell noch ohne echte Übertragung)
- `app/standorte/page.tsx` → lokale SEO-Seite für Reinbek / Hamburg / Umgebung
- `app/ueber-uns/page.tsx` → Unternehmensseite
- `app/faq/page.tsx` → FAQ mit Schema-Markup
- `lib/site-config.ts` → zentrale Unternehmensdaten
- `lib/seo.ts` → SEO-Helfer, Canonicals und JSON-LD-Builder

## Nächste logische Ausbaustufe

1. echtes Formular-Backend anbinden
2. Bilder sicher hochladen oder per E-Mail / Storage verarbeiten
3. Leads speichern
4. Admin-Übersicht ergänzen
5. Search Console und Domain produktiv verbinden
