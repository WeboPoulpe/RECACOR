import type { Metadata } from "next";
import { VidangeClient } from "./client";

export const metadata: Metadata = {
  title: "Vidange Voiture Montpellier — À partir de 79€ au Crès",
  description:
    "Vidange complète sans RDV à Montpellier — Le Crès. Huile + filtre inclus. Résultat en 30min. Appelez ou devis en ligne.",
  alternates: { canonical: "/services/vidange" },
};

export default function VidangePage() {
  return <VidangeClient />;
}
