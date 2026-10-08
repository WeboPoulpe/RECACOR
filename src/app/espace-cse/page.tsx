import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CarFront, Check, CircleDot, ClipboardCheck, FilePenLine, MapPin, Phone, ShieldCheck, Users, Wrench } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_MOBILE, PHONE_MOBILE_DISPLAY } from "@/lib/tracking";
import { PartnershipForm } from "./forms";
import { partnershipBenefits, partnershipFaq } from "./content";

const base = "https://www.recacor.fr";
const pageUrl = `${base}/espace-cse`;
const title = "Partenariat CSE Montpellier : pneus et entretien | Recacor";
const description = "Proposez un avantage auto à vos salariés avec Recacor au Crès, près de Montpellier. Pneus, vidange, mécanique : préparez votre convention CSE en ligne.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/espace-cse" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { title, description, url: pageUrl, type: "website", locale: "fr_FR", siteName: "Recacor", images: [{ url: "/refonte/facade-recacor-clean-20260719-optimized.webp", width: 1000, height: 730, alt: "Le garage Recacor au Crès, près de Montpellier" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/refonte/facade-recacor-clean-20260719-optimized.webp"] },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "AutoRepair", "@id": `${base}/#organization`, name: "Recacor", url: base, telephone: "+33499533390", image: `${base}/refonte/facade-recacor-clean-20260719-optimized.webp`, address: { "@type": "PostalAddress", streetAddress: "1240 RN 113", addressLocality: "Le Crès", postalCode: "34920", addressCountry: "FR" } },
    { "@type": "Service", "@id": `${pageUrl}#partenariat`, name: "Partenariat CSE Recacor à Montpellier", serviceType: "Partenariat CSE pour les pneus et l’entretien automobile", description: "Convention de partenariat entre Recacor et les CSE : avantages pour les adhérents sur les pneus, les révisions, la vidange et la mécanique au garage du Crès.", url: pageUrl, provider: { "@id": `${base}/#organization` }, areaServed: [{ "@type": "City", name: "Montpellier" }, { "@type": "City", name: "Le Crès" }] },
  ],
};

const steps = [
  { title: "Présentez votre CSE", description: "Renseignez votre établissement, son représentant et le référent qui échangera avec notre équipe.", icon: Users },
  { title: "Préparez la convention", description: "Nous confirmons ensemble les avantages, la durée et les modalités du partenariat avant la signature.", icon: FilePenLine },
  { title: "Informez vos adhérents", description: "Votre CSE partage les avantages et le justificatif à présenter lors du passage chez Recacor.", icon: ClipboardCheck },
];

export default function CsePage() {
  return <main className="min-h-screen overflow-x-clip bg-[var(--recacor-paper)] text-[var(--recacor-ink)]">
    <BreadcrumbJsonLd items={[{ name: "Accueil", url: base }, { name: "Partenariat CSE", url: pageUrl }]} />
    <FaqJsonLd items={[...partnershipFaq]} id="partenariat-cse" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />

    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--recacor-night)] shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Recacor — accueil"><Image src="/logo-recacor-email.png" alt="Recacor" width={166} height={35} priority className="h-auto w-32 brightness-0 invert sm:w-40" /></Link>
        <nav aria-label="Navigation du partenariat" className="ml-auto hidden items-center gap-6 pr-5 text-sm font-semibold xl:flex">
          <a href="#avantages" className="text-white/75 hover:text-[var(--recacor-yellow)]">Les avantages</a>
          <a href="#fonctionnement" className="text-white/75 hover:text-[var(--recacor-yellow)]">Comment ça marche</a>
        </nav>
        <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
          <a href="#formulaire-cse" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[4px] bg-[var(--recacor-yellow)] px-4 py-2.5 text-sm font-bold whitespace-nowrap text-[var(--recacor-ink)] hover:bg-yellow-300">Faire une demande <ArrowRight aria-hidden="true" className="size-4" /></a>
          <PhoneLink location="header" phoneNumber={PHONE_MOBILE} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[4px] border border-white/30 px-4 py-2.5 text-sm font-bold text-white hover:border-white/60 hover:bg-white/10"><Phone aria-hidden="true" className="size-4" />Appeler</PhoneLink>
        </div>
      </div>
    </header>

    <section className="relative border-b border-white/10 bg-[var(--recacor-night)] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-7 sm:px-8 sm:pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-9">
        <div>
          <nav aria-label="Fil d’Ariane" className="mb-8 flex items-center gap-2 text-xs text-white/55"><Link href="/" className="hover:underline">Accueil</Link><span aria-hidden="true">/</span><span aria-current="page">Partenariat CSE</span></nav>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--recacor-yellow)]"><span className="size-2 rounded-full bg-[var(--recacor-yellow)]" />CE, CSE & entreprises</span>
          <h1 className="mt-4 max-w-xl font-heading text-[2.75rem] font-bold leading-[1.04] sm:text-6xl lg:text-[4.25rem]">Un partenariat auto pour votre CSE <span className="text-[var(--recacor-yellow)]">à Montpellier</span></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Des avantages sur les pneus et l’entretien automobile pour vos salariés, dans notre garage du Crès. Une convention avec votre CSE fixe les conditions pour vos adhérents.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#formulaire-cse" className="inline-flex items-center justify-center gap-3 rounded-[4px] bg-[var(--recacor-yellow)] px-6 py-3.5 text-sm font-bold text-[var(--recacor-ink)] hover:bg-yellow-300">Faire une demande <ArrowRight className="size-4" aria-hidden="true" /></a>
            <PhoneLink location="hero" phoneNumber={PHONE_MOBILE} className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/30 px-5 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10"><Phone className="size-4" aria-hidden="true" />{PHONE_MOBILE_DISPLAY}</PhoneLink>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-white/60"><ShieldCheck className="size-4 text-[var(--recacor-yellow)]" aria-hidden="true" />Formulaire de préparation · Signature séparée de la convention</p>
        </div>
        <div className="relative lg:mt-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 sm:aspect-[5/4]">
            <Image src="/refonte/facade-recacor-clean-20260719-optimized.webp" alt="Façade et atelier du garage Recacor au Crès, près de Montpellier" fill sizes="(min-width: 1024px) 45vw, 100vw" priority className="object-cover" />
          </div>
          <div className="relative mx-4 -mt-12 rounded-xl border border-white/15 bg-[var(--recacor-night)] p-5 text-white shadow-lg sm:mx-6 sm:p-6">
            <div className="flex items-start gap-3"><MapPin className="mt-1 size-5 shrink-0 text-[var(--recacor-yellow)]" aria-hidden="true" /><div><p className="font-heading text-2xl font-semibold">Votre garage au Crès</p><p className="mt-1 text-sm leading-6 text-slate-300">1240 RN 113, 34920 Le Crès<br />Près de Montpellier, Castelnau-le-Lez et Vendargues.</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <section id="avantages" aria-labelledby="avantages-title" className="scroll-mt-40 bg-white px-5 py-14 sm:scroll-mt-28 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--recacor-blue)]">Les avantages du partenariat</p><h2 id="avantages-title" className="mt-3 max-w-xl font-heading text-4xl font-bold leading-tight sm:text-5xl">Un avantage concret pour l’auto de vos salariés.</h2></div><p className="max-w-md text-sm leading-7 text-slate-600">Du changement de pneus à l’entretien courant, vos adhérents bénéficient des conditions prévues dans votre convention CSE.</p></div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{partnershipBenefits.map((benefit) => {
          const Icon = benefit.icon === "tyre" ? CircleDot : benefit.icon === "car" ? CarFront : Wrench;
          return <article key={benefit.category} className="flex flex-col rounded-xl border border-slate-200 border-t-4 border-t-[var(--recacor-yellow)] bg-[var(--recacor-paper)] p-6 sm:p-7"><span className="mb-7 flex size-12 items-center justify-center rounded-xl bg-[var(--recacor-night)] text-[var(--recacor-yellow)] shadow-sm"><Icon className="size-6" aria-hidden="true" /></span><p className="text-xs font-semibold leading-5 text-[var(--recacor-blue)]">{benefit.category}</p><h3 className="mt-2 font-heading text-3xl font-bold">{benefit.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p></article>;
        })}</div>
        <div className="mt-6 flex items-start gap-3 rounded-lg border-l-4 border-[var(--recacor-yellow)] bg-[var(--recacor-yellow)]/15 px-5 py-4 text-sm leading-6 text-[var(--recacor-ink)]"><BadgeCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><p>Les avantages s’appliquent sur les tarifs publics en vigueur, sur présentation d’un justificatif d’appartenance au CSE. Remises non cumulables avec d’autres offres, sauf accord écrit de Recacor.</p></div>
      </div>
    </section>

    <section id="fonctionnement" aria-labelledby="fonctionnement-title" className="scroll-mt-40 px-5 py-14 sm:scroll-mt-28 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--recacor-blue)]">De la demande au passage au garage</p><h2 id="fonctionnement-title" className="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">Trois étapes, un référent de chaque côté.</h2></div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">{steps.map((step, index) => <li key={step.title} className="relative border-t border-slate-300 pt-6"><div className="mb-5 flex items-center justify-between"><span className="font-heading text-5xl font-semibold text-[var(--recacor-blue)]">0{index + 1}</span><step.icon className="size-6 text-[var(--recacor-blue)]" aria-hidden="true" /></div><h3 className="font-heading text-2xl font-bold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p></li>)}</ol>
        <div className="mt-10 grid gap-6 rounded-xl bg-[var(--recacor-night)] p-6 text-white sm:p-8 md:grid-cols-2"><div><h3 className="font-heading text-2xl font-semibold">Côté Recacor</h3><p className="mt-2 text-sm leading-7 text-slate-300">Un devis détaillé et gratuit avant toute intervention, et l’application des conditions prévues dans votre convention.</p></div><div><h3 className="font-heading text-2xl font-semibold">Côté CSE</h3><p className="mt-2 text-sm leading-7 text-slate-300">Un référent désigné, des adhérents informés du partenariat et un justificatif pour les identifier au garage.</p></div></div>
      </div>
    </section>

    <section id="formulaire-cse" aria-labelledby="formulaire-title" className="scroll-mt-40 border-y border-slate-200 bg-[var(--recacor-paper)] px-5 py-14 sm:scroll-mt-28 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <div className="lg:sticky lg:top-28"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--recacor-blue)]">Préparer la convention</p><h2 id="formulaire-title" className="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">Parlons de votre CSE.</h2><p className="mt-5 text-sm leading-7 text-slate-600">Ce formulaire nous permet de préparer la convention à partir des coordonnées de votre établissement et de vos interlocuteurs. Notre équipe prendra ensuite contact avec votre référent.</p>
          <div className="mt-7 rounded-xl border border-slate-200 border-l-4 border-l-[var(--recacor-yellow)] bg-white p-5"><h3 className="font-semibold">Les informations à avoir sous la main</h3><ul className="mt-4 space-y-3 text-sm text-slate-600">{["Nom et adresse de votre établissement", "Nom et fonction du représentant du CSE", "Coordonnées du référent du partenariat"].map((item) => <li key={item} className="flex items-start gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-[var(--recacor-blue)]" aria-hidden="true" />{item}</li>)}</ul></div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-slate-500"><ShieldCheck className="mt-1 size-4 shrink-0" aria-hidden="true" />La convention sera signée séparément. Aucune liste de salariés ne vous est demandée.</p><PhoneLink location="formulaire" phoneNumber={PHONE_MOBILE} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--recacor-blue)]"><Phone className="size-4" aria-hidden="true" />Une question ? {PHONE_MOBILE_DISPLAY}</PhoneLink>
        </div>
        <div><p className="mb-4 text-xs text-slate-600">Les champs marqués d’un astérisque (*) sont obligatoires.</p><PartnershipForm /></div>
      </div>
    </section>

    <section aria-labelledby="faq-title" className="bg-white px-5 py-14 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-7xl items-start gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--recacor-blue)]">Vos questions</p><h2 id="faq-title" className="mt-3 font-heading text-4xl font-bold sm:text-5xl">Le partenariat, en pratique.</h2><p className="mt-5 text-sm leading-7 text-slate-600">Les réponses pour préparer votre demande et expliquer le fonctionnement à vos adhérents.</p></div><div className="divide-y divide-slate-200 border-y border-slate-200">{partnershipFaq.map((item) => <details key={item.q} className="group py-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-base font-semibold [&::-webkit-details-marker]:hidden">{item.q}<span aria-hidden="true" className="text-xl font-normal text-[var(--recacor-blue)] group-open:rotate-45">+</span></summary><p className="mt-4 pr-6 text-sm leading-7 text-slate-600">{item.a}</p></details>)}</div></div></section>

    <footer className="bg-[var(--recacor-night)] px-5 py-9 text-white sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="font-heading text-2xl font-bold">Recacor · Le Crès</p><p className="mt-1 text-sm text-slate-300">1240 RN 113, 34920 Le Crès · Partenariats CE / CSE</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-300"><Link href="/pneus-voiture" className="hover:text-white">Pneus voiture</Link><Link href="/mecanique" className="hover:text-white">Entretien et mécanique</Link><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link><Link href="/confidentialite" className="hover:text-white">Confidentialité</Link></div></div></footer>
  </main>;
}
