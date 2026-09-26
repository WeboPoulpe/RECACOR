"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { pushFormSubmit, pushFormError, getUtmData } from "@/lib/tracking";
import { isValidPhone, isValidOptionalEmail, PHONE_ERROR, EMAIL_ERROR, FormField } from "@/components/multi-step-form";
import { WHATSAPP_NOTICE_FR } from "@/lib/whatsapp-consent";

export function ContactSimpleForm() {
  const router = useRouter();
  const [data, setData] = useState({ nom: "", telephone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [rgpd, setRgpd] = useState(false);
  const [contactPreference, setContactPreference] = useState<"phone" | "whatsapp" | "both">("phone");
  const [submitError, setSubmitError] = useState("");

  const [touched, setTouched] = useState({ telephone: false, email: false });
  const phoneError = touched.telephone && !isValidPhone(data.telephone) ? PHONE_ERROR : undefined;
  const emailError = touched.email && !isValidOptionalEmail(data.email) ? EMAIL_ERROR : undefined;
  const isValid = isValidPhone(data.telephone) && isValidOptionalEmail(data.email) && rgpd;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ telephone: true, email: true });
      setSubmitError(
        !isValidPhone(data.telephone)
          ? PHONE_ERROR
          : !isValidOptionalEmail(data.email)
            ? EMAIL_ERROR
            : "Merci de cocher la case de consentement pour envoyer votre message.",
      );
      pushFormError("contact", "contact-form", 1, rgpd ? "validation" : "consent");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const submissionId = crypto.randomUUID();
    const payload = {
      ...data,
      ...getUtmData(),
      form_id: "contact-form",
      service_type: "contact",
      whatsapp_optin: contactPreference !== "phone",
      contact_preference: contactPreference,
      submission_id: submissionId,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Le serveur n'a pas confirmé la demande.");
      }
      const result = await response.json();
      if (!result.accepted || !result.tracking_id) {
        throw new Error("Le serveur n'a pas confirmé l'enregistrement du lead.");
      }

      await pushFormSubmit("contact", "contact-form", result.tracking_id, result.accepted_by || []);
      router.push("/merci");
    } catch (err) {
      console.error("[contact submit]", err);
      setSubmitting(false);
      setSubmitError(
        "Votre message n'a pas pu être confirmé. Réessayez ou appelez-nous directement.",
      );
    }
  };

  const update = (key: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <form id="contact-form" onSubmit={handleSubmit} data-recacor-form="true" className="space-y-4">
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="gclid" />
      <input type="hidden" name="fbclid" />
      <input type="hidden" name="page_source" />
      <input type="hidden" name="referrer" />

      <FormField label="Nom">
        <Input value={data.nom} onChange={update("nom")} className="h-11" placeholder="Votre nom" />
      </FormField>
      <FormField label="Téléphone" required error={phoneError}>
        <Input type="tel" inputMode="tel" autoComplete="tel" value={data.telephone} onChange={update("telephone")} onBlur={() => setTouched((t) => ({ ...t, telephone: true }))} aria-invalid={phoneError ? true : undefined} className={phoneError ? "h-11 border-red-500 focus-visible:ring-red-500" : "h-11"} placeholder="06 00 00 00 00" />
      </FormField>
      <FormField label="Email (facultatif)" error={emailError}>
        <Input type="email" inputMode="email" autoComplete="email" value={data.email} onChange={update("email")} onBlur={() => setTouched((t) => ({ ...t, email: true }))} aria-invalid={emailError ? true : undefined} className={emailError ? "h-11 border-red-500 focus-visible:ring-red-500" : "h-11"} placeholder="vous@email.fr" />
      </FormField>
      <FormField label="Message">
        <textarea
          rows={5}
          maxLength={1000}
          value={data.message}
          onChange={update("message")}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none"
          placeholder="Comment pouvons-nous vous aider ?"
        />
      </FormField>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-border accent-purple-bright cursor-pointer"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          En soumettant ce formulaire, j&apos;accepte que mes données soient traitées par
          Recacor dans le cadre de ma demande.{" "}
          <Link href="/confidentialite" className="text-purple-bright hover:underline">
            Politique de confidentialité
          </Link>
        </span>
      </label>

      <fieldset className="space-y-2 rounded-xl border border-border p-4">
        <legend className="px-1 text-sm font-semibold">Comment préférez-vous être recontacté ?</legend>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="radio" name="contact-form-contact-preference" checked={contactPreference === "phone"}
            onChange={() => setContactPreference("phone")} className="accent-purple-bright" />
          Par téléphone
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="radio" name="contact-form-contact-preference" checked={contactPreference === "whatsapp"}
            onChange={() => setContactPreference("whatsapp")} className="accent-purple-bright" />
          Sur WhatsApp
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="radio" name="contact-form-contact-preference" checked={contactPreference === "both"}
            onChange={() => setContactPreference("both")} className="accent-purple-bright" />
          Les deux
        </label>
        {contactPreference !== "phone" && (
          <p className="text-xs text-muted-foreground leading-relaxed">{WHATSAPP_NOTICE_FR}</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? "Envoi..." : "Envoyer mon message"}
        <ArrowRight className="h-4 w-4" />
      </button>
      {submitError && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {submitError}
        </p>
      )}
    </form>
  );
}
