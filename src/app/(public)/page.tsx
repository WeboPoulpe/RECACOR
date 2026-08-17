import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Car,
  CheckCircle,
  Clock,
  Globe,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Star,
  Timer,
  Truck,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AugustVlNotice } from "@/components/august-vl-notice";
import { DeferredAvisSection, DeferredDevisVlForm, DeferredHomeBlogPreview } from "@/components/deferred-public-sections";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { HomeFaqSection } from "@/components/home-faq-section";
import { OpenStatus } from "@/components/open-status";
import { PhoneLink } from "@/components/phone-link";
import { FaqJsonLd, LocalBusinessJsonLd } from "@/components/schema-jsonld";
import { HOME_FAQ_CATEGORIES } from "@/data/home-faq";

const HERO_IMAGE = "/refonte/facade-recacor-clean-20260719.webp";

const serviceCards = [
  {
    title: "Pneus voiture",
    href: "/pneus-voiture",
    image: "/refonte/service-vl.webp",
    icon: Car,
    description:
      "Pneus VL toutes marques, montage rapide au Crès, sans rendez-vous selon disponibilité atelier.",
    points: ["Pneu monté dès 45€", "Stock courant disponible", "Équilibrage inclus"],
  },
  {
    title: "Mécanique rapide",
    href: "/mecanique",
    image: "/refonte/parallelisme.webp",
    icon: Wrench,
    description:
      "Vidange, freinage, parallélisme et géométrie pour entretenir votre voiture sans perdre la journée.",
    points: ["Vidange dès 79€", "Parallélisme dès 65€", "Contrôle géométrie offert"],
  },
  {
    title: "Climatisation",
    href: "/services/climatisation-auto-montpellier",
    image: "/hero-generated/clim-master.webp",
    icon: Snowflake,
    description:
      "Recharge clim auto, utilitaire, camping-car, camion et engins professionnels au garage du Crès.",
    points: ["Gaz R134a et 1234yf", "VL, utilitaires, PL", "Formulaire dédié"],
  },
  {
    title: "Contrôle technique",
    href: "/services/prise-en-charge-controle-technique",
    image: "/illustrations/services/controle-technique-hero-20260723.png",
    icon: ShieldCheck,
    description:
      "Pré-contrôle offert, devis si un point bloque et prise en charge au garage du Crès.",
    points: ["VL dès 87,22€", "Utilitaire dès 97,02€", "Atelier sur place"],
  },
  {
    title: "Poids lourd",
    href: "/pneus-utilitaires-pl",
    image: "/refonte/service-pl.webp",
    icon: Truck,
    description:
      "Pneus PL, recreusage, suivi de parc et interventions pour transporteurs, flottes et engins.",
    points: ["Pneus PL et TP", "Recreusage", "Assistance Hérault"],
  },
];

const priceCards = [
  {
    label: "Pneu VL monté",
    price: "45€",
    detail: "à partir de",
    note: "Montage, équilibrage et valve selon dimension.",
    href: "/pneus-voiture",
  },
  {
    label: "Vidange",
    price: "79€",
    detail: "à partir de",
    note: "Tarif indicatif selon huile, filtre et véhicule.",
    href: "/services/vidange",
  },
  {
    label: "Parallélisme",
    price: "65€",
    detail: "à partir de",
    note: "Contrôle offert avant réglage si nécessaire.",
    href: "/services/parallelisme-geometrie",
  },
  {
    label: "Clim auto",
    price: "59€",
    detail: "à partir de",
    note: "Recharge selon gaz et catégorie véhicule.",
    href: "/services/climatisation-auto-montpellier",
  },
  {
    label: "Contrôle technique",
    price: "87,22€",
    detail: "dès",
    note: "Pré-contrôle offert et prise en charge au garage du Crès.",
    href: "/services/prise-en-charge-controle-technique",
  },
];

const commitments = [
  { icon: Timer, value: "15 min", label: "montage courant" },
  { icon: Star, value: "5,0", label: "avis Google" },
  { icon: PackageCheck, value: "Stock", label: "dimensions fréquentes" },
  { icon: Award, value: "1950", label: "savoir-faire Recacor" },
];

const ALL_FAQ_ITEMS = HOME_FAQ_CATEGORIES.flatMap((cat) => cat.items);

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--recacor-night)] text-white">
      <div className="absolute inset-0 opacity-40 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[54%] lg:opacity-100">
        <Image
          src={HERO_IMAGE}
          alt="Façade du garage Recacor Le Crès"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 54vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--recacor-night)] via-[rgba(6,26,49,0.55)] to-[rgba(6,26,49,0.12)] lg:via-[rgba(6,26,49,0.42)] lg:to-transparent" />
      </div>

      <div className="recacor-shell relative grid min-h-[760px] grid-cols-1 items-center gap-10 pt-28 pb-10 lg:grid-cols-[0.86fr_1.14fr] lg:pt-32">
        <div className="relative z-10 max-w-2xl py-8">
          <OpenStatus className="rounded-[4px] border-white/15 bg-white/10" />

          <p className="mt-7 inline-flex border-l-4 border-yellow-400 pl-3 text-xs font-black uppercase text-white/70">
            Montpellier - Le Crès · VL · Mécanique · PL
          </p>

          <h1 className="mt-5 font-heading text-[4.6rem] font-black uppercase leading-[0.84] text-white sm:text-[6rem] lg:text-[7.1rem]">
            Garage pneus
            <span className="block text-yellow-400">devis en 2 minutes</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/74 sm:text-lg">
            Pneus voiture, vidange, parallélisme, climatisation et solutions poids lourd au
            Crès. Un atelier local, du stock réel, une équipe terrain et un devis rapide.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PhoneLink location="hero" className="recacor-btn-primary" showIcon>
              Appeler le garage
            </PhoneLink>
            <DevisCtaLink className="recacor-btn-secondary">
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
            {commitments.map((item) => (
              <div key={item.label} className="border border-white/14 bg-white/[0.07] p-3">
                <item.icon className="mb-3 h-5 w-5 text-yellow-400" strokeWidth={1.8} />
                <strong className="block font-heading text-2xl leading-none text-white">
                  {item.value}
                </strong>
                <span className="mt-1 block text-[11px] font-bold uppercase leading-tight text-white/55">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 lg:min-h-[620px]">
          <div className="mt-4 border-t-8 border-yellow-400 bg-white p-5 text-[var(--recacor-ink)] shadow-[0_28px_72px_rgba(0,0,0,0.28)] sm:ml-auto sm:max-w-[410px] lg:absolute lg:bottom-16 lg:right-10 lg:mt-0">
            <p className="text-xs font-black uppercase text-blue-700">Devis rapide</p>
            <div className="mt-2 flex items-end gap-3">
              <strong className="font-heading text-7xl font-black leading-none text-[var(--recacor-ink)]">
                45€
              </strong>
              <span className="pb-2 text-sm font-black uppercase leading-tight text-slate-600">
                pneu VL
                <br />
                monté dès
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <span className="border border-slate-200 p-2">Sans rendez-vous</span>
              <span className="border border-slate-200 p-2">Toutes marques</span>
              <span className="border border-slate-200 p-2">RN113 Le Crès</span>
              <span className="border border-slate-200 p-2">Réponse rapide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DevisVlSection() {
  return (
    <section id="devis" className="scroll-mt-24 bg-[var(--recacor-paper)] py-20">
      <div className="recacor-shell">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="recacor-eyebrow">Formulaire pneus VL</p>
            <h2 className="recacor-title mt-4">
              Un devis propre, sans perdre la matinée.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Indiquez ce que vous savez : dimension, modèle, marque souhaitée ou simple
              demande. Vos informations partent directement à l&apos;équipe du garage,
              pour un retour rapide.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Réponse sous 2h", "En jours ouvrés selon affluence atelier."],
                ["Téléphone + email requis", "Le reste peut être complété plus tard."],
                ["Rappel direct", "Un interlocuteur du garage vous recontacte, pas un centre d'appel."],
              ].map(([title, text]) => (
                <div key={title} className="recacor-card p-5">
                  <CheckCircle className="mb-3 h-5 w-5 text-blue-700" />
                  <p className="font-black">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="recacor-card p-5 sm:p-7">
            <DeferredDevisVlForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-white py-20">
      <div className="recacor-shell">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="recacor-eyebrow">Services Recacor</p>
            <h2 className="recacor-title mt-4">Un atelier, plusieurs besoins.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Pneus, mécanique et climatisation pour les particuliers, pneus poids lourd et
            recreusage pour les flottes professionnelles — un seul garage, deux expertises.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {serviceCards.map((service) => (
            <Link key={service.title} href={service.href} className="group recacor-card flex min-h-full flex-col overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--recacor-night)]/70 to-transparent" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-yellow-400 text-slate-950">
                  <service.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-3xl font-black uppercase leading-none">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-semibold">
                      <span className="h-1.5 w-1.5 bg-blue-700" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase text-blue-700">
                  Voir le service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TarifsSection() {
  return (
    <section className="bg-[var(--recacor-night)] py-20 text-white">
      <div className="recacor-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="inline-flex border-l-4 border-yellow-400 pl-3 text-xs font-black uppercase text-white/70">
              Repères tarifs
            </p>
            <h2 className="mt-4 font-heading text-5xl font-black uppercase leading-none sm:text-6xl">
              Prix lisibles avant le devis.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/65">
            Les tarifs restent indicatifs : la dimension, le gaz, l&apos;huile ou le véhicule peuvent
            modifier le prix final. Le montant exact vous est confirmé avant toute intervention,
            jamais après.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {priceCards.map((item) => (
            <Link key={item.label} href={item.href} className="group border border-white/14 bg-white/[0.06] p-5 transition hover:border-yellow-400/70 hover:bg-white/[0.09]">
              <p className="text-xs font-black uppercase text-yellow-400">{item.label}</p>
              <div className="mt-4 flex items-end gap-2">
                <strong className="font-heading text-7xl font-black leading-none text-white">
                  {item.price}
                </strong>
                <span className="pb-2 text-xs font-bold uppercase text-white/45">{item.detail}</span>
              </div>
              <p className="mt-4 min-h-[48px] text-sm leading-6 text-white/62">{item.note}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase text-yellow-400">
                Détail <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProsParticuliersSection() {
  const blocs = [
    {
      title: "Particuliers",
      subtitle: "Montpellier, Le Crès et alentours",
      icon: Car,
      href: "/pneus-voiture",
      cta: "Devis pneus voiture",
      points: [
        "Pneus été, hiver et 4 saisons",
        "Vidange, freinage, parallélisme",
        "Recharge clim auto et camping-car",
      ],
    },
    {
      title: "Professionnels",
      subtitle: "Flottes, transport, TP, agricole",
      icon: Truck,
      href: "/pneus-utilitaires-pl",
      cta: "Solutions poids lourd",
      points: [
        "Pneus PL, utilitaires, agricoles et industriels",
        "Recreusage et suivi de parc",
        "Clim camion et engins professionnels",
      ],
    },
  ];

  return (
    <section className="bg-[var(--recacor-paper)] py-20">
      <div className="recacor-shell">
        <div className="grid gap-5 lg:grid-cols-2">
          {blocs.map((bloc, index) => (
            <Link
              key={bloc.title}
              href={bloc.href}
              className={cn(
                "group relative overflow-hidden border p-7 transition",
                index === 0
                  ? "border-border bg-white text-[var(--recacor-ink)]"
                  : "border-[var(--recacor-night)] bg-[var(--recacor-night)] text-white"
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className={cn("text-xs font-black uppercase", index === 0 ? "text-blue-700" : "text-yellow-400")}>
                    {bloc.subtitle}
                  </p>
                  <h2 className="mt-4 font-heading text-6xl font-black uppercase leading-none">
                    {bloc.title}
                  </h2>
                </div>
                <div className={cn("flex h-14 w-14 items-center justify-center", index === 0 ? "bg-yellow-400 text-slate-950" : "bg-white text-[var(--recacor-night)]")}>
                  <bloc.icon className="h-7 w-7" />
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                {bloc.points.map((point) => (
                  <li key={point} className={cn("flex items-center gap-3 text-sm font-semibold", index === 0 ? "text-slate-700" : "text-white/72")}>
                    <ShieldCheck className={cn("h-4 w-4", index === 0 ? "text-blue-700" : "text-yellow-400")} />
                    {point}
                  </li>
                ))}
              </ul>
              <span className={cn("mt-8 inline-flex items-center gap-2 text-sm font-black uppercase", index === 0 ? "text-blue-700" : "text-yellow-400")}>
                {bloc.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const BRAND_LOGOS = [
  { name: "Michelin", url: "/LOGO_MARQUE/Michelin_G_S_Fr_WhiteBG_RGB_0618-01.webp" },
  { name: "Bridgestone", url: "/LOGO_MARQUE/Bridgestone-logo-730x300-2018_0_1.webp" },
  { name: "Continental", url: "/LOGO_MARQUE/continental.webp" },
  { name: "Goodyear", url: "/LOGO_MARQUE/Logo-goodyear.webp" },
  { name: "Pirelli", url: "/LOGO_MARQUE/Logo-Pirelli.webp" },
  { name: "Hankook", url: "/LOGO_MARQUE/Hankook_logo.webp" },
  { name: "Dunlop", url: "/LOGO_MARQUE/dunlop1HEADER.webp" },
  { name: "Firestone", url: "/LOGO_MARQUE/firestone1517239246_0.webp" },
  { name: "Yokohama", url: "/LOGO_MARQUE/yokohama-logo.webp" },
  { name: "BFGoodrich", url: "/LOGO_MARQUE/bfgoodrich-logo.webp" },
];

function BrandMarquee({ direction = "left", speed = 32 }: { direction?: "left" | "right"; speed?: number }) {
  const items = [...BRAND_LOGOS, ...BRAND_LOGOS];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div
        className="recacor-marquee-track flex w-max gap-4"
        data-direction={direction}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="group flex h-20 w-40 shrink-0 items-center justify-center border border-border bg-white px-5 transition hover:border-blue-700/40"
          >
            <Image
              src={brand.url}
              alt={brand.name}
              width={160}
              height={36}
              sizes="160px"
              className="h-9 w-auto object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MarquesSection() {
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="recacor-shell mb-10">
        <p className="recacor-eyebrow">Marques pneus</p>
        <h2 className="mt-3 font-heading text-4xl font-black uppercase leading-none">
          Premium, budget ou flotte.
        </h2>
      </div>
      <div className="space-y-4">
        <BrandMarquee direction="left" speed={30} />
        <BrandMarquee direction="right" speed={36} />
      </div>
    </section>
  );
}

const HISTOIRE_ETAPES = [
  {
    annee: "1950",
    titre: "La fondation",
    texte: "Création de Recacor à Córdoba, en Espagne. Un atelier artisanal de recreusage de pneumatiques, un savoir-faire rare transmis de génération en génération.",
    Icon: Wrench,
  },
  {
    annee: "Développement",
    titre: "60+ ateliers en Espagne",
    texte: "Croissance progressive avec plus de 60 ateliers en Espagne et 400+ professionnels. Expansion vers l'Europe et l'Afrique du Nord, expertise reconnue sur le pneu lourd.",
    Icon: Globe,
  },
  {
    annee: "2017",
    titre: "Recacor France",
    texte: "Création de Recacor France pour porter le savoir-faire espagnol sur le territoire français : pneumatiques VL, PL, agricoles et industriels.",
    Icon: Truck,
  },
  {
    annee: "Aujourd'hui",
    titre: "Implantation au Crès",
    texte: "Garage Recacor à Montpellier — Le Crès. VL, PL, agricole et industriel : tout l'écosystème Recacor au service du Sud de la France.",
    Icon: MapPin,
  },
];

function StorySection() {
  return (
    <section className="bg-[var(--recacor-paper)] py-20">
      <div className="recacor-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[430px] overflow-hidden border border-border bg-slate-900">
            <Image
              src="/refonte/clim-pl.jpg"
              alt="Atelier Recacor et machine clim"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--recacor-night)]/74 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 border-l-4 border-yellow-400 bg-white/95 p-5">
              <p className="font-heading text-3xl font-black uppercase leading-none text-[var(--recacor-ink)]">
                Depuis 1950, le pneu comme métier.
              </p>
            </div>
          </div>

          <div>
            <p className="recacor-eyebrow">Notre histoire</p>
            <h2 className="recacor-title mt-4">De Córdoba au Crès, une trajectoire unique.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              De l&apos;atelier familial espagnol au réseau français, chaque étape a forgé
              notre expertise du recreusage et du pneu lourd, jusqu&apos;à l&apos;implantation
              du garage Recacor au Crès.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HISTOIRE_ETAPES.map((etape) => (
            <div key={etape.annee} className="recacor-card p-5">
              <div className="flex h-10 w-10 items-center justify-center bg-yellow-400 text-slate-950">
                <etape.Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-black uppercase text-blue-700">{etape.annee}</p>
              <p className="mt-1 font-heading text-xl font-black leading-tight">{etape.titre}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{etape.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ZoneInterventionSection() {
  return (
    <section className="bg-white py-20">
      <div className="recacor-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloc 1 : Garage Le Crès */}
          <div className="recacor-reveal rounded-3xl border border-border bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] bg-muted relative">
              <iframe
                src="https://maps.google.com/maps?q=Recacor+1240+Route+de+Nimes+34920+Le+Cres&output=embed&z=17"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Garage Recacor Le Crès"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-bright/10 text-purple-bright text-xs font-bold uppercase tracking-wider w-fit mb-3">
                <MapPin className="h-3.5 w-3.5" /> Notre garage
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-3">Garage Le Crès</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-purple-bright shrink-0 mt-0.5" />
                  <span>1240 Route de Nîmes, 34920 Le Crès</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-purple-bright shrink-0" />
                  <span>Lun–Ven : 8h–17h · Sam : 8h–12h</span>
                </div>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-purple-bright text-white font-bold text-sm hover:bg-purple-mid transition-colors"
                >
                  <MapPin className="h-4 w-4" /> Itinéraire
                </a>
                <PhoneLink location="cta" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold hover:border-purple-bright/30 transition-colors" showIcon>
                  Appeler
                </PhoneLink>
              </div>
            </div>
          </div>

          {/* Bloc 2 : Assistance PL */}
          <div className="recacor-reveal rounded-3xl bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright text-white overflow-hidden flex flex-col" style={{ animationDelay: "150ms" }}>
            <div className="aspect-[16/10] relative flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 50%)" }} />
              <div className="relative text-center">
                <Truck className="w-20 h-20 text-purple-glow mx-auto mb-4" strokeWidth={1.25} />
                <p className="text-5xl font-black">Hérault</p>
                <p className="text-white/50 uppercase tracking-widest text-sm mt-2">Zone couverte (34)</p>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider w-fit mb-3">
                <Truck className="h-3.5 w-3.5 text-purple-glow" /> Professionnels
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-3">Assistance PL Hérault</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Nos ateliers mobiles interviennent directement sur votre site, dépôt ou sur autoroute
                pour les crevaisons et remplacements de pneumatiques poids lourd. Uniquement pneus.
              </p>
              <div className="mb-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-glow">Nouveau</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  Clim camion et poids lourd dès 149€, au garage du Crès ou sur site.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">
                  Offre réservée aux poids lourds, engins TP et véhicules agricoles.
                </p>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pneus-utilitaires-pl#assistance"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-lg transition-shadow"
                >
                  Devis pro <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/clim-camion-poids-lourd-montpellier"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Voir l&apos;offre clim <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pneus-utilitaires-pl/zone-nord-est-centre"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Zones PL <ArrowRight className="h-4 w-4" />
                </Link>
                <PhoneLink location="cta" serviceType="pl" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors" showIcon>
                  Appeler
                </PhoneLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VillesSeoSection() {
  const villes = [
    { name: "Montpellier", href: "/montpellier" },
    { name: "Le Crès", href: "/le-cres" },
    { name: "Saint-Jean-de-Védas", href: "/saint-jean-de-vedas" },
    { name: "Juvignac", href: "/juvignac" },
    { name: "Mauguio", href: "/mauguio" },
    { name: "Lattes", href: "/lattes" },
    { name: "Castelnau-le-Lez", href: "/castelnau-le-lez" },
    { name: "Jacou", href: "/jacou" },
    { name: "Villeneuve-lès-Maguelone", href: "/villeneuve-les-maguelone" },
    { name: "Frontignan", href: "/frontignan" },
    { name: "Gigean", href: "/gigean" },
    { name: "Lunel", href: "/lunel" },
    { name: "Pézenas", href: "/pezenas" },
    { name: "Sète", href: "/sete" },
    { name: "Nîmes", href: "/nimes" },
    { name: "Béziers", href: "/beziers" },
  ];

  const dimensions = [
    "195/65 R15",
    "205/55 R16",
    "185/65 R15",
    "225/45 R17",
    "215/55 R17",
    "205/60 R16",
    "225/55 R18",
    "215/50 R17",
  ];

  const services = [
    { label: "Pneus voiture", href: "/pneus-voiture" },
    { label: "Vidange voiture", href: "/services/vidange" },
    { label: "Parallélisme Montpellier", href: "/services/parallelisme-geometrie" },
    { label: "Contrôle technique", href: "/services/prise-en-charge-controle-technique" },
    { label: "Recharge clim auto", href: "/services/climatisation-auto-montpellier" },
    { label: "Clim camion", href: "/services/clim-camion-poids-lourd-montpellier" },
    { label: "Pneus poids lourd", href: "/pneus-utilitaires-pl" },
    { label: "Recreusage", href: "/services/recreusage" },
    { label: "Nos centres", href: "/nos-centres" },
  ];

  return (
    <section className="border-t border-border bg-white py-14">
      <div className="recacor-shell grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-xs font-black uppercase text-slate-500">Pneus autour de Montpellier</h3>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {villes.map((ville) => (
              <li key={ville.name}>
                <Link href={ville.href} className="text-sm font-semibold text-slate-600 hover:text-blue-700">
                  Pneus {ville.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase text-slate-500">Dimensions fréquentes</h3>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {dimensions.map((dimension) => (
              <li key={dimension}>
                <Link href="/pneus-voiture" className="text-sm font-semibold text-slate-600 hover:text-blue-700">
                  Pneu {dimension}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase text-slate-500">Services garage</h3>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {services.map((service) => (
              <li key={service.label}>
                <Link href={service.href} className="text-sm font-semibold text-slate-600 hover:text-blue-700">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd items={ALL_FAQ_ITEMS} id="home" />
      <HeroSection />
      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AugustVlNotice />
        </div>
      </section>
      <DevisVlSection />
      <ServicesSection />
      <TarifsSection />
      <ProsParticuliersSection />
      <MarquesSection />
      <DeferredAvisSection />
      <StorySection />
      <ZoneInterventionSection />
      <HomeFaqSection />
      <DeferredHomeBlogPreview />
      <VillesSeoSection />
    </>
  );
}
