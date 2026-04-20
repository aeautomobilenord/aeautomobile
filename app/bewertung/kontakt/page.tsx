"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  clearValuationImages,
  getValuationImages
} from "@/lib/valuation-image-store";
import { contactOptions } from "@/lib/vehicle-data";

type DraftData = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  imageCount: number;
  imageNames: string[];
};

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  preferredContact: (typeof contactOptions)[number];
};

export default function KontaktPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [website, setWebsite] = useState("");

  const [form, setForm] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
    postalCode: "",
    preferredContact: "WhatsApp"
  });

  const requestId = useMemo(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return `AE-${datePart}-${random}`;
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("ae_valuation_draft");

    if (raw) {
      try {
        setDraft(JSON.parse(raw));
      } catch {
        setDraft(null);
      }
    } else {
      setDraft(null);
    }

    setStartedAt(Date.now());
    setLoading(false);
  }, []);

  const updateField = <K extends keyof ContactForm>(
    key: K,
    value: ContactForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidPhone = (value: string) => {
    const cleaned = value.replace(/[^\d+]/g, "");
    return cleaned.length >= 7;
  };

  const isValidGermanPostalCode = (value: string) => {
    return /^\d{5}$/.test(value.trim());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!form.name || !form.phone || !form.email || !form.postalCode) {
      setError("Bitte fülle alle Kontaktdaten vollständig aus.");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setError("Bitte gib eine gültige Telefonnummer ein.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (!isValidGermanPostalCode(form.postalCode)) {
      setError("Bitte gib eine gültige Postleitzahl mit 5 Ziffern ein.");
      return;
    }

    if (!form.preferredContact) {
      setError("Bitte wähle einen bevorzugten Kontaktweg.");
      return;
    }

    if (!privacyAccepted) {
      setError(
        "Bitte bestätige die Datenschutzhinweise, bevor du die Anfrage absendest."
      );
      return;
    }

    if (!draft) {
      setError("Fahrzeugdaten fehlen. Bitte beginne erneut.");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);

      const files = getValuationImages();

      const formData = new FormData();
      formData.append("requestId", requestId);
      formData.append("startedAt", String(startedAt));
      formData.append("website", website);
      formData.append("privacyAccepted", privacyAccepted ? "true" : "false");

      formData.append(
        "vehicle",
        JSON.stringify({
          brand: draft.brand,
          model: draft.model,
          year: draft.year,
          mileage: draft.mileage,
          fuel: draft.fuel,
          transmission: draft.transmission,
          imageCount: draft.imageCount,
          imageNames: draft.imageNames
        })
      );

      formData.append(
        "contact",
        JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          postalCode: form.postalCode,
          preferredContact: form.preferredContact
        })
      );

      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/valuation-request", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Die Anfrage konnte nicht gesendet werden.");
        setIsSubmitting(false);
        return;
      }

      sessionStorage.removeItem("ae_valuation_draft");
      clearValuationImages();
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setError("Die Anfrage konnte nicht gesendet werden. Bitte erneut versuchen.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-soft">
            <p className="text-sm text-slate-600">Daten werden geladen ...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
              Kontakt
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Keine Fahrzeugangaben gefunden
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Bitte beginne zuerst mit den Fahrzeugangaben auf der Bewertungsseite.
            </p>

            <div className="mt-5">
              <Button asChild className="gap-2 rounded-2xl">
                <Link href="/bewertung">
                  <ArrowLeft className="h-4 w-4" />
                  Zurück zur Bewertung
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Anfrage erfolgreich gesendet
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Vielen Dank für deine Anfrage
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Deine Anfrage wurde erfolgreich übermittelt. Wir prüfen deine Angaben
              und melden uns bei dir über den gewählten Kontaktweg so schnell wie
              möglich.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-sm font-semibold text-slate-950">
                  Anfragenummer
                </p>
                <p className="mt-1 text-xl font-black tracking-wide text-slate-950">
                  {requestId}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-sm font-semibold text-slate-950">
                  Bevorzugter Kontaktweg
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {form.preferredContact}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                Fahrzeug
              </h2>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InfoRow label="Fahrzeug" value={`${draft.brand} ${draft.model}`} />
                <InfoRow label="Erstzulassung" value={draft.year} />
                <InfoRow label="Kilometerstand" value={`${draft.mileage} km`} />
                <InfoRow label="Kraftstoff" value={draft.fuel} />
                <InfoRow label="Getriebe" value={draft.transmission} />
                <InfoRow
                  label="Bilder"
                  value={`${draft.imageCount} Bild${draft.imageCount === 1 ? "" : "er"}`}
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                Kontaktdaten
              </h2>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InfoRow label="Name" value={form.name} />
                <InfoRow label="Telefon" value={form.phone} />
                <InfoRow label="E-Mail" value={form.email} />
                <InfoRow label="PLZ" value={form.postalCode} />
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button asChild type="button" variant="secondary" className="rounded-2xl">
                  <Link href="/">Zur Startseite</Link>
                </Button>

                <Button asChild type="button" className="rounded-2xl px-5">
                  <Link href="/bewertung">Neue Anfrage</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f9fcff_0%,#f2f8ff_52%,#ffffff_100%)]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="border-b border-slate-200 pb-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
            Letzter Schritt
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Kontaktdaten ergänzen
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Fast geschafft. Bitte gib jetzt deine Kontaktdaten an und teile uns
            mit, wie wir dich am besten erreichen können.
          </p>
        </section>

        <div className="mt-6 space-y-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft md:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Deine Fahrzeugangaben
                </p>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  {draft.brand} {draft.model} · {draft.year} · {draft.mileage} km
                </p>
                <p className="text-sm leading-7 text-slate-600">
                  {draft.fuel} · {draft.transmission}
                </p>
                <p className="text-sm leading-7 text-slate-600">
                  Bilder: {draft.imageCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Name">
                <input
                  className={inputClassName}
                  type="text"
                  placeholder="Vor- und Nachname"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </Field>

              <Field label="Telefon">
                <div className="relative">
                  <PhoneCall className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className={cn(inputClassName, "pl-10")}
                    type="text"
                    placeholder="z. B. 0174 1234567"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                  />
                </div>
              </Field>

              <Field label="E-Mail">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className={cn(inputClassName, "pl-10")}
                    type="email"
                    placeholder="name@beispiel.de"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                  />
                </div>
              </Field>

              <Field label="PLZ">
                <input
                  className={inputClassName}
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="z. B. 22111"
                  value={form.postalCode}
                  onChange={(event) =>
                    updateField("postalCode", event.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                />
              </Field>

              <Field label="Bevorzugter Kontaktweg">
                <div className="grid gap-3 sm:grid-cols-3">
                  {contactOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("preferredContact", option)}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                        form.preferredContact === option
                          ? "border-sky-400 bg-sky-50 text-sky-700"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Field>

              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(event) => {
                      setPrivacyAccepted(event.target.checked);
                      if (event.target.checked) {
                        setError("");
                      }
                    }}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />

                  <span className="text-sm leading-6 text-slate-700">
                    Ich habe die{" "}
                    <Link
                      href="/datenschutz"
                      target="_blank"
                      className="font-semibold text-sky-700 underline underline-offset-4"
                    >
                      Datenschutzhinweise
                    </Link>{" "}
                    gelesen und stimme der Verarbeitung meiner Angaben und
                    hochgeladenen Dateien zum Zweck der Bearbeitung meiner
                    Fahrzeuganfrage zu.
                  </span>
                </label>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-2xl"
                  onClick={() => router.push("/bewertung")}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zurück zur Bewertung
                </Button>

                <Button
                  type="submit"
                  className="rounded-2xl px-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Anfrage wird gesendet..." : "Fahrzeuganfrage absenden"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

const inputClassName =
  "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400";