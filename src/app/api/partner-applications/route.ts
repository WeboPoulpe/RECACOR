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

    const documentNames = [
      kbis && "Justificatif d’immatriculation",
      insurance && "Assurance RC professionnelle",
    ].filter((name): name is string => Boolean(name));
    const receivedAt = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Paris",
    }).format(new Date());
    const logoUrl = "https://www.recacor.fr/logo-recacor-email.png";
    const telHref = data.phone.trim().replace(/[^\d+]/g, "");
    const servicesHtml = safe.services
      .map((service) => '<span style="display:inline-block;margin:0 6px 7px 0;padding:7px 10px;border-radius:4px;background:#eef0ff;color:#2e2d8a;font-size:13px;font-weight:700">' + service + "</span>")
      .join("");
    const documentsHtml = documentNames.length
      ? documentNames.map((name) => '<li style="margin:0 0 6px">' + name + "</li>").join("")
      : '<li style="margin:0">Aucun document joint pour le moment.</li>';
    const pricesHtml = safe.prices.replace(/\n/g, "<br>");
    const messageHtml = safe.message.replace(/\n/g, "<br>");
    const cardStyle = "padding:20px 22px;border:1px solid #e2e8f0;border-radius:6px;background:#ffffff";
    const labelStyle = "width:130px;padding:6px 12px 6px 0;color:#64748b;font-size:13px;vertical-align:top";
    const valueStyle = "padding:6px 0;color:#172b45;font-size:14px;font-weight:600;vertical-align:top";

    const result = await sendEmail({
      to: "recacor.fr@gmail.com",
      replyTo: data.email.trim(),
      subject: "[Partenariat montage] " + data.company.trim() + " — " + data.city.trim(),
      html:
        '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
        '<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#071b33">' +
        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6fb"><tr><td align="center" style="padding:28px 12px">' +
        '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-collapse:separate;border-spacing:0">' +
        '<tr><td height="6" style="height:6px;background:#ffc928;font-size:0;line-height:0">&nbsp;</td></tr>' +
        '<tr><td style="padding:20px 26px;background:#ffffff;border-bottom:1px solid #e5e9f1"><a href="https://www.recacor.fr/" style="display:inline-block;text-decoration:none"><img src="' + logoUrl + '" width="180" height="38" alt="Recacor" style="display:block;width:180px;height:38px;border:0;object-fit:contain"></a><div style="margin-top:8px;color:#2e2d8a;font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase">Réseau partenaire · Montage en atelier</div></td></tr>' +
        '<tr><td style="padding:30px 26px 24px;background:#ffffff"><div style="display:inline-block;padding:6px 9px;border-radius:3px;background:#fff4c2;color:#6b5100;font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase">Nouvelle candidature</div>' +
        '<h1 style="margin:15px 0 8px;color:#071b33;font-size:25px;line-height:1.25">Un atelier souhaite rejoindre le réseau</h1>' +
        '<p style="margin:0;color:#64748b;font-size:14px;line-height:1.6">Demande reçue le ' + receivedAt + ' via le formulaire partenaire.</p></td></tr>' +
        '<tr><td style="padding:0 26px 16px;background:#ffffff"><div style="' + cardStyle + '"><div style="color:#64748b;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase">Atelier</div><div style="margin-top:6px;color:#071b33;font-size:20px;font-weight:800">' + safe.company + '</div><div style="margin-top:5px;color:#475569;font-size:14px">' + [safe.address, safe.postalCode, safe.city].filter(Boolean).join(" · ") + '</div><div style="margin-top:5px;color:#64748b;font-size:13px">SIRET : ' + safe.siret + '</div></div></td></tr>' +
        '<tr><td style="padding:0 26px 16px;background:#ffffff"><div style="' + cardStyle + '"><h2 style="margin:0 0 12px;color:#2e2d8a;font-size:15px">Contact du garage</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">' +
        '<tr><td style="' + labelStyle + '">Contact</td><td style="' + valueStyle + '">' + safe.contactName + '</td></tr>' +
        '<tr><td style="' + labelStyle + '">E-mail</td><td style="' + valueStyle + '"><a href="mailto:' + safe.email + '" style="color:#1b4fd8;text-decoration:underline">' + safe.email + '</a></td></tr>' +
        '<tr><td style="' + labelStyle + '">Téléphone</td><td style="' + valueStyle + '"><a href="tel:' + telHref + '" style="color:#1b4fd8;text-decoration:underline">' + safe.phone + '</a></td></tr>' +
        '</table><div style="margin-top:16px"><a href="mailto:' + safe.email + '?subject=' + encodeURIComponent("Votre demande de partenariat Recacor") + '" style="display:inline-block;padding:11px 16px;border-radius:4px;background:#1b4fd8;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none">Répondre au candidat</a></div></div></td></tr>' +
        '<tr><td style="padding:0 26px 16px;background:#ffffff"><div style="' + cardStyle + '"><h2 style="margin:0 0 12px;color:#2e2d8a;font-size:15px">Prestations proposées</h2><div>' + servicesHtml + '</div><div style="margin-top:8px;color:#64748b;font-size:12px;font-weight:700">Tarifs et précisions communiqués</div><div style="margin-top:5px;color:#071b33;font-size:14px;line-height:1.6">' + pricesHtml + '</div></div></td></tr>' +
        '<tr><td style="padding:0 26px 16px;background:#ffffff"><div style="' + cardStyle + '"><h2 style="margin:0 0 10px;color:#2e2d8a;font-size:15px">Documents transmis</h2><ul style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.55">' + documentsHtml + '</ul></div></td></tr>' +
        (safe.message !== "Aucun message complémentaire" ? '<tr><td style="padding:0 26px 16px;background:#ffffff"><div style="' + cardStyle + '"><h2 style="margin:0 0 9px;color:#2e2d8a;font-size:15px">Message du garage</h2><div style="color:#475569;font-size:14px;line-height:1.65">' + messageHtml + '</div></div></td></tr>' : "") +
        '<tr><td style="padding:16px 26px 24px;background:#071b33;color:#d9e2f2;font-size:11px;line-height:1.6">Notification automatique · Formulaire « Devenir partenaire de montage »<br><a href="https://www.recacor.fr/" style="color:#ffc928;text-decoration:none">www.recacor.fr</a></td></tr>' +
        '<tr><td height="5" style="height:5px;background:#ffc928;font-size:0;line-height:0">&nbsp;</td></tr></table></td></tr></table></body></html>',
      text: [
        "NOUVELLE CANDIDATURE PARTENAIRE — RECACOR",
        "Reçue le " + receivedAt,
        "",
        "Société : " + data.company.trim(),
        "SIRET : " + (data.siret?.trim() || "Non renseigné"),
        "Contact : " + data.contactName.trim(),
        "E-mail : " + data.email.trim(),
        "Téléphone : " + data.phone.trim(),
        "Adresse : " + [data.address?.trim(), data.postalCode?.trim(), data.city.trim()].filter(Boolean).join(", "),
        "Prestations proposées : " + data.services.join(", "),
        "Tarifs / précisions : " + (data.prices?.trim() || "Non renseigné"),
        "Documents transmis : " + (documentNames.join(", ") || "Aucun document joint pour le moment"),
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
