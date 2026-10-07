"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { MultiStepForm, FormField, isValidPhone, isValidOptionalEmail, PHONE_ERROR, EMAIL_ERROR } from "@/components/multi-step-form";
import { Input } from "@/components/ui/input";
import { formatTaillesResume, type TaillePneu } from "@/lib/tailles-pneus";
import { PL_JEROME_CONTACT } from "@/lib/pl-commercial-contact";

type Dimension = { dimension: string; position: string; quantite: string };
const emptyDimension: Dimension = { dimension: "", position: "", quantite: "" };
const selectClass = "h-11 w-full min-w-0 rounded-[4px] border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700";
const sector = /^(01|38|42|69|73|74)\d{3}$/;

export function JeromePlForm() {
  const [dimensions, setDimensions] = useState<Dimension[]>([{ ...emptyDimension }]);
  const [data, setData] = useState({ vehicule: "", usage: "", urgence: "", nom: "", prenom: "", entreprise: "", telephone: "", email: "", cp: "", commune: "", message: "" });
  const update = (key: keyof typeof data, value: string) => setData((previous) => ({ ...previous, [key]: value }));
  const updateDimension = (index: number, key: keyof Dimension, value: string) => setDimensions((previous) => previous.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const tailles: TaillePneu[] = dimensions.filter((item) => item.dimension.trim()).map((item) => ({ ...item, dimension: item.dimension.trim() }));
  const knownSizesResume = formatTaillesResume(tailles);
  const resume = dimensions.filter((item) => item.dimension.trim() || item.position || item.quantite).map((item) => [item.dimension.trim() || "Dimension à préciser", item.position, item.quantite && `${item.quantite} pneu(s)`].filter(Boolean).join(" · ")).join(" ; ");
  const payload = {
    service: "pneus_pl", ...data,
    dimension: tailles[0]?.dimension ?? "",
    tailles, tailles_resume: knownSizesResume,
    quantite: dimensions.map((item) => item.quantite).filter(Boolean).join(" + "),
    message: [data.usage && `Usage : ${data.usage}`, data.commune && `Commune de livraison : ${data.commune}`, resume && `Montes demandées : ${resume}`, !resume && "Dimension à préciser avec le commercial.", data.message].filter(Boolean).join("\n"),
  };
  const validQuantities = dimensions.every((item) => !item.quantite || /^[1-9]\d{0,2}$/.test(item.quantite));
  const isValid = (step: number) => step === 0 ? validQuantities : step !== 1 || (isValidPhone(data.telephone) && isValidOptionalEmail(data.email) && sector.test(data.cp.trim()) && !!data.commune.trim());
  const validationMessage = (step: number) => {
    if (step === 0) return "Indiquez une quantité entière comprise entre 1 et 999 pour chaque monte renseignée.";
    if (!isValidPhone(data.telephone)) return PHONE_ERROR;
    if (!isValidOptionalEmail(data.email)) return EMAIL_ERROR;
    if (!sector.test(data.cp.trim())) return "Indiquez un code postal de l’Ain, de l’Isère, de la Loire, du Rhône, de la Savoie ou de la Haute-Savoie. Pour un autre secteur, utilisez le formulaire national ci-dessus.";
    return "Indiquez la commune de livraison.";
  };

  return (
    <>
      <MultiStepForm
        id="devis-pl-form"
        serviceType="pl"
        successHref={`${PL_JEROME_CONTACT.pagePath}/merci`}
        data={payload}
        isValid={isValid}
        invalidStepMessage={validationMessage}
        submitLabel="Envoyer ma demande de pneus"
        steps={[
          { title: "Vos pneus et votre véhicule", subtitle: "Dimension inconnue ? Laissez le champ vide, nous la préciserons ensemble.", content: <div className="space-y-5">
            <FormField label="Véhicule et usage"><Input aria-label="Véhicule et usage" placeholder="Ex. benne, tracteur routier, semi-remorque" value={data.vehicule} onChange={(e) => update("vehicule", e.target.value)} className="h-11" /></FormField>
            <FormField label="Vous roulez principalement…"><select aria-label="Usage du véhicule" value={data.usage} onChange={(e) => update("usage", e.target.value)} className={selectClass}><option value="">Choisir un usage</option><option>Sur route</option><option>Sur route et chantier</option><option>Sur chantier</option><option>Autre usage à préciser</option></select></FormField>
            {dimensions.map((item, index) => <fieldset key={index} className="space-y-3 border-t border-border pt-4"><legend className="px-1 text-sm font-bold">Monte {index + 1}</legend>
              <FormField label="Dimension complète"><Input aria-label={`Dimension ${index + 1}`} placeholder="Ex. 315/80 R22.5 156/150L" value={item.dimension} onChange={(e) => updateDimension(index, "dimension", e.target.value)} className="h-11" /></FormField>
              <div className="grid grid-cols-[minmax(0,1fr)_5.5rem] gap-3"><FormField label="Essieu"><select aria-label={`Essieu ${index + 1}`} value={item.position} onChange={(e) => updateDimension(index, "position", e.target.value)} className={selectClass}><option value="">À préciser</option><option>Directeur / avant</option><option>Moteur / arrière</option><option>Remorque</option></select></FormField><FormField label="Quantité"><Input aria-label={`Quantité ${index + 1}`} type="number" min={1} max={999} inputMode="numeric" value={item.quantite} onChange={(e) => updateDimension(index, "quantite", e.target.value)} className="h-11" /></FormField></div>
              {index > 0 && <button type="button" onClick={() => setDimensions((previous) => previous.filter((_, i) => i !== index))} className="inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground"><X className="h-4 w-4" /> Retirer cette monte</button>}
            </fieldset>)}
            {dimensions.length < 4 && <button type="button" onClick={() => setDimensions((previous) => [...previous, { ...emptyDimension }])} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700"><Plus className="h-4 w-4" /> Ajouter une autre dimension</button>}
            <FormField label="Échéance souhaitée (facultatif)"><Input aria-label="Échéance souhaitée" placeholder="Ex. semaine prochaine, avant le 20 octobre" value={data.urgence} onChange={(e) => update("urgence", e.target.value)} className="h-11" /></FormField>
          </div> },
          { title: "Où livrer et comment vous joindre ?", subtitle: "Le code postal permet d’orienter votre demande vers Jérôme.", content: <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3"><FormField label="Prénom"><Input aria-label="Prénom" autoComplete="given-name" value={data.prenom} onChange={(e) => update("prenom", e.target.value)} className="h-11" /></FormField><FormField label="Nom"><Input aria-label="Nom" autoComplete="family-name" value={data.nom} onChange={(e) => update("nom", e.target.value)} className="h-11" /></FormField></div>
            <FormField label="Entreprise"><Input aria-label="Entreprise" autoComplete="organization" value={data.entreprise} onChange={(e) => update("entreprise", e.target.value)} className="h-11" /></FormField>
            <FormField label="Téléphone" required><Input aria-label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={data.telephone} onChange={(e) => update("telephone", e.target.value)} className="h-11" /></FormField>
            <FormField label="E-mail (facultatif)"><Input aria-label="E-mail" type="email" autoComplete="email" value={data.email} onChange={(e) => update("email", e.target.value)} className="h-11" /></FormField>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3"><FormField label="Code postal" required><Input aria-label="Code postal" autoComplete="postal-code" inputMode="numeric" maxLength={5} value={data.cp} onChange={(e) => update("cp", e.target.value.replace(/\D/g, ""))} className="h-11" /></FormField><FormField label="Commune" required><Input aria-label="Commune" autoComplete="address-level2" value={data.commune} onChange={(e) => update("commune", e.target.value)} className="h-11" /></FormField></div>
            <p className="text-xs leading-6 text-muted-foreground">Pour une livraison hors des départements 01, 38, 42, 69, 73 et 74, <Link href="/pneus-utilitaires-pl#devis" className="font-semibold text-blue-700 underline">contactez l’équipe PL via le formulaire national</Link>.</p>
            <FormField label="Précisions ou intervention souhaitée (facultatif)"><textarea aria-label="Précisions" placeholder="Ex. prestation souhaitée, lieu d’intervention, contraintes de livraison" rows={3} maxLength={1000} value={data.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-[4px] border border-input p-3 text-sm" /></FormField>
          </div> },
          { title: "Vérifier et envoyer", content: null },
        ]}
        summary={<dl className="space-y-3 text-sm"><div><dt className="text-muted-foreground">Pneus demandés</dt><dd className="mt-1 break-words font-semibold">{resume || "Dimension à préciser ensemble"}</dd></div><div><dt className="text-muted-foreground">Livraison</dt><dd className="font-semibold">{data.cp} {data.commune}</dd></div><div><dt className="text-muted-foreground">Téléphone</dt><dd className="font-semibold">{data.telephone}</dd></div>{data.urgence && <div><dt className="text-muted-foreground">Échéance souhaitée</dt><dd>{data.urgence}</dd></div>}<div className="border-t border-border pt-3 text-xs leading-6 text-muted-foreground">Disponibilité, prix et modalités de livraison seront confirmés avant commande.</div></dl>}
      />
    </>
  );
}
