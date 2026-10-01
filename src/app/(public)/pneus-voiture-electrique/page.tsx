import type { Metadata } from "next";
import { PneusElectriqueClient } from "./client";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pneus voiture électrique au Crès - monte décalée, LLD",
  description:
    "Pneus pour voiture électrique au Crès, près de Montpellier : tailles différentes à l'avant et à l'arrière, marquages HL et constructeur, ce que demande un contrat de LLD ou LOA. Devis selon la dimension.",
  alternates: { canonical: "/pneus-voiture-electrique" },
  openGraph: {
    title: "Pneus voiture électrique au Crès - Recacor",
    description:
      "Tailles avant/arrière, marquages HL et constructeur, fin de LLD : montage des pneus de voiture électrique au Crès, près de Montpellier.",
    url: "https://www.recacor.fr/pneus-voiture-electrique",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function PneusVoitureElectriquePage() {
  const heroImage = await getAsset("vl_hero_image", "");
  return <PneusElectriqueClient heroImage={heroImage} />;
}
