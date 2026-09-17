"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Globe, ShieldCheck, PhoneCall, ArrowRight } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

const villesCorridor = [
  "Perpignan",
  "Narbonne",
  "Béziers",
  "Montpellier",
  "Nîmes",
  "Marseille",
  "Millau",
];

const raisonsAppel = [
  { icon: AlertTriangle, title: "Crevaison ou éclatement", desc: "Pneu PL hors service sur autoroute, échangeur ou aire de repos : intervention rapide pour reprendre la route." },
  { icon: Clock, title: "Disponible 24h/24, 7j/7", desc: "Astreintes midi, soir, nuit et week-end couvertes, y compris pour un nouveau client jamais suivi jusqu'ici." },
  { icon: MapPin, title: "Intervention sur site", desc: "Une équipe se déplace directement sur votre position, sans attendre un rendez-vous en atelier." },
];

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

const faqs = [
  { q: "Intervenez-vous vraiment 24h/24 et 7j/7 ?", a: "Oui, une astreinte est organisée midi, soir, nuit et week-end pour les pannes poids lourd sur route. Les tarifs d'astreinte varient selon le créneau horaire ; ils vous sont communiqués par téléphone avant intervention." },
  { q: "Do you speak English?", a: "Yes, our team can assist English-speaking drivers by phone for roadside tyre assistance on the Perpignan-Marseille-Millau corridor. Please call us directly for urgent breakdown help." },
  { q: "Quelle zone couvrez-vous pour le dépannage sur route ?", a: "Notre équipe intervient sur l'axe Perpignan-Narbonne-Béziers-Montpellier-Nîmes-Marseille, ainsi que vers Millau. La zone exacte et le délai dépendent de votre position au moment de l'appel : contactez-nous pour confirmer la couverture." },
  { q: "Quel est le prix d'un dépannage poids lourd sur route ?", a: "Le prix dépend du type d'intervention (réparation, montage, recreusage), de la distance depuis l'atelier et du créneau horaire (heures normales ou astreinte). Les tarifs de déplacement et d'astreinte sont publics et vous sont confirmés au téléphone avant toute intervention." },
  { q: "Puis-je payer avec une carte carburant/flotte internationale ?", a: "Contactez-nous par téléphone pour vérifier les moyens de paiement acceptés au moment de votre appel, notamment si vous circulez avec une carte de flotte internationale." },
  { q: "Que faire en attendant l'arrivée de l'équipe ?", a: "Sécurisez le véhicule (feux de détresse, triangle, gilet), placez-vous en zone sûre à distance de la circulation, et gardez votre téléphone disponible : notre équipe vous rappelle pour confirmer l'heure d'arrivée." },
];

export function DepannageClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Dépannage poids lourd urgence", url: "https://www.recacor.fr/depannage-poids-lourd-urgence" },
      ]} />
      <ServiceJsonLd
        name="Dépannage poids lourd urgence 24/7"
        serviceType="Assistance pneu poids lourd sur route"
        description="Assistance pneu poids lourd 24h/24 7j/7 sur l'axe Perpignan-Marseille-Millau : crevaison, éclatement, intervention sur site."
        url="https://www.recacor.fr/depannage-poids-lourd-urgence"
      />
      <FaqJsonLd items={faqs} id="depannage-urgence" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-overlay-solid" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <AlertTriangle className="h-3 w-3 mr-1" /> Assistance urgente
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Dépannage poids lourd{" "}
            <span className="text-purple-glow">24h/24, 7j/7</span><br />
            sur l&apos;axe Perpignan-Marseille-Millau
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Crevaison, éclatement, pneu hors service sur autoroute ou aire de repos :
            une équipe se déplace directement sur votre position pour vous remettre
            en route.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {villesCorridor.map((ville) => (
              <span key={ville} className="rounded-[4px] border border-white/15 bg-white/10 px-3 py-1.5">
                {ville}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/80">
            <Globe className="h-4 w-4 text-purple-glow" />
            English spoken
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" serviceType="pl" className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appel urgence : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 recacor-btn-secondary flex items-center justify-center gap-2">
              Demande non urgente <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Pourquoi appeler <span className="text-gradient-purple">Recacor</span> en cas de panne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {raisonsAppel.map((r) => (
              <div key={r.title} className="rounded-[4px] border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <r.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Une zone d&apos;intervention <span className="text-gradient-purple">pensée pour la route</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Notre équipe s&apos;organise autour de l&apos;axe Perpignan-Marseille et de la
              liaison vers Millau, avec des points d&apos;appui à Vergèze, Servian et Le Crès.
              L&apos;objectif est de couvrir les principaux passages poids lourd de la
              Méditerranée vers le Massif Central, pour une intervention sur site en cas
              de panne pneumatique.
            </p>
          </div>

          <div className="mt-10 rounded-[4px] border border-border bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Tarifs publics de déplacement</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Tous les prix s&apos;entendent hors taxes, en heures normales depuis l&apos;atelier.
              TVA applicable en sus au taux en vigueur.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tarifsInterventions.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-[4px] border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-sm font-black text-purple-bright">{t.prix}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">Astreintes (hors km et prix des pneus)</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {astreintes.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-[4px] border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-sm font-black text-purple-bright">{t.prix}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[4px] border border-border bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">English spoken</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Notre équipe accueille les chauffeurs internationaux qui traversent l&apos;axe
              Perpignan-Marseille. Nous pouvons échanger en anglais par téléphone pour
              organiser une intervention de dépannage pneu poids lourd sur route.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Pneus poids lourd</Link>
            <Link href="/services/recreusage" className="text-purple-bright hover:underline">Recreusage</Link>
            <Link href="/contact" className="text-purple-bright hover:underline">Contacter Recacor</Link>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-[4px] border border-purple-bright/30 bg-purple-bright/10 px-4 py-2 text-sm font-bold text-purple-deep mb-4">
              <PhoneCall className="h-4 w-4" />
              Panne en cours ? Appelez directement : {PHONE_DISPLAY}
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Demande <span className="text-gradient-purple">non urgente</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Un expert vous rappelle sous 2h en jours ouvrés</p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisPlForm />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-[4px] border border-border bg-white p-5 cursor-pointer">
                <summary className="font-bold text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
