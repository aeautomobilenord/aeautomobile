"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  fuelOptions,
  transmissionOptions,
  vehicleBrands,
  years
} from "@/lib/vehicle-data";
import {
  clearValuationImages,
  setValuationImages
} from "@/lib/valuation-image-store";

type InitialValues = {
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
};

type FormState = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  images: File[];
};

type StoredDraft = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  imageCount: number;
  imageNames: string[];
};

type MainFieldKey =
  | "brand"
  | "model"
  | "year"
  | "mileage"
  | "fuel"
  | "transmission";

const mainFieldOrder: MainFieldKey[] = [
  "brand",
  "model",
  "year",
  "mileage",
  "fuel",
  "transmission"
];

const MAX_IMAGE_COUNT = 5;
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export function ValuationWizard({
  initialValues
}: {
  initialValues: InitialValues;
}) {
  const router = useRouter();

  const initialBrand = vehicleBrands.some(
    (item) => item.brand === initialValues.brand
  )
    ? initialValues.brand || ""
    : "";

  const initialModels =
    vehicleBrands.find((item) => item.brand === initialBrand)?.models ?? [];

  const initialModel =
    initialValues.model && initialModels.includes(initialValues.model)
      ? initialValues.model
      : "";

  const [form, setForm] = useState<FormState>({
    brand: initialBrand,
    model: initialModel,
    year:
      initialValues.year && years.includes(initialValues.year)
        ? initialValues.year
        : "",
    mileage: initialValues.mileage || "",
    fuel: "",
    transmission: "",
    images: []
  });

  const [error, setError] = useState("");
  const [storedImageNames, setStoredImageNames] = useState<string[]>([]);

  const models = useMemo(() => {
    if (!form.brand) return [];
    return vehicleBrands.find((item) => item.brand === form.brand)?.models ?? [];
  }, [form.brand]);

  useEffect(() => {
    const raw = sessionStorage.getItem("ae_valuation_draft");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<StoredDraft>;

      const parsedBrand =
        typeof parsed.brand === "string" &&
        vehicleBrands.some((item) => item.brand === parsed.brand)
          ? parsed.brand
          : "";

      const parsedModels =
        vehicleBrands.find((item) => item.brand === parsedBrand)?.models ?? [];

      const parsedModel =
        typeof parsed.model === "string" && parsedModels.includes(parsed.model)
          ? parsed.model
          : "";

      setForm((prev) => ({
        ...prev,
        brand: initialBrand || parsedBrand || prev.brand,
        model: initialModel || parsedModel || prev.model,
        year:
          (initialValues.year && years.includes(initialValues.year)
            ? initialValues.year
            : "") || (typeof parsed.year === "string" ? parsed.year : prev.year),
        mileage:
          initialValues.mileage ||
          (typeof parsed.mileage === "string" ? parsed.mileage : prev.mileage),
        fuel: typeof parsed.fuel === "string" ? parsed.fuel : prev.fuel,
        transmission:
          typeof parsed.transmission === "string"
            ? parsed.transmission
            : prev.transmission,
        images: []
      }));

      clearValuationImages();

      if (Array.isArray(parsed.imageNames)) {
        setStoredImageNames(parsed.imageNames);
      }
    } catch {
      // ignore broken session data
    }
  }, [initialBrand, initialModel, initialValues.year, initialValues.mileage]);

  useEffect(() => {
    const draft: StoredDraft = {
      brand: form.brand,
      model: form.model,
      year: form.year,
      mileage: form.mileage,
      fuel: form.fuel,
      transmission: form.transmission,
      imageCount: form.images.length,
      imageNames:
        form.images.length > 0 ? form.images.map((file) => file.name) : storedImageNames
    };

    sessionStorage.setItem("ae_valuation_draft", JSON.stringify(draft));
  }, [
    form.brand,
    form.model,
    form.year,
    form.mileage,
    form.fuel,
    form.transmission,
    form.images,
    storedImageNames
  ]);

  const isMainFieldFilled = (key: MainFieldKey) => {
    return String(form[key]).trim() !== "";
  };

  const firstIncompleteIndex = mainFieldOrder.findIndex(
    (key) => !isMainFieldFilled(key)
  );

  const visibleCount =
    firstIncompleteIndex === -1 ? mainFieldOrder.length : firstIncompleteIndex + 1;

  const completedMainCount = mainFieldOrder.filter((key) =>
    isMainFieldFilled(key)
  ).length;

  const currentFieldKey =
    firstIncompleteIndex === -1 ? null : mainFieldOrder[firstIncompleteIndex];

  const showImageField = completedMainCount === mainFieldOrder.length;
  const canContinue = completedMainCount === mainFieldOrder.length;
  const remainingCount = mainFieldOrder.length - completedMainCount;
  const progress = Math.round(
    (completedMainCount / mainFieldOrder.length) * 100
  );

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBrandChange = (brand: string) => {
    setForm((prev) => ({
      ...prev,
      brand,
      model: ""
    }));
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.currentTarget.value = "";

    if (selectedFiles.length === 0) return;

    setError("");

    const imageFilesOnly = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFilesOnly.length !== selectedFiles.length) {
      setError("Es sind nur Bilddateien erlaubt.");
    }

    const oversizedFiles = imageFilesOnly.filter(
      (file) => file.size > MAX_IMAGE_SIZE_BYTES
    );

    if (oversizedFiles.length > 0) {
      const names = oversizedFiles.map((file) => file.name).join(", ");
      setError(
        `Diese Bilder sind zu groß (max. ${MAX_IMAGE_SIZE_MB} MB pro Bild): ${names}`
      );
    }

    const validFiles = imageFilesOnly.filter(
      (file) => file.size <= MAX_IMAGE_SIZE_BYTES
    );

    const mergedFiles = [...form.images, ...validFiles];

    const uniqueFiles = mergedFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified
        )
    );

    if (uniqueFiles.length > MAX_IMAGE_COUNT) {
      const limitedFiles = uniqueFiles.slice(0, MAX_IMAGE_COUNT);

      updateField("images", limitedFiles);
      setStoredImageNames(limitedFiles.map((file) => file.name));
      setValuationImages(limitedFiles);

      setError(
        `Du kannst maximal ${MAX_IMAGE_COUNT} Bilder hochladen. Es wurden nur die ersten ${MAX_IMAGE_COUNT} Bilder übernommen.`
      );
      return;
    }

    updateField("images", uniqueFiles);
    setStoredImageNames(uniqueFiles.map((file) => file.name));
    setValuationImages(uniqueFiles);
  };

  const removeImage = (targetFile: File) => {
    const nextFiles = form.images.filter(
      (file) =>
        !(
          file.name === targetFile.name &&
          file.size === targetFile.size &&
          file.lastModified === targetFile.lastModified
        )
    );

    updateField("images", nextFiles);
    setStoredImageNames(nextFiles.map((file) => file.name));
    setValuationImages(nextFiles);

    if (error) {
      setError("");
    }
  };

  const clearAllImages = () => {
    updateField("images", []);
    setStoredImageNames([]);
    clearValuationImages();

    if (error) {
      setError("");
    }
  };

  const handleContinue = () => {
    if (!canContinue) {
      setError("Bitte vervollständige zuerst die noch offenen Angaben.");
      return;
    }

    setError("");

    const draft: StoredDraft = {
      brand: form.brand,
      model: form.model,
      year: form.year,
      mileage: form.mileage,
      fuel: form.fuel,
      transmission: form.transmission,
      imageCount:
        form.images.length > 0 ? form.images.length : storedImageNames.length,
      imageNames:
        form.images.length > 0 ? form.images.map((file) => file.name) : storedImageNames
    };

    sessionStorage.setItem("ae_valuation_draft", JSON.stringify(draft));
    setValuationImages(form.images);
    router.push("/bewertung/kontakt");
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft md:p-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
              Anfragefortschritt
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {progress}%
            </p>
          </div>

          <div className="text-right text-sm text-slate-500">
            {completedMainCount} von {mainFieldOrder.length} Angaben
          </div>
        </div>

        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-sky-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {currentFieldKey ? (
        <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          Bitte fülle jetzt das markierte Feld aus.
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 space-y-4">
        {visibleCount >= 1 && (
          <Field label="Marke" active={currentFieldKey === "brand"}>
            <select
              className={cn(
                inputClassName,
                currentFieldKey === "brand" && activeInputClassName
              )}
              value={form.brand}
              onChange={(event) => handleBrandChange(event.target.value)}
            >
              <option value="">Bitte wählen</option>
              {vehicleBrands.map((item) => (
                <option key={item.brand} value={item.brand}>
                  {item.brand}
                </option>
              ))}
            </select>
          </Field>
        )}

        {visibleCount >= 2 && (
          <Field label="Modell" active={currentFieldKey === "model"}>
            <select
              className={cn(
                inputClassName,
                currentFieldKey === "model" && activeInputClassName
              )}
              value={form.model}
              onChange={(event) => updateField("model", event.target.value)}
              disabled={!form.brand}
            >
              <option value="">Bitte wählen</option>
              {models.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        )}

        {visibleCount >= 3 && (
          <Field label="Erstzulassung" active={currentFieldKey === "year"}>
            <select
              className={cn(
                inputClassName,
                currentFieldKey === "year" && activeInputClassName
              )}
              value={form.year}
              onChange={(event) => updateField("year", event.target.value)}
            >
              <option value="">Bitte wählen</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        )}

        {visibleCount >= 4 && (
          <Field label="Kilometerstand" active={currentFieldKey === "mileage"}>
            <input
              className={cn(
                inputClassName,
                currentFieldKey === "mileage" && activeInputClassName
              )}
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="z. B. 124500"
              value={form.mileage}
              onChange={(event) => updateField("mileage", event.target.value)}
            />
          </Field>
        )}

        {visibleCount >= 5 && (
          <Field label="Kraftstoff" active={currentFieldKey === "fuel"}>
            <select
              className={cn(
                inputClassName,
                currentFieldKey === "fuel" && activeInputClassName
              )}
              value={form.fuel}
              onChange={(event) => updateField("fuel", event.target.value)}
            >
              <option value="">Bitte wählen</option>
              {fuelOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        )}

        {visibleCount >= 6 && (
          <Field
            label="Getriebe"
            active={currentFieldKey === "transmission"}
          >
            <select
              className={cn(
                inputClassName,
                currentFieldKey === "transmission" && activeInputClassName
              )}
              value={form.transmission}
              onChange={(event) =>
                updateField("transmission", event.target.value)
              }
            >
              <option value="">Bitte wählen</option>
              {transmissionOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        )}

        {showImageField ? (
          <Field label="Bilder hinzufügen">
            <div className="space-y-3">
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-600">
                    <ImagePlus className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      Fahrzeugbilder hinzufügen
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Fotos von außen, innen oder von Schäden helfen bei der ersten
                      Einschätzung. Bilder sind optional, aber hilfreich.
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      Maximal {MAX_IMAGE_COUNT} Bilder, jeweils bis {MAX_IMAGE_SIZE_MB} MB.
                    </p>
                  </div>
                </div>
              </div>

              {storedImageNames.length > 0 && form.images.length === 0 ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Vorher ausgewählte Bilder:
                  <div className="mt-2 space-y-1">
                    {storedImageNames.map((name, index) => (
                      <div key={`${name}-${index}`} className="truncate">
                        • {name}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs">
                    Falls du sie erneut mitsenden möchtest, bitte noch einmal auswählen.
                  </div>
                </div>
              ) : null}

              <input
                className={fileInputClassName}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
              />

              {form.images.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      Ausgewählte Bilder: {form.images.length} / {MAX_IMAGE_COUNT}
                    </p>

                    <button
                      type="button"
                      onClick={clearAllImages}
                      className="text-sm font-semibold text-rose-600 transition hover:text-rose-700"
                    >
                      Alle entfernen
                    </button>
                  </div>

                  {form.images.map((file) => (
                    <div
                      key={`${file.name}-${file.lastModified}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {file.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(file)}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:text-rose-600"
                        aria-label={`Bild ${file.name} entfernen`}
                        title="Bild entfernen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Field>
        ) : null}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              {canContinue
                ? "Letzter Schritt"
                : `Noch ${remainingCount} Angaben offen`}
            </p>
            <p className="text-sm text-slate-500">
              {canContinue
                ? "Weiter zu den Kontaktdaten."
                : "Bitte zuerst das markierte Feld ausfüllen."}
            </p>
          </div>

          <Button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="h-11 shrink-0 gap-2 rounded-2xl"
          >
            {canContinue ? "Weiter zu den Kontaktdaten" : "Weiter"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  active = false
}: {
  label: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <label
      className={cn(
        "block rounded-[22px] transition",
        active && "bg-sky-50/60 p-3 ring-1 ring-sky-200"
      )}
    >
      <span className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
      {active ? (
        <span className="mt-2 block text-xs font-medium text-sky-700">
          Dieses Feld bitte jetzt ausfüllen
        </span>
      ) : null}
    </label>
  );
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

const inputClassName =
  "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 disabled:bg-slate-50 disabled:text-slate-400";

const activeInputClassName = "border-sky-400 ring-2 ring-sky-100";

const fileInputClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:font-semibold file:text-sky-700 focus:border-sky-400";