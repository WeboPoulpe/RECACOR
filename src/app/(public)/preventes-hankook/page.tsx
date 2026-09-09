import type { Metadata } from "next";
import { LandingHankookClient } from "./client";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Stock et disponibilité des pneus poids lourd Hankook | Recacor Le Crès",
  description:
    "Consultez la disponibilité des pneus poids lourd Hankook avec l'atelier du Crès. Réponse commerciale rapide, validation de stock et livraison possible en France entière.",
  alternates: { canonical: "/preventes-hankook" },
  openGraph: {
    title: "Stock et disponibilité pneus poids lourd Hankook | Recacor Le Crès",
    description:
      "Stock en temps réel de pneus poids lourd Hankook au Crès, vérification dédiée et livraison France.",
    url: "https://www.recacor.fr/preventes-hankook",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock et disponibilité pneus poids lourd Hankook | Recacor Le Crès",
    description:
      "Stock en temps réel de pneus poids lourd Hankook au Crès, vérification et livraison France.",
  },
};

export default function PreventesHankookPage() {
  return <LandingHankookClient />;
}
