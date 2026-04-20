export const siteConfig = {
  name: "A&E Automobile Nord",
  legalName: "A&E Automobile Nord",
  domain: "www.aeautomobile.de",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.aeautomobile.de",
  description:
    "A&E Automobile Nord ist Ihr Ansprechpartner für Autoankauf in Hamburg und Umgebung. Wir kaufen Gebrauchtwagen, Unfallwagen und Fahrzeuge mit Mängeln schnell, unkompliziert und zuverlässig an.",
  phoneDisplay: "+49 174 1977771",
  phoneHref: "tel:+491741977771",
  email: "ae.automobile.nord@gmail.com",
  address: {
    streetAddress: "Humboldtstraße 1c",
    postalCode: "21465",
    addressLocality: "Reinbek",
    addressRegion: "Schleswig-Holstein",
    addressCountry: "DE"
  },
  serviceAreas: [
    "Hamburg",
    "Bergedorf",
    "Glinde",
    "Oststeinbek",
    "Barsbüttel",
    "Wentorf",
    "Ahrensburg",
    "Norderstedt",
    "Geesthacht",
    "Seevetal",
    "Bad Oldesloe",
    "Lübeck",
    "Schwarzenbek",
    "Reinbek"
  ],
  heroImage: "/autoankauf-hamburg-hero.png",
  ogImage: "/opengraph-image.png",
  logo: "/logo.png",
  googleMapsProfileUrl: "https://share.google/kkaGjH4LrXbO7SQ0j"
} as const;

export const mapsUrl = siteConfig.googleMapsProfileUrl;

export const businessAddressLine = `${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}`;