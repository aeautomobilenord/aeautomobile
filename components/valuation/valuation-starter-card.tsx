"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vehicleBrands, years } from "@/lib/vehicle-data";

export function ValuationStarterCard() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [error, setError] = useState("");

  const models = useMemo(() => {
    if (!brand) return [];
    return vehicleBrands.find((entry) => entry.brand === brand)?.models ?? [];
  }, [brand]);

  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!brand || !model || !year || !mileage) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    setError("");

    const params = new URLSearchParams({
      brand,
      model,
      year,
      mileage
    });

    router.push(`/bewertung?${params.toString()}`);
  };

  return (
    <div className="rounded-[28px] border border-sky-100 bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur md:p-5">
      <h3 className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">
        Fahrzeug kostenlos anfragen
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Geben Sie die wichtigsten Fahrzeugdaten ein und starten Sie Ihre
        Anfrage für den Autoankauf in Hamburg und Umgebung.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Marke">
            <select
              className={inputClassName}
              value={brand}
              onChange={(event) => handleBrandChange(event.target.value)}
            >
              <option value="">Bitte wählen</option>
              {vehicleBrands.map((entry) => (
                <option key={entry.brand} value={entry.brand}>
                  {entry.brand}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Modell">
            <select
              className={inputClassName}
              value={model}
              onChange={(event) => setModel(event.target.value)}
              disabled={!brand}
            >
              <option value="">Bitte wählen</option>
              {models.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Erstzulassung">
            <select
              className={inputClassName}
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="">Bitte wählen</option>
              {years.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Kilometerstand">
            <input
              className={inputClassName}
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="z. B. 124500"
              value={mileage}
              onChange={(event) => setMileage(event.target.value)}
            />
          </Field>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-11 w-full gap-2 rounded-2xl text-sm font-semibold"
        >
          Weiter zur Fahrzeuganfrage
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <TrustMiniBar />
    </div>
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
    <label>
      <span className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function TrustMiniBar() {
  return (
    <div className="mt-3 border-t border-slate-200 pt-3">
      <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-bold text-slate-950">
          Schnell und unkompliziert starten
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-emerald-500"
            >
              <Star className="h-4 w-4 fill-white text-white" />
            </div>
          ))}
        </div>

        <div className="text-sm font-medium text-slate-700">
          Unverbindlich, kostenlos und persönlich
        </div>
      </div>
    </div>
  );
}

const inputClassName =
  "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 disabled:bg-slate-50 disabled:text-slate-400";