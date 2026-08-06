import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Snowflake, SunMedium } from "lucide-react";
import { AugustVlNotice } from "@/components/august-vl-notice";
import { BreadcrumbJsonLd } from "@/components/schema-jsonld";
import { PhoneLink } from "@/components/phone-link";

export const metadata: Metadata = {
  title: "Pause fraîcheur d'août au garage Recacor Le Crès",
  description:
    "En août, l'atelier VL Recacor adapte ses horaires au Crès : fermeture de 12h à 14h et samedi fermé. Le poids lourd reste sur appel avant déplacement.",
  alternates: { canonical: "/pause-fraicheur-aout" },
};

export default function PauseFraicheurAoutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pause fraîcheur d'août", url: "https://www.recacor.fr/pause-fraicheur-aout" },
        ]}
      />

      <section className="relative overflow-hidden bg-[var(--recacor-night)] pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white/80">
            <SunMedium className="h-3.5 w-3.5 text-amber-300" />
            Août 2026 · Info atelier
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-[3.6rem] font-black uppercase leading-[0.9] text-white sm:text-[4.7rem] lg:text-[5.8rem]">
            Pause fraîcheur
            <span className="block text-cyan-300">chez Recacor</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
            En août, l&apos;atelier VL adapte son rythme pour garder de bonnes
            conditions de travail pendant la chaleur et continuer à recevoir les
            clients dans de bonnes conditions au garage du Crès.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PhoneLink location="hero" className="recacor-btn-primary" showIcon>
              Appeler le garage
            </PhoneLink>
            <Link href="/contact" className="recacor-btn-secondary">
              Nous écrire
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AugustVlNotice />
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <article className="rounded-[4px] border border-border bg-white p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-800">
              Pourquoi ce rythme temporaire
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--recacor-night)]">
              Garder l&apos;atelier efficace sans faire semblant que la canicule n&apos;existe pas
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Pendant les fortes chaleurs, nous préférons annoncer un rythme clair
              plutôt que de faire venir les clients au mauvais moment. La pause du
              midi permet à l&apos;équipe de souffler et de reprendre l&apos;atelier VL dans de
              meilleures conditions l&apos;après-midi.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Si vous venez pour des pneus voiture, une vidange, un parallélisme ou
              une recharge clim, le plus simple est de viser le matin ou après 14h.
              Pour un besoin pro ou poids lourd, un appel avant déplacement évite les
              mauvaises surprises.
            </p>
          </article>

          <aside className="rounded-[4px] border border-slate-200 bg-white p-8 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/seasonal/pause-fraicheur-aout-2026.png"
              alt="Visuel pause fraîcheur août Recacor"
              className="w-full rounded-[4px] border border-slate-200"
            />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-800">
              <Snowflake className="h-3.5 w-3.5" />
              Slogan été
            </p>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--recacor-night)]">
              Pause fraîcheur chez Recacor, accueil plus serein au bon créneau.
            </h2>
            <div className="mt-6 rounded-[4px] border border-amber-100 bg-amber-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                À retenir
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>L&apos;atelier VL ferme de 12h à 14h en août.</li>
                <li>Le samedi VL est fermé pendant août.</li>
                <li>Le poids lourd reste sur appel avant déplacement.</li>
              </ul>
            </div>
            <div className="mt-6 rounded-[4px] bg-[var(--recacor-night)] p-5 text-white">
              <p className="text-sm leading-6 text-white/78">
                Un doute avant de venir ? Un appel permet de confirmer le bon créneau
                et d&apos;éviter un déplacement inutile.
              </p>
              <PhoneLink
                location="page"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"
              >
                <Phone className="h-4 w-4" />
                04 99 53 33 90
              </PhoneLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
