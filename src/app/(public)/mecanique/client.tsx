"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wrench, Droplet, Disc, Gauge, Target } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

const services = [
  { icon: Droplet, title: "Vidange", desc: "Vidange complète huile + filtre", price: "79€", href: "/services/vidange" },
  { icon: Target, title: "Parallélisme & Géométrie", desc: "Réglage laser 3D", price: "59€", href: "/services/parallelisme-geometrie" },
  { icon: Disc, title: "Freinage", desc: "Plaquettes, disques, liquide", price: "89€", href: "/mecanique#freinage" },
  { icon: Gauge, title: "Amortisseurs", desc: "Train roulant, suspension", price: "Sur devis", href: "/mecanique#amortisseurs" },
  { icon: Wrench, title: "Révision", desc: "Entretien complet constructeur", price: "Sur devis", href: "/mecanique#revision" },
];

export function MecaniqueClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Mécanique légère", url: "https://recacor.fr/mecanique" },
      ]} />
      <ServiceJsonLd name="Mécanique légère Montpellier" description="Révision, freinage, vidange, amortisseurs" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6"><Wrench className="h-3 w-3 mr-1" /> Mécanique</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Mécanique Légère<br />
            <span className="text-purple-glow">Garage Recacor Le Crès</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Vidange, freinage, amortisseurs, révision. Interventions rapides à Le Crès, près de Montpellier.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Nos prestations <span className="text-gradient-purple">pour particuliers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="group rounded-3xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold tracking-tight group-hover:text-purple-deep transition-colors">{s.title}</h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-bright group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                    <span className="mt-3 inline-block text-xs font-bold text-purple-bright bg-purple-bright/10 px-2.5 py-1 rounded-full">{s.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Demandez un <span className="text-gradient-purple">devis mécanique</span>
            </h2>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisMecaniqueForm />
          </div>
        </div>
      </section>
    </>
  );
}
