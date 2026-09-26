"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, BadgeCheck, CheckCircle, Search, Wrench, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BgParticles } from "@/components/bg-particles";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { PhoneLink } from "@/components/phone-link";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const reparable = [
  "Le trou est dans la partie centrale de la bande de roulement, pas sur les bords.",
  "La perforation fait moins de 6 mm, comme un clou ou une vis.",
  "L'intérieur du pneu n'est pas abîmé une fois le pneu démonté.",
  "Les sculptures sont au-dessus de 1,6 mm, le minimum légal.",
];

const nonReparable = [
  "Coupure, bosse ou hernie sur le flanc.",
  "Trou sur l'épaule, là où la bande rejoint le flanc.",
  "Perforation de 6 mm ou plus, ou déchirure.",
  "Pneu qui a roulé à plat : la carcasse est souvent marquée à l'intérieur.",
  "Caoutchouc craquelé ou pneu usé sous 1,6 mm.",
];

const steps = [
  {
    number: "1",
    title: "Trouver la fuite",
    text: "Le technicien repère l'objet ou le point de fuite et regarde où il se trouve sur le pneu.",
    icon: Search,
  },
  {
    number: "2",
    title: "Démonter et contrôler",
    text: "Le pneu est démonté pour vérifier l'intérieur. C'est là qu'on voit si la carcasse a souffert.",
    icon: Wrench,
  },
  {
    number: "3",
    title: "Réparer ou remplacer",
    text: "Si toutes les conditions sont réunies, le pneu est réparé. Sinon, l'atelier vous propose un pneu neuf.",
    icon: BadgeCheck,
  },
];

const faqs = [
  {
    q: "Peut-on réparer un pneu crevé sur le flanc ?",
    a: "Non. Le flanc travaille en permanence et une réparation n'y tient pas. Un pneu touché sur le flanc ou sur l'épaule doit être remplacé.",
  },
  {
    q: "J'ai roulé avec le pneu à plat, est-il réparable ?",
    a: "Souvent non. Rouler dégonflé écrase le pneu et peut abîmer l'intérieur, même si l'extérieur paraît correct. Le démontage permet de le vérifier.",
  },
  {
    q: "Une mèche posée soi-même suffit-elle ?",
    a: "Une mèche posée de l'extérieur sert à repartir en dépannage. Le pneu doit ensuite être contrôlé à l'atelier pour voir s'il peut être gardé.",
  },
  {
    q: "J'ai utilisé une bombe anti-crevaison, que faire ?",
    a: "Dites-le à l'atelier en arrivant. Le produit doit être nettoyé à l'intérieur du pneu, et la réparation n'est possible que si le pneu remplit les conditions habituelles.",
  },
  {
    q: "Les pneus runflat se réparent-ils ?",
    a: "Cela dépend des consignes du fabricant, qui l'interdisent souvent. L'atelier vérifie le modèle avant de vous répondre.",
  },
  {
    q: "Combien coûte la réparation d'une crevaison ?",
    a: "Le tarif vous est donné à l'atelier, une fois le pneu contrôlé. Si un remplacement est nécessaire, les pneus voiture sont montés à partir de 45€.",
  },
  {
    q: "Faut-il prendre rendez-vous ?",
    a: "Vous pouvez venir sans rendez-vous au Crès. Un appel avant de passer permet de vérifier l'attente du moment.",
  },
];

export function ReparationCrevaisonClient() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pneus voiture", url: "https://www.recacor.fr/pneus-voiture" },
          { name: "Réparation de crevaison", url: "https://www.recacor.fr/services/reparation-crevaison" },
        ]}
      />
      <ServiceJsonLd
        name="Réparation de crevaison Recacor"
        serviceType="Réparation de pneu"
        description="Contrôle et réparation de crevaison de pneu voiture au Crès près de Montpellier, avec remplacement si le pneu n'est pas réparable."
        url="https://www.recacor.fr/services/reparation-crevaison"
      />
      <FaqJsonLd items={faqs} id="reparation-crevaison" />

      <section className="relative overflow-hidden pt-32 pb-20 text-white">
        <div className="absolute inset-0 hero-overlay-solid" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-6 border-white/20 bg-white/10 text-white">
              <Wrench className="mr-1 h-3 w-3" /> Pneu crevé
            </Badge>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Réparation de crevaison
              <br />
              <span className="text-purple-glow">au Crès près de Montpellier</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Le pneu est démonté et contrôlé avant toute réparation. S&apos;il n&apos;est pas réparable, l&apos;atelier vous propose un pneu neuf monté sur place.
            </p>
            <div className="mt-7 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
              {["Contrôle avant réparation", "Sans rendez-vous", "Atelier au Crès"].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-purple-glow" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
              <PhoneLink location="hero" serviceType="vl" className="recacor-btn-primary flex-1 whitespace-nowrap" showIcon>
                Appeler : {PHONE_DISPLAY}
              </PhoneLink>
              <DevisCtaLink className="recacor-btn-secondary flex-1 whitespace-nowrap">
                Devis pneu neuf <ArrowRight className="h-4 w-4" />
              </DevisCtaLink>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="recacor-eyebrow justify-center">Les règles de réparation</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Tous les pneus crevés ne se réparent pas</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Les fabricants de pneus fixent des limites précises. L&apos;atelier les applique : un pneu qui ne les respecte pas n&apos;est pas réparé, c&apos;est une question de sécurité.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-[4px] border border-border bg-white p-7 shadow-sm">
              <h3 className="flex items-center gap-2 text-xl font-black">
                <CheckCircle className="h-5 w-5 text-purple-bright" /> Réparation possible si
              </h3>
              <ul className="mt-5 space-y-3">
                {reparable.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-7 shadow-sm">
              <h3 className="flex items-center gap-2 text-xl font-black">
                <XCircle className="h-5 w-5 text-red-600" /> Pneu à remplacer si
              </h3>
              <ul className="mt-5 space-y-3">
                {nonReparable.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">Comment ça se passe à l&apos;atelier</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map(({ number, title, text, icon: StepIcon }) => (
              <div key={number} className="rounded-[4px] border border-border bg-white p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-950">{number}</span>
                  <StepIcon className="h-5 w-5 text-purple-bright" />
                </div>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border border-l-4 border-l-yellow-400 bg-white p-7 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-black">
              <AlertTriangle className="h-6 w-6 text-purple-bright" /> En attendant de venir
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>Évitez de rouler avec un pneu dégonflé : quelques kilomètres suffisent pour le rendre irréparable.</li>
              <li>Laissez le clou ou la vis en place, il limite la fuite jusqu&apos;à l&apos;atelier.</li>
              <li>Avec une roue de secours galette, respectez la vitesse maximale indiquée dessus.</li>
              <li>Si vous avez utilisé une bombe anti-crevaison ou posé une mèche, signalez-le en arrivant.</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
            <Link href="/pneus-voiture" className="text-purple-bright hover:underline">Pneus voiture au Crès</Link>
            <Link href="/mecanique#parallelisme" className="text-purple-bright hover:underline">Parallélisme</Link>
            <Link href="/nos-centres" className="text-purple-bright hover:underline">Venir à l&apos;atelier</Link>
          </div>
        </div>
      </section>

      <section id="devis" className="relative scroll-mt-24 overflow-hidden bg-muted py-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight">Pneu à changer ? <span className="text-gradient-purple">Demandez un devis</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Indiquez la dimension si vous la connaissez. L&apos;atelier vous rappelle avec un prix et la disponibilité.</p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 shadow-xl sm:p-8">
            <DevisVlForm />
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
