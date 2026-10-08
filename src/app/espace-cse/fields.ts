export const cseFields = [
  { name: "establishment", label: "Nom de l’établissement / du CSE", required: true, max: 200, section: "establishment" },
  { name: "address", label: "Adresse", required: true, max: 300, section: "establishment", autoComplete: "street-address" },
  { name: "postalCode", label: "Code postal", required: true, max: 5, section: "establishment", autoComplete: "postal-code", pattern: "[0-9]{5}" },
  { name: "city", label: "Ville", required: true, max: 100, section: "establishment", autoComplete: "address-level2" },
  { name: "siret", label: "SIRET (si disponible)", max: 14, section: "establishment", pattern: "[0-9]{14}" },
  { name: "representative", label: "Nom et prénom du représentant", required: true, max: 150, section: "representative", autoComplete: "name" },
  { name: "role", label: "Fonction au sein du CSE", required: true, max: 150, section: "representative" },
  { name: "contact", label: "Nom et prénom du référent du partenariat", required: true, max: 150, section: "contact" },
  { name: "email", label: "E-mail du référent", required: true, max: 254, section: "contact", type: "email", autoComplete: "email" },
  { name: "phone", label: "Téléphone du référent", required: true, max: 30, section: "contact", type: "tel", autoComplete: "tel" },
  { name: "proof", label: "Justificatif prévu pour les adhérents (facultatif)", max: 250, section: "contact", placeholder: "Carte d’adhérent, attestation du CSE…" },
] as const;

export type CseFormState = { error?: string; success?: boolean };
