import type { Metadata } from "next";
import { DepannageRoClient } from "./client";

export const metadata: Metadata = {
  title: "Vulcanizare camion pe traseu, asistență rutieră 24/7 - Recacor",
  description:
    "Vulcanizare camion și asistență rutieră 24/7 pe axa Perpignan-Montpellier-Marseille. Apel sau WhatsApp, echipă vorbitoare de română.",
  alternates: {
    canonical: "/ro/depannage-poids-lourd-urgence",
    languages: {
      "fr-FR": "/depannage-poids-lourd-urgence",
      "ro-RO": "/ro/depannage-poids-lourd-urgence",
    },
  },
  openGraph: {
    title: "Vulcanizare camion pe traseu, asistență rutieră 24/7 - Recacor",
    description:
      "Vulcanizare camion și asistență rutieră pentru camioane blocate pe axa Perpignan-Montpellier-Marseille. Apel sau WhatsApp.",
    url: "https://www.recacor.fr/ro/depannage-poids-lourd-urgence",
    siteName: "Recacor",
    locale: "ro_RO",
    type: "website",
  },
};

export default function DepannageRoPage() {
  return <DepannageRoClient />;
}
