import type { Metadata } from "next";
import { VillePageClient } from "@/components/ville-page";
import { findVille } from "@/lib/villes";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Pneus Montpellier — Garage Recacor Le Crès",
  description:
    "Pneus voiture à Montpellier, montage sans RDV chez Recacor au Crès (à 10min). Stock immédiat, prix discount.",
  alternates: { canonical: "/montpellier" },
};

export default function MontpellierPage() {
  const ville = findVille("montpellier");
  if (!ville) notFound();
  return <VillePageClient ville={ville} />;
}
