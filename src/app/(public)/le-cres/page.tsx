import type { Metadata } from "next";
import { VillePageClient } from "@/components/ville-page";
import { findVille } from "@/lib/villes";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Pneus Le Crès — Garage Recacor Montpellier",
  description:
    "Garage Recacor au Crès (34920). Pneus VL et PL toutes marques, montage sans RDV, stock immédiat, prix discount.",
  alternates: { canonical: "/le-cres" },
};

export default function LeCresPage() {
  const ville = findVille("le-cres");
  if (!ville) notFound();
  return <VillePageClient ville={ville} />;
}
