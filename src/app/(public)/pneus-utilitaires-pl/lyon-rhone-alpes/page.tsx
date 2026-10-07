import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, MessageCircle, PackageCheck, Phone, Truck } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PlWhatsappButton } from "@/components/pl-whatsapp-button";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_PL_SUIVI } from "@/lib/tracking";
import { PL_JEROME_CONTACT } from "@/lib/pl-commercial-contact";
import { JeromePlForm } from "./devis-form";

export const revalidate = 86400;
const path = "/pneus-utilitaires-pl/lyon-rhone-alpes";
const url = `https://www.recacor.fr${path}`;
const description = "Pneus poids lourd livrés à Lyon et dans le secteur Rhône-Alpes. Envoyez dimensions, quantité et commune à Jérôme pour un devis avec disponibilité et livraison.";
export const metadata: Metadata = {
  title: { absolute: "Pneus poids lourd Lyon et Rhône-Alpes | Recacor — Jérôme" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Pneus poids lourd à Lyon — Votre devis avec Jérôme", description, url, siteName: "Recacor", locale: "fr_FR", type: "website" },
};

const zones = [
  { code: "69", name: "Rhône", cities: "Lyon, Villeurbanne, Vénissieux" },
  { code: "01", name: "Ain", cities: "Bourg-en-Bresse, Ambérieu-en-Bugey" },
  { code: "38", name: "Isère", cities: "Grenoble, Bourgoin-Jallieu, Vienne" },
  { code: "42", name: "Loire", cities: "Saint-Étienne, Roanne" },
  { code: "73", name: "Savoie", cities: "Chambéry, Albertville" },
  { code: "74", name: "Haute-Savoie", cities: "Annecy, Annemasse, Cluses" },
];
const faqs = [
  { q: "Comment demander un prix pour des pneus poids lourd à Lyon ?", a: "Envoyez à Jérôme la dimension complète, la quantité, l'essieu à équiper, l'usage du camion et la commune de livraison. Sur WhatsApp, une photo nette du flanc du pneu peut remplacer la saisie de la dimension. Jérôme vérifie les références et la disponibilité pour préparer le devis." },
  { q: "Livrez-vous ailleurs qu'à Lyon ?", a: "Recacor livre en France entière. Cette demande auprès de Jérôme concerne le Rhône, l'Ain, l'Isère, la Loire, la Savoie et la Haute-Savoie. Précisez le code postal et la commune : les frais et le délai de livraison sont confirmés pour votre commande." },
  { q: "Un partenaire peut-il intervenir dans mon secteur ?", a: "Oui. Recacor travaille avec des partenaires dans le secteur de Jérôme. Indiquez votre commune, le véhicule et la prestation attendue : Jérôme confirme les possibilités d’intervention et les conditions avant tout engagement." },
  { q: "Quelles marques de pneus poids lourd proposez-vous ?", a: "Recacor propose notamment CTM, Hankook et des pneus Michelin rechapés. Précisez une marque si vous avez une préférence, ou indiquez votre usage et votre budget. Jérôme vérifie les références compatibles avec la dimension et l’essieu, puis leur disponibilité avant de préparer le devis." },
  { q: "Je ne connais pas la dimension : puis-je envoyer une photo ?", a: "Oui, envoyez une photo lisible du flanc du pneu sur le WhatsApp de Jérôme. Ajoutez le nombre de pneus souhaité, l'essieu concerné et votre commune. Si plusieurs dimensions équipent le camion ou la remorque, photographiez chaque monte." },
  { q: "Les pneus sont-ils disponibles immédiatement ?", a: "La disponibilité dépend de la référence, de la dimension et de la quantité demandée. Jérôme confirme les pneus proposés et le délai avant commande. Le formulaire permet d'indiquer votre échéance ; elle ne constitue pas une promesse de livraison." },
];
const service = {
  "@context": "https://schema.org", "@type": "Service",
  name: "Fourniture de pneus poids lourd à Lyon et dans le secteur Rhône-Alpes", url,
  serviceType: "Vente et livraison de pneus poids lourd",
  description,
  provider: { "@id": "https://www.recacor.fr/#organization" },
  areaServed: zones.map((zone) => ({ "@type": "AdministrativeArea", name: zone.name })),
  availableChannel: { "@type": "ServiceChannel", servicePhone: { "@type": "ContactPoint", telephone: "+33687528406", contactType: "commercial pneus poids lourd", availableLanguage: "fr" } },
};

export default function LyonRhoneAlpesPlPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", url: "https://www.recacor.fr" }, { name: "Pneus poids lourd", url: "https://www.recacor.fr/pneus-utilitaires-pl" }, { name: "Lyon et Rhône-Alpes", url }]} />
      <FaqJsonLd items={faqs} id="pl-lyon-rhone-alpes" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service).replace(/</g, "\\u003c") }} />

      <section className="overflow-hidden bg-[var(--recacor-night)] text-white">
        <div className="recacor-shell grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="flex flex-col lg:block">
            <p className="order-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400"><MapPin className="h-4 w-4" /> Lyon · secteur Rhône-Alpes</p>
            <h1 className="order-2 mt-4 font-heading text-5xl font-black uppercase leading-[0.95] sm:text-7xl lg:text-8xl">Pneus poids lourd<span className="block text-yellow-400">à Lyon</span></h1>
            <p className="order-4 mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">Pneus pour camions, bennes et semi-remorques. Jérôme vous propose les références selon votre monte, votre usage et votre budget, avec livraison et partenaires dans votre secteur.</p>
            <div className="order-3 mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlWhatsappButton />
              <a href="#devis" className="recacor-btn-secondary">Demander un devis <ArrowRight className="h-4 w-4" /></a>
              <PhoneLink location="hero" serviceType="pl" phoneNumber={PHONE_PL_SUIVI} className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-red-300/60 px-5 py-3 text-sm font-bold text-red-100 transition-colors hover:bg-red-950/40"><Phone aria-hidden="true" className="h-4 w-4" /> Urgence dépannage</PhoneLink>
            </div>
            <p className="order-5 mt-3 text-sm text-white/70">Sur WhatsApp, envoyez aussi une photo du flanc du pneu. Pour une urgence, Patrick vérifie la possibilité d’intervention selon votre position.</p>
            <div className="order-6 mt-7 flex items-center gap-4 border-t border-white/15 pt-5">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-yellow-400/50 font-heading text-2xl font-black text-yellow-400">J</span>
              <div><p className="font-bold">Jérôme, votre contact pneus PL</p><p className="mt-1 text-sm text-white/75">Un interlocuteur pour les pneus, la livraison et les partenaires.</p></div>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[4px] border border-white/15 bg-white/5">
            <Image src="/hero-generated/pl-master.webp" alt="Illustration de l’équipement en pneus d’un poids lourd" width={1774} height={887} priority sizes="(max-width: 1023px) 100vw, 42vw" className="aspect-[4/3] w-full object-cover object-[70%_center]" />
            <figcaption className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-yellow-400">Route · régional · chantier</p><p className="mt-3 text-lg font-bold">Plusieurs marques, un choix selon votre usage.</p><p className="mt-2 text-sm leading-6 text-white/70">CTM, Hankook ou Michelin rechapé : références et disponibilité vérifiées pour votre demande.</p><p className="mt-3 text-xs text-white/50">Illustration.</p></figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="recacor-shell grid gap-5 py-6 sm:grid-cols-3">
          {[{ Icon: MessageCircle, title: "Un contact direct", text: "Le WhatsApp professionnel de Jérôme." }, { Icon: Truck, title: "Des pneus livrés", text: "Adresse et modalités précisées au devis." }, { Icon: PackageCheck, title: "Des partenaires dans votre secteur", text: "Intervention étudiée avec votre commune et votre besoin." }].map(({ Icon, title, text }) => <div key={title} className="flex items-start gap-3"><Icon className="mt-1 h-5 w-5 shrink-0 text-blue-700" /><div><h2 className="text-sm font-black">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{text}</p></div></div>)}
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="recacor-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div><p className="recacor-eyebrow">Votre camion, votre monte</p><h2 className="recacor-title mt-3">Ne commandez pas seulement une dimension.</h2><p className="mt-5 text-base leading-7 text-muted-foreground">Un pneu pour l’essieu moteur d’une benne ne se choisit pas comme un pneu de remorque routière. Indiquez où le pneu sera monté et comment travaille le véhicule.</p></div>
          <div className="overflow-hidden rounded-[4px] border border-border bg-white">
            <table className="w-full text-left text-sm"><caption className="sr-only">Les informations à transmettre pour préparer le devis de pneus poids lourd</caption><thead className="bg-[var(--recacor-night)] text-white"><tr><th scope="col" className="p-4">Votre besoin</th><th scope="col" className="p-4">À transmettre à Jérôme</th></tr></thead><tbody className="divide-y divide-border">
              {[ ["Camion ou tracteur routier", "Dimension complète, essieu directeur ou moteur, quantité et trajets habituels."], ["Remorque ou semi-remorque", "Dimension de la monte, nombre de pneus à remplacer et usage routier ou mixte."], ["Benne ou camion de chantier", "Part de route et de chantier, essieu concerné et dimension lisible sur le flanc."], ["Plusieurs véhicules à équiper", "Une ligne par dimension et par essieu, avec le nombre de pneus pour chacune."] ].map(([need, info]) => <tr key={need}><th scope="row" className="w-2/5 p-4 align-top font-bold">{need}</th><td className="p-4 align-top leading-6 text-muted-foreground">{info}</td></tr>)}
            </tbody></table>
          </div>
        </div>
      </section>

      <section className="bg-[#eef2f7] py-12 sm:py-16">
        <div className="recacor-shell grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div><p className="recacor-eyebrow">Du premier message à la commande</p><h2 className="recacor-title mt-3">Un devis qui précise aussi la livraison.</h2><p className="mt-5 leading-7 text-muted-foreground">Recacor livre les pneus en France entière. Pour votre entreprise à Lyon ou dans les départements voisins, Jérôme vérifie les références et les quantités demandées avant de vous proposer le devis.</p><ul className="mt-6 space-y-3 text-sm">{["Pneus proposés et quantité pour chaque dimension.", "Disponibilité vérifiée pour votre demande.", "Frais et délai de livraison confirmés avant commande."].map((text) => <li key={text} className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-blue-700" />{text}</li>)}</ul></div>
          <aside className="rounded-[4px] border-l-4 border-yellow-400 bg-white p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-blue-700">Un exemple de message</p><p className="mt-5 text-lg leading-8">« Bonjour Jérôme, il me faut 4 pneus en 315/80 R22.5 pour l’essieu moteur d’une benne, en usage route et chantier. Livraison à Vénissieux, 69200. Je vous envoie la photo du flanc. »</p><p className="mt-4 text-sm leading-6 text-muted-foreground">Ajoutez les indices de charge et de vitesse s’ils sont lisibles, ainsi que la date à laquelle vous souhaitez recevoir les pneus.</p><PlWhatsappButton className="mt-6" /></aside>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="recacor-shell"><div className="max-w-3xl"><p className="recacor-eyebrow">Livraison et partenaires</p><h2 className="recacor-title mt-3">Lyon et son secteur avec Jérôme.</h2><p className="mt-5 leading-7 text-muted-foreground">Rhône, Ain, Isère, Loire, Savoie et Haute-Savoie : précisez la commune et le code postal pour préparer la livraison.</p></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{zones.map((zone) => <div key={zone.code} className="flex gap-4 rounded-[4px] border border-border p-5"><span className="font-heading text-4xl font-black text-blue-700">{zone.code}</span><div><h3 className="font-bold">{zone.name}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{zone.cities}</p></div></div>)}</div>
          <p className="mt-5 text-sm text-muted-foreground">Votre entreprise est dans un autre département ? <Link href="/pneus-utilitaires-pl#devis" className="font-semibold text-blue-700 underline underline-offset-4">Transmettre une demande à l’équipe PL</Link>.</p>
        </div>
      </section>

      <section id="devis" className="scroll-mt-24 bg-[#eef2f7] py-12 sm:py-16">
        <div className="recacor-shell grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div><p className="recacor-eyebrow">Votre demande de pneus</p><h2 className="recacor-title mt-3">Préparons votre devis.</h2><p className="mt-5 leading-7 text-muted-foreground">Renseignez les dimensions connues, le nombre de pneus et votre commune. Votre téléphone permet de compléter la demande ; l’e-mail est facultatif.</p><p className="mt-4 leading-7 text-muted-foreground">Vous préférez envoyer des photos ? <a href={PL_JEROME_CONTACT.whatsappUrl} className="font-bold text-blue-700 underline underline-offset-4">Envoyez-les sur WhatsApp</a>.</p><div className="mt-7 rounded-[4px] border border-border bg-white p-5"><h3 className="font-bold">Besoin d’une intervention ?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Nous avons des partenaires dans le secteur de Jérôme. Précisez votre commune, le véhicule et la prestation souhaitée : Jérôme vérifie la prise en charge possible et vous confirme les conditions.</p></div></div>
          <div className="recacor-card min-w-0 p-5 sm:p-8"><JeromePlForm /></div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16"><div className="recacor-shell max-w-4xl"><h2 className="recacor-title">Avant de commander vos pneus PL</h2><div className="mt-8 divide-y divide-border border-y border-border">{faqs.map((faq) => <details key={faq.q} className="group py-5"><summary className="cursor-pointer pr-4 font-bold leading-6">{faq.q}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.a}</p></details>)}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><PlWhatsappButton /><a href="#devis" className="recacor-btn-dark">Demander un devis <ArrowRight className="h-4 w-4" /></a></div></div></section>
    </>
  );
}
