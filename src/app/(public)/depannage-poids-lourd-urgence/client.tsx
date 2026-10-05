"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Globe, ShieldCheck, PhoneCall, ArrowRight, MessageCircle, Truck, Package } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_PL_SUIVI, PHONE_WHATSAPP_PL } from "@/lib/tracking";
import Link from "next/link";

// Faits repris de docs/GEO_FAITS.md : ne rien ajouter ici qui n'y figure pas.
const villesCorridor = [
  "Perpignan",
  "Narbonne",
  "Béziers",
  "Montpellier",
  "Nîmes",
  "Avignon",
  "Millau",
];

const chiffresCles = [
  { icon: Truck, value: "Une dizaine", label: "de camions d'intervention" },
  { icon: Package, value: "Stock à bord", label: "pour réparer ou changer le pneu" },
  { icon: Clock, value: "24h/24 · 7j/7", label: "nuit et week-end compris" },
  { icon: Globe, value: "5 langues", label: "au téléphone" },
];

const casCourants = [
  { icon: AlertTriangle, title: "Crevaison sur l'A9 ou l'A75", desc: "Si vous pouvez rejoindre la prochaine sortie en sécurité, arrêtez-vous sur un parking ou en zone d'activité et appelez : le camion d'intervention répare ou remplace le pneu sur place. C'est souvent moins cher qu'un dépannage sur l'autoroute." },
  { icon: Package, title: "Pneu hors service, pas de roue de secours", desc: "Chaque camion part avec des pneus poids lourd à bord. Donnez la dimension au téléphone : on vérifie qu'elle est dans le camion avant qu'il parte." },
  { icon: Clock, title: "Panne de nuit ou de week-end", desc: "Une astreinte tourne midi, soir, nuit et week-end, y compris pour un chauffeur qu'on n'a jamais vu avant." },
];

const aPreparer = [
  { title: "Votre position", desc: "Partagez-la en un clic sur WhatsApp, ou donnez l'adresse, le nom du parking ou du dépôt." },
  { title: "La dimension du pneu", desc: "Elle est écrite sur le flanc, par exemple 315/80 R22.5 ou 385/65 R22.5." },
  { title: "L'essieu touché", desc: "Directeur, moteur ou remorque, et s'il s'agit d'une monte simple ou jumelée." },
  { title: "Le véhicule et le chargement", desc: "Tracteur, porteur, semi ou engin, et s'il transporte des matières dangereuses ou du frigorifique." },
  { title: "La société qui règle", desc: "Le nom du transporteur ou de l'exploitant, pour la facture." },
];

const etapesIntervention = [
  { title: "Vous appelez", desc: "Un numéro unique, décroché directement par l'équipe. Donnez votre position et la dimension du pneu." },
  { title: "On annonce le prix avant de partir", desc: "Selon l'heure, la distance et la panne, on vous dit qui part, avec quel pneu, et ce que ça va coûter." },
  { title: "Le camion le plus proche intervient", desc: "Réparation ou remplacement du pneu sur place. Si le pneu doit ensuite être recreusé ou remplacé en atelier, on vous l'explique." },
  { title: "Vous repartez", desc: "Serrage et pression contrôlés, facture claire, au prix annoncé au téléphone." },
];

const zones = [
  { axe: "Sorties A9 Ouest", villes: "Perpignan, Narbonne, Béziers" },
  { axe: "Sorties A9 Centre", villes: "Montpellier, Le Crès" },
  { axe: "Sorties A9 Est", villes: "Nîmes, Avignon" },
  { axe: "Sorties A75", villes: "Clermont-l'Hérault, Lodève, Millau" },
];

const faqs = [
  { q: "Vous intervenez vraiment la nuit et le week-end ?", a: "Oui. Une astreinte est organisée midi, soir, nuit et week-end pour les pannes de pneu poids lourd. Le prix vous est annoncé au téléphone avant qu'on se déplace." },
  { q: "Combien de camions d'intervention avez-vous ?", a: "Recacor dispose d'une dizaine de camions d'intervention répartis sur l'axe, chacun avec du stock de pneus poids lourd pour réparer ou remplacer un pneu sur place." },
  { q: "Où intervenez-vous ?", a: "Près des sorties de l'A9, de Perpignan à Avignon (Narbonne, Béziers, Montpellier, Nîmes), et de l'A75 jusqu'à Millau : sur la route, sur un parking poids lourds, au dépôt ou sur un chantier. Donnez votre position au téléphone : le camion le plus proche se déplace." },
  { q: "J'ai crevé sur l'autoroute, que faire ?", a: "Si le camion peut rejoindre la prochaine sortie en sécurité, sortez et arrêtez-vous sur un parking ou en zone d'activité, puis appelez-nous. Le camion d'intervention le plus proche vient réparer ou changer le pneu, souvent pour moins cher qu'un dépannage sur l'autoroute." },
  { q: "Combien coûte une intervention ?", a: "Le prix dépend de la distance, de l'heure et du pneu à poser. Il vous est annoncé au téléphone avant le départ du camion, sans surprise sur la facture." },
  { q: "Le pneu peut-il être réparé sur place ou faut-il le remplacer ?", a: "Ça dépend de l'endroit et de la taille de la crevaison, ainsi que de l'état de la carcasse. L'équipe vérifie sur place : réparation si c'est possible, sinon remplacement avec un pneu du stock embarqué." },
  { q: "Do you speak English?", a: "Yes. Our team can take your call in English, Italian, Polish, Romanian or Portuguese to organise tyre assistance near the A9 exits from Perpignan to Avignon and the A75 exits to Millau." },
  { q: "Je ne connais pas ma position exacte, comment faire ?", a: "Partagez votre position sur WhatsApp : c'est le plus rapide. Sinon, donnez la ville et la route ou le nom du parking le plus proche." },
  { q: "Que dois-je faire en attendant l'arrivée de l'équipe ?", a: "Mettez les feux de détresse, sortez le triangle et le gilet si vous le pouvez en sécurité, et éloignez-vous de la circulation. Gardez votre téléphone à portée : on vous rappelle pour confirmer l'arrivée." },
];

export function DepannageClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Dépannage poids lourd urgence", url: "https://www.recacor.fr/depannage-poids-lourd-urgence" },
      ]} />
      <ServiceJsonLd
        name="Dépannage pneu poids lourd"
        serviceType="Assistance pneu poids lourd sur route"
        description="Dépannage pneu poids lourd 24h/24 et 7j/7 avec une dizaine de camions d'intervention équipés de pneus en stock, près des sorties de l'A9 de Perpignan à Avignon et de l'A75 jusqu'à Millau."
        url="https://www.recacor.fr/depannage-poids-lourd-urgence"
        areaServed={villesCorridor}
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
            <AlertTriangle className="h-3 w-3 mr-1" /> Perpignan · Avignon · Millau
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] max-w-3xl">
            Dépannage pneu poids lourd{" "}
            <span className="text-purple-glow">24h/24, 7j/7</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/90 max-w-xl text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Un camion d&apos;intervention vient réparer ou changer le pneu de votre camion
            sur place, près des sorties de l&apos;A9 de Perpignan à Avignon et de l&apos;A75 jusqu&apos;à Millau.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-2xl">
            <PhoneLink location="hero" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="flex-1 recacor-btn-primary whitespace-nowrap py-2.5 sm:py-3" showIcon>
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

      <section className="pt-4 pb-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-foreground">
            Recacor dispose d&apos;une dizaine de camions d&apos;intervention, chacun avec du stock
            de pneus poids lourd, pour réparer ou remplacer un pneu sur place, 24 h/24 et 7 j/7.
            L&apos;équipe intervient près des sorties de l&apos;A9 de Perpignan à Avignon et de l&apos;A75 jusqu&apos;à Millau,
            depuis les sites du Crès, de Servian et de Vergèze. Le prix est annoncé au téléphone
            avant le départ du camion.
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-4">
            Les pannes qu&apos;on traite <span className="text-gradient-purple">le plus souvent</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Un camion qui perd un pneu bloque une tournée entière. Les camions
            d&apos;intervention sont répartis sur l&apos;axe pour que le plus proche parte tout de suite.
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

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Ce qu&apos;on vous demande <span className="text-gradient-purple">au téléphone</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Avec ces cinq informations, le bon camion part avec le bon pneu.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aPreparer.map((item, i) => (
              <li key={item.title} className="flex gap-4 rounded-[4px] border border-border bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-purple-bright text-white font-black text-sm">{i + 1}</span>
                <div>
                  <p className="font-black">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="cta" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appeler l&apos;équipe dépannage
            </PhoneLink>
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
              Une équipe près des sorties <span className="text-gradient-purple">de l&apos;A9 et de l&apos;A75</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Recacor s&apos;appuie sur ses sites du Crès, de Servian et de Vergèze pour
              intervenir près des sorties de l&apos;A9 entre Perpignan et Avignon, et de l&apos;A75 jusqu&apos;à Millau.
              Les camions d&apos;intervention sont répartis sur cet axe, un des plus chargés en
              poids lourds vers l&apos;Espagne : une panne de pneu là-bas ne peut pas attendre
              le lendemain.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[4px] border border-border bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Zones couvertes par le dépannage pneu poids lourd Recacor</caption>
              <thead className="bg-muted/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3">Secteur</th>
                  <th scope="col" className="px-4 py-3">Villes et secteurs</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z) => (
                  <tr key={z.axe} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-black">{z.axe}</th>
                    <td className="px-4 py-3 text-muted-foreground">{z.villes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-[4px] border border-border bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Où on intervient</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sur la route, sur un parking poids lourds, au dépôt, sur un chantier ou en zone
              d&apos;activité : le camion d&apos;intervention vient là où votre poids lourd est arrêté.
              Crevé sur l&apos;A9 ou l&apos;A75 ? Si vous pouvez rejoindre la prochaine sortie en
              sécurité, sortez et appelez-nous : c&apos;est souvent moins cher qu&apos;un dépannage
              sur l&apos;autoroute.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-purple-bright" />
              Le prix est annoncé au téléphone avant le départ du camion.
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
                L&apos;atelier poids lourd du Crès prend le relais pour la géométrie, le
                recreusage ou un train de pneus neufs. Le recreusage se décide toujours en
                atelier, jamais au bord de la route.
              </p>
              <Link href="/garage-poids-lourd" className="mt-4 inline-flex text-sm font-bold text-purple-bright hover:underline">
                Voir l&apos;atelier poids lourd du Crès
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/garage-poids-lourd" className="text-purple-bright hover:underline">Garage poids lourd au Crès</Link>
            <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Pneus poids lourd</Link>
            <Link href="/pneus-utilitaires-pl#recreusage" className="text-purple-bright hover:underline">Recreusage</Link>
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
