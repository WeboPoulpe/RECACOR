"use server";

import { sendEmail } from "@/lib/mailer";
import { cseFields, type CseFormState } from "./fields";

export async function submitCse(_state: CseFormState, form: FormData): Promise<CseFormState> {
  if (form.get("website")) return { error: "Le formulaire n’a pas pu être envoyé." };
  if (form.get("consent") !== "yes") return { error: "Confirmez la transmission de vos informations à Recacor." };

  const values: Record<string, string> = {};
  for (const field of cseFields) {
    const entry = form.get(field.name);
    if (entry !== null && typeof entry !== "string") return { error: "Le formulaire contient une valeur invalide." };
    const value = (entry || "").trim();
    if (("required" in field && field.required && !value) || value.length > field.max || /[\r\n\x00]/.test(value)) {
      return { error: `Vérifiez le champ « ${field.label} ».` };
    }
    if (value && "pattern" in field && !new RegExp(`^${field.pattern}$`).test(value)) return { error: `Vérifiez le champ « ${field.label} ».` };
    values[field.name] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return { error: "Vérifiez l’adresse e-mail du référent." };
  if (!/^\+?[\d\s().-]{6,30}$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 6) return { error: "Vérifiez le téléphone du référent." };
  const message = form.get("message");
  if (message !== null && (typeof message !== "string" || message.length > 2000)) return { error: "Le message doit contenir au maximum 2 000 caractères." };
  const recipient = process.env.CSE_RECIPIENT_EMAIL || "recacor.fr@gmail.com";
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) return { error: "L’envoi est momentanément indisponible. Réessayez plus tard." };
  const text = [
    "DEMANDE DE PARTENARIAT CSE — RECACOR",
    "Informations pour préparer la convention ; ce formulaire ne vaut pas signature.",
    "",
    ...cseFields.map((field) => `${field.label} : ${values[field.name] || "Non renseigné"}`),
    "", `Message : ${typeof message === "string" ? message.trim() || "Aucun" : "Aucun"}`,
    "", "Le représentant autorise Recacor à utiliser ces coordonnées pour préparer et suivre le partenariat.",
    `Réception : ${new Date().toISOString()}`,
  ].join("\n");
  const escaped = text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
  const result = await sendEmail({
    to: recipient, replyTo: values.email,
    subject: `[Partenariat CSE] ${values.establishment}`,
    text, html: `<div style="font-family:Arial,sans-serif;white-space:pre-wrap;line-height:1.7">${escaped}</div>`,
  });
  if (!result.ok) return { error: "Votre demande n’a pas été envoyée. Vos informations sont conservées à l’écran : réessayez dans quelques instants." };
  return { success: true };
}
