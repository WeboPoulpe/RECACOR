import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, Truck } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { RelatedArticles } from "@/components/related-articles";
import { PHONE_DISPLAY } from "@/lib/tracking";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pneus poids lourd en Moselle | Devis transport et remorque",
  description:
    "Besoin de pneus poids lourd en Moselle ? Recacor étudie votre dimension, votre véhicule et votre usage pour préparer un devis professionnel.",
  alternates: { canonical: "/pneus-utilitaires-pl/moselle" },
  openGraph: {
    title: "Pneus poids lourd en Moselle | Recacor",
    description:
      "Pneus PL, transport, remorque et besoins TP/BTP : transmettez votre dimension et votre localisation pour préparer une demande professionnelle.",
    url: "https://www.recacor.fr/pneus-utilitaires-pl/moselle",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

const faqs = [
  {
    q: "Que faut-il indiquer pour un devis pneus PL en Moselle ?",
    a: "La dimension complète, le type de véhicule ou d'engin, la quantité, l'essieu concerné si vous l'avez et le niveau d'urgence permettent de préparer une réponse plus précise.",
  },
  {
    q: "Recacor étudie-t-il les demandes de transport et de remorque ?",
    a: "Oui. Les besoins transport, remorque, TP/BTP et parc professionnel peuvent être étudiés selon la dimension, l'usage et la localisation indiqués dans la demande.",
  },
  {
    q: "Puis-je demander un devis si je ne connais pas la dimension ?",
    a: "Oui. Indiquez le véhicule, l'engin, la localisation et ce que vous pouvez lire sur le pneu ou le véhicule. L'équipe pourra préciser les informations nécessaires avant le devis.",
  },
];

export default function PneusPoidsLourdMosellePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pneus poids lourd", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
          {
            name: "Pneus poids lourd en Moselle",
            url: "https://www.recacor.fr/pneus-utilitaires-pl/moselle",
          },
        ]}
      />
      <FaqJsonLd items={faqs} id="pneus-pl-moselle" />

      <section className="relative overflow-hidden bg-[var(--recacor-night)] pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,79,216,0.38),transparent_38%),linear-gradient(135deg,#071b33_0%,#102c4b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 border-l-4 border-yellow-400 pl-3 text-xs font-black uppercase tracking-[0.16em] text-white/75">
              <MapPin className="h-4 w-4 text-yellow-400" /> Moselle · professionnels
            </p>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl font-black uppercase leading-[0.9] sm:text-6xl lg:text-8xl">
              Pneus poids lourd
              <span className="block text-yellow-400">en Moselle</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Transport, remorque, TP/BTP ou parc professionnel : Recacor étudie votre besoin à partir de la dimension, du véhicule et de l&apos;usage réel.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#devis" className="recacor-btn-primary">
                Demander un devis PL <ArrowRight className="h-4 w-4" />
              </a>
              <a href={`tel:${PHONE_DISPLAY.replaceAll(" ", "")}`} className="recacor-btn-secondary">
                <Phone className="h-4 w-4" /> Appeler {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="recacor-eyebrow">Demande professionnelle</p>
            <h2 className="recacor-title mt-4">Une demande claire pour un devis exploitable.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Pour un transporteur, une entreprise de chantier ou une flotte, la bonne réponse dépend de la monte et de l&apos;usage. Donnez les informations disponibles ; l&apos;équipe vous recontacte pour compléter si nécessaire.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Dimension complète si elle est lisible",
                "Type de véhicule ou d'engin",
                "Quantité et niveau d'urgence",
                "Localisation du besoin",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[4px] border border-border bg-white p-4 text-sm font-semibold">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[4px] border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
              <p className="font-black text-[var(--recacor-night)]">Vous ne savez pas quelle information transmettre ?</p>
              <p className="mt-1">Indiquez le modèle du véhicule, l&apos;engin concerné et la localisation. Une photo du marquage du pneu peut aussi aider l&apos;équipe à reprendre la bonne dimension.</p>
            </div>
          </div>
          <aside className="rounded-[4px] bg-[var(--recacor-night)] p-7 text-white">
            <Truck className="h-10 w-10 text-yellow-400" />
            <h2 className="mt-5 font-heading text-4xl font-black uppercase leading-none">Moselle</h2>
            <p className="mt-4 text-sm leading-6 text-white/68">
              Page pilote pour les demandes pneus PL du secteur. La qualification commerciale reste basée sur les informations réellement transmises dans le formulaire.
            </p>
            <Link href="/pneus-utilitaires-pl" className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase text-yellow-400">
              Voir l&apos;offre pneus PL <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section id="devis" className="scroll-mt-24 bg-[var(--recacor-paper)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="recacor-eyebrow">Formulaire pneus PL</p>
            <h2 className="recacor-title mt-4">Préparer ma demande pneus poids lourd</h2>
            <p className="mt-4 text-muted-foreground">Téléphone et email sont nécessaires pour recevoir une réponse professionnelle.</p>
          </div>
          <div className="recacor-card p-5 sm:p-8">
            <DevisPlForm />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="recacor-title">Questions fréquentes</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-[4px] border border-border bg-background p-5">
                <summary className="cursor-pointer font-black text-[var(--recacor-night)]">{faq.q}</summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles categorie="pneus-pl" />
    </>
  );
}
