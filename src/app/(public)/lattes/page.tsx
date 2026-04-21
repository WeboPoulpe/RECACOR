import type { Metadata } from "next";
import { VillePageClient } from "@/components/ville-page";
import { findVille } from "@/lib/villes";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Pneus Lattes — Garage Recacor Montpellier Le Crès",
  description:
    "Pneus voiture à Lattes, montage sans RDV chez Recacor au Crès (à 15min). Stock immédiat, prix discount.",
  alternates: { canonical: "/lattes" },
};

export default function LattesPage() {
  const ville = findVille("lattes");
  if (!ville) notFound();
  return <VillePageClient ville={ville} />;
}
