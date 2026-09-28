"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Globe, ShieldCheck, PhoneCall, ArrowRight, MessageCircle } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_WHATSAPP_PL } from "@/lib/tracking";
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

const casCourants = [
  { icon: AlertTriangle, title: "Crevaison sur autoroute", desc: "Pneu percé ou éclaté sur A9, A75 ou une aire de repos : on vient monter une roue de secours ou réparer sur place selon l'état du pneu." },
  { icon: Clock, title: "Panne de nuit ou de week-end", desc: "Une astreinte tourne midi, soir, nuit et week-end, y compris pour un chauffeur qu'on n'a jamais vu avant." },
  { icon: MapPin, title: "Camion immobilisé loin de l'atelier", desc: "Un monteur-dépanneur équipé se déplace directement jusqu'à vous, sans attendre que le camion rentre à l'atelier." },
];

const etapesIntervention = [
  { title: "Vous appelez", desc: "Un numéro unique, décroché directement par l'équipe. Donnez votre position (borne kilométrique, aire, nom de la sortie) et le type de véhicule." },
  { title: "On confirme la marche à suivre", desc: "Selon l'heure et la panne, on vous dit qui part, avec quel matériel, et ce que ça va coûter avant de démarrer." },
  { title: "L'équipe intervient sur place", desc: "Montage, réparation ou dépannage roue selon ce qui est possible sur site. Si le pneu doit être recreusé ou remplacé en atelier, on vous l'explique clairement." },
  { title: "Vous repartez", desc: "Facture et prestation claires, sans mauvaise surprise sur le prix annoncé au téléphone." },
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
  { q: "Vous intervenez vraiment la nuit et le week-end ?", a: "Oui. Une astreinte est organisée midi, soir, nuit et week-end pour les pannes poids lourd sur route. Le tarif d'astreinte dépend du créneau horaire et vous est annoncé avant qu'on ne se déplace." },
  { q: "Do you speak English?", a: "Yes. Our team can take your call in English, Italian, Polish, Romanian or Portuguese to organise roadside tyre assistance on the Perpignan-Marseille-Millau corridor." },
  { q: "Je suis loin d'un atelier Recacor, vous pouvez quand même venir ?", a: "L'équipe se déplace sur l'axe Perpignan-Narbonne-Béziers-Montpellier-Nîmes-Marseille, ainsi que vers Millau. Le tarif de déplacement dépend de la distance réelle depuis l'atelier le plus proche ; on vous le confirme au téléphone selon votre position exacte." },
  { q: "Combien coûte une intervention ?", a: "Le prix se décompose en deux parties : le déplacement (30 à 85 € HT selon la distance, plus 1,80 €/km au-delà de 100 km) et l'astreinte si vous appelez en dehors des heures normales (de 90 € à 650 € HT selon le créneau). La prestation elle-même (montage, réparation) s'ajoute selon le pneu." },
  { q: "Le pneu peut-il être réparé sur place ou faut-il le remplacer ?", a: "Ça dépend de l'endroit et de la taille de la crevaison, ainsi que de l'état de la carcasse. L'équipe vérifie sur place ce qui est possible : réparation, montage d'une roue de secours, ou remplacement si le pneu est trop abîmé." },
  { q: "Je ne connais pas ma position exacte sur l'autoroute, comment faire ?", a: "Donnez la borne kilométrique la plus proche, le nom de la dernière sortie ou de l'aire de repos passée, et le sens de circulation. C'est suffisant pour organiser l'intervention." },
  { q: "Faites-vous aussi le recreusage sur route ?", a: "Le recreusage se fait en atelier, pas sur le bord de l'autoroute. Sur place, l'équipe pose une roue ou répare pour vous remettre en route ; le recreusage peut être proposé ensuite si le pneu est éligible." },
  { q: "Que dois-je faire en attendant l'arrivée de l'équipe ?", a: "Mettez les feux de détresse, sortez le triangle et le gilet si vous le pouvez en sécurité, et éloignez-vous de la circulation. Gardez votre téléphone à portée : on vous rappelle pour confirmer l'heure d'arrivée." },
];

export function DepannageClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Dépannage poids lourd urgence", url: "https://www.recacor.fr/depannage-poids-lourd-urgence" },
      ]} />
      <ServiceJsonLd
        name="Dépannage poids lourd sur route"
        serviceType="Assistance pneu poids lourd sur route"
        description="Assistance pneu poids lourd 24h/24 7j/7 sur l'axe Perpignan-Marseille-Millau : crevaison, éclatement, intervention sur site."
        url="https://www.recacor.fr/depannage-poids-lourd-urgence"
      />
      <FaqJsonLd items={faqs} id="depannage-urgence" />

      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-20 overflow-hidden">
        <img
          src="/hero-generated/depannage-pl-master.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[62%_68%]"
        />
        <div className="absolute inset-0 hero-overlay-image-strong" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4 sm:mb-6">
            <AlertTriangle className="h-3 w-3 mr-1" /> Assistance sur route
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] max-w-3xl">
            Dépannage pneu poids lourd{" "}
            <span className="text-purple-glow">24h/24, 7j/7</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/90 max-w-xl text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Une équipe vient sur place pour une crevaison ou un pneu hors service,
            entre Perpignan, Marseille et Millau.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-2xl">
            <PhoneLink location="hero" serviceType="pl" phoneNumber={PHONE_WHATSAPP_PL} className="flex-1 recacor-btn-primary whitespace-nowrap py-2.5 sm:py-3" showIcon>
              Appeler maintenant
            </PhoneLink>
            <a
              href={`https://wa.me/${PHONE_WHATSAPP_PL.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 sm:py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <p className="mt-2.5 text-xs sm:text-sm text-white/60">
            Ligne tenue par Patrick, joignable par appel ou WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {villesCorridor.map((ville) => (
              <span key={ville} className="rounded-[4px] border border-white/15 bg-white/10 px-3 py-1.5">
                {ville}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/80">
            <Globe className="h-4 w-4 text-purple-glow" />
            English · Italiano · Polski · Română · Português
          </div>
          <a href="#devis" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
            Demande non urgente <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-4">
            Les pannes qu&apos;on traite <span className="text-gradient-purple">le plus souvent</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Un camion qui perd un pneu bloque une tournée entière. L&apos;idée est simple :
            plusieurs monteurs-dépanneurs interviennent directement sur place, chacun avec
            son camion équipé.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {casCourants.map((c) => (
              <div key={c.title} className="rounded-[4px] border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <c.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Ce qui se passe <span className="text-gradient-purple">quand vous appelez</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Pas de standard, pas d&apos;attente : la personne qui décroche organise
            directement l&apos;intervention.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {etapesIntervention.map((e, i) => (
              <div key={e.title} className="rounded-[4px] border border-border bg-white p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-purple-bright text-white font-black text-sm">{i + 1}</span>
                  <h3 className="text-lg font-black">{e.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Une équipe organisée pour <span className="text-gradient-purple">l&apos;axe Perpignan-Marseille</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Recacor s&apos;appuie sur ses sites du Crès, de Servian et de Vergèze pour
              couvrir l&apos;autoroute entre Perpignan et Marseille, ainsi que la liaison
              vers Millau. Plusieurs monteurs-dépanneurs sont répartis sur cet axe, chacun
              avec son camion-atelier équipé, prêts à intervenir sans qu&apos;un seul
              véhicule ait à couvrir tout le trajet. C&apos;est un des passages les plus
              chargés en poids lourds vers l&apos;Espagne, et une panne de pneu là-bas ne
              peut pas attendre le lendemain.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Selon votre position au moment de l&apos;appel, l&apos;équipe la plus proche
              se déplace directement. Donnez simplement la ville la plus proche ou la
              borne kilométrique pour qu&apos;on organise l&apos;intervention.
            </p>
          </div>

          <div className="mt-10 rounded-[4px] border border-border bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Tarifs de déplacement</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Prix hors taxes, en heures normales, calculés depuis l&apos;atelier le plus
              proche de votre position. TVA applicable en sus au taux en vigueur. Le tarif
              exact vous est confirmé au téléphone avant l&apos;intervention, selon votre
              position réelle.
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

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[4px] border border-border bg-white p-8">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-purple-bright" />
                <h2 className="text-xl font-black tracking-tight">Plusieurs langues au téléphone</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Beaucoup de chauffeurs qui passent par cet axe viennent de l&apos;étranger.
                Notre équipe peut échanger en anglais, italien, polonais, roumain ou
                portugais pour organiser une intervention, sans que ça ralentisse la
                prise en charge.
              </p>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <h2 className="text-xl font-black tracking-tight mb-4">Après le dépannage</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si le pneu dépanné sur route peut encore être recreusé plutôt que
                remplacé neuf, l&apos;équipe vous le propose lors du passage suivant à
                l&apos;atelier. Le recreusage se décide toujours en atelier, jamais sur
                le bord de l&apos;autoroute.
              </p>
              <Link href="/services/recreusage" className="mt-4 inline-flex text-sm font-bold text-purple-bright hover:underline">
                Voir le service recreusage
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Pneus poids lourd</Link>
            <Link href="/services/recreusage" className="text-purple-bright hover:underline">Recreusage</Link>
            <Link href="/ro/depannage-poids-lourd-urgence" className="text-purple-bright hover:underline">Pagină în română</Link>
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
              Panne en cours ? Appelez directement
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
        </div>
      </section>
    </>
  );
}
