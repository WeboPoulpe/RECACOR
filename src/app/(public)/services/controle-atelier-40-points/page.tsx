import type { Metadata } from "next";
import { ControleAtelier40Client } from "./client";

export const metadata: Metadata = {
  title: "Contrôle voiture 40 points au Crès | Recacor",
  description:
    "Contrôle atelier 40 points au Crès près de Montpellier : pneus, freins, suspension, niveaux, éclairage et rapport clair remis après la vérification.",
  alternates: { canonical: "/services/controle-atelier-40-points" },
  openGraph: {
    title: "Contrôle voiture 40 points au Crès | Recacor",
    description:
      "Faites vérifier les points essentiels de votre voiture chez Recacor au Crès : pneus, freinage, suspension, niveaux et éclairage.",
    url: "https://www.recacor.fr/services/controle-atelier-40-points",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ControleAtelier40Page() {
  return <ControleAtelier40Client />;
}
