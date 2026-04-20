import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

const MAX_IMAGE_COUNT = 5;
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

type VehicleData = {
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
  fuel?: string;
  transmission?: string;
  imageCount?: number;
  imageNames?: string[];
};

type ContactData = {
  name?: string;
  phone?: string;
  email?: string;
  postalCode?: string;
  preferredContact?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatBerlinTime(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin"
  }).format(date);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const cleaned = value.replace(/[^\d+]/g, "");
  return cleaned.length >= 7;
}

function isValidGermanPostalCode(value: string) {
  return /^\d{5}$/.test(value.trim());
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const requestId = String(formData.get("requestId") || "").trim();
    const startedAtRaw = String(formData.get("startedAt") || "");
    const website = String(formData.get("website") || "");
    const privacyAccepted =
      String(formData.get("privacyAccepted") || "") === "true";

    const vehicleRaw = String(formData.get("vehicle") || "{}");
    const contactRaw = String(formData.get("contact") || "{}");

    const vehicle = JSON.parse(vehicleRaw) as VehicleData;
    const contact = JSON.parse(contactRaw) as ContactData;

    if (website.trim() !== "") {
      return NextResponse.json(
        { success: false, message: "Spam erkannt." },
        { status: 400 }
      );
    }

    const startedAt = Number(startedAtRaw || "0");
    const secondsTaken =
      startedAt > 0 ? Math.floor((Date.now() - startedAt) / 1000) : 0;

    if (!startedAt || secondsTaken < 4) {
      return NextResponse.json(
        { success: false, message: "Anfrage wurde zu schnell gesendet." },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        {
          success: false,
          message: "Datenschutzhinweise wurden nicht bestätigt."
        },
        { status: 400 }
      );
    }

    if (!requestId) {
      return NextResponse.json(
        { success: false, message: "Fehlende Anfragenummer." },
        { status: 400 }
      );
    }

    if (
      !vehicle.brand ||
      !vehicle.model ||
      !vehicle.year ||
      !vehicle.mileage ||
      !vehicle.fuel ||
      !vehicle.transmission
    ) {
      return NextResponse.json(
        { success: false, message: "Fahrzeugdaten sind unvollständig." },
        { status: 400 }
      );
    }

    if (
      !contact.name ||
      !contact.phone ||
      !contact.email ||
      !contact.postalCode ||
      !contact.preferredContact
    ) {
      return NextResponse.json(
        { success: false, message: "Kontaktdaten sind unvollständig." },
        { status: 400 }
      );
    }

    if (!isValidPhone(contact.phone)) {
      return NextResponse.json(
        { success: false, message: "Ungültige Telefonnummer." },
        { status: 400 }
      );
    }

    if (!isValidEmail(contact.email)) {
      return NextResponse.json(
        { success: false, message: "Ungültige E-Mail-Adresse." },
        { status: 400 }
      );
    }

    if (!isValidGermanPostalCode(contact.postalCode)) {
      return NextResponse.json(
        { success: false, message: "Ungültige Postleitzahl." },
        { status: 400 }
      );
    }

    const imageEntries = formData.getAll("images");
    const imageFiles = imageEntries.filter(
      (entry): entry is File => entry instanceof File
    );

    if (imageFiles.length > MAX_IMAGE_COUNT) {
      return NextResponse.json(
        {
          success: false,
          message: `Es sind maximal ${MAX_IMAGE_COUNT} Bilder erlaubt.`
        },
        { status: 400 }
      );
    }

    for (const file of imageFiles) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, message: "Es sind nur Bilddateien erlaubt." },
          { status: 400 }
        );
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            message: `Ein Bild überschreitet die maximale Größe von ${MAX_IMAGE_SIZE_MB} MB.`
          },
          { status: 400 }
        );
      }
    }

    const attachments = await Promise.all(
      imageFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        return {
          filename: file.name,
          content: base64
        };
      })
    );

    const now = new Date();
    const submittedAt = formatBerlinTime(now);

    const safe = {
      requestId: escapeHtml(requestId),
      brand: escapeHtml(vehicle.brand || "-"),
      model: escapeHtml(vehicle.model || "-"),
      year: escapeHtml(vehicle.year || "-"),
      mileage: escapeHtml(vehicle.mileage || "-"),
      fuel: escapeHtml(vehicle.fuel || "-"),
      transmission: escapeHtml(vehicle.transmission || "-"),
      imageCount: String(attachments.length),
      name: escapeHtml(contact.name || "-"),
      phone: escapeHtml(contact.phone || "-"),
      email: escapeHtml(contact.email || "-"),
      postalCode: escapeHtml(contact.postalCode || "-"),
      preferredContact: escapeHtml(contact.preferredContact || "-"),
      submittedAt: escapeHtml(submittedAt),
      secondsTaken: String(secondsTaken)
    };

    const phoneForTel = (contact.phone || "").replace(/[^\d+]/g, "");
    const replyTo = isValidEmail(contact.email || "") ? contact.email : undefined;
    const subjectEncoded = encodeURIComponent(
      `Rückmeldung zu Ihrer Fahrzeuganfrage ${requestId}`
    );

    const html = `
      <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#0ea5e9 0%,#0369a1 100%);padding:24px 28px;color:#ffffff;">
            <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.9;">A&amp;E Automobile Nord</div>
            <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">Neue Fahrzeuganfrage</h1>
            <p style="margin:10px 0 0;font-size:14px;opacity:0.95;">
              Anfrage ${safe.requestId} · Eingegangen am ${safe.submittedAt}
            </p>
          </div>

          <div style="padding:28px;">
            <div style="margin-bottom:24px;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
              <div style="font-size:13px;color:#475569;">Bearbeitungsinfo</div>
              <div style="margin-top:8px;font-size:15px;line-height:1.7;">
                Formular ausgefüllt in <strong>${safe.secondsTaken} Sekunden</strong><br />
                Datenschutz bestätigt: <strong>Ja</strong><br />
                Anzahl Anhänge: <strong>${safe.imageCount}</strong>
              </div>
            </div>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:0 0 12px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#0369a1;font-weight:bold;">
                  Fahrzeugdaten
                </td>
              </tr>
            </table>

            <div style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;margin-bottom:28px;">
              ${infoRow("Marke", safe.brand)}
              ${infoRow("Modell", safe.model)}
              ${infoRow("Erstzulassung", safe.year)}
              ${infoRow("Kilometerstand", `${safe.mileage} km`)}
              ${infoRow("Kraftstoff", safe.fuel)}
              ${infoRow("Getriebe", safe.transmission)}
              ${infoRow("Bilder", safe.imageCount)}
            </div>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:0 0 12px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#0369a1;font-weight:bold;">
                  Kontaktdaten
                </td>
              </tr>
            </table>

            <div style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;margin-bottom:28px;">
              ${infoRow("Name", safe.name)}
              ${infoRow("Telefon", safe.phone)}
              ${infoRow("E-Mail", safe.email)}
              ${infoRow("PLZ", safe.postalCode)}
              ${infoRow("Bevorzugter Kontaktweg", safe.preferredContact)}
            </div>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:14px;">
              <tr>
                <td style="padding:0 0 12px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#0369a1;font-weight:bold;">
                  Schnellaktionen
                </td>
              </tr>
            </table>

            <div style="display:flex;flex-wrap:wrap;gap:12px;">
              <a href="tel:${phoneForTel}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:bold;">Anrufen</a>
              <a href="mailto:${safe.email}?subject=${subjectEncoded}" style="display:inline-block;background:#0ea5e9;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:bold;">E-Mail senden</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Anfrage <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || "ae.automobile.nord@gmail.com",
      subject: `Neue Fahrzeuganfrage ${requestId} – ${vehicle.brand || ""} ${vehicle.model || ""}`.trim(),
      replyTo,
      html,
      attachments
    });

    console.log("RESEND RESULT:", result);

    if (result.error) {
      console.error("RESEND ERROR:", result.error);

      return NextResponse.json(
        {
          success: false,
          message: result.error.message || "E-Mail konnte nicht gesendet werden."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "E-Mail erfolgreich gesendet."
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Serverfehler." },
      { status: 500 }
    );
  }
}

function infoRow(label: string, value: string) {
  return `
    <div style="display:flex;gap:18px;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #e2e8f0;">
      <div style="font-size:13px;color:#64748b;">${label}</div>
      <div style="font-size:14px;color:#0f172a;font-weight:600;text-align:right;max-width:65%;">${value}</div>
    </div>
  `;
}