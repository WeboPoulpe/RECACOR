"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Car, CheckCircle, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";
import { ParallaxImage } from "@/components/parallax-image";

const prestations = [
  { title: "Montage & équilibrage", desc: "Toutes marques, toutes dimensions, en moins d'1h" },
  { title: "Permutation saisonnière", desc: "Changement été/hiver pour optimiser la tenue de route" },
  { title: "Contrôle de pression", desc: "Vérification et ajustement gratuit à chaque visite" },
  { title: "Réparation de crevaisons", desc: "Réparation rapide quand c'est possible, remplacement sinon" },
  { title: "Stockage saisonnier", desc: "Gardez vos pneus au sec dans nos entrepôts dédiés" },
  { title: "Conseil personnalisé", desc: "Recommandation adaptée à votre véhicule et votre budget" },
];

const avantages = [
  { icon: "⚡", title: "Sans rendez-vous", desc: "Venez quand vous voulez" },
  { icon: "🏷️", title: "Meilleur prix", desc: "Tarifs compétitifs garantis" },
  { icon: "🔧", title: "Toutes marques", desc: "Michelin, Bridgestone, Continental..." },
  { icon: "✅", title: "Devis gratuit", desc: "Sans engagement" },
];

export default function ParticulierPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              <Car className="h-3 w-3 mr-1" /> Particulier
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Vos pneumatiques entre{" "}
            <span className="text-purple-glow">de bonnes mains</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl text-lg"
          >
            Avec ou sans rendez-vous, profitez d&apos;un service rapide et de qualité
            pour l&apos;entretien de vos pneumatiques.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow">
              Prendre rendez-vous <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/nos-centres" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm hover:bg-white/10 transition-all">
              Trouver un centre
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Avantages */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {avantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-white p-5 text-center hover:border-purple-bright/30 hover:shadow-lg hover:shadow-purple-bright/[0.04] transition-all"
              >
                <span className="text-3xl block mb-3">{a.icon}</span>
                <h3 className="font-bold text-sm mb-1">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">Prestations</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                  Tout pour{" "}<span className="text-gradient-purple">votre véhicule</span>
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  Un service complet et rapide, adapté à tous les budgets et tous les véhicules.
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block sticky top-32"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <ParallaxImage src="/Design sans titre (29)/2.webp" alt="Pneumatiques particulier" className="absolute inset-0 w-full h-full" speed={0.1} />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/40 via-transparent to-transparent" />
              </div>
              {/* Avis flottant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl border border-border"
              >
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-purple-bright text-purple-bright" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">&ldquo;Service rapide et professionnel, je recommande !&rdquo;</p>
                <p className="text-xs font-bold mt-1">Sophie L. — Montpellier</p>
              </motion.div>
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
            className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Prêt à changer vos pneus ?
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Sans rendez-vous ou en réservant un créneau, c&apos;est vous qui choisissez.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow">
              Prendre rendez-vous <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
