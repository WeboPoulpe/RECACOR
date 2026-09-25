import type { Metadata } from "next";
import Image from "next/image";
import { PartnerApplicationForm } from "./partner-application-form";
import { PartnerPictogram, type PictogramKind } from "./partner-pictogram";
import { PHONE_MOBILE, PHONE_MOBILE_DISPLAY } from "@/lib/tracking";
import {
  ArrowRight, Check, CircleHelp, Handshake, MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Devenir partenaire de montage pneus | Recacor",
  description:
    "Proposez le montage de pneus et les prestations de votre atelier aux clients Recacor. Découvrez le fonctionnement du partenariat garage.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    number: "01",
    icon: "tyre" as PictogramKind,
    title: "Le client choisit ses pneus",
    text: "Il les commande et les paie sur la marketplace Recacor.",
  },
  {
    number: "02",
    icon: "calendar" as PictogramKind,
    title: "Il réserve dans votre atelier",
    text: "Il choisit votre garage et un créneau que vous avez communiqué comme disponible.",
  },
  {
    number: "03",
    icon: "payment" as PictogramKind,
    title: "Vous réalisez le montage",
    text: "Le client se présente au rendez-vous et vous paie le montage directement sur place.",
  },
];

const advantages = [
  {
    icon: "customers" as PictogramKind,
    title: "Des clients en plus pour votre atelier",
    text: "Les clients qui commanderont leurs pneus sur Recacor pourront choisir votre garage pour les faire monter.",
    color: "bg-[var(--recacor-blue)]",
  },
  {
    icon: "payment" as PictogramKind,
    title: "Le montage est payé chez vous",
    text: "Recacor encaisse le paiement des pneus. Le client règle le montage directement à votre garage, sur place.",
    color: "bg-[var(--recacor-green)]",
  },
  {
    icon: "calendar" as PictogramKind,
    title: "Vous gardez la main sur vos créneaux",
    text: "Vous communiquez les disponibilités de votre atelier. Un créneau proposé comme disponible pourra être réservé par un client.",
    color: "bg-[var(--recacor-indigo)]",
  },
  {
    icon: "pricing" as PictogramKind,
    title: "Vos tarifs et services sont clairs",
    text: "Vous communiquez vos tarifs de montage et les prestations proposées. Le client les consulte avant de réserver.",
    color: "bg-[var(--recacor-ink)]",
  },
];

const questions = [
  {
    question: "Qui encaisse le paiement des pneus et du montage ?",
    answer:
      "Le client paie ses pneus sur la marketplace Recacor. Il règle le montage directement à votre garage, sur place.",
  },
  {
    question: "Une commission est-elle prévue au démarrage ?",
    answer:
      "Non, aucune commission sur le montage n’est prévue au lancement du partenariat.",
  },
  {
    question: "Comment sont gérés les rendez-vous ?",
    answer:
      "Vous nous communiquez vos disponibilités. Les créneaux affichés comme disponibles peuvent être réservés ; signalez-nous toute indisponibilité afin que le calendrier soit à jour.",
  },
  {
    question: "Puis-je définir mes propres tarifs ?",
    answer:
      "Oui. Vous communiquez les tarifs et les services de votre garage afin qu’ils soient présentés au client avant sa réservation.",
  },
];

const workshopServices = [
  {
    icon: "mechanic" as PictogramKind,
    title: "Entretien et mécanique",
    examples: "Vidange, freinage, batterie et entretien courant",
  },
  {
    icon: "alignment" as PictogramKind,
    title: "Géométrie et parallélisme",
    examples: "Contrôle et réglage selon le véhicule",
  },
  {
    icon: "climate" as PictogramKind,
    title: "Climatisation",
    examples: "Contrôle et entretien du système",
  },
  {
    icon: "services" as PictogramKind,
    title: "Autres services d’atelier",
    examples: "Indiquez les prestations réellement proposées chez vous",
  },
];

export default function DevenirPartenaireMontagePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--recacor-night)] pb-20 pt-28 text-white sm:pb-24 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to bottom, black, transparent 88%)",
          }}
        />
        <div aria-hidden="true" className="absolute -right-40 -top-36 h-[34rem] w-[34rem] rounded-full bg-[var(--recacor-indigo)]/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-64 left-[38%] h-[30rem] w-[30rem] rounded-full bg-[var(--recacor-blue)]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-bold uppercase tracking-[.16em] text-white/80">
              <Handshake className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              Partenariat garages
            </div>
            <h1 className="max-w-3xl font-heading text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Devenez partenaire de montage{" "}
              <span className="text-yellow-400">Recacor</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Nous souhaitons proposer votre atelier aux clients qui commandent leurs pneus sur Recacor. Vous réalisez le montage et le client vous règle directement sur place.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#inscription"
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-wide text-[var(--recacor-ink)] transition hover:bg-yellow-300"
              >
                Déposer ma candidature <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={"tel:" + PHONE_MOBILE}
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/25 px-6 py-4 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/[0.06]"
              >
                Appeler · {PHONE_MOBILE_DISPLAY}
              </a>
            </div>
            <a href={"https://wa.me/" + PHONE_MOBILE.replace("+", "")} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 items-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-black text-[#073b24] transition hover:bg-[#20bd5a]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Une question ? Écrivez-nous sur WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="mt-8 inline-flex items-center gap-3 border-l-4 border-yellow-400 bg-white/[0.06] px-4 py-3 text-sm text-white/80">
              <Check className="h-4 w-4 shrink-0 text-yellow-400" aria-hidden="true" />
              Pas de commission sur le montage au lancement
            </div>
          </div>

          <div className="relative min-h-[390px] overflow-hidden border border-white/15 shadow-2xl shadow-black/30 sm:min-h-[470px]">
            <Image
              src="/images/hero-partenaire-montage.webp"
              alt="Mécanicien en atelier en train de monter une roue sur une voiture"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-[58%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--recacor-night)] via-[var(--recacor-night)]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.18em] text-yellow-400">Le savoir-faire de votre atelier</p>
              <h2 className="mt-2 max-w-md text-2xl font-black leading-tight text-white sm:text-3xl">
                Le montage ouvre la porte à vos autres prestations.
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: "tyre" as PictogramKind, label: "Pneus" },
                  { icon: "mechanic" as PictogramKind, label: "Mécanique" },
                  { icon: "alignment" as PictogramKind, label: "Géométrie" },
                ].map((service) => (
                  <span key={service.label} className="inline-flex items-center gap-2 border border-white/25 bg-[var(--recacor-night)]/70 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm">
                    <PartnerPictogram kind={service.icon} className="h-7 w-7" />
                    {service.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--recacor-paper)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">Ce que le partenariat vous apporte</p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-[var(--recacor-ink)] sm:text-4xl">
              Votre atelier accueille les clients. Vous gardez la maîtrise du montage.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => (
              <article key={item.title} className="group border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--recacor-blue)]/35 hover:shadow-xl hover:shadow-[var(--recacor-ink)]/[0.06] sm:p-7">
                <PartnerPictogram kind={item.icon} className="h-14 w-14 shrink-0" />
                <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-slate-400">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-black leading-snug text-[var(--recacor-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--recacor-paper)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">Et aussi, selon votre atelier</p>
              <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-[var(--recacor-ink)] sm:text-4xl">
                Faites connaître vos autres prestations.
              </h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-slate-600">
              Le partenariat peut présenter aux clients les services que vous proposez déjà : entretien mécanique, vidange, freinage, géométrie, climatisation ou autres. Vous indiquez vos prestations lors de l’inscription ; nous en échangeons avec vous avant leur présentation.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workshopServices.map((service, index) => (
              <article key={service.title} className="border border-slate-200 bg-white p-6">
                <PartnerPictogram kind={service.icon} className="h-14 w-14 shrink-0" />
                <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-slate-400">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-black leading-snug text-[var(--recacor-ink)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.examples}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fonctionnement" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">Comment ça se passe</p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-[var(--recacor-ink)] sm:text-4xl">
              Chacun sait ce qu’il encaisse et ce qu’il fait.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Le client achète ses pneus en ligne, puis réserve le montage dans votre atelier. Le paiement des pneus et celui de la prestation restent clairement séparés.
            </p>
            <div className="mt-7 border-l-4 border-yellow-400 bg-[var(--recacor-paper)] p-5">
              <p className="font-black text-[var(--recacor-ink)]">Pneus : payés sur Recacor</p>
              <p className="mt-1 text-sm text-slate-600">Montage : payé directement à votre garage</p>
            </div>
          </div>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.number} className="grid gap-4 border border-slate-200 p-5 sm:grid-cols-[58px_1fr] sm:items-center sm:p-6">
                <PartnerPictogram kind={step.icon} className="h-14 w-14 shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">Étape {step.number}</p>
                  <h3 className="mt-1 text-lg font-black text-[var(--recacor-ink)]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inscription" className="scroll-mt-24 bg-[var(--recacor-paper)] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:px-8">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">Rejoindre le réseau</p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight tracking-tight text-[var(--recacor-ink)] sm:text-4xl">
              Proposez votre atelier aux clients Recacor.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Présentez-nous votre garage, vos tarifs de montage et les services que vous réalisez. Le dossier est envoyé à Recacor pour étude.
            </p>
            <div className="mt-7 border-l-4 border-yellow-400 bg-white p-5">
              <p className="font-black text-[var(--recacor-ink)]">Besoin d’un renseignement ?</p>
              <p className="mt-1 text-sm text-slate-600">Échangez directement avec notre équipe au sujet du partenariat.</p>
              <div className="mt-4 flex flex-col gap-3">
                <a href={"tel:" + PHONE_MOBILE} className="inline-flex items-center gap-2 text-sm font-black text-[var(--recacor-blue)] hover:underline">
                  Appeler le {PHONE_MOBILE_DISPLAY}
                </a>
                <a href={"https://wa.me/" + PHONE_MOBILE.replace("+", "")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-black text-[#073b24] transition hover:bg-[#20bd5a]">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Écrire sur WhatsApp
                </a>
                <a href="mailto:recacor.fr@gmail.com?subject=Candidature%20partenaire%20montage" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[var(--recacor-blue)]">
                  Écrire par e-mail
                </a>
              </div>
            </div>
          </div>
          <PartnerApplicationForm />
        </div>
      </section>

      <section className="bg-[var(--recacor-night)] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[.16em] text-yellow-400">Questions fréquentes</p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight sm:text-4xl">Avant de rejoindre le réseau</h2>
            <p className="mt-5 leading-relaxed text-white/60">
              On échange avec vous sur les garages concernés, les tarifs de montage et l’organisation des rendez-vous avant de démarrer.
            </p>
            <a href="mailto:contact@recacor.fr?subject=Partenariat%20de%20montage%20Recacor" className="mt-7 inline-flex items-center gap-2 font-black text-yellow-400 transition hover:text-yellow-300">
              Poser une question <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {questions.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-base font-black text-white marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3"><CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" aria-hidden="true" />{item.question}</span>
                  <span aria-hidden="true" className="text-xl leading-none text-yellow-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl pl-8 text-sm leading-relaxed text-white/60">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--recacor-paper)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 border-t-4 border-yellow-400 bg-white p-7 shadow-xl shadow-[var(--recacor-ink)]/[0.06] sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[.16em] text-[var(--recacor-blue)]">Vous souhaitez en parler ?</p>
            <h2 className="mt-2 font-heading text-2xl font-black text-[var(--recacor-ink)] sm:text-3xl">Présentez-nous votre atelier.</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Écrivez-nous pour échanger sur les modalités du partenariat.</p>
          </div>
          <a href="mailto:contact@recacor.fr?subject=Partenariat%20de%20montage%20Recacor" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-[var(--recacor-blue)] px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[var(--recacor-indigo)]">
            Contacter Recacor <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
