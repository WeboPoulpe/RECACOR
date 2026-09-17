import type { Metadata } from "next";
import { PneusDordogneClient } from "./client";

export const metadata: Metadata = {
  title: "Dépannage et pneus poids lourd en Dordogne et Gironde",
  description:
    "Astreinte dépannage pneu poids lourd 24h/24 7j/7 en Dordogne et Gironde, appel ou WhatsApp. Vente de pneus PL toutes tailles et recreusage depuis Neuvic.",
  alternates: { canonical: "/pneus-utilitaires-pl/dordogne" },
  openGraph: {
    title: "Dépannage et pneus poids lourd en Dordogne et Gironde - Recacor",
    description:
      "Astreinte dépannage pneu poids lourd 24h/24 7j/7 en Dordogne et Gironde. Vente et recreusage de pneus PL depuis Neuvic.",
    url: "https://www.recacor.fr/pneus-utilitaires-pl/dordogne",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function PneusDordognePage() {
  return <PneusDordogneClient />;
}
