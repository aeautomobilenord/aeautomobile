import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kontaktdaten zur Fahrzeuganfrage",
  description:
    "Letzter Schritt der Fahrzeuganfrage. Diese Zwischenseite dient nur der Anfragebearbeitung.",
  path: "/bewertung/kontakt",
  noIndex: true
});

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
