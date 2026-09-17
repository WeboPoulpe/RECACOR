"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_WHATSAPP_PL } from "@/lib/tracking";

const tarifsInterventions = [
  { label: "Sortie atelier 1-30 km", prix: "30 € HT" },
  { label: "Sortie atelier 30-60 km", prix: "50 € HT" },
  { label: "Sortie atelier 61-100 km", prix: "85 € HT" },
  { label: "Au-delà de 100 km", prix: "85 € HT + 1,80 €/km" },
];

const astreintes = [
  { label: "Astreinte midi (12h-14h)", prix: "90 € HT" },
  { label: "Astreinte soir (19h-22h)", prix: "180 € HT" },
  { label: "Astreinte nuit (22h-6h)", prix: "380 € HT" },
  { label: "Astreinte week-end", prix: "650 € HT" },
];

const montes = [
  "Tracteurs et porteurs, toutes marques",
  "Remorques et semi-remorques, montes simples ou jumelées",
  "Bennes et véhicules de chantier",
  "Flottes de transport régional et national",
];

const faqs = [
  { q: "Intervenez-vous vraiment la nuit et le week-end en Dordogne et en Gironde ?", a: "Oui. Une astreinte est organisée midi, soir, nuit et week-end pour les pannes poids lourd sur route. Le tarif d'astreinte dépend du créneau horaire et vous est annoncé avant qu'on ne se déplace." },
  { q: "Combien coûte une intervention depuis Neuvic ?", a: "Le prix se décompose en deux parties : le déplacement (30 à 85 € HT selon la distance, plus 1,80 €/km au-delà de 100 km) et l'astreinte si vous appelez en dehors des heures normales (de 90 € à 650 € HT selon le créneau). La prestation elle-même (montage, réparation) s'ajoute selon le pneu." },
  { q: "Quelles dimensions de pneus poids lourd proposez-vous ?", a: "Toutes tailles courantes pour tracteurs, porteurs, remorques et bennes. Indiquez la dimension complète lisible sur le flanc du pneu, ou le modèle du véhicule si vous ne l'avez pas, pour préparer un devis exact." },
  { q: "Le recreusage est-il possible sur les pneus achetés ailleurs ?", a: "Le recreusage se décide après contrôle de la carcasse en atelier, qu'il s'agisse d'un pneu Recacor ou non. C'est une alternative au pneu neuf quand la carcasse le permet, moins coûteuse à l'usage." },
];

export function PneusDordogneClient() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pneus poids lourd", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
          { name: "Dépannage et pneus poids lourd en Dordogne", url: "https://www.recacor.fr/pneus-utilitaires-pl/dordogne" },
        ]}
      />
      <ServiceJsonLd
        name="Dépannage et vente de pneus poids lourd en Dordogne et Gironde"
        serviceType="Assistance et vente de pneus poids lourd"
        description="Astreinte dépannage pneu poids lourd 24h/24 7j/7 en Dordogne et Gironde, ainsi que vente de pneus PL toutes tailles et recreusage, depuis le site Recacor de Neuvic."
        url="https://www.recacor.fr/pneus-utilitaires-pl/dordogne"
      />
      <FaqJsonLd items={faqs} id="pneus-pl-dordogne" />

      <section className="relative overflow-hidden bg-[var(--recacor-night)] pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,79,216,0.38),transparent_38%),linear-gradient(135deg,#071b33_0%,#102c4b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 border-l-4 border-yellow-400 pl-3 text-xs font-black uppercase tracking-[0.16em] text-white/75">
              <AlertTriangle className="h-4 w-4 text-yellow-400" /> Dordogne · Gironde · astreinte 24h/24
            </p>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl font-black uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              Dépannage poids lourd
              <span className="block text-yellow-400">24h/24, 7j/7</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Depuis le site Recacor de Neuvic (Bergerac), une équipe intervient pour une
              crevaison ou un pneu hors service, en Dordogne et en Gironde.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${PHONE_WHATSAPP_PL.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <PhoneLink location="hero" serviceType="pl" className="recacor-btn-primary" showIcon>
                Appeler maintenant
              </PhoneLink>
              <a href="#devis" className="recacor-btn-secondary">
                Demande non urgente <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-white/60">
              Ligne tenue par Patrick, joignable par appel ou WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Tarifs de déplacement</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Prix hors taxes, en heures normales, calculés depuis l&apos;atelier le plus
              proche de votre position. TVA applicable en sus au taux en vigueur. Le tarif
              exact vous est confirmé au téléphone avant l&apos;intervention.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tarifsInterventions.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-[4px] border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-sm font-black text-purple-bright">{t.prix}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Astreintes en dehors des heures normales (hors km et prix des pneus)
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {astreintes.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-[4px] border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-sm font-black text-purple-bright">{t.prix}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <p className="recacor-eyebrow">Vente pneus poids lourd</p>
            <h2 className="recacor-title mt-4">Toutes montes, pour tous les véhicules professionnels.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              En dehors de l&apos;urgence, le site de Neuvic prend aussi en charge les
              demandes de pneus poids lourd pour la Dordogne et la Gironde : tracteurs,
              porteurs, remorques, bennes et flottes de transport. Donnez la dimension et le
              véhicule, l&apos;équipe prépare un devis adapté à votre usage réel.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {montes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[4px] border border-border bg-white p-4 text-sm font-semibold">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[4px] border border-border bg-white p-8">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-purple-bright" />
                <h2 className="text-xl font-black tracking-tight">Recreusage : une alternative au pneu neuf</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quand la carcasse le permet, le recreusage prolonge la durée de vie d&apos;un
                pneu poids lourd sans repartir sur un pneu neuf. Le contrôle de carcasse se
                fait en atelier avant toute décision, pour ne recreuser que ce qui est
                réellement en état.
              </p>
              <Link href="/services/recreusage" className="mt-4 inline-flex text-sm font-bold text-purple-bright hover:underline">
                Voir le service recreusage
              </Link>
            </div>
          </div>
          <aside className="rounded-[4px] bg-[var(--recacor-night)] p-7 text-white h-fit">
            <Truck className="h-10 w-10 text-yellow-400" />
            <h2 className="mt-5 font-heading text-3xl font-black uppercase leading-none">Site de Neuvic</h2>
            <p className="mt-4 text-sm leading-6 text-white/68">
              Vente sur devis et commande à distance depuis Neuvic (Bergerac, 24190), pour les
              besoins pneus poids lourd de Dordogne et de Gironde. Précisez votre commune, le
              véhicule et l&apos;usage dans le formulaire.
            </p>
            <Link href="/pneus-utilitaires-pl" className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase text-yellow-400">
              Voir l&apos;offre pneus PL nationale <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section id="devis" className="relative scroll-mt-24 bg-muted py-16 overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="recacor-eyebrow">Formulaire pneus PL</p>
            <h2 className="recacor-title mt-4">Préparer ma demande pneus poids lourd</h2>
            <p className="mt-4 text-muted-foreground">Téléphone et email sont nécessaires pour recevoir une réponse professionnelle. Panne en cours ? Appelez ou WhatsApp directement plutôt que d&apos;utiliser ce formulaire.</p>
          </div>
          <div className="recacor-card p-5 sm:p-8 bg-white">
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
    </>
  );
}
