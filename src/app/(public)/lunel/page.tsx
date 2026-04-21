import type { Metadata } from "next";
import { VillePageClient } from "@/components/ville-page";
import { findVille } from "@/lib/villes";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Pneus Lunel — Garage Recacor Montpellier Le Crès",
  description:
    "Pneus voiture à Lunel, montage sans RDV chez Recacor au Crès (à 20min). Stock immédiat, prix discount.",
  alternates: { canonical: "/lunel" },
};

export default function LunelPage() {
  const ville = findVille("lunel");
  if (!ville) notFound();
  return <VillePageClient ville={ville} />;
}
