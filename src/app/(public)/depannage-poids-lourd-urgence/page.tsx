import type { Metadata } from "next";
import { DepannageClient } from "./client";

export const metadata: Metadata = {
  title: "Dépannage pneu poids lourd 24/7 - Perpignan, Avignon, Millau",
  description:
    "Une dizaine de camions d'intervention avec pneus en stock, 24h/24 et 7j/7, près des sorties de l'A9 de Perpignan à Avignon et de l'A75 jusqu'à Millau. Appel ou WhatsApp.",
  alternates: {
    canonical: "/depannage-poids-lourd-urgence",
    languages: {
      "fr-FR": "/depannage-poids-lourd-urgence",
      "ro-RO": "/ro/depannage-poids-lourd-urgence",
    },
  },
  openGraph: {
    title: "Dépannage pneu poids lourd 24/7 - Recacor",
    description:
      "Dépannage pneu poids lourd 24h/24 et 7j/7 près des sorties de l'A9 de Perpignan à Avignon et de l'A75 jusqu'à Millau. Appel ou WhatsApp.",
    url: "https://www.recacor.fr/depannage-poids-lourd-urgence",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function DepannageUrgencePage() {
  return <DepannageClient />;
}
