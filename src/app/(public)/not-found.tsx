import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page demandée n'existe pas. Retrouvez les services pneus et mécanique de Recacor au Crès.",
  robots: { index: false, follow: true },
};

export default function PublicNotFound() {
  return <NotFoundContent />;
}
