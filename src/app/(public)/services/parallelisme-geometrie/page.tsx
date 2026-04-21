import type { Metadata } from "next";
import { ParallelismeClient } from "./client";

export const metadata: Metadata = {
  title: "Parallélisme Géométrie Montpellier — Sans RDV au Crès",
  description:
    "Parallélisme et géométrie voiture à Montpellier — Le Crès. Résultat en 30min. Prix discount, sans rendez-vous.",
  alternates: { canonical: "/services/parallelisme-geometrie" },
};

export default function ParallelismePage() {
  return <ParallelismeClient />;
}
