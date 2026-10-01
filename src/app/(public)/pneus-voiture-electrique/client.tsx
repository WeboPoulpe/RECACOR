"use client";

import { Badge } from "@/components/ui/badge";
import { Zap, Ruler, FileText, Gauge, ArrowRight, Tag } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

// Faits repris de docs/GEO_FAITS.md (section « Pneus de voiture électrique ») :
// ne rien ajouter ici qui n'y figure pas.
const chiffresCles = [
  { icon: Gauge, value: "1,6 mm", label: "profondeur minimale légale" },
  { icon: FileText, value: "4 mm", label: "seuil de certains loueurs à la restitution" },
  { icon: Zap, value: "≈ 10 000 km", label: "de moins qu'un pneu de thermique (Hyundai)" },
  { icon: Ruler, value: "2 tailles", label: "sur les voitures en monte décalée" },
];

const montesDecalees = [
  { modele: "Porsche Taycan (jantes 19\")", avant: "225/55 R19", arriere: "275/45 R19" },
  { modele: "Mercedes EQE (jantes 19\")", avant: "255/45 R19", arriere: "285/40 R19" },
  { modele: "Tesla Model Y Performance (21\")", avant: "255/35 R21", arriere: "275/35 R21" },
  { modele: "BMW i4 M50 (jantes 19\")", avant: "245/40 R19", arriere: "255/40 R19" },
];

const situationsLeasing = [
  {
    situation: "Les pneus sont inclus dans le contrat (forfait pneus)",
    quoiFaire: "Appelez d'abord votre loueur : il indique souvent le réseau où les changer. Un remplacement ailleurs peut ne pas être pris en charge.",
  },
  {
    situation: "Les pneus sont à votre charge",
    quoiFaire: "Vous choisissez le garage. Relisez le guide de restitution : marque, profondeur minimale, conformité constructeur.",
  },
  {
    situation: "Le contrat demande la monte d'origine ou les spécifications constructeur",
    quoiFaire: "Indiquez-le dans votre demande de devis : marque, modèle et marquage (MO, étoile, T0…) relevés sur vos pneus actuels.",
  },
  {
    situation: "Le contrat ne dit rien sur la marque",
    quoiFaire: "La loi permet une autre marque, y compris moins chère, si la dimension et les indices sont ceux du véhicule et si les deux pneus d'un même essieu sont identiques.",
  },
];

const marquages = [
  { code: "HL", sens: "High Load : porte environ 25 % de charge en plus qu'un pneu standard. Pensé pour le poids des voitures électriques et hybrides rechargeables." },
  { code: "XL", sens: "Pneu renforcé, avec un indice de charge plus élevé que la version standard de la même dimension." },
  { code: "MO, ★, AO, N0, T0…", sens: "Homologation constructeur : Mercedes, BMW, Audi, Porsche, Tesla. Utile si votre contrat demande des pneus conformes aux spécifications d'origine." },
  { code: "Indices de charge et de vitesse", sens: "Jamais inférieurs à ceux prévus pour le véhicule. Ils se lisent sur le flanc, par exemple 101Y." },
];

const faqs = [
  {
    q: "Pourquoi les pneus d'une voiture électrique s'usent-ils plus vite ?",
    a: "À cause du poids de la batterie, du couple disponible dès le démarrage et du freinage par récupération d'énergie. Hyundai France estime qu'un pneu de voiture électrique dure environ 10 000 km de moins, soit autour de 29 000 km contre 39 000 km.",
  },
  {
    q: "Ma voiture a des tailles différentes à l'avant et à l'arrière, comment demander un devis ?",
    a: "Dans le formulaire de devis, cochez « Tailles différentes à l'avant et à l'arrière » : vous pouvez alors indiquer les deux dimensions et le nombre de pneus pour chaque essieu. Les dimensions sont inscrites sur le flanc des pneus.",
  },
  {
    q: "Peut-on inverser les pneus avant et arrière sur une voiture électrique ?",
    a: "Seulement si les quatre pneus ont la même dimension. Avec des tailles différentes à l'avant et à l'arrière, les pneus ne passent pas d'un essieu à l'autre : le manuel d'atelier Tesla le précise pour la Model 3.",
  },
  {
    q: "En fin de LLD, faut-il remettre la même marque de pneus ?",
    a: "Cela dépend du contrat. La loi autorise une autre marque si la dimension et les indices sont conformes, mais certains loueurs demandent la même marque sur un même essieu et des pneus conformes aux spécifications constructeur. Relisez le guide de restitution de votre loueur.",
  },
  {
    q: "Quelle profondeur de pneu faut-il pour rendre une voiture en leasing ?",
    a: "Le minimum légal est de 1,6 mm, mais plusieurs guides de restitution, comme ceux de Volkswagen Financial Services ou de Mazda Lease, facturent les pneus sous 4 mm, soit plus de 50 % d'usure.",
  },
  {
    q: "Puis-je faire changer mes pneus chez Recacor si ma voiture est en leasing ?",
    a: "Oui, quand les pneus sont à votre charge. Indiquez dans la demande de devis ce que demande votre contrat (marque, marquage, profondeur) : on vous propose les pneus qui y correspondent et on les monte à l'atelier du Crès. Si votre contrat inclut un forfait pneus, vérifiez auprès de votre loueur où le faire prendre en charge.",
  },
  {
    q: "Avez-vous des pneus pour Tesla, Mercedes EQ ou BMW i ?",
    a: "Le devis se fait selon la dimension, la marque et le marquage demandés. Donnez la dimension relevée sur le flanc du pneu, ou cochez les tailles avant et arrière dans le formulaire, pour obtenir un prix.",
  },
];

export function PneusElectriqueClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Pneus voiture", url: "https://www.recacor.fr/pneus-voiture" },
        { name: "Pneus voiture électrique", url: "https://www.recacor.fr/pneus-voiture-electrique" },
      ]} />
      <ServiceJsonLd
        name="Pneus voiture électrique au Crès"
        serviceType="Montage de pneus pour voiture électrique"
        description="Montage de pneus pour voiture électrique au Crès, près de Montpellier : tailles différentes à l'avant et à l'arrière, pneus HL et homologués constructeur, devis selon la dimension."
        url="https://www.recacor.fr/pneus-voiture-electrique"
      />
      <FaqJsonLd items={faqs} id="pneus-voiture-electrique" />

      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image-strong" : "hero-overlay-solid"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-xs text-white/70">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-1.5">/</span>
            <Link href="/pneus-voiture" className="hover:text-white">Pneus voiture</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white">Voiture électrique</span>
          </nav>
          <Badge className="bg-white/10 text-white border-white/20 mb-4 sm:mb-6">
            <Zap className="h-3 w-3 mr-1" /> Voiture électrique
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] max-w-3xl">
            Pneus voiture électrique <span className="text-purple-glow">au Crès</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/90 max-w-xl text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Tailles avant et arrière différentes, pneus HL, fin de LLD : devis selon la dimension
            et montage à l&apos;atelier Recacor, près de Montpellier.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-2xl">
            <PhoneLink location="hero" serviceType="vl" className="flex-1 recacor-btn-primary whitespace-nowrap py-2.5 sm:py-3" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 recacor-btn-secondary whitespace-nowrap py-2.5 sm:py-3">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="pt-4 pb-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-foreground">
            Une voiture électrique use ses pneus plus vite : Hyundai France estime qu&apos;ils durent
            environ 10 000 km de moins. Beaucoup de modèles ont des tailles différentes à l&apos;avant
            et à l&apos;arrière, et en fin de LLD certains loueurs demandent au moins 4 mm de gomme,
            au lieu du minimum légal de 1,6 mm. L&apos;atelier Recacor du Crès monte vos pneus dans la
            dimension et les indices prévus pour votre voiture, avec un devis selon la dimension.
          </p>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {chiffresCles.map((c) => (
              <div key={c.label} className="rounded-[4px] border border-border bg-white p-5">
                <c.icon className="h-6 w-6 text-purple-bright" />
                <p className="mt-3 text-xl font-black">{c.value}</p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Tailles différentes <span className="text-gradient-purple">à l&apos;avant et à l&apos;arrière</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Sur ces voitures, les pneus arrière sont plus larges que les pneus avant. Ils ne passent
            donc pas d&apos;un essieu à l&apos;autre, et l&apos;arrière s&apos;use souvent avant l&apos;avant.
            Quelques exemples, à vérifier sur votre carte grise ou sur le flanc de vos pneus :
          </p>
          <div className="overflow-x-auto rounded-[4px] border border-border bg-white">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <caption className="sr-only">Exemples de voitures électriques avec des tailles de pneus différentes à l&apos;avant et à l&apos;arrière</caption>
              <thead className="bg-muted/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3">Modèle</th>
                  <th scope="col" className="px-4 py-3">Avant</th>
                  <th scope="col" className="px-4 py-3">Arrière</th>
                </tr>
              </thead>
              <tbody>
                {montesDecalees.map((m) => (
                  <tr key={m.modele} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-black">{m.modele}</th>
                    <td className="px-4 py-3 font-mono">{m.avant}</td>
                    <td className="px-4 py-3 font-mono">{m.arriere}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Les dimensions changent selon la finition et les jantes. Dans le formulaire de devis,
            cochez « Tailles différentes à l&apos;avant et à l&apos;arrière » pour indiquer les deux.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Voiture en LLD ou LOA : <span className="text-gradient-purple">qui choisit les pneus ?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Tout se joue dans votre contrat et dans le guide de restitution du loueur. Dites-nous
            ce qu&apos;il demande : on vous propose les pneus qui y correspondent, dans la dimension de
            votre voiture, et on les monte à l&apos;atelier du Crès.
          </p>
          <div className="overflow-hidden rounded-[4px] border border-border bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Changer les pneus d&apos;une voiture en LLD ou LOA selon le contrat</caption>
              <thead className="bg-muted/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3">Votre contrat</th>
                  <th scope="col" className="px-4 py-3">Ce qu&apos;il faut faire</th>
                </tr>
              </thead>
              <tbody>
                {situationsLeasing.map((s) => (
                  <tr key={s.situation} className="border-t border-border align-top">
                    <th scope="row" className="px-4 py-3 font-black w-2/5">{s.situation}</th>
                    <td className="px-4 py-3 text-muted-foreground">{s.quoiFaire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[4px] border border-border bg-white p-6">
              <h3 className="font-black text-lg">Même marque ou pneu moins cher ?</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                La loi n&apos;impose pas la marque d&apos;origine. Elle demande la dimension prévue pour
                le véhicule, des indices de charge et de vitesse au moins égaux, et deux pneus
                identiques sur un même essieu. Un contrat de location peut être plus strict : c&apos;est
                lui qui décide.
              </p>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-6">
              <h3 className="font-black text-lg">Profondeur à la restitution</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Le minimum légal est de 1,6 mm. Plusieurs guides de restitution, comme ceux de
                Volkswagen Financial Services ou de Mazda Lease, facturent les pneus sous 4 mm, soit
                plus de 50 % d&apos;usure. Mazda Lease demande aussi la même marque sur un même essieu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-8">
            Les marquages <span className="text-gradient-purple">à relever sur vos pneus</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marquages.map((m) => (
              <div key={m.code} className="rounded-[4px] border border-border bg-white p-6">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-purple-bright" />
                  <h3 className="font-black">{m.code}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.sens}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[4px] border border-border bg-white p-6">
            <h3 className="font-black text-lg">Exemple : Mercedes EQE en 19 pouces</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              L&apos;avant est en 255/45 R19 et l&apos;arrière en 285/40 R19. Si seuls les pneus arrière
              sont usés, on remplace les 2 pneus arrière, de même marque et même modèle sur
              l&apos;essieu. Les pneus avant restent en place : ils ne peuvent pas passer à
              l&apos;arrière.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Usure d&apos;un seul côté du pneu ?</h2>
            <p className="mt-3 max-w-2xl text-white/80 leading-relaxed">
              Sur une voiture lourde, un parallélisme déréglé use les pneus encore plus vite.
              L&apos;atelier contrôle le parallélisme, à partir de 65 € pour le réglage, contrôle offert.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
              <Link href="/mecanique#parallelisme" className="flex-1 recacor-btn-primary whitespace-nowrap">
                Parallélisme et géométrie
              </Link>
              <Link href="/pneus-voiture" className="flex-1 inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/30 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 whitespace-nowrap">
                Tous les pneus voiture <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Devis <span className="text-gradient-purple">pneus voiture électrique</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tailles différentes à l&apos;avant et à l&apos;arrière ? Cochez la case sous la dimension.
            </p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisVlForm />
          </div>
        </div>
      </section>

      <AvisSection />

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
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-bold">
            <Link href="/pneus-voiture" className="text-purple-bright hover:underline">Pneus voiture au Crès</Link>
            <Link href="/pneus-voiture/mercedes" className="text-purple-bright hover:underline">Pneus Mercedes</Link>
            <Link href="/pneus-voiture/bmw" className="text-purple-bright hover:underline">Pneus BMW</Link>
            <Link href="/services/reparation-crevaison" className="text-purple-bright hover:underline">Réparation crevaison</Link>
          </div>
        </div>
      </section>
    </>
  );
}
