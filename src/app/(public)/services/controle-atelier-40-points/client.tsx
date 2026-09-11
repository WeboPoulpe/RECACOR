"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CarFront, ClipboardCheck, Droplet, FileText, Gauge, Lightbulb, ShieldCheck, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BgParticles } from "@/components/bg-particles";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { PhoneLink } from "@/components/phone-link";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const controlFamilies = [
  { title: "Pneus", count: "4 vérifications", text: "Usure et état visuel des pneus avant gauche, avant droit, arrière gauche et arrière droit.", icon: CarFront },
  { title: "Plaquettes de frein", count: "4 vérifications", text: "État des plaquettes sur les quatre positions du véhicule.", icon: ShieldCheck },
  { title: "Disques de frein", count: "4 vérifications", text: "État des disques sur les quatre positions, ou signalement d'un montage à tambours.", icon: ShieldCheck },
  { title: "Amortisseurs", count: "4 vérifications", text: "Contrôle des amortisseurs avant et arrière, à gauche comme à droite.", icon: Gauge },
  { title: "Triangles avant", count: "1 contrôle", text: "Jeu et état général des triangles de suspension avant.", icon: Wrench },
  { title: "Parallélisme", count: "1 contrôle", text: "Repérage d'un parallélisme à régler lorsque l'usure ou la tenue de route le justifie.", icon: Gauge },
  { title: "Soufflets de cardan", count: "2 vérifications", text: "Contrôle des soufflets de cardan avant gauche et avant droit.", icon: Wrench },
  { title: "Rotules de direction", count: "2 vérifications", text: "Recherche de jeu sur les rotules de direction avant.", icon: ClipboardCheck },
  { title: "Voyant au tableau de bord", count: "1 contrôle", text: "Repérage d'un voyant allumé et prise en compte du signalement dans le bilan.", icon: Lightbulb },
  { title: "Éclairage extérieur", count: "3 vérifications", text: "Feux avant, feux arrière et feux de stop.", icon: Lightbulb },
  { title: "Silentblocs et cache-poussière", count: "4 vérifications", text: "Contrôle des éléments associés aux quatre positions de roue.", icon: Wrench },
  { title: "Biellettes de barre stabilisatrice", count: "2 vérifications", text: "Contrôle des biellettes avant gauche et avant droite.", icon: Gauge },
  { title: "Biellettes axiales", count: "2 vérifications", text: "Recherche de jeu sur les biellettes axiales avant.", icon: Gauge },
  { title: "Niveaux essentiels", count: "4 vérifications", text: "Huile moteur, liquide de refroidissement, liquide de frein et lave-glace.", icon: Droplet },
  { title: "Essuie-glaces", count: "2 vérifications", text: "État des balais avant et arrière pour conserver une bonne visibilité.", icon: CarFront },
];

const faqs = [
  {
    q: "Que comprend le contrôle atelier 40 points ?",
    a: "Le technicien vérifie les pneus, le freinage, la suspension, la direction, le parallélisme, les niveaux, l'éclairage, les essuie-glaces et les voyants du tableau de bord.",
  },
  {
    q: "Est-ce un contrôle technique officiel ?",
    a: "Non. Il s'agit d'un bilan visuel et atelier Recacor. Il ne remplace pas le contrôle technique réglementaire réalisé dans un centre agréé.",
  },
  {
    q: "Est-ce que je reçois un rapport ?",
    a: "Oui. Le bilan peut être enregistré avec les informations du véhicule et un rapport clair est préparé pour distinguer ce qui est correct, à prévoir ou à traiter.",
  },
  {
    q: "Le contrôle est-il réservé aux clients qui viennent pour des pneus ?",
    a: "Non. Vous pouvez demander ce bilan lors d'un passage pour les pneus, le freinage, la vidange, le parallélisme ou une autre intervention mécanique.",
  },
  {
    q: "Faut-il prendre rendez-vous ?",
    a: "Contactez l'atelier pour vérifier le meilleur créneau selon la charge du jour. Vous pouvez aussi envoyer une demande avec le modèle du véhicule et votre immatriculation.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Identifier le véhicule",
    text: "Le bilan est rattaché au véhicule et aux informations communiquées à l'atelier.",
    icon: ClipboardCheck,
  },
  {
    number: "2",
    title: "Faire les 40 contrôles",
    text: "Les éléments sont renseignés un par un, avec un statut lisible pour chaque point.",
    icon: Wrench,
  },
  {
    number: "3",
    title: "Recevoir le bilan",
    text: "Le rapport aide à distinguer ce qui peut attendre de ce qui mérite une prise en charge.",
    icon: FileText,
  },
];

export function ControleAtelier40Client() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Mécanique", url: "https://www.recacor.fr/mecanique" },
          { name: "Contrôle atelier 40 points", url: "https://www.recacor.fr/services/controle-atelier-40-points" },
        ]}
      />
      <ServiceJsonLd
        name="Contrôle atelier 40 points Recacor"
        serviceType="Contrôle visuel voiture"
        description="Bilan atelier de 40 vérifications sur les pneus, freins, suspension, niveaux, éclairage et éléments de sécurité au Crès près de Montpellier."
        url="https://www.recacor.fr/services/controle-atelier-40-points"
      />
      <FaqJsonLd items={faqs} id="controle-atelier-40-points" />

      <section className="relative overflow-hidden pt-32 pb-20 text-white">
        <Image
          src="/illustrations/services/controle-technique-hero-20260723.png"
          alt="Technicien Recacor contrôlant une voiture en atelier au Crès"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,11,18,0.90)_0%,rgba(18,25,35,0.76)_52%,rgba(26,37,49,0.58)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-6 border-white/20 bg-white/10 text-white">
              <ClipboardCheck className="mr-1 h-3 w-3" /> Bilan atelier
            </Badge>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Contrôle voiture 40 points
              <br />
              <span className="text-purple-glow">au Crès près de Montpellier</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Pneus, freinage, suspension, niveaux et éclairage : Recacor fait le tour des points essentiels de votre véhicule et vous remet un bilan lisible.
            </p>
            <div className="mt-7 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
              {["40 vérifications", "Bilan clair", "Atelier au Crès"].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-purple-glow" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
              <PhoneLink location="hero" serviceType="mecanique" className="recacor-btn-primary flex-1 whitespace-nowrap" showIcon>
                Appeler : {PHONE_DISPLAY}
              </PhoneLink>
              <DevisCtaLink desktopHref="#demande" mobileHref="/formulaire/mecanique" className="recacor-btn-secondary flex-1 whitespace-nowrap">
                Demander mon contrôle <ArrowRight className="h-4 w-4" />
              </DevisCtaLink>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="recacor-eyebrow">Un bilan qui reste compréhensible</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Voir l&apos;état réel de votre voiture
                </h2>
                <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Une voiture peut venir pour deux pneus et avoir besoin d&apos;un simple réglage de parallélisme, d&apos;un niveau à compléter ou d&apos;une surveillance du freinage. Le contrôle atelier permet de faire le point au même endroit.
                  </p>
                  <p>
                    Le technicien distingue les éléments corrects, ceux à prévoir et ceux qui demandent une intervention. Vous gardez une information concrète avant de décider.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[4px] border border-border bg-muted/30">
                <Image
                  src="/illustrations/services/controle-technique-passage-hero-20260723.png"
                  alt="Véhicule contrôlé dans un atelier Recacor"
                  width={1400}
                  height={875}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Pneus et freinage", "Usure, état et éléments à surveiller."],
                ["Niveaux et éclairage", "Les contrôles simples qui évitent un oubli."],
                ["Bilan transmis", "Une base claire pour prévoir la suite."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[4px] border border-border bg-muted/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">{title}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="recacor-eyebrow justify-center">Les 40 vérifications</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Ce que l&apos;atelier regarde
            </h2>
            <p className="mt-4 text-muted-foreground">
              Le décompte correspond aux positions et contrôles réellement proposés dans la fiche atelier Recacor.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controlFamilies.map((family) => {
              const Icon = family.icon;
              return (
                <article key={family.title} className="rounded-[4px] border border-border bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-[var(--recacor-night)] text-yellow-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-right text-xs font-black uppercase tracking-wider text-purple-bright">{family.count}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black">{family.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{family.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {processSteps.map(({ number, title, text, icon: StepIcon }) => {
              return (
                <div key={String(number)} className="rounded-[4px] border border-border bg-white p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-950">{number}</span>
                    <StepIcon className="h-5 w-5 text-purple-bright" />
                  </div>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
            <Link href="/pneus-voiture" className="text-purple-bright hover:underline">Pneus voiture</Link>
            <Link href="/mecanique" className="text-purple-bright hover:underline">Mécanique au Crès</Link>
            <Link href="/services/parallelisme-geometrie" className="text-purple-bright hover:underline">Parallélisme</Link>
            <Link href="/services/prise-en-charge-controle-technique" className="text-purple-bright hover:underline">Préparer le contrôle technique</Link>
          </div>
        </div>
      </section>

      <section id="demande" className="relative scroll-mt-24 overflow-hidden bg-muted py-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight">Demander un <span className="text-gradient-purple">contrôle atelier</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Indiquez votre véhicule et votre besoin. L&apos;atelier vous confirme la prise en charge.</p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 shadow-xl sm:p-8">
            <DevisMecaniqueForm defaultService="Contrôle atelier 40 points" />
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">Questions <span className="text-gradient-purple">fréquentes</span></h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group cursor-pointer rounded-[4px] border border-border bg-white p-5">
                <summary className="flex list-none items-center justify-between text-sm font-bold">
                  {faq.q}
                  <span className="ml-3 text-xl leading-none text-purple-bright transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
