"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wrench, Droplet, Disc, Gauge, Target, Snowflake, Filter } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const FALLBACK_IMAGE = "/hero-generated/mecanique-master.webp";

const services = [
  { icon: Droplet, title: "Vidange", desc: "Vidange complète huile + filtre", price: "79€", href: "/mecanique#vidange", image: "/illustrations/mecanique#vidange-intro-20260716.webp" },
  { icon: Target, title: "Parallélisme & Géométrie", desc: "Réglage laser 3D", price: "65€", href: "/mecanique#parallelisme", image: "/illustrations/services/parallelisme-intro-20260716.webp" },
  { icon: Gauge, title: "Contrôle technique", desc: "Pré-contrôle offert + prise en charge atelier", price: "87,22€", href: "/services/prise-en-charge-controle-technique", image: "/illustrations/services/controle-technique-hero-20260723.png" },
  { icon: Snowflake, title: "Climatisation auto", desc: "Recharge clim + contrôle avant intervention", price: "59€", href: "/mecanique#clim", image: FALLBACK_IMAGE, imagePending: true },
  { icon: Disc, title: "Freinage", desc: "Plaquettes, disques, liquide", price: "89€", href: "/mecanique#freinage", image: FALLBACK_IMAGE, imagePending: true },
  { icon: Gauge, title: "Amortisseurs", desc: "Train roulant, suspension", price: "Sur devis", href: "/mecanique#amortisseurs", image: FALLBACK_IMAGE, imagePending: true },
  { icon: Wrench, title: "Révision", desc: "Entretien complet constructeur", price: "Sur devis", href: "/mecanique#revision", image: FALLBACK_IMAGE, imagePending: true },
];

const faqs = [
  {
    q: "Faites-vous l'entretien auto sans rendez-vous ?",
    a: "Oui, selon la charge atelier. Recacor accueille les automobilistes avec ou sans rendez-vous pour les prestations courantes comme l'entretien, le freinage, le parallélisme ou la climatisation auto.",
  },
  {
    q: "Quels services atelier faites-vous au Crès ?",
    a: "L'atelier Recacor prend en charge la vidange, le parallélisme, le freinage, les amortisseurs, la révision et la climatisation auto. Certaines prestations ont leur page dédiée pour retrouver le détail, le tarif et le formulaire adapté.",
  },
  {
    q: "Peut-on regrouper pneus et entretien le même jour ?",
    a: "Oui. Si le véhicule a besoin de pneus, d'un contrôle de parallélisme ou d'un entretien courant, Recacor peut regrouper les interventions au même endroit selon la charge atelier.",
  },
  {
    q: "Faites-vous le freinage toutes marques ?",
    a: "Oui, nous intervenons sur toutes marques et tous modèles. Plaquettes, disques, liquide de frein : nous utilisons des pièces de qualité adaptées à votre véhicule.",
  },
  {
    q: "Ma clim souffle moins froid : vous contrôlez avant de recharger ?",
    a: "Oui. Recacor vérifie d'abord le fonctionnement, les pressions et l'état général du circuit. Si une recharge est adaptée, elle est faite avec le bon gaz. Si le problème vient d'une fuite ou d'un autre élément, c'est expliqué avant l'intervention.",
  },
  {
    q: "Vous travaillez sur le gaz R134a et le 1234yf ?",
    a: "Oui, selon le véhicule. Le tarif dépend justement du gaz prévu et du type de voiture, ce qui explique qu'une recharge clim ne se traite pas exactement de la même manière d'un modèle à l'autre.",
  },
  {
    q: "Quand faut-il faire contrôler sa clim voiture ?",
    a: "Dès que l'air devient moins froid, que le désembuage est plus lent, qu'une odeur apparaît à la ventilation ou avant un départ d'été. Mieux vaut contrôler tôt que découvrir le problème pendant les fortes chaleurs.",
  },
  {
    q: "Ma clim sent mauvais : une recharge suffit ?",
    a: "Pas forcément. Une mauvaise odeur peut aussi venir d'un filtre d'habitacle encrassé ou d'un circuit à nettoyer. C'est justement l'intérêt de contrôler avant de recharger.",
  },
  {
    q: "Peut-on combiner mécanique et pneus le même jour ?",
    a: "Oui, c'est même conseillé. Vidange + changement de pneus + parallélisme en une seule venue, c'est possible avec ou sans rendez-vous.",
  },
  {
    q: "Combien coûte une vidange voiture à Montpellier chez Recacor ?",
    a: "Nos vidanges démarrent à 79€ au Crès, avec huile, filtre à huile et main d'œuvre inclus. Le prix exact varie selon le véhicule et le type d'huile demandé par le constructeur.",
  },
  {
    q: "Faut-il prendre rendez-vous pour une vidange au Crès ?",
    a: "Pas forcément. Recacor peut accueillir les automobilistes sans rendez-vous selon la charge atelier. La vidange prend en général environ 30 minutes.",
  },
  {
    q: "Changez-vous aussi le filtre à air / habitacle ?",
    a: "Oui, sur demande. Nous proposons un pack complet vidange + filtres à prix avantageux.",
  },
  {
    q: "Quelle huile utilisez-vous ?",
    a: "Nous utilisons des huiles de grandes marques (Total, Elf, Castrol, Shell) adaptées à la préconisation constructeur de votre véhicule.",
  },
  {
    q: "Ma voiture tire d'un côté ou le volant n'est plus droit : faut-il faire un parallélisme ?",
    a: "Oui, c'est l'un des signaux les plus fréquents. Un contrôle du train roulant permet de vérifier si le problème vient du parallélisme, de la pression des pneus ou d'une pièce de suspension.",
  },
  {
    q: "Combien coûte un parallélisme ?",
    a: "Nos tarifs démarrent à 65€ pour un parallélisme simple. Une géométrie 4 roues complète dépend du véhicule et des réglages réellement nécessaires ; le devis est donné avant l'intervention.",
  },
  {
    q: "Le contrôle du parallélisme est-il offert après un changement de pneus ?",
    a: "Oui. Chez Recacor, le contrôle du parallélisme est offert lors d'un changement de pneus. Le réglage n'est proposé que s'il est utile.",
  },
  {
    q: "Combien de temps dure un parallélisme ?",
    a: "Le réglage prend en général 30 à 45 minutes avec notre équipement laser 3D, selon l'état du train roulant et le type de véhicule.",
  },
  {
    q: "Quelle différence entre parallélisme et géométrie ?",
    a: "Le parallélisme règle principalement l'alignement des roues. La géométrie complète contrôle aussi d'autres angles comme le carrossage et la chasse quand le véhicule permet ces réglages.",
  },
];

export function MecaniqueClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Entretien auto", url: "https://www.recacor.fr/mecanique" },
      ]} />
      <ServiceJsonLd
        name="Entretien auto Montpellier"
        description="Vidange, freinage, parallélisme, amortisseurs. Avec ou sans rendez-vous au Crès."
      />
      <FaqJsonLd items={faqs} id="mecanique" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image" : "hero-overlay-solid"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <Wrench className="h-3 w-3 mr-1" /> Entretien auto
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Entretien auto au Crès<br />
            <span className="text-purple-glow">Garage Recacor près de Montpellier</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Un seul atelier pour l&apos;entretien courant, le freinage, le parallélisme,
            la climatisation auto et les besoins du quotidien, au Crès près de Montpellier.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink
              location="hero"
              className="flex-1 recacor-btn-primary whitespace-nowrap"
              showIcon
            >
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="flex-1 recacor-btn-secondary">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Entretenir sa voiture{" "}
              <span className="text-gradient-purple">sans perdre sa journée</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Quand une voiture a besoin d&apos;un entretien ou d&apos;une intervention atelier,
                l&apos;attente est simple : trouver un garage accessible, comprendre ce qui va
                être fait et pouvoir repartir dans de bonnes conditions. Recacor accompagne
                les automobilistes du Crès, de Montpellier, Castelnau-le-Lez, Jacou,
                Vendargues et des communes voisines sur ces besoins du quotidien.
              </p>
              <p>
                Recacor prend en charge la vidange, le parallélisme, le freinage,
                les amortisseurs, la révision et la climatisation auto au garage du Crès.
                Si le besoin concerne une prestation précise, Recacor renvoie ensuite vers le bon service avec plus
                de détails, le tarif public quand il existe et le bon formulaire.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { id: "atelier-flex", label: "Avec ou sans rendez-vous selon la charge atelier" },
                { id: "atelier-pack", label: "Pneus et entretien regroupables au même endroit" },
                { id: "atelier-vl", label: "Services atelier pour particuliers au Crès" },
                { id: "atelier-devis", label: "Devis clair selon le véhicule et l'intervention" },
              ].map((item) => (
                <div key={item.id} className="rounded-[4px] border border-border bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground">
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Nos prestations <span className="text-gradient-purple">pour particuliers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-[4px] border border-border bg-white hover:border-blue-700/30 hover:shadow-xl hover:shadow-blue-700/[0.06] transition-all"
              >
                <div className="relative h-40 overflow-hidden bg-slate-900">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--recacor-night)]/60 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center bg-yellow-400 text-slate-950">
                    <s.icon className="h-4 w-4" />
                  </div>
                  {s.imagePending && (
                    <span className="absolute right-3 top-3 bg-white/90 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-600">
                      Photo à venir
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold tracking-tight group-hover:text-blue-700 transition-colors">
                      {s.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-3 inline-block w-fit text-xs font-black uppercase text-blue-700 bg-blue-700/10 px-2.5 py-1 rounded-[4px]">
                    {s.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 rounded-[4px] border border-border bg-muted/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Guides locaux entretien</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Si vous cherchez surtout une prestation précise, la section{" "}
              <Link href="/mecanique#vidange" className="font-bold text-purple-bright hover:underline">
                vidange voiture au Crès
              </Link>{" "}
              détaille le tarif, ce qui est inclus et le déroulement. En cas d&apos;usure
              irrégulière des pneus ou de volant qui tire, voir la section{" "}
              <Link href="/mecanique#parallelisme" className="font-bold text-purple-bright hover:underline">
                parallélisme et géométrie
              </Link>
              . Si le besoin concerne un passage au centre, voir aussi la{" "}
              <Link href="/services/prise-en-charge-controle-technique" className="font-bold text-purple-bright hover:underline">
                prise en charge contrôle technique
              </Link>
              . Pour l&apos;été, la{" "}
              <Link href="/mecanique#clim" className="font-bold text-purple-bright hover:underline">
                recharge climatisation voiture
              </Link>{" "}
              est traitée comme une prestation atelier avec contrôle avant intervention. Si vous
              gérez aussi un utilitaire ou un poids lourd, le{" "}
              <Link href="/services/recreusage" className="font-bold text-purple-bright hover:underline">
                recreusage Recacor
              </Link>{" "}
              renvoie vers la partie atelier dédiée.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold">
              <Link href="/mecanique#vidange" className="text-purple-bright hover:underline">
                Vidange voiture au Crès
              </Link>
              <Link href="/mecanique#parallelisme" className="text-purple-bright hover:underline">
                Parallélisme et géométrie
              </Link>
              <Link href="/services/prise-en-charge-controle-technique" className="text-purple-bright hover:underline">
                Voir l&apos;offre contrôle technique
              </Link>
              <Link href="/mecanique#clim" className="text-purple-bright hover:underline">
                Voir le détail de la clim voiture
              </Link>
              <Link href="/services/recreusage" className="text-purple-bright hover:underline">
                Voir le recreusage poids lourd
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
              <Link href="/blog/pneus-lattes" className="text-purple-bright hover:underline">Parallélisme à Lattes</Link>
              <Link href="/blog/pneus-vendargues" className="text-purple-bright hover:underline">Garage auto à Vendargues</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vidange — section détaillée (ex-page /mecanique#vidange) */}
      <section id="vidange" className="py-20 bg-muted scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                <Droplet className="h-3 w-3 mr-1" /> Vidange
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Vidange voiture au Crès <span className="text-gradient-purple">dès 79€</span>
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Pour une vidange voiture à Montpellier, Recacor vous accueille au Crès dès 79€,
                  huile, filtre à huile et main-d&apos;œuvre inclus, avec ou sans rendez-vous selon
                  la charge atelier. Comptez environ 30 minutes.
                </p>
                <p>
                  L&apos;atelier reçoit les automobilistes du Crès, de Montpellier, Castelnau-le-Lez,
                  Jacou, Vendargues et des communes voisines, avec une prise en charge simple et lisible.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Droplet, title: "Huile moteur", desc: "Huile adaptée à votre véhicule" },
                  { icon: Filter, title: "Filtre à huile", desc: "Filtre neuf inclus" },
                  { icon: Wrench, title: "Main-d'œuvre", desc: "Réalisée en atelier en 30 min" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[4px] border border-border bg-white px-4 py-3">
                    <item.icon className="h-4 w-4 text-purple-bright" />
                    <p className="mt-2 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[4px] border border-border bg-white shadow-sm">
              <Image
                src="/illustrations/mecanique#vidange-intro-20260716.webp"
                alt="Mécanicien réalisant une vidange sur une voiture en atelier"
                width={1200}
                height={633}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-foreground">Quand faire la vidange de sa voiture ?</h3>
              <p>
                La vidange protège le moteur en remplaçant une huile chargée en résidus par une huile propre,
                conforme aux préconisations du constructeur. La fréquence dépend du véhicule, du kilométrage,
                du type d&apos;huile et de l&apos;usage. Les petits trajets répétés, la circulation urbaine,
                les démarrages fréquents et les fortes chaleurs sollicitent davantage l&apos;huile moteur.
                Le carnet d&apos;entretien reste la référence : sur de nombreux véhicules, l&apos;intervalle
                se situe entre 10 000 et 30 000 km ou une fois par an.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">Les signes à surveiller</h3>
              <p>
                Un voyant d&apos;entretien, une huile très sombre, un moteur plus bruyant, une consommation
                inhabituelle ou une échéance dépassée doivent inciter à faire contrôler le véhicule.
                Attendre trop longtemps dégrade la lubrification et peut accélérer l&apos;usure de pièces
                coûteuses comme le turbo ou les organes internes du moteur.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">Une huile adaptée à chaque moteur</h3>
              <p>
                Une huile 5W30, 5W40 ou 0W20 ne se choisit pas au hasard. Nos techniciens vérifient la
                viscosité et la norme demandées par le constructeur à partir du véhicule. Cette étape est
                essentielle pour les moteurs essence, diesel, turbo, hybrides et les véhicules récents
                équipés d&apos;un filtre à particules.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-foreground">Vidange simple ou vidange complète</h3>
              <p>
                La vidange simple comprend l&apos;huile moteur, le filtre à huile et la main-d&apos;œuvre.
                Selon l&apos;âge du véhicule et son plan d&apos;entretien, une vidange complète peut aussi
                inclure le filtre à air, le filtre d&apos;habitacle ou le filtre à carburant. Nous établissons
                le devis avant l&apos;intervention : les éléments supplémentaires ne sont remplacés que
                lorsqu&apos;ils sont nécessaires et après votre accord.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">Comment se déroule une vidange chez Recacor ?</h3>
              <p>
                À votre arrivée, nous identifions le véhicule et la préconisation d&apos;huile. L&apos;ancienne
                huile est vidangée, le filtre à huile est remplacé et le moteur reçoit la quantité adaptée
                d&apos;huile neuve. Le technicien vérifie ensuite le niveau, l&apos;absence de fuite et remet
                à zéro l&apos;indicateur d&apos;entretien lorsque le véhicule le permet.
              </p>
              <p>
                Le tarif démarre à 79€ et varie principalement selon la quantité d&apos;huile, sa norme et les
                filtres demandés. La plaque d&apos;immatriculation nous permet de préparer un devis précis
                avant votre venue. Une facture détaillée vous est remise : elle conserve la date et le
                kilométrage de l&apos;intervention et sert de justificatif lors de la revente du véhicule.
                Le passage à l&apos;atelier peut aussi servir à contrôler les pneus, le freinage ou le parallélisme.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="cta" className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="flex-1 recacor-btn-secondary">
              Devis vidange <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
      </section>

      {/* Parallélisme & géométrie — section détaillée (ex-page /mecanique#parallelisme) */}
      <section id="parallelisme" className="py-20 bg-background scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                <Target className="h-3 w-3 mr-1" /> Parallélisme
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Parallélisme et géométrie au Crès :{" "}
                <span className="text-gradient-purple">contrôle offert, réglage dès 65€</span>
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  La voiture tire à droite, le volant n&apos;est plus droit après un trottoir,
                  les pneus s&apos;usent d&apos;un seul côté, ou vous venez de monter des pneus
                  neufs et vous voulez éviter de les abîmer en quelques milliers de kilomètres.
                  Ce sont les vraies raisons de contrôler un parallélisme.
                </p>
                <p>
                  Chez Recacor au Crès, le contrôle est <strong>offert lors d&apos;un changement
                  de pneus</strong> et le réglage démarre à <strong>65€</strong>. Un train
                  bien réglé, c&apos;est des pneus qui durent, une voiture qui freine droit et
                  une consommation qui ne dérive pas.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Target, title: "Équipement laser 3D", desc: "Précision sur tous les angles" },
                  { icon: Gauge, title: "Test dynamique", desc: "Vérification en conditions réelles" },
                  { icon: Wrench, title: "Réglage complet", desc: "Parallélisme, carrossage, chasse" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[4px] border border-border bg-muted/40 px-4 py-3">
                    <item.icon className="h-4 w-4 text-purple-bright" />
                    <p className="mt-2 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[4px] border border-border bg-white shadow-sm">
              <Image
                src="/illustrations/services/parallelisme-intro-20260716.webp"
                alt="Réglage de géométrie sur une voiture avec banc laser de parallélisme"
                width={1200}
                height={658}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-foreground">Pourquoi contrôler le parallélisme ?</h3>
              <p>
                Le parallélisme correspond à l&apos;orientation des roues les unes par rapport aux autres.
                Un mauvais réglage augmente la résistance au roulement, use les pneus de manière irrégulière
                et peut rendre la voiture moins stable. Un simple choc contre un trottoir, un nid-de-poule,
                le remplacement d&apos;éléments de suspension ou le montage de pneus neufs peuvent modifier
                les angles du train roulant.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">Usure anormale, volant de travers, pneus neufs</h3>
              <p>
                Une usure plus marquée à l&apos;intérieur ou à l&apos;extérieur de la bande de roulement
                indique souvent un défaut d&apos;alignement. Si le volant n&apos;est plus droit en ligne
                droite ou si le véhicule tire d&apos;un côté, un contrôle du train avant est conseillé ;
                le diagnostic permet aussi d&apos;écarter un problème de pression ou de suspension.
                Des pneus neufs montés sur un véhicule mal réglé s&apos;usent vite : le contrôle est offert
                lors d&apos;un changement de pneus et le réglage n&apos;est proposé que s&apos;il est nécessaire.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">Parallélisme ou géométrie complète ?</h3>
              <p>
                Le parallélisme corrige principalement l&apos;alignement des roues. Une géométrie complète
                mesure également le carrossage et la chasse lorsque le véhicule permet ces réglages.
                Notre banc laser 3D compare les valeurs mesurées aux données constructeur. Le technicien
                explique le résultat avant toute intervention et remet un réglage cohérent avec le véhicule.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-foreground">Les étapes du contrôle de géométrie</h3>
              <p>
                Avant le réglage, nous contrôlons visuellement les pneus, leur pression et les principaux
                éléments du train roulant. Un jeu dans une rotule, une biellette ou un roulement doit être
                traité avant la géométrie : régler un véhicule présentant une pièce défectueuse ne donnerait
                pas un résultat durable.
              </p>
              <p>
                Les capteurs du banc 3D mesurent ensuite les angles des roues et les comparent aux valeurs
                constructeur. Le parallélisme démarre à 65€ ; une géométrie quatre roues plus complète peut
                nécessiter davantage de réglages. Le devis dépend donc du véhicule et des corrections
                réellement possibles, jamais d&apos;un réglage ajouté sans diagnostic. Après l&apos;intervention,
                le volant est recentré et le comportement du véhicule est contrôlé. L&apos;opération dure en
                général entre 30 et 45 minutes. En cas de choc important ou de vibration persistante, un
                contrôle mécanique complémentaire peut être recommandé avant de reprendre la route.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="cta" className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="flex-1 recacor-btn-secondary">
              Devis parallélisme <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
      </section>

      {/* Climatisation auto — section détaillée (ex-page /services/climatisation-auto-montpellier) */}
      <section id="clim" className="py-20 bg-muted scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                <Snowflake className="h-3 w-3 mr-1" /> Climatisation
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Climatisation auto au Crès :{" "}
                <span className="text-gradient-purple">contrôle avant recharge, dès 59€</span>
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Si votre clim refroidit moins bien, mieux vaut vérifier le circuit avant de lancer une recharge.
                  Cela permet de voir si le problème vient simplement du gaz, d&apos;un filtre d&apos;habitacle
                  encrassé ou d&apos;un autre élément du système.
                </p>
                <p>
                  Chez Recacor au Crès, le contrôle est fait <strong>avant</strong> toute recharge et la recharge
                  démarre à <strong>59€</strong>, selon le gaz et le véhicule. Le but est simple : remettre du
                  froid quand une recharge suffit, et le dire clairement quand ce n&apos;est pas le bon levier.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Gauge, title: "Contrôle du circuit", desc: "Froid, pressions et état général avant tout" },
                  { icon: Snowflake, title: "Gaz selon véhicule", desc: "R134a ou 1234yf, adapté au modèle" },
                  { icon: Wrench, title: "Atelier au Crès", desc: "Avec ou sans rendez-vous" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[4px] border border-border bg-white px-4 py-3">
                    <item.icon className="h-4 w-4 text-purple-bright" />
                    <p className="mt-2 text-sm font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[4px] border border-border bg-white shadow-sm">
              <Image
                src="/hero-generated/clim-master.webp"
                alt="Recharge de climatisation sur une voiture en atelier au Crès"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-foreground">Les signes qui doivent alerter</h3>
              <p>
                Air tiède ou froid insuffisant, mauvaise odeur à la ventilation, désembuage plus lent, bruit
                inhabituel quand la clim tourne, ou clim qui met longtemps à refroidir l&apos;habitacle : ce sont
                les signaux les plus fréquents. Un contrôle avant un départ ou avant les fortes chaleurs évite de
                découvrir le problème au pire moment.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">R134a ou 1234yf, la bonne recharge</h3>
              <p>
                Le gaz utilisé dépend du véhicule, pas d&apos;un standard unique. Nos techniciens vérifient le gaz
                prévu par le constructeur avant d&apos;intervenir, ce qui explique qu&apos;une recharge clim ne se
                traite pas exactement de la même manière d&apos;un modèle à l&apos;autre.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-tight text-foreground">Ce qui est contrôlé avant la recharge</h3>
              <p>
                Le froid réel en sortie d&apos;aérateur, les pressions du circuit, le type de gaz prévu et l&apos;état
                du filtre d&apos;habitacle. Une mauvaise odeur, par exemple, vient souvent d&apos;un filtre encrassé
                plutôt que d&apos;un manque de gaz : une recharge seule ne réglerait rien.
              </p>
              <h3 className="text-xl font-black tracking-tight text-foreground">Voitures, SUV et utilitaires légers</h3>
              <p>
                Cette offre concerne les voitures, SUV et utilitaires légers. Pour un poids lourd, un camion, un
                engin TP ou un véhicule agricole, le tarif et la prise en charge sont différents : voir la{" "}
                <Link href="/services/clim-camion-poids-lourd-montpellier" className="font-bold text-purple-bright hover:underline">
                  page clim camion et poids lourd
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-[4px] border border-border bg-white shadow-sm">
            <Image
              src="/tarifs/tarif-clim-recacor-202606.webp"
              alt="Grille tarifaire recharge climatisation Recacor : ancien gaz R134a et nouveau gaz 1234yf selon type de véhicule"
              width={1600}
              height={1131}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="cta" serviceType="mecanique" className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink desktopHref="#devis" mobileHref="/formulaire/clim" className="flex-1 recacor-btn-secondary">
              Devis clim <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                Tarifs atelier
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Grille tarifaire <span className="text-gradient-purple">mécanique</span>
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Tarifs indicatifs hors pièces pour les interventions réalisées en atelier. Le devis final dépend du véhicule,
                du diagnostic et des pièces nécessaires.
              </p>
            </div>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="recacor-btn-dark whitespace-nowrap">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
          <div className="overflow-hidden rounded-[4px] border border-border bg-white shadow-xl shadow-purple-bright/[0.06]">
            <Image
              src="/tarifs/tarif-mecanique-recacor-202606.webp"
              alt="Grille tarifaire mécanique Recacor : T1 72 euros TTC, T2 84 euros TTC, T3 96 euros TTC hors pièces"
              width={1600}
              height={1131}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Demandez un <span className="text-gradient-purple">devis mécanique</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Réponse sous 2h en jours ouvrés. Avec ou sans rendez-vous.
            </p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisMecaniqueForm />
          </div>
        </div>
      </section>

      <AvisSection />

      {/* FAQ */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">
            Questions fréquentes{" "}
            <span className="text-gradient-purple">mécanique</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[4px] border border-border bg-white p-5 cursor-pointer"
              >
                <summary className="font-bold text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
