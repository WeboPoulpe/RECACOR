"use client";

import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Palette,
  Globe,
  Smartphone,
  Search,
  Shield,
  BarChart3,
  MousePointer2,
  Film,
  Sparkles,
  Code2,
  Server,
  Layers,
  Gauge,
  Lock,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";
import Link from "next/link";

const techStack = [
  {
    name: "Next.js 16",
    desc: "Framework React de dernière génération avec App Router, rendu serveur et génération statique.",
    icon: Code2,
    category: "Framework",
  },
  {
    name: "Tailwind CSS 4",
    desc: "Styling utilitaire pour un design pixel-perfect, performant et maintenable.",
    icon: Palette,
    category: "Design",
  },
  {
    name: "Framer Motion",
    desc: "Animations fluides et interactives : scroll reveal, parallax, marquee, transitions de page.",
    icon: Film,
    category: "Animation",
  },
  {
    name: "Shadcn/ui",
    desc: "Composants UI accessibles et personnalisables, construits sur Radix et Base UI.",
    icon: Layers,
    category: "UI",
  },
  {
    name: "TypeScript",
    desc: "Typage statique pour un code robuste, sans bugs, et facilement maintenable.",
    icon: Shield,
    category: "Qualité",
  },
  {
    name: "Vercel / Edge",
    desc: "Déploiement instantané, CDN mondial, performances optimales sur tous les continents.",
    icon: Server,
    category: "Infra",
  },
];

const features = [
  {
    icon: Zap,
    title: "Performance maximale",
    desc: "Score Lighthouse 95+. Génération statique, optimisation d'images WebP/AVIF, code splitting automatique.",
    metric: "95+",
    metricLabel: "Lighthouse",
  },
  {
    icon: Smartphone,
    title: "100% Responsive",
    desc: "Design adaptatif mobile-first. Expérience parfaite du smartphone au grand écran 4K.",
    metric: "100%",
    metricLabel: "Mobile-friendly",
  },
  {
    icon: Search,
    title: "SEO optimisé",
    desc: "Métadonnées structurées, rendu serveur, sitemap automatique, URLs propres, temps de chargement rapide.",
    metric: "Top 3",
    metricLabel: "Objectif Google",
  },
  {
    icon: MousePointer2,
    title: "Interactions premium",
    desc: "Curseur custom, scroll progress, parallax, hover 3D, animations au scroll, onboarding interactif.",
    metric: "40+",
    metricLabel: "Micro-interactions",
  },
  {
    icon: Gauge,
    title: "Temps de chargement",
    desc: "Première peinture en moins d'1 seconde grâce au SSG, au lazy loading et à la compression Brotli.",
    metric: "<1s",
    metricLabel: "First Paint",
  },
  {
    icon: Lock,
    title: "Sécurité & RGPD",
    desc: "HTTPS natif, headers de sécurité, pas de tracking intrusif, conformité RGPD intégrée.",
    metric: "A+",
    metricLabel: "Security Headers",
  },
];

const benefits = [
  {
    title: "Crédibilité renforcée",
    desc: "Un site premium qui positionne RECACOR comme leader incontesté du secteur. Design unique qui inspire confiance dès la première visite.",
    icon: Sparkles,
  },
  {
    title: "Génération de leads",
    desc: "Formulaires de contact stratégiquement placés, CTAs optimisés, parcours utilisateur pensé pour convertir les visiteurs en clients.",
    icon: BarChart3,
  },
  {
    title: "Visibilité Google",
    desc: "Architecture SEO-first, temps de chargement ultra-rapide, contenu structuré. Votre site sera visible là où vos clients cherchent.",
    icon: Globe,
  },
  {
    title: "Évolutivité totale",
    desc: "Architecture modulaire permettant d'ajouter facilement un espace client, un blog, une réservation en ligne ou un CRM.",
    icon: Layers,
  },
];

const pages = [
  { name: "Accueil", href: "/", desc: "Hero vidéo, services, stats, centres, marques, avis, FAQ" },
  { name: "Nos centres", href: "/nos-centres", desc: "Liste détaillée des 3 centres avec spécialités" },
  { name: "Poids lourd", href: "/poids-lourd", desc: "Solutions flottes, prestations, stats secteur" },
  { name: "Particulier", href: "/particulier", desc: "Services auto, avantages, avis clients" },
  { name: "Blog", href: "/blog", desc: "Articles, catégories, article à la une" },
  { name: "Contact", href: "/contact", desc: "Formulaire avancé, infos, types de demande" },
];

export default function MaquettePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              Présentation maquette
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl"
          >
            Site vitrine{" "}
            <span className="text-purple-glow">RECACOR</span>
            <br />
            <span className="text-2xl sm:text-3xl font-bold text-white/60 mt-2 block">
              Technologie, design et performance
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed"
          >
            Présentation de la stack technique, des fonctionnalités et des
            bénéfices du site vitrine conçu pour RECACOR.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Tech stack */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Stack technique
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Technologies{" "}
              <span className="text-gradient-purple">de pointe</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl">
              Un socle technique moderne, performant et évolutif pour un site
              qui dure dans le temps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm">{tech.name}</h3>
                      <span className="text-[10px] font-medium text-purple-bright bg-purple-bright/[0.06] px-2 py-0.5 rounded-full">
                        {tech.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Metrics */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Fonctionnalités
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
              Conçu pour{" "}
              <span className="text-gradient-purple">performer</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-bright/[0.08] flex items-center justify-center group-hover:bg-purple-bright/[0.15] transition-colors">
                    <f.icon className="w-5 h-5 text-purple-bright" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-purple-bright">{f.metric}</div>
                    <div className="text-[10px] text-muted-foreground">{f.metricLabel}</div>
                  </div>
                </div>
                <h3 className="font-bold text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Valeur ajoutée
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Bénéfices pour{" "}
              <span className="text-gradient-purple">RECACOR</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-white p-8 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <b.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight mb-2 group-hover:text-purple-deep transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pages overview */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Structure du site
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
              6 pages{" "}
              <span className="text-gradient-purple">optimisées</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pages.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={p.href} className="group block">
                  <div className="rounded-2xl border border-border bg-white p-6 h-full hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold group-hover:text-purple-deep transition-colors">
                        {p.name}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-purple-bright group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 text-center">
              Ce qui est inclus
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Design sur-mesure premium",
                "Animations Framer Motion",
                "Vidéo hero en fond",
                "Onboarding interactif",
                "Curseur custom",
                "Scroll progress bar",
                "Particules animées",
                "Parallax sur images",
                "Double carousel avis",
                "Carousel logos marques",
                "FAQ catégorisée",
                "Formulaire de contact avancé",
                "Blog avec catégories",
                "Carte de présence",
                "Compteurs animés",
                "100% responsive",
                "SEO optimisé",
                "Performance Lighthouse 95+",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-purple-glow shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
