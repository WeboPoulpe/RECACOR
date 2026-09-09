"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, MapPin, Truck, Clock3, MessageCircleQuestion, Megaphone } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { PHONE_DISPLAY } from "@/lib/tracking";

const faqs = [
  {
    q: "Quels véhicules peuvent être concernés ?",
    a: "La demande concerne les pneus poids lourd pour camions, utilitaires et remorques. L’équipe vous demande les dimensions exactes, le nombre de pneus et l’usage, puis valide la faisabilité.",
  },
  {
    q: "Les pneus Hankook PL sont-ils disponibles ?",
    a: "Oui, du stock Hankook PL est disponible selon les dimensions. La quantité et le délai de livraison sont confirmés avec vous avant la commande.",
  },
  {
    q: "Comment savoir si mes dimensions sont disponibles ?",
    a: "Vous laissez vos dimensions, votre usage et vos coordonnées. Un commercial revient avec le statut réel, la quantité possible et les prochaines étapes.",
  },
  {
    q: "Livrez-vous en dehors du Sud ?",
    a: "Oui, livraison possible sur toute la France après validation de la commande.",
  },
  {
    q: "Puis-je acheter au comptoir si je suis proche du Crès ?",
    a: "Oui, si vous êtes proche, vous pouvez finaliser directement au garage selon les disponibilités.",
  },
  {
    q: "Quels délais de réponse ?",
    a: "La vérification est traitée rapidement par les équipes, en priorité selon le volume et l’urgence commerciale.",
  },
  {
    q: "Est-ce que la livraison est possible pour plusieurs dimensions d’un coup ?",
    a: "Oui, dès que les dimensions sont compatibles avec la disponibilité validée, la commande multiple peut être pilotée.",
  },
];

const services = [
  "stock disponible selon la dimension",
  "vérification de montage possible",
  "conseil dimensionnel selon l’activité",
  "validation avant commande",
  "suivi commercial dédié",
];

export function LandingHankookClient() {
  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Hankook", url: "https://www.recacor.fr/preventes-hankook" },
        ]}
      />
      <FaqJsonLd items={faqs} id="preventes-hankook" />

      <section className="relative isolate overflow-hidden pt-28 pb-20">
        <Image
          src="/images/hankook/hankook-landing-hero-desktop.webp"
          alt="Atelier Recacor Le Crès - pneus poids lourd Hankook"
          fill
          priority
          quality={82}
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#12206a]/92 via-[#152f86]/85 to-[#12206a]/72" />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:px-8 lg:items-start">
          <div className="w-full rounded-2xl border border-white/10 bg-white/6 p-6 text-white backdrop-blur-sm lg:w-3/5">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Megaphone className="h-3.5 w-3.5" /> Stock disponible PL
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Stock et disponibilité
              <br />
              pneus poids lourd Hankook
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
              Consultez les dimensions disponibles avec l’atelier du Crès. Le stock Hankook PL est disponible selon la
              dimension, avec livraison possible partout en France.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center rounded-xl bg-[#f59e0b] px-5 py-3 text-sm font-black text-black" href="#demande">
                Je vérifie ma disponibilité et la livraison
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <PhoneLink location="hero" serviceType="pl" className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold" showIcon>
                Appeler : {PHONE_DISPLAY}
              </PhoneLink>
            </div>
          </div>

          <aside className="w-full rounded-2xl border border-white/10 bg-white/85 p-5 text-[#16234f] lg:w-2/5">
            <h2 className="text-xl font-black">Ce que vous obtenez</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center rounded-lg bg-[#eef3ff] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#23385d]">
              <BadgeCheck className="mr-2 h-4 w-4" />
              04 99 53 33 90 / 06 07 62 10 43
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-background py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <article className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-black">Crès + livraison nationale</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              L’atelier du Crès reste votre interlocuteur principal : vérification rapide, conseil dimensionnel,
              validation de faisabilité puis confirmation réelle.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Quand la commande est validée, la livraison peut être organisée pour la France entière.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border bg-muted px-3 py-1">Atelier du Crès</span>
              <span className="rounded-full border border-border bg-muted px-3 py-1">Livraison France</span>
              <span className="rounded-full border border-border bg-muted px-3 py-1">Commercial dédié</span>
            </div>
          </article>
          <article className="overflow-hidden rounded-xl border border-border bg-white p-6">
            <Image
              src="/images/hankook/hankook-landing-routier-desktop.webp"
              alt="Livraison et disponibilité réelle pneus Hankook"
              quality={68}
              width={1280}
              height={720}
              loading="lazy"
              sizes="(max-width: 639px) 100vw, (min-width: 640px) 50vw, (min-width: 1024px) 50vw"
              className="aspect-video w-full rounded-lg object-cover"
            />
          </article>
        </div>
      </section>

      <section className="bg-muted/50 py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <article className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-black">Formulaire dédié PL</h2>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Renseignez vos dimensions, votre usage et vos coordonnées. Vous recevez la vérification de disponibilité et la suite commerciale.
            </p>
            <Image
              src="/images/hankook/hankook-landing-chantier-desktop.webp"
              alt="Pneus poids lourd Hankook en contexte chantier"
              quality={68}
              width={1280}
              height={720}
              loading="lazy"
              sizes="(max-width: 639px) 100vw, (min-width: 640px) 50vw, (min-width: 1024px) 50vw"
              className="mb-4 aspect-[16/9] w-full rounded-lg object-cover"
            />
            <DevisPlForm />
          </article>

          <article id="demande" className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-2xl font-black">Questions fréquentes</h2>
            <div className="mt-4 divide-y">
              {faqs.map((item) => (
                <details key={item.q} className="py-3">
                  <summary className="cursor-pointer text-sm font-bold text-[#17254c]">{item.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-[#e7edff] bg-[#f3f6ff] p-4">
              <h3 className="flex items-center gap-2 text-sm font-black">
                <MessageCircleQuestion className="h-4 w-4" />
                Besoin urgent ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour un besoin immédiat : appelez directement le Crès, votre interlocuteur commercial recontacte en priorité.
              </p>
            </div>
            <div className="mt-4 rounded-lg bg-[#12206a] p-4 text-white">
              <h3 className="flex items-center gap-2 text-sm font-black">
                <MapPin className="h-4 w-4" />
                Crès + livraison nationale
              </h3>
              <p className="mt-2 text-sm">
                Stock vérifié au Crès, coordination commerciale et livraison selon destination en France.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="rounded-xl border border-border bg-white p-5 sm:flex-1">
            <h2 className="text-2xl font-black">Notre promesse d’échange</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Réponse claire, statut réel, et accompagnement jusqu’à la confirmation commerciale.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#22335d]">
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1"><Clock3 className="mr-1 h-3.5 w-3.5" />Priorité de vérification</span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1"><Truck className="mr-1 h-3.5 w-3.5" />Poids lourd</span>
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1"><BadgeCheck className="mr-1 h-3.5 w-3.5" />Mise à niveau commerciale</span>
            </div>
          </div>
          <aside className="rounded-xl border border-border bg-[#11296d] p-5 text-white sm:w-80">
            <h3 className="text-lg font-black">Besoin de passer un appel direct ?</h3>
            <p className="mt-2 text-sm text-white/85">Service PL : contactez directement le Crès.</p>
            <div className="mt-4">
              <PhoneLink location="cta" serviceType="pl" className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-black text-[#10244a]" showIcon>
                Appeler : {PHONE_DISPLAY}
              </PhoneLink>
            </div>
            <Link className="mt-4 inline-flex items-center text-sm text-white/80 underline" href="/pneus-utilitaires-pl">
              Voir la page PL du Crès <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-[#0f1f54] py-10 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest text-white/70">Stock Hankook PL</p>
          <Image
            src="/images/hankook/hankook-stock-routier-national-4x5-v06.png"
            alt="Pneus poids lourd Hankook en stock et livrables partout en France"
            quality={76}
            width={1080}
            height={1350}
            loading="lazy"
            sizes="(max-width: 639px) 100vw, (min-width: 640px) 75vw, (min-width: 1024px) 28rem"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-lg object-cover"
          />
        </div>
      </section>
    </main>
  );
}
