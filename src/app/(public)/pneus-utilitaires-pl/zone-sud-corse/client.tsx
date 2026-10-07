"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MapPin, Phone, Shield, Truck, Wrench } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";
import { AvisRecacorPl } from "@/components/avis-recacor-pl";
import { PlWhatsappButton } from "@/components/pl-whatsapp-button";
import { PL_CLAIRE_CONTACT } from "@/lib/pl-commercial-contact";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { PhoneLink } from "@/components/phone-link";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_PL_SUIVI } from "@/lib/tracking";

const zonesActivites = [
  "Transport régional",
  "Remorques",
  "Bennes",
  "Chantier",
  "Dépannage",
  "Recreusage",
];

const segments = [
  {
    Icon: Truck,
    title: "Transport, logistique et remorque",
    items: [
      "Tracteurs, porteurs, remorques et flottes régionales",
      "Montes multi-essieux : 2 avant / 4 arrière, 4 ou 6 pneus remorque",
      "Objectif : limiter l'immobilisation et le coût au kilomètre",
    ],
  },
  {
    Icon: Wrench,
    title: "TP, BTP et chantier",
    items: [
      "Bennes, terrassement et usage mixte route/chantier",
      "Choix selon la charge réelle, les sols et le rythme d'exploitation",
      "Arbitrage entre résistance aux agressions et budget",
    ],
  },
  {
    Icon: Shield,
    title: "Agricole en renfort de zone",
    items: [
      "Pneus tracteurs et engins d'exploitation selon le secteur",
      "Prise en charge selon le point d'appui disponible",
      "Conseil selon l'usage réel de l'exploitation",
    ],
  },
];

const pointsAppui = [
  "Occitanie : 09, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82",
  "Provence-Alpes-Côte d’Azur : 04, 05, 06, 13, 83, 84",
  "Ardèche et Drôme : 07, 26",
  "Pyrénées-Atlantiques : 64",
  "Corse : 2A, 2B",
];

const claireFormContact = {
  name: PL_CLAIRE_CONTACT.name,
  successHref: `${PL_CLAIRE_CONTACT.pagePath}/merci`,
  postalCodePattern: /^(04|05|06|07|09|11|12|13|20|26|30|31|32|34|46|48|64|65|66|81|82|83|84)\d{3}$/,
};

const faqs = [
  {
    q: "Qui est Claire, l'interlocutrice de la zone ?",
    a: "Claire est votre interlocutrice commerciale pour les pneus poids lourd dans le Sud et en Corse. Envoyez-lui votre dimension, la quantité et votre code postal sur WhatsApp, ou remplissez le formulaire.",
  },
  {
    q: "Je travaille dans le transport ou la remorque : pouvez-vous traiter ma demande ?",
    a: "Oui, c'est le cœur de la zone : tracteurs, porteurs, remorques et flottes régionales. Donnez la dimension complète, la quantité et le poste concerné — Claire revient avec un prix et un délai.",
  },
  {
    q: "Comment se passe la prise en charge concrètement ?",
    a: "Pour un devis, contactez Claire sur WhatsApp ou utilisez le formulaire. Elle étudie la dimension, la quantité, l’essieu et le secteur, puis confirme les conditions de prise en charge. Pour une urgence dépannage, le bouton dédié vous met en relation avec Patrick.",
  },
  {
    q: "Intervenez-vous partout de la même façon dans le Sud ?",
    a: "La prise en charge dépend de votre commune, du véhicule, de la prestation et des disponibilités. Claire vérifie les possibilités avec l’atelier ou un partenaire avant de vous confirmer les modalités.",
  },
  {
    q: "Pouvez-vous aussi parler recreusage si le parc s'y prête ?",
    a: "Oui, si le pneu et sa carcasse le permettent. Le recreusage se réalise en atelier, après contrôle. Claire vous renseigne sur la faisabilité, le prix et le délai pour vos pneus.",
  },
];

export function PlZoneSudCorseClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Pneus PL", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
        { name: "Zone Sud & Corse", url: "https://www.recacor.fr/pneus-utilitaires-pl/zone-sud-corse" },
      ]} />
      <ServiceJsonLd
        name="Pneus poids lourd zone Sud & Corse"
        description="Page zone commerciale Recacor pour les demandes pneus poids lourd orientées transport, remorque, TP et flotte régionale."
      />
      <FaqJsonLd items={faqs} id="pl-zone-sud-corse" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image" : "hero-overlay-solid"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-6 border-white/20 bg-white/10 text-white">
            <MapPin className="mr-1 h-3 w-3" /> Zone suivie par Claire
          </Badge>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pneus poids lourd pour la{" "}
            <span className="text-purple-glow">zone Sud &amp; Corse</span><br />
            en transport, remorque et chantier
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Pour vos pneus de tracteur routier, porteur, remorque ou benne, contactez Claire sur WhatsApp.
            Envoyez la dimension, la quantité et votre code postal ; elle vérifie les possibilités
            et vous confirme les conditions de livraison ou d’intervention.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {["Claire", "Transport / remorque", "TP / BTP", "Dépannage", "Recreusage"].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <PlWhatsappButton contact={PL_CLAIRE_CONTACT} className="px-6 py-4" />
            <a href="#devis" className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-yellow-500/30 bg-yellow-400 px-6 py-4 font-black text-slate-950 transition-colors hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </a>
            <PhoneLink location="hero" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-red-300/60 bg-red-950/80 px-6 py-4 font-bold text-white hover:bg-red-950">
              <Phone aria-hidden="true" className="h-4 w-4" /> Urgence dépannage
            </PhoneLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Claire, votre interlocutrice{" "}
              <span className="text-gradient-purple">zone Sud &amp; Corse</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Claire étudie votre demande à partir du véhicule, de la dimension complète,
                de l’essieu, de la quantité et du lieu de livraison ou d’intervention.
                Une photo du flanc du pneu peut aider à identifier la monte et ses indices.
              </p>
              <p>
                Transport, remorque, porteurs, bennes ou besoins chantier : Claire vous
                confirme la disponibilité et les modalités avant commande. Pour un recreusage,
                un contrôle du pneu en atelier permet d’étudier la faisabilité.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Activités les plus traitées</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {zonesActivites.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center text-4xl font-black tracking-tight sm:text-5xl">
            Ce que la zone traite{" "}
            <span className="text-gradient-purple">concrètement</span>
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-border bg-white p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid">
                  <segment.Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="mb-4 text-lg font-black tracking-tight">{segment.title}</h3>
                <ul className="space-y-2">
                  {segment.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-bright" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Une couverture organisée{" "}
                <span className="text-gradient-purple">selon vos besoins</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Claire suit 24 départements dans le Sud et en Corse. Indiquez votre commune
                pour vérifier les possibilités de livraison, de montage ou d’intervention
                selon le besoin et les disponibilités.
              </p>
              <div className="mt-8 space-y-3">
                {pointsAppui.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-purple-bright" />
                    <p className="text-sm font-semibold text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Pour être rappelé rapidement</p>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-base font-black">Votre activité</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Transport régional, remorque, chantier, benne ou parc mixte :
                    la solution dépend d&apos;abord de votre usage réel.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black">Votre urgence</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Crevaison à remettre en route, monte à planifier ou budget à tenir :
                    dites-le d&apos;entrée, la réponse s&apos;organise autour.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black">Votre secteur</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Précisez le code postal et la commune de livraison ou d’intervention.
                    Claire vérifie la solution possible dans votre secteur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-24">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 text-white sm:p-14">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
                  <Phone className="h-3.5 w-3.5 text-purple-glow" /> Liens utiles
                </div>
                <h2 className="text-3xl font-black sm:text-4xl">
                  D&apos;autres sujets utiles selon votre besoin
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Retrouvez les services pneus poids lourd, les informations pour Nîmes et Sète,
                  le dépannage sur route et le recreusage.
                </p>
              </div>
              <div className="space-y-3">
                <Link href="/pneus-utilitaires-pl" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Pneus poids lourd</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/depannage-poids-lourd-urgence" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Dépannage sur route Perpignan-Marseille-Millau</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/blog/pneus-nimes" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Pneus poids lourd à Nîmes</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/blog/pneus-sete" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Pneus poids lourd à Sète</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pneus-utilitaires-pl#recreusage" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Recreusage poids lourd</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative overflow-hidden bg-muted py-24 scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Devis pneus PL{" "}
              <span className="text-gradient-purple">Zone Sud &amp; Corse</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Indiquez la dimension si vous la connaissez, la quantité, l’essieu et votre code postal.
              Vous pouvez aussi envoyer une photo du pneu à Claire sur WhatsApp.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-xl sm:p-8">
            <DevisPlForm contact={claireFormContact} />
          </div>
        </div>
      </section>

      <AvisRecacorPl />

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight sm:text-5xl">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group cursor-pointer rounded-2xl border border-border bg-white p-5">
                <summary className="flex list-none items-center justify-between font-bold text-sm">
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
