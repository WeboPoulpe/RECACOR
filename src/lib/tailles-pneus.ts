/* Tailles de pneus multiples (monte décalée VL, essieux PL).
 * Format commun envoyé par les formulaires, lu par les e-mails et par AdsFlow
 * (form_data.payload.tailles / tailles_resume).
 */

export type TaillePneu = {
  position: string;
  dimension: string;
  quantite?: string;
};

export function formatDimensionVl(p: {
  largeur?: string;
  hauteur?: string;
  diametre?: string;
  charge?: string;
  vitesse?: string;
}): string {
  const lh = [p.largeur, p.hauteur].filter(Boolean).join("/");
  const r = p.diametre ? `R${p.diametre}` : "";
  const indices = `${p.charge || ""}${p.vitesse || ""}`;
  return [lh, r, indices].filter(Boolean).join(" ").trim();
}

export function formatTaillesResume(tailles: TaillePneu[]): string {
  return tailles
    .filter((t) => t.dimension)
    .map((t) => `${t.position ? `${t.position} : ` : ""}${t.dimension}${t.quantite ? ` ×${t.quantite}` : ""}`)
    .join(" · ");
}
