import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  buildLocalBusinessSchema,
  buildWebsiteSchema,
  absoluteUrl
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const viewport: Viewport = {
  themeColor: "#ffffff"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | Autoankauf Hamburg & Umgebung`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  category: "Automotive",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  keywords: [
    "Autoankauf Hamburg",
    "Auto verkaufen Hamburg",
    "Gebrauchtwagen verkaufen Hamburg",
    "Unfallwagen verkaufen Hamburg",
    "Fahrzeugankauf Hamburg",
    "Autoankauf Umgebung Hamburg",
    "A&E Automobile Nord",
    "Gebrauchtwagen ankaufen",
    "Unfallwagen ankaufen"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.png"]
  },
  openGraph: {
    title: `${siteConfig.name} | Autoankauf Hamburg & Umgebung`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} – Autoankauf Hamburg & Umgebung`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Autoankauf Hamburg & Umgebung`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-white text-slate-950 antialiased">
        <JsonLd data={buildWebsiteSchema()} />
        <JsonLd data={buildLocalBusinessSchema()} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}