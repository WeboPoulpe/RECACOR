"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";

const articles = [
  {
    slug: "entretien-pneumatiques-flotte",
    title: "Comment optimiser l'entretien des pneumatiques de votre flotte",
    excerpt: "Découvrez nos conseils d'experts pour réduire vos coûts de maintenance et prolonger la durée de vie de vos pneumatiques poids lourd.",
    category: "Flotte",
    author: "Équipe RECACOR",
    date: "12 Avr 2026",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "choisir-pneus-ete",
    title: "Guide complet : bien choisir ses pneus été",
    excerpt: "Tout ce qu'il faut savoir pour choisir les bons pneumatiques été selon votre véhicule, votre budget et votre style de conduite.",
    category: "Particulier",
    author: "Équipe RECACOR",
    date: "5 Avr 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "pression-pneus-securite",
    title: "Pression des pneus : pourquoi c'est essentiel pour votre sécurité",
    excerpt: "Une pression inadaptée impacte la tenue de route, la consommation et l'usure. On vous explique tout.",
    category: "Sécurité",
    author: "Équipe RECACOR",
    date: "28 Mar 2026",
    readTime: "3 min",
    featured: false,
  },
  {
    slug: "recreusage-pneumatiques-avantages",
    title: "Le recreusage de pneumatiques : économique et écologique",
    excerpt: "Le recreusage permet de prolonger la vie de vos pneus poids lourd tout en réduisant votre empreinte carbone.",
    category: "Flotte",
    author: "Équipe RECACOR",
    date: "20 Mar 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "recacor-ouvre-nouveau-centre",
    title: "RECACOR ouvre un nouveau centre à Montpellier",
    excerpt: "Notre réseau s'agrandit avec l'ouverture d'un centre à Montpellier, renforçant notre présence dans le Sud.",
    category: "Actualité",
    author: "Équipe RECACOR",
    date: "10 Mar 2026",
    readTime: "2 min",
    featured: false,
  },
  {
    slug: "normes-europeennes-pneumatiques",
    title: "Nouvelles normes européennes sur les pneumatiques : ce qui change",
    excerpt: "Les réglementations européennes évoluent en 2026. Tour d'horizon des changements pour les professionnels.",
    category: "Réglementation",
    author: "Équipe RECACOR",
    date: "2 Mar 2026",
    readTime: "7 min",
    featured: false,
  },
];

const categories = ["Tous", "Flotte", "Particulier", "Sécurité", "Actualité", "Réglementation"];

export default function BlogPage() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">Blog</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
          >
            Actualités &amp;{" "}
            <span className="text-purple-glow">conseils</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl text-lg"
          >
            Expertise pneumatique, actualités du réseau et conseils pratiques
            pour professionnels et particuliers.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-purple-bright text-white shadow-lg shadow-purple-bright/20"
                    : "bg-muted text-muted-foreground hover:bg-purple-bright/10 hover:text-purple-bright"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-border bg-white overflow-hidden hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright min-h-[280px] lg:min-h-[380px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 0%, transparent 60%)" }} />
                    <span className="text-7xl relative z-10">📰</span>
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 text-xs">{featured.category}</Badge>
                      <span className="text-xs text-muted-foreground">Article à la une</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 group-hover:text-purple-deep transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                      </div>
                      <span className="text-sm font-semibold text-purple-bright group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        Lire <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="relative py-16 pb-28 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/blog/${article.slug}`} className="group block h-full">
                  <article className="rounded-2xl border border-border bg-white overflow-hidden h-full hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300 flex flex-col">
                    <div className="bg-gradient-to-br from-purple-mid/20 to-purple-bright/10 h-44 flex items-center justify-center">
                      <span className="text-4xl opacity-60">📄</span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs bg-purple-bright/[0.06] text-purple-bright">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>
                      <h3 className="font-bold tracking-tight mb-2 group-hover:text-purple-deep transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{article.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                        <span className="text-purple-bright font-semibold group-hover:gap-1.5 inline-flex items-center gap-1 transition-all text-sm">
                          Lire <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
