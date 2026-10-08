"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitCse } from "./actions";
import { cseFields, type CseFormState } from "./fields";

const inputClass = "mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-[var(--recacor-blue)] focus:ring-2 focus:ring-[var(--recacor-blue)]/20";
const buttonClass = "rounded-[4px] bg-[var(--recacor-yellow)] px-6 py-3 font-bold text-[var(--recacor-ink)] transition hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-wait";

export function PartnershipForm() {
  const [state, action, pending] = useActionState<CseFormState, FormData>(submitCse, {});
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  if (state.success) return <section role="status" className="rounded-2xl border border-green-200 bg-white p-8 sm:p-12">
    <span className="text-sm font-bold uppercase tracking-widest text-green-700">Demande transmise</span>
    <h2 className="mt-3 font-heading text-4xl font-bold">Merci pour vos informations.</h2>
    <p className="mt-4 leading-7 text-slate-600">L’équipe Recacor a reçu votre demande et reprendra contact avec votre référent pour préparer la convention et confirmer les conditions du partenariat.</p>
    <p className="mt-3 text-sm text-slate-500">La convention sera signée séparément par les deux parties.</p>
  </section>;
  return <form action={action} className="space-y-6">
    <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="website">Site web</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {[
      { id: "establishment", title: "Votre établissement", detail: "Les informations qui figureront sur la convention." },
      { id: "representative", title: "Le représentant du CSE", detail: "La personne qui représentera le CSE pour la convention." },
      { id: "contact", title: "Le référent du partenariat", detail: "Notre interlocuteur pour préparer et suivre le partenariat. Il peut s’agir du représentant du CSE." },
    ].map((section, index) => <fieldset key={section.id} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <legend className="sr-only">{section.title}</legend>
      <div className="mb-6 flex items-start gap-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--recacor-night)] text-sm font-bold text-[var(--recacor-yellow)]">{index + 1}</span><div><h2 className="font-heading text-3xl font-bold">{section.title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{section.detail}</p></div></div>
      <div className="grid gap-5 sm:grid-cols-2">{cseFields.filter((field) => field.section === section.id).map((field) => <label key={field.name} htmlFor={field.name} className={`block text-sm font-semibold ${["address", "establishment", "proof"].includes(field.name) ? "sm:col-span-2" : ""}`}>
        {field.label}{"required" in field && field.required ? " *" : ""}
        <input className={inputClass} id={field.name} name={field.name} value={values[field.name] || ""} onChange={(event) => setValues((previous) => ({ ...previous, [field.name]: event.target.value }))} type={"type" in field ? field.type : "text"} required={"required" in field && field.required} maxLength={field.max} pattern={"pattern" in field ? field.pattern : undefined} inputMode={field.name === "postalCode" || field.name === "siret" ? "numeric" : undefined} autoComplete={"autoComplete" in field ? field.autoComplete : undefined} placeholder={"placeholder" in field ? field.placeholder : undefined} />
      </label>)}</div>
    </fieldset>)}
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <label htmlFor="message" className="block text-sm font-semibold">Un complément à nous transmettre ? (facultatif)<textarea id="message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} rows={4} maxLength={2000} className={inputClass} placeholder="Vos questions ou précisions concernant le partenariat…" /></label>
      <p className="mt-5 text-sm leading-6 text-slate-500">Les informations sont transmises à Recacor pour préparer et suivre le partenariat. Ne transmettez pas de liste d’adhérents ni de données personnelles les concernant.</p>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6"><input className="mt-1 size-4 shrink-0 accent-[var(--recacor-blue)]" type="checkbox" name="consent" value="yes" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>J’autorise Recacor à utiliser les coordonnées renseignées pour préparer la convention et me contacter au sujet du partenariat. *</span></label>
      <p className="mt-3 text-sm leading-6 text-slate-500">Pour toute question concernant vos données, consultez notre <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.</p>
      {state.error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-800">{state.error}</p>}
      <button className={`${buttonClass} mt-6 w-full sm:w-auto`} disabled={pending}>{pending ? "Envoi en cours…" : "Transmettre les informations à Recacor"}</button>
      <p className="mt-3 text-xs leading-5 text-slate-500">Ce formulaire ne vaut pas signature de la convention. Les conditions seront confirmées avec Recacor.</p>
    </section>
  </form>;
}
