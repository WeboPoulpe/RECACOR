import type { Metadata } from "next";
import { PneusVoitureClient } from "./client";

export const metadata: Metadata = {
  title: "Pneus Voiture Montpellier — Toutes marques au Crès",
  description:
    "Pneus été, hiver et 4 saisons à prix discount. Stock disponible, montage en 15min sans RDV à Montpellier — Le Crès.",
  alternates: { canonical: "/pneus-voiture" },
};

export default function PneusVoiturePage() {
  return <PneusVoitureClient />;
}
