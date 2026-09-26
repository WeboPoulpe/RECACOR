import type { Metadata } from "next";
import { ReparationCrevaisonClient } from "./client";

export const metadata: Metadata = {
  title: "Réparation crevaison pneu au Crès",
  description:
    "Pneu crevé près de Montpellier ? Au Crès, Recacor démonte et contrôle le pneu avant toute réparation. S'il n'est pas réparable, pneu neuf monté sur place.",
  alternates: { canonical: "/services/reparation-crevaison" },
  openGraph: {
    title: "Réparation crevaison pneu au Crès | Recacor",
    description:
      "Réparation de crevaison au garage Recacor du Crès : contrôle du pneu, réparation quand elle est possible, remplacement sinon.",
    url: "https://www.recacor.fr/services/reparation-crevaison",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ReparationCrevaisonPage() {
  return <ReparationCrevaisonClient />;
}
