"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, FileCheck2,
  LoaderCircle, Paperclip, Upload, UserRound,
} from "lucide-react";

const steps = [
  { title: "Contact", icon: UserRound },
  { title: "Prestations", icon: Building2 },
  { title: "Finaliser", icon: FileCheck2 },
];

const serviceOptions = [
  "Montage de pneus voiture",
  "Montage de pneus utilitaire",
  "Montage de pneus poids lourd",
  "Entretien mécanique",
  "Vidange",
  "Freinage",
  "Géométrie et parallélisme",
  "Climatisation",
  "Autres prestations",
];

const inputClass =
  "mt-2 min-h-12 w-full border border-slate-300 bg-white px-3 py-3 text-sm text-[var(--recacor-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--recacor-blue)] focus:ring-2 focus:ring-[var(--recacor-blue)]/15";

type ApplicationData = {
  company: string;
  siret: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  services: string[];
  prices: string;
  message: string;
};

export function PartnerApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ApplicationData>({
    company: "",
    siret: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    services: [],
    prices: "",
    message: "",
  });
  const [kbis, setKbis] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof ApplicationData, value: string) =>
    setData((current) => ({ ...current, [key]: value }));

  const toggleService = (service: string) =>
    setData((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));

  const nextStep = () => {
    setError("");
    if (step === 0) {
      if (
        !data.company.trim() ||
        !data.contactName.trim() ||
        !data.email.trim() ||
        !data.phone.trim() ||
        !data.city.trim()
      ) {
        setError("Indiquez le garage, la ville et un moyen de vous recontacter.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError("Saisissez une adresse e-mail valide.");
        return;
      }
      const phoneDigits = data.phone.replace(/\D/g, "");
      if (phoneDigits.length < 8 || phoneDigits.length > 15) {
        setError("Saisissez un numéro de téléphone valide.");
        return;
      }
    }
    if (step === 1 && data.services.length === 0) {
      setError("Sélectionnez au moins une prestation proposée dans votre atelier.");
      return;
    }
    setStep((current) => Math.min(current + 1, 2));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent) {
      setError("Merci de confirmer que Recacor peut traiter ces informations pour étudier votre demande.");
      return;
    }
    setSending(true);
    setError("");
    const formData = new FormData();
    formData.set("application", JSON.stringify(data));
    formData.set("consent", consent ? "1" : "");
    if (kbis) formData.set("kbis", kbis);
    if (insurance) formData.set("insurance", insurance);
    formData.set(
      "website",
      (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value || "",
    );

    try {
      const response = await fetch("/api/partner-applications", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "L’envoi n’a pas pu être confirmé.");
      }
      setSent(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "L’envoi n’a pas pu être confirmé. Réessayez ou contactez-nous.",
      );
    } finally {
      setSending(false);
    }
  };

  const fileInput = (
    file: File | null,
    onChange: (file: File | null) => void,
    id: string,
    title: string,
    description: string,
  ) => (
    <div>
      <label htmlFor={id} className="group flex min-h-36 cursor-pointer flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-[var(--recacor-blue)] hover:bg-blue-50/40">
        {file ? (
          <>
            <CheckCircle2 className="h-7 w-7 text-[var(--recacor-green)]" aria-hidden="true" />
            <span className="mt-3 max-w-full truncate text-sm font-black text-[var(--recacor-ink)]">{file.name}</span>
            <span className="mt-1 text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(1)} Mo · Cliquer pour remplacer</span>
          </>
        ) : (
          <>
            <Upload className="h-7 w-7 text-[var(--recacor-blue)]" aria-hidden="true" />
            <span className="mt-3 text-sm font-black text-[var(--recacor-ink)]">{title}</span>
            <span className="mt-1 text-xs text-slate-500">{description}</span>
          </>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="sr-only"
        onChange={(event) => {
          const nextFile = event.target.files?.[0] || null;
          const otherFile = id === "partner-kbis" ? insurance : kbis;
          if (nextFile && nextFile.size > 2 * 1024 * 1024) {
            setError("Chaque pièce jointe doit faire 2 Mo maximum.");
            event.target.value = "";
            return;
          }
          if (nextFile && otherFile && nextFile.size + otherFile.size > 4 * 1024 * 1024) {
            setError("La taille totale des pièces jointes ne peut pas dépasser 4 Mo.");
            event.target.value = "";
            return;
          }
          setError("");
          onChange(nextFile);
        }}
      />
    </div>
  );

  if (sent) {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-7 sm:p-10" role="status">
        <div className="flex h-14 w-14 items-center justify-center bg-[var(--recacor-green)] text-white">
          <Check className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-black text-[var(--recacor-ink)]">Votre demande a bien été envoyée.</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
          Notre équipe va étudier votre demande et vous recontactera. Pour échanger directement, appelez le 06 87 60 15 75 ou écrivez-nous sur WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-slate-200 bg-white shadow-xl shadow-[var(--recacor-ink)]/[0.06]">
      <div className="border-b border-slate-200 p-5 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">
          <Paperclip className="h-4 w-4" aria-hidden="true" />
          Inscription partenaire
        </div>
        <h3 className="mt-2 text-2xl font-black text-[var(--recacor-ink)]">Parlons de votre atelier</h3>
        <p className="mt-2 text-sm text-slate-600">Quelques coordonnées pour que notre équipe puisse vous recontacter.</p>

        <ol className="mt-7 grid grid-cols-3 gap-2" aria-label="Étapes de la demande">
          {steps.map((item, index) => {
            const StepIcon = item.icon;
            const active = step === index;
            const complete = step > index;
            return (
              <li key={item.title} className={"border-t-2 pt-3 " + (active || complete ? "border-[var(--recacor-blue)]" : "border-slate-200")}>
                <div className="flex items-center gap-2">
                  <span className={"flex h-7 w-7 shrink-0 items-center justify-center " + (active || complete ? "bg-[var(--recacor-blue)] text-white" : "bg-slate-100 text-slate-400")}>
                    {complete ? <Check className="h-4 w-4" aria-hidden="true" /> : <StepIcon className="h-4 w-4" aria-hidden="true" />}
                  </span>
                  <span className={"hidden text-xs font-bold sm:inline " + (active ? "text-[var(--recacor-ink)]" : "text-slate-500")}>{item.title}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-5 sm:p-7">
        <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        {step === 0 && (
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <label className="text-sm font-bold text-[var(--recacor-ink)] sm:col-span-2">
              Raison sociale <span className="text-red-600">*</span>
              <input className={inputClass} autoComplete="organization" value={data.company} onChange={(event) => update("company", event.target.value)} required />
            </label>
            <label className="text-sm font-bold text-[var(--recacor-ink)]">
              Nom du contact <span className="text-red-600">*</span>
              <input className={inputClass} autoComplete="name" value={data.contactName} onChange={(event) => update("contactName", event.target.value)} required />
            </label>
            <label className="text-sm font-bold text-[var(--recacor-ink)]">
              E-mail <span className="text-red-600">*</span>
              <input className={inputClass} type="email" autoComplete="email" value={data.email} onChange={(event) => update("email", event.target.value)} required />
            </label>
            <label className="text-sm font-bold text-[var(--recacor-ink)]">
              Téléphone <span className="text-red-600">*</span>
              <input className={inputClass} type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} required />
            </label>
            <label className="text-sm font-bold text-[var(--recacor-ink)]">
              Ville <span className="text-red-600">*</span>
              <input className={inputClass} autoComplete="address-level2" value={data.city} onChange={(event) => update("city", event.target.value)} required />
            </label>
          </div>
        )}

        {step === 1 && (
          <div>
            <fieldset>
              <legend className="text-sm font-black text-[var(--recacor-ink)]">Quelles prestations proposez-vous ? <span className="text-red-600">*</span></legend>
              <p className="mt-1 text-sm text-slate-500">Sélectionnez toutes les prestations réalisées dans votre atelier.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {serviceOptions.map((service) => {
                  const selected = data.services.includes(service);
                  return (
                    <label key={service} className={"flex min-h-12 cursor-pointer items-center gap-3 border px-3 py-3 text-sm font-semibold transition " + (selected ? "border-[var(--recacor-blue)] bg-blue-50 text-[var(--recacor-ink)]" : "border-slate-200 text-slate-600 hover:border-slate-300")}>
                      <input type="checkbox" checked={selected} onChange={() => toggleService(service)} className="h-4 w-4 accent-[var(--recacor-blue)]" />
                      {service}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <label className="mt-6 block text-sm font-bold text-[var(--recacor-ink)]">
              Tarifs de montage ou précisions sur vos services
              <textarea
                rows={4}
                maxLength={1200}
                className={inputClass + " resize-y"}
                placeholder="Ex. montage voiture à partir de…, tarifs selon la dimension…"
                value={data.prices}
                onChange={(event) => update("prices", event.target.value)}
              />
            </label>
            <details className="mt-5 border border-slate-200 px-4 py-3">
              <summary className="cursor-pointer text-sm font-bold text-[var(--recacor-blue)]">Ajouter l’adresse et le SIRET (facultatif)</summary>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-[var(--recacor-ink)] sm:col-span-2">
                  Adresse de l’atelier
                  <input className={inputClass} autoComplete="street-address" value={data.address} onChange={(event) => update("address", event.target.value)} />
                </label>
                <label className="text-sm font-bold text-[var(--recacor-ink)]">
                  Code postal
                  <input className={inputClass} inputMode="numeric" autoComplete="postal-code" value={data.postalCode} onChange={(event) => update("postalCode", event.target.value)} />
                </label>
                <label className="text-sm font-bold text-[var(--recacor-ink)]">
                  SIRET
                  <input className={inputClass} inputMode="numeric" autoComplete="off" value={data.siret} onChange={(event) => update("siret", event.target.value)} />
                </label>
              </div>
            </details>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="border-l-4 border-yellow-400 bg-[var(--recacor-paper)] p-4 text-sm leading-relaxed text-slate-700">
              Vous pouvez joindre ces justificatifs dès maintenant ou nous les transmettre après un premier échange.
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fileInput(kbis, setKbis, "partner-kbis", "Justificatif d’immatriculation · facultatif", "Kbis ou avis de situation SIRENE · PDF, JPG, PNG")}
              {fileInput(insurance, setInsurance, "partner-insurance", "Assurance RC professionnelle · facultative", "Attestation en cours de validité · PDF, JPG, PNG")}
            </div>
            <label className="mt-6 block text-sm font-bold text-[var(--recacor-ink)]">
              Un message pour Recacor <span className="text-slate-400">(facultatif)</span>
              <textarea
                rows={3}
                maxLength={1200}
                className={inputClass + " resize-y"}
                placeholder="Précisez vos horaires, le nombre de garages ou vos questions."
                value={data.message}
                onChange={(event) => update("message", event.target.value)}
              />
            </label>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-600">
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--recacor-blue)]" />
              <span>
                J’accepte que Recacor utilise les informations et, si je les joins, les documents transmis pour étudier ma demande de partenariat et me recontacter.{" "}
                <Link href="/confidentialite" className="font-bold text-[var(--recacor-blue)] underline underline-offset-2">Politique de confidentialité</Link>
                .
              </span>
            </label>
          </div>
        )}

        {error && <p role="alert" className="mt-5 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => { setError(""); setStep((current) => current - 1); }} className="inline-flex min-h-12 items-center justify-center gap-2 border border-slate-300 px-5 py-3 text-sm font-bold text-[var(--recacor-ink)] transition hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour
            </button>
          ) : <span />}
          {step < 2 ? (
            <button type="button" onClick={nextStep} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--recacor-blue)] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[var(--recacor-indigo)]">
              Continuer <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={sending} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--recacor-blue)] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[var(--recacor-indigo)] disabled:cursor-wait disabled:opacity-60">
              {sending ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Envoi…</> : <>Envoyer ma demande <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
