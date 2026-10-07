import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PlWhatsappButton } from "@/components/pl-whatsapp-button";
import { PL_JEROME_CONTACT } from "@/lib/pl-commercial-contact";

export const metadata: Metadata = {
  title: { absolute: "Demande de pneus PL enregistrée | Recacor — Jérôme" },
  description: "Votre demande de pneus poids lourd est enregistrée. Contactez Jérôme pour compléter les informations ou envoyer une photo du pneu.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${PL_JEROME_CONTACT.pagePath}/merci` },
  openGraph: {
    title: "Demande de pneus PL enregistrée | Recacor — Jérôme",
    description: "Complétez votre demande de pneus poids lourd auprès de Jérôme.",
    url: `${PL_JEROME_CONTACT.pagePath}/merci`,
  },
};

export default function MerciJeromePage() {
  return <section className="recacor-shell max-w-3xl py-16 sm:py-24"><CheckCircle2 className="h-12 w-12 text-blue-700" /><h1 className="recacor-title mt-6">Votre demande de pneus est enregistrée.</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">L’équipe PL dispose de vos informations pour préparer une réponse. Vous pouvez compléter votre demande en envoyant une photo du flanc du pneu à Jérôme.</p><PlWhatsappButton className="mt-8" /><p className="mt-6 text-sm text-muted-foreground">La disponibilité et les modalités de livraison seront confirmées avant commande.</p><Link href={PL_JEROME_CONTACT.pagePath} className="mt-8 inline-block text-sm font-semibold text-blue-700 underline">Revenir à l’offre pneus PL Lyon / Rhône-Alpes</Link></section>;
}
