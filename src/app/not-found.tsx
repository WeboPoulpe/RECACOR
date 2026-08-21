import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AssetsProvider } from "@/components/dynamic-media";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page demandée n'existe pas. Retrouvez les services pneus et mécanique de Recacor au Crès.",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  return (
    <AssetsProvider>
      <Header />
      <div className="h-16 lg:h-24" />
      <NotFoundContent />
      <Footer />
    </AssetsProvider>
  );
}
