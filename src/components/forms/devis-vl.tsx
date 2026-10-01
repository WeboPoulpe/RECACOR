"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidPhone, isValidOptionalEmail, PHONE_ERROR, EMAIL_ERROR } from "../multi-step-form";
import { Input } from "@/components/ui/input";
import { formatDimensionVl, formatTaillesResume, type TaillePneu } from "@/lib/tailles-pneus";

const LARGEURS = ["145", "155", "165", "175", "185", "195", "205", "215", "225", "235", "245", "255", "265", "275", "285", "295", "305", "315"];
const HAUTEURS = ["25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80"];
const DIAMETRES = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
const CHARGES = Array.from({ length: 61 }, (_, i) => String(60 + i));
const VITESSES = ["H", "T", "V", "W", "Y"];
const TYPES = ["Été", "Hiver", "4 saisons"];
const PRESTATIONS = [
  "Vidange",
  "Parallélisme & Géométrie",
  "Freinage (plaquettes/disques)",
  "Révision",
];

type VlData = {
  largeur: string;
  hauteur: string;
  diametre: string;
  charge: string;
  vitesse: string;
  type: string;
  quantite: string;
  tailles_differentes: boolean;
  ar_largeur: string;
  ar_hauteur: string;
  ar_diametre: string;
  ar_charge: string;
  ar_vitesse: string;
  ar_quantite: string;
  marque_souhaitee: string;
  modele: string;
  plaque: string;
  prestation_complementaire: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: VlData = {
  largeur: "",
  hauteur: "",
  diametre: "",
  charge: "",
  vitesse: "",
  type: "",
  quantite: "",
  tailles_differentes: false,
  ar_largeur: "",
  ar_hauteur: "",
  ar_diametre: "",
  ar_charge: "",
  ar_vitesse: "",
  ar_quantite: "",
  marque_souhaitee: "",
  modele: "",
  plaque: "",
  prestation_complementaire: "",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

type DimensionKeys = {
  largeur: "largeur" | "ar_largeur";
  hauteur: "hauteur" | "ar_hauteur";
  diametre: "diametre" | "ar_diametre";
  charge: "charge" | "ar_charge";
  vitesse: "vitesse" | "ar_vitesse";
};

const AVANT: DimensionKeys = { largeur: "largeur", hauteur: "hauteur", diametre: "diametre", charge: "charge", vitesse: "vitesse" };
const ARRIERE: DimensionKeys = { largeur: "ar_largeur", hauteur: "ar_hauteur", diametre: "ar_diametre", charge: "ar_charge", vitesse: "ar_vitesse" };

function dimensionOf(data: VlData, k: DimensionKeys): string {
  return formatDimensionVl({
    largeur: data[k.largeur],
    hauteur: data[k.hauteur],
    diametre: data[k.diametre],
    charge: data[k.charge],
    vitesse: data[k.vitesse],
  });
}

// Monte décalée : on envoie les deux tailles (format commun e-mail / AdsFlow)
// et la quantité totale ; sinon les champs arrière ne partent pas.
function buildPayload(data: VlData) {
  const { ar_largeur, ar_hauteur, ar_diametre, ar_charge, ar_vitesse, ar_quantite, ...base } = data;
  if (!data.tailles_differentes) return { ...base, tailles_differentes: false };

  const tailles: TaillePneu[] = [
    { position: "Avant", dimension: dimensionOf(data, AVANT), quantite: data.quantite },
    { position: "Arrière", dimension: dimensionOf(data, ARRIERE), quantite: ar_quantite },
  ];
  const total = Number(data.quantite) + Number(ar_quantite);
  return {
    ...base,
    ar_largeur,
    ar_hauteur,
    ar_diametre,
    ar_charge,
    ar_vitesse,
    ar_quantite,
    quantite: data.quantite && ar_quantite && total > 0 ? String(total) : data.quantite || ar_quantite,
    tailles,
    tailles_resume: formatTaillesResume(tailles),
  };
}

export function DevisVlForm() {
  const [data, setData] = useState<VlData>(initial);
  const update = <K extends keyof VlData>(key: K, value: VlData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const [touched, setTouched] = useState<{ telephone: boolean; email: boolean }>({ telephone: false, email: false });
  const markTouched = (field: "telephone" | "email") => setTouched((t) => ({ ...t, [field]: true }));
  const phoneError = touched.telephone && !isValidPhone(data.telephone) ? PHONE_ERROR : undefined;
  const emailError = touched.email && !isValidOptionalEmail(data.email) ? EMAIL_ERROR : undefined;

  const select =
    "w-full h-11 rounded-[4px] border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700";

  const isValid = (step: number) => {
    if (step === 0) return true; // Optional fields
    if (step === 1)
      return isValidPhone(data.telephone) && isValidOptionalEmail(data.email);
    return true;
  };

  const dimensionFields = (k: DimensionKeys) => (
    <>
      <div className="grid grid-cols-3 gap-3">
        <FormField label="Largeur">
          <select value={data[k.largeur]} onChange={(e) => update(k.largeur, e.target.value)} className={select}>
            <option value="">—</option>
            {LARGEURS.map((v) => <option key={v}>{v}</option>)}
          </select>
        </FormField>
        <FormField label="Hauteur">
          <select value={data[k.hauteur]} onChange={(e) => update(k.hauteur, e.target.value)} className={select}>
            <option value="">—</option>
            {HAUTEURS.map((v) => <option key={v}>{v}</option>)}
          </select>
        </FormField>
        <FormField label="Diamètre">
          <select value={data[k.diametre]} onChange={(e) => update(k.diametre, e.target.value)} className={select}>
            <option value="">—</option>
            {DIAMETRES.map((v) => <option key={v}>{v}</option>)}
          </select>
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Indice de charge">
          <select value={data[k.charge]} onChange={(e) => update(k.charge, e.target.value)} className={select}>
            <option value="">—</option>
            {CHARGES.map((v) => <option key={v}>{v}</option>)}
          </select>
        </FormField>
        <FormField label="Indice de vitesse">
          <select value={data[k.vitesse]} onChange={(e) => update(k.vitesse, e.target.value)} className={select}>
            <option value="">—</option>
            {VITESSES.map((v) => <option key={v}>{v}</option>)}
          </select>
        </FormField>
      </div>
    </>
  );

  const payload = buildPayload(data);

  return (
    <MultiStepForm
      id="devis-vl-form"
      serviceType="vl"
      data={payload}
      isValid={isValid}
      invalidStepMessage={() => (!isValidPhone(data.telephone) ? PHONE_ERROR : EMAIL_ERROR)}
      onInvalidAttempt={() => setTouched({ telephone: true, email: true })}
      steps={[
        {
          title: "Votre pneu",
          subtitle: "Tous les champs sont facultatifs — indiquez ce que vous savez",
          content: (
            <div className="space-y-4">
              {data.tailles_differentes && <p className="text-sm font-semibold">Pneus avant</p>}
              {dimensionFields(AVANT)}
              <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={data.tailles_differentes}
                  onChange={(e) => update("tailles_differentes", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-blue-700"
                />
                <span>Tailles différentes à l&apos;avant et à l&apos;arrière (fréquent sur les voitures électriques et sportives)</span>
              </label>
              {data.tailles_differentes && (
                <div className="space-y-4 border-l-2 border-blue-700/30 pl-3">
                  <p className="text-sm font-semibold">Pneus arrière</p>
                  {dimensionFields(ARRIERE)}
                  <FormField label="Nombre de pneus arrière">
                    <Input type="number" min={1} max={8} placeholder="ex. 2" value={data.ar_quantite} onChange={(e) => update("ar_quantite", e.target.value)} className="h-11" />
                  </FormField>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Type de pneu">
                  <select value={data.type} onChange={(e) => update("type", e.target.value)} className={select}>
                    <option value="">—</option>
                    {TYPES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
                <FormField label={data.tailles_differentes ? "Nombre de pneus avant" : "Nombre de pneus"}>
                  <Input type="number" min={1} max={8} placeholder="ex. 2" value={data.quantite} onChange={(e) => update("quantite", e.target.value)} className="h-11" />
                </FormField>
              </div>
              <FormField label="Marque souhaitée (optionnel)">
                <Input placeholder="ex. Michelin, Goodyear, Hankook..." value={data.marque_souhaitee} onChange={(e) => update("marque_souhaitee", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Modèle de véhicule">
                <Input placeholder="ex. Peugeot 208, Clio 5" value={data.modele} onChange={(e) => update("modele", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Plaque d'immatriculation">
                <Input placeholder="AA-000-AA" value={data.plaque} onChange={(e) => update("plaque", e.target.value.toUpperCase())} className="h-11" />
              </FormField>
              <FormField label="Prestation complémentaire souhaitée (optionnel)">
                <select value={data.prestation_complementaire} onChange={(e) => update("prestation_complementaire", e.target.value)} className={select}>
                  <option value="">Aucune</option>
                  {PRESTATIONS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </FormField>
            </div>
          ),
        },
        {
          title: "Vos coordonnées",
          subtitle: "Un numéro de téléphone suffit pour vous rappeler, l'e-mail est facultatif",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nom">
                  <Input value={data.nom} onChange={(e) => update("nom", e.target.value)} className="h-11" />
                </FormField>
                <FormField label="Prénom">
                  <Input value={data.prenom} onChange={(e) => update("prenom", e.target.value)} className="h-11" />
                </FormField>
              </div>
              <FormField label="Téléphone" required error={phoneError}>
                <Input type="tel" inputMode="tel" autoComplete="tel" placeholder="06 00 00 00 00" value={data.telephone} onChange={(e) => update("telephone", e.target.value)} onBlur={() => markTouched("telephone")} aria-invalid={phoneError ? true : undefined} className={phoneError ? "h-11 border-red-500 focus-visible:ring-red-500" : "h-11"} />
              </FormField>
              <FormField label="Email (facultatif)" error={emailError}>
                <Input type="email" inputMode="email" autoComplete="email" placeholder="vous@email.fr" value={data.email} onChange={(e) => update("email", e.target.value)} onBlur={() => markTouched("email")} aria-invalid={emailError ? true : undefined} className={emailError ? "h-11 border-red-500 focus-visible:ring-red-500" : "h-11"} />
              </FormField>
              <FormField label="Code postal">
                <Input placeholder="34920" maxLength={5} value={data.cp} onChange={(e) => update("cp", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Message (optionnel)">
                <textarea
                  rows={3}
                  maxLength={500}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full rounded-[4px] border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 resize-none"
                  placeholder="Précisions utiles..."
                />
              </FormField>
            </div>
          ),
        },
        {
          title: "Confirmation",
          subtitle: "Vérifiez vos informations avant envoi",
          content: null,
        },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          {"tailles_resume" in payload && payload.tailles_resume ? (
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Dimensions</dt>
              <dd className="text-right font-semibold">{payload.tailles_resume}</dd>
            </div>
          ) : (data.largeur || data.hauteur || data.diametre) && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Dimension</dt>
              <dd className="font-semibold">{data.largeur}/{data.hauteur} R{data.diametre}</dd>
            </div>
          )}
          {data.type && <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-semibold">{data.type}</dd></div>}
          {payload.quantite && <div className="flex justify-between"><dt className="text-muted-foreground">Quantité</dt><dd className="font-semibold">{payload.quantite}</dd></div>}
          {data.marque_souhaitee && <div className="flex justify-between"><dt className="text-muted-foreground">Marque</dt><dd className="font-semibold">{data.marque_souhaitee}</dd></div>}
          {data.modele && <div className="flex justify-between"><dt className="text-muted-foreground">Véhicule</dt><dd className="font-semibold">{data.modele}</dd></div>}
          {data.prestation_complementaire && <div className="flex justify-between"><dt className="text-muted-foreground">Prestation</dt><dd className="font-semibold">{data.prestation_complementaire}</dd></div>}
          <div className="flex justify-between"><dt className="text-muted-foreground">Contact</dt><dd className="font-semibold">{data.telephone}</dd></div>
          {data.email && <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd className="font-semibold truncate max-w-[60%]">{data.email}</dd></div>}
        </dl>
      }
    />
  );
}
