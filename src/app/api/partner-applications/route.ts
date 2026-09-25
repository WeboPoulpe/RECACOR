import { NextResponse } from "next/server";
import path from "node:path";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const REQUIRED_SERVICES = new Set([
  "Montage de pneus voiture",
  "Montage de pneus utilitaire",
  "Montage de pneus poids lourd",
  "Entretien mécanique",
  "Vidange",
  "Freinage",
  "Géométrie et parallélisme",
  "Climatisation",
  "Autres prestations",
]);

type PartnerApplication = {
  company: string;
  siret?: string;
  contactName: string;
  email: string;
  phone: string;
  address?: string;
  postalCode?: string;
  city: string;
  services: string[];
  prices?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function validFileSignature(type: string, buffer: Buffer): boolean {
  if (type === "application/pdf") return buffer.subarray(0, 5).toString() === "%PDF-";
  if (type === "image/jpeg") return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (type === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  return false;
}

async function readDocument(form: FormData, key: "kbis" | "insurance", label: string) {
  const entry = form.get(key);
  if (!(entry instanceof File) || entry.size === 0) return null;
  if (entry.size > MAX_FILE_BYTES) {
    throw new Error("Le document « " + label + " » dépasse la limite de 2 Mo.");
  }
  if (!ALLOWED_TYPES.has(entry.type)) {
    throw new Error("Les pièces doivent être au format PDF, JPG ou PNG.");
  }

  const buffer = Buffer.from(await entry.arrayBuffer());
  if (!validFileSignature(entry.type, buffer)) {
    throw new Error("Le format réel du document « " + label + " » ne correspond pas au fichier annoncé.");
  }

  return {
    filename: key + "-" + path.basename(entry.name).replace(/[^\p{L}\p{N}._-]/gu, "_"),
    content: buffer.toString("base64"),
    size: buffer.length,
  };
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    if (String(form.get("website") || "").trim()) {
      return NextResponse.json({ ok: true });
    }

    const serialized = form.get("application");
    if (typeof serialized !== "string" || serialized.length > 12_000) {
      return NextResponse.json({ error: "Le formulaire est incomplet. Vérifiez les champs et réessayez." }, { status: 400 });
    }

    let data: PartnerApplication;
    try {
      data = JSON.parse(serialized) as PartnerApplication;
    } catch {
      return NextResponse.json({ error: "Le formulaire est incomplet. Vérifiez les champs et réessayez." }, { status: 400 });
    }

    const required = [data.company, data.contactName, data.email, data.phone, data.city];
    if (!required.every((value) => typeof value === "string" && value.trim())) {
      return NextResponse.json({ error: "Complétez les coordonnées obligatoires avant l’envoi." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "L’adresse e-mail fournie n’est pas valide." }, { status: 400 });
    }
    if (!Array.isArray(data.services) || data.services.length === 0 || data.services.some((service) => !REQUIRED_SERVICES.has(service))) {
      return NextResponse.json({ error: "Sélectionnez au moins une prestation proposée par votre garage." }, { status: 400 });
    }

    const [kbis, insurance] = await Promise.all([
      readDocument(form, "kbis", "justificatif d’immatriculation"),
      readDocument(form, "insurance", "assurance RC professionnelle"),
    ]);
    if ((kbis?.size || 0) + (insurance?.size || 0) > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: "La taille totale des documents dépasse 4 Mo." }, { status: 413 });
    }

    const safe = {
      company: escapeHtml(data.company.trim()),
      siret: escapeHtml((data.siret || "").trim() || "Non renseigné"),
      contactName: escapeHtml(data.contactName.trim()),
      email: escapeHtml(data.email.trim()),
      phone: escapeHtml(data.phone.trim()),
      address: escapeHtml((data.address || "").trim()),
      postalCode: escapeHtml((data.postalCode || "").trim()),
      city: escapeHtml(data.city.trim()),
      services: data.services.map(escapeHtml),
      prices: escapeHtml((data.prices || "").trim() || "Non renseigné"),
      message: escapeHtml((data.message || "").trim() || "Aucun message complémentaire"),
    };

    const rows = [
      ["Société", safe.company],
      ["SIRET", safe.siret],
      ["Contact", safe.contactName],
      ["E-mail", safe.email],
      ["Téléphone", safe.phone],
      ["Adresse", [safe.address, safe.postalCode, safe.city].filter(Boolean).join(", ")],
      ["Prestations", safe.services.join(", ")],
      ["Tarifs / précisions", safe.prices.replace(/\n/g, "<br>")],
      ["Message", safe.message.replace(/\n/g, "<br>")],
    ];

    const result = await sendEmail({
      to: "recacor.fr@gmail.com",
      replyTo: data.email.trim(),
      subject: "[Partenariat montage] " + data.company.trim() + " — " + data.city.trim(),
      html:
        "<h1>Nouvelle demande de partenariat de montage</h1>" +
        '<table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#d9dce4">' +
        rows.map(([label, value]) => "<tr><th align=\"left\">" + label + "</th><td>" + value + "</td></tr>").join("") +
        "</table><p>Documents joints : " + [kbis && "justificatif d’immatriculation", insurance && "attestation d’assurance RC professionnelle"].filter(Boolean).join(" et ") + (kbis || insurance ? "." : "aucun document pour le moment.") + "</p>",
      text: [
        "Nouvelle demande de partenariat de montage",
        "Société : " + data.company.trim(),
        "SIRET : " + (data.siret?.trim() || "Non renseigné"),
        "Contact : " + data.contactName.trim(),
        "E-mail : " + data.email.trim(),
        "Téléphone : " + data.phone.trim(),
        "Adresse : " + [data.address?.trim(), data.postalCode?.trim(), data.city.trim()].filter(Boolean).join(", "),
        "Prestations : " + data.services.join(", "),
        "Tarifs / précisions : " + (data.prices?.trim() || "Non renseigné"),
        "Message : " + (data.message?.trim() || "Aucun message complémentaire"),
      ].join("\n"),
      attachments: [kbis, insurance].filter((file): file is NonNullable<typeof file> => file !== null).map(({ filename, content }) => ({ filename, content })),
    });

    if (!result.ok) {
      console.error("[partner application email]", result.error);
      return NextResponse.json(
        { error: "Le dossier n’a pas pu être envoyé. Réessayez ou contactez Recacor par téléphone ou WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Une erreur est survenue pendant l’envoi.";
    const clientError = [
      "dépasse la limite",
      "Les pièces doivent",
      "Le format réel",
    ].some((prefix) => message.startsWith(prefix));
    return NextResponse.json(
      { error: clientError ? message : "Le dossier n’a pas pu être envoyé. Réessayez dans quelques instants." },
      { status: clientError ? 400 : 500 },
    );
  }
}
