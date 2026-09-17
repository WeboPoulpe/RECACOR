import type { Metadata } from "next";
import { DepannageClient } from "./client";

export const metadata: Metadata = {
  title: "Dépannage poids lourd urgence 24/7 - Perpignan Marseille Millau",
  description:
    "Assistance pneu poids lourd 24h/24 7j/7 sur route. Intervention Perpignan, Nîmes, Montpellier, Béziers, Narbonne, Marseille, Millau. English spoken.",
  alternates: { canonical: "/depannage-poids-lourd-urgence" },
  openGraph: {
    title: "Dépannage poids lourd urgence 24/7 - Recacor",
    description:
      "Assistance pneu poids lourd 24h/24 7j/7 sur route, axe Perpignan-Marseille-Millau. English spoken.",
    url: "https://www.recacor.fr/depannage-poids-lourd-urgence",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function DepannageUrgencePage() {
  return <DepannageClient />;
}
