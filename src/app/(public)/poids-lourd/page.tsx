"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle, ArrowRight, Shield, Clock, Phone, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";
import { ParallaxImage } from "@/components/parallax-image";
import { Counter } from "@/components/counter";

const prestations = [
  { title: "Montage & démontage", desc: "Pneumatiques toutes dimensions, sur site ou en atelier" },
  { title: "Recreusage & regommage", desc: "Prolongez la durée de vie de vos pneumatiques de 25%" },
  { title: "Maintenance préventive", desc: "Planification et suivi digital de votre parc pneumatique" },
  { title: "Dépannage 24h/24", desc: "Intervention rapide sur autoroute, site ou dépôt" },
  { title: "Contrôle & expertise", desc: "Diagnostic complet et recommandations personnalisées" },
  { title: "Gestion de flotte", desc: "Contrats sur-mesure avec interlocuteur dédié" },
];

const stats = [
  { value: 500, suffix: "+", label: "Flottes gérées" },
  { value: 24, suffix: "h/24", label: "Dépannage" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 30, suffix: "min", label: "Temps d'intervention moyen" },
];

export default function PoidsLourdPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              <Truck className="h-3 w-3 mr-1" /> Poids lourd
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Solutions pneumatiques pour{" "}
            <span className="text-purple-glow">flottes & transport</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl text-lg"
          >
            Maintenance préventive et curative, dépannage 24/7, gestion de parc.
            RECACOR, le partenaire des professionnels du transport.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/nos-centres" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm hover:bg-white/10 transition-all">
              Nos centres
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-3xl sm:text-4xl font-black text-white"><Counter target={s.value} suffix={s.suffix} /></div>
                  <p className="text-white/50 text-sm mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">Prestations</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                  Une expertise{" "}<span className="text-gradient-purple">complète</span>
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  De la maintenance préventive au dépannage d&apos;urgence, nous couvrons tous vos besoins pneumatiques.
                </p>
              </motion.div>

              <div className="mt-10 space-y-3">
                {prestations.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" as const }}
                    className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 hover:border-purple-bright/30 hover:shadow-lg hover:shadow-purple-bright/[0.04] transition-all"
                  >
                    <CheckCircle className="h-5 w-5 text-purple-bright shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-purple-deep transition-colors">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block sticky top-32"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <ParallaxImage src="/Design sans titre (29)/3.webp" alt="Pneumatiques poids lourd" className="absolute inset-0 w-full h-full" speed={0.1} />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Parlons de votre flotte</h2>
              <p className="text-white/50 max-w-md">Devis gratuit et personnalisé sous 24h.</p>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
