"use client";

import { Badge } from "@/components/ui/badge";
import { Wrench, Ruler, RefreshCcw, Package, Disc, Clock, MapPin, Truck, ArrowRight, PhoneCall } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_PL_SUIVI, PHONE_PL_SUIVI_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

// Faits repris de docs/GEO_FAITS.md : ne rien ajouter ici qui n'y figure pas.
const chiffresCles = [
  { icon: MapPin, value: "Le Crès", label: "1240 route de Nîmes, près de Montpellier" },
  { icon: Clock, value: "Lun–sam", label: "8h–12h, et 14h–18h en semaine" },
  { icon: Truck, value: "Camions, remorques", label: "et engins de chantier" },
  { icon: PhoneCall, value: "24h/24", label: "dépannage sur route en dehors des horaires" },
];

const prestations = [
  { prestation: "Montage et démontage de pneus", ou: "Atelier", icon: Wrench },
  { prestation: "Réparation de pneu", ou: "Atelier, ou sur place en dépannage", icon: Wrench },
  { prestation: "Parallélisme et géométrie", ou: "Atelier", icon: Ruler },
  { prestation: "Freinage : disques et plaquettes", ou: "Atelier", icon: Disc },
  { prestation: "Recreusage", ou: "Atelier, si la carcasse le permet", icon: RefreshCcw },
  { prestation: "Pneus poids lourd au comptoir", ou: "Atelier, devis sur place", icon: Package },
];

const signesGeometrie = [
  "Usure plus marquée d'un côté du pneu",
  "Camion qui tire d'un côté en ligne droite",
  "Volant qui n'est plus droit",
  "Pneus neufs qui s'usent trop vite",
];

const faqs = [
  { q: "Quelles prestations faites-vous sur un poids lourd ?", a: "L'atelier du Crès fait le montage et le démontage de pneus, la réparation, le parallélisme et la géométrie, le remplacement des disques et plaquettes de frein, et le recreusage quand la carcasse le permet. Il ne fait pas de mécanique moteur." },
  { q: "Changez-vous les disques et plaquettes de frein d'un camion ?", a: "Oui. L'atelier du Crès remplace les disques et les plaquettes de frein des poids lourds. Appelez pour organiser le passage." },
  { q: "Prenez-vous les remorques et les engins de chantier ?", a: "Oui. L'atelier prend en charge les camions, les remorques et les engins de chantier." },
  { q: "Faut-il prendre rendez-vous pour un parallélisme ?", a: "Le plus simple est d'appeler avant de venir : le temps d'immobilisation dépend de la configuration du véhicule, porteur, tracteur ou remorque." },
  { q: "Quels sont les horaires de l'atelier ?", a: "Du lundi au vendredi de 8 h à 12 h et de 14 h à 18 h, et le samedi de 8 h à 12 h. En dehors de ces horaires, le dépannage sur route répond 24 h/24." },
  { q: "J'ai crevé en dehors des horaires, que faire ?", a: "Appelez la ligne dépannage : une dizaine de camions d'intervention avec des pneus en stock interviennent près des sorties de l'A9 de Perpignan à Avignon et de l'A75 jusqu'à Millau, 24 h/24 et 7 j/7." },
  { q: "Avez-vous des pneus poids lourd en stock ?", a: "Des pneus poids lourd sont disponibles au comptoir, avec devis donné sur place. Donnez la dimension au téléphone pour vérifier avant de venir." },
];

export function GaragePlClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Garage poids lourd au Crès", url: "https://www.recacor.fr/garage-poids-lourd" },
      ]} />
      <ServiceJsonLd
        name="Garage poids lourd au Crès"
        serviceType="Atelier pneus et géométrie poids lourd"
        description="Atelier poids lourd au Crès, près de Montpellier : montage et réparation de pneus, parallélisme et géométrie, disques et plaquettes de frein, recreusage, pour camions, remorques et engins de chantier."
        url="https://www.recacor.fr/garage-poids-lourd"
      />
      <FaqJsonLd items={faqs} id="garage-poids-lourd" />

      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image-strong" : "hero-overlay-solid"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4 sm:mb-6">
            <Wrench className="h-3 w-3 mr-1" /> Atelier poids lourd
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] max-w-3xl">
            Garage poids lourd <span className="text-purple-glow">au Crès</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/90 max-w-xl text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Pneus, parallélisme, géométrie et freinage pour camions, remorques et engins,
            à l&apos;atelier Recacor près de Montpellier.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-2xl">
            <PhoneLink location="hero" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="flex-1 recacor-btn-primary whitespace-nowrap py-2.5 sm:py-3" showIcon>
              Appeler : {PHONE_PL_SUIVI_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 recacor-btn-secondary whitespace-nowrap py-2.5 sm:py-3">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-2.5 text-xs sm:text-sm text-white/70">
            Crevaison en dehors des horaires ?{" "}
            <PhoneLink location="hero" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="font-bold text-white underline">
              Dépannage 24h/24
            </PhoneLink>
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="pt-4 pb-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-foreground">
            L&apos;atelier poids lourd de Recacor est au Crès, 1240 route de Nîmes, près de Montpellier.
            Il prend en charge les camions, les remorques et les engins de chantier : montage et
            réparation de pneus, parallélisme et géométrie, disques et plaquettes de frein, recreusage quand la carcasse le permet.
            Il est ouvert du lundi au vendredi de 8 h à 12 h et de 14 h à 18 h, et le samedi matin ;
            en dehors de ces horaires, une dizaine de camions d&apos;intervention assurent le dépannage
            sur route 24 h/24.
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
            Ce que fait <span className="text-gradient-purple">l&apos;atelier</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            L&apos;atelier s&apos;occupe des pneus, de la géométrie et du freinage (disques et plaquettes), pas de la mécanique moteur.
          </p>
          <div className="overflow-hidden rounded-[4px] border border-border bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Prestations de l&apos;atelier poids lourd Recacor au Crès</caption>
              <thead className="bg-muted/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3">Prestation</th>
                  <th scope="col" className="px-4 py-3">Où</th>
                </tr>
              </thead>
              <tbody>
                {prestations.map((p) => (
                  <tr key={p.prestation} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-black">
                      <span className="inline-flex items-center gap-2">
                        <p.icon className="h-4 w-4 text-purple-bright" />
                        {p.prestation}
                      </span>
                    </th>
                    <td className="px-4 py-3 text-muted-foreground">{p.ou}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[4px] border border-border bg-white p-8">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Parallélisme et géométrie camion</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un mauvais parallélisme use les pneus poids lourd bien avant l&apos;heure. Les signes
              qui doivent faire passer à l&apos;atelier :
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {signesGeometrie.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-purple-bright font-black">·</span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Appelez avant de venir : le temps d&apos;immobilisation dépend du véhicule, porteur,
              tracteur ou remorque.
            </p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-8">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCcw className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Recreusage et pneus au comptoir</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quand la carcasse le permet, le recreusage prolonge la vie d&apos;un pneu poids lourd
              avant de le remplacer. Il se décide à l&apos;atelier, après contrôle. Des pneus poids
              lourd sont aussi disponibles au comptoir, avec devis donné sur place.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
              <Link href="/pneus-utilitaires-pl#recreusage" className="text-purple-bright hover:underline">Le recreusage en détail</Link>
              <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Pneus poids lourd</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Crevaison sur la route ?</h2>
            <p className="mt-3 max-w-2xl text-white/80 leading-relaxed">
              Une dizaine de camions d&apos;intervention avec des pneus en stock se déplacent
              24 h/24 et 7 j/7 près des sorties de l&apos;A9 de Perpignan à Avignon et de l&apos;A75 jusqu&apos;à Millau.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
              <PhoneLink location="cta" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
                Appeler le dépannage
              </PhoneLink>
              <Link href="/depannage-poids-lourd-urgence" className="flex-1 inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/30 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 whitespace-nowrap">
                Voir le dépannage <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-background overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Devis <span className="text-gradient-purple">atelier poids lourd</span>
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
