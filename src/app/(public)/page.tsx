"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Truck,
  Car,
  MapPin,
  Phone,
  Clock,
  Star,
  ChevronDown,
  Globe,
  Shield,
  Award,
  Users,
  Mail,
  Play,
} from "lucide-react";
import {
  MotionDiv,
  MotionSection,
  fadeUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/components/motion";
import { Counter } from "@/components/counter";
import React, { useState } from "react";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";

/* ─────────────────── HERO ─────────────────── */

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80",
    alt: "Pneus poids lourd",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    alt: "Mécanicien automobile",
  },
  {
    src: "https://images.unsplash.com/photo-1449965408869-ebd3fee7260d?w=800&q=80",
    alt: "Camion sur route",
  },
];

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function HeroSection() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />

      {/* Animated mesh background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-[140%] h-[140%] opacity-[0.07]"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg, transparent 0%, white 2%, transparent 4%)",
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="20%" size={4} />
      <FloatingParticle delay={1} x="25%" y="70%" size={6} />
      <FloatingParticle delay={0.5} x="70%" y="15%" size={3} />
      <FloatingParticle delay={2} x="85%" y="60%" size={5} />
      <FloatingParticle delay={1.5} x="50%" y="85%" size={4} />
      <FloatingParticle delay={0.8} x="15%" y="50%" size={3} />
      <FloatingParticle delay={2.5} x="90%" y="30%" size={5} />
      <FloatingParticle delay={1.2} x="40%" y="10%" size={4} />

      {/* Glowing orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-light/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/6 w-72 h-72 bg-purple-bright/15 rounded-full blur-[100px]"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium tracking-wider uppercase backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Depuis 1989 &mdash; Réseau national
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="mt-8 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-white leading-[1.1] tracking-tight"
            >
              Leader en maintenance de{" "}
              <span className="relative inline-block">
                <span className="relative z-10">pneumatiques</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 right-0 h-3 bg-purple-light/30 -rotate-1 origin-left"
                />
              </span>{" "}
              pour flottes et particuliers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed"
            >
              RECACOR vous accompagne dans l&apos;entretien et la maintenance de
              vos pneumatiques avec un réseau de centres sur tout le territoire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/nos-centres"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm overflow-hidden transition-shadow hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-glow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Découvrir nos centres</span>
                <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                Nous contacter
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-14 flex gap-10"
            >
              {[
                { value: "35+", label: "Années d'expérience" },
                { value: "2k+", label: "Clients satisfaits" },
                { value: "4", label: "Centres en France" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main image */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-deep/50 aspect-[4/3]"
              >
                <Image
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/40 to-transparent" />
              </motion.div>

              {/* Floating small image - top right */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-8 -right-8 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white/10"
              >
                <Image
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="144px"
                />
              </motion.div>

              {/* Floating small image - bottom left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-44 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white/10"
              >
                <Image
                  src={heroImages[2].src}
                  alt={heroImages[2].alt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="176px"
                />
              </motion.div>

              {/* Decorative badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
                className="absolute -bottom-4 right-8 bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-purple-bright/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-bright" />
                </div>
                <div>
                  <div className="text-sm font-bold text-purple-deep">Certifié</div>
                  <div className="text-xs text-muted-foreground">Normes EU</div>
                </div>
              </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-purple-light/10 to-purple-bright/5 rounded-[2rem] blur-sm" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── TRAJECTOIRE ─────────────────── */
function TrajectoireSection() {
  const milestones = [
    {
      year: "1989",
      title: "La genèse",
      text: "Fondation de RECACOR avec un seul atelier et une ambition : révolutionner la maintenance pneumatique sur le territoire français.",
      icon: "🔧",
    },
    {
      year: "2000",
      title: "L'expansion",
      text: "Ouverture de nos premiers centres multi-sites. Le réseau RECACOR prend forme et gagne la confiance de centaines de professionnels.",
      icon: "🏗️",
    },
    {
      year: "2015",
      title: "Le rayonnement",
      text: "Déploiement national et partenariats avec les plus grandes marques de pneumatiques. Notre expertise traverse les frontières.",
      icon: "🚀",
    },
    {
      year: "2024",
      title: "Le leadership",
      text: "Reconnu comme leader du secteur avec +2 000 clients fidèles, 4 centres stratégiques et une présence internationale en construction.",
      icon: "👑",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-bright/[0.03] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Notre histoire
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              35 ans de passion,<br />
              <span className="text-gradient-purple">une trajectoire unique</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              De l&apos;atelier familial au réseau national, chaque étape a
              forgé notre expertise et renforcé notre engagement envers nos clients.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-purple-bright via-purple-light to-purple-bright origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" as const }}
                className="group relative"
              >
                {/* Dot on timeline */}
                <div className="relative flex items-center gap-4 lg:flex-col lg:items-start mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.15, type: "spring", stiffness: 300 }}
                    className="relative z-10 flex items-center justify-center w-[104px] h-[104px] shrink-0"
                  >
                    {/* Outer ring animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-bright/20 group-hover:border-purple-bright/40 transition-colors duration-500" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, transparent 80%, rgba(109,40,217,0.3) 100%)",
                      }}
                    />
                    {/* Inner circle */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-bright to-purple-mid flex flex-col items-center justify-center shadow-lg shadow-purple-bright/20 group-hover:shadow-purple-bright/40 transition-shadow duration-500">
                      <span className="text-2xl leading-none mb-0.5">{m.icon}</span>
                      <span className="text-xs font-bold text-white/90">{m.year}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content card */}
                <div className="relative rounded-2xl border border-border bg-white p-6 h-full group-hover:border-purple-bright/30 group-hover:shadow-xl group-hover:shadow-purple-bright/[0.06] transition-all duration-500">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-bright/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-purple-bright bg-purple-bright/10 px-2.5 py-1 rounded-full tracking-wide">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold mb-2 group-hover:text-purple-deep transition-colors font-[family-name:var(--font-heading)] tracking-tight">
                      {m.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed tracking-wide">
                      {m.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <Link
            href="/nos-centres"
            className="group inline-flex items-center gap-3 text-purple-bright hover:text-purple-mid text-sm font-semibold transition-colors"
          >
            Découvrir tous nos centres
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── SERVICES ─────────────────── */
function ServicesSection() {
  const services = [
    {
      title: "Flottes industrielles & transport",
      description:
        "Maintenance préventive et curative des pneumatiques pour vos flottes poids lourds et utilitaires. Intervention sur site, gestion de parc et suivi personnalisé.",
      icon: Truck,
      href: "/poids-lourd",
      features: ["Intervention 24h/24", "Gestion de parc", "Suivi digital"],
    },
    {
      title: "Professionnels & artisans",
      description:
        "Solutions adaptées aux véhicules utilitaires légers et flottes de professionnels. Contrats sur-mesure et tarifs préférentiels.",
      icon: Shield,
      href: "/poids-lourd",
      features: ["Contrats sur-mesure", "Tarifs pro", "Multi-marques"],
    },
    {
      title: "Particuliers & auto",
      description:
        "Entretien et remplacement de pneumatiques pour votre véhicule personnel. Avec ou sans rendez-vous, toutes marques.",
      icon: Car,
      href: "/particulier",
      features: ["Sans rendez-vous", "Toutes marques", "Devis gratuit"],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Title + cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
                Nos expertises
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                Des solutions pour{" "}
                <span className="text-gradient-purple">chaque besoin</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-md">
                Que vous soyez transporteur, artisan ou particulier, RECACOR a
                la solution pneumatique qu&apos;il vous faut.
              </p>
            </motion.div>

            {/* Service cards stacked */}
            <div className="space-y-4">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" as const }}
                >
                  <Link href={s.href} className="group block">
                    <div className="relative rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-400 overflow-hidden">
                      {/* Hover gradient bar left */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-bright/0 group-hover:bg-gradient-to-b group-hover:from-purple-bright group-hover:to-purple-light transition-all duration-300" />

                      <div className="flex gap-5">
                        {/* Icon */}
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <s.icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-base font-bold tracking-tight group-hover:text-purple-deep transition-colors">
                              {s.title}
                            </h3>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-bright group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            {s.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {s.features.map((f) => (
                              <span
                                key={f}
                                className="text-xs font-medium text-purple-bright/80 bg-purple-bright/[0.06] px-2.5 py-1 rounded-full"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block sticky top-32"
          >
            <ScrollVideo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Video component that plays on scroll */
function ScrollVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.1 && v < 0.9) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95]);

  return (
    <div ref={containerRef}>
      <motion.div
        style={{ y, scale }}
        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-deep/20 border border-border"
      >
        {/* Decorative frame */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-bright/20 via-transparent to-purple-light/20 z-10 pointer-events-none" />

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full aspect-[9/14] object-cover"
        >
          <source src="/VIDEO/animation transition.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring" }}
        className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-border flex items-center gap-3 z-20"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center">
          <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
        </div>
        <div>
          <div className="text-sm font-bold">Notre savoir-faire</div>
          <div className="text-xs text-muted-foreground">en action</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────── PROFESSIONNALISME + STATS ─────────────────── */
function ProfessionnalismeSection() {
  const stats = [
    { value: 4, suffix: "", label: "Centres en France" },
    { value: 8, suffix: "+", label: "Marques partenaires" },
    { value: 2282, suffix: "+", label: "Clients satisfaits" },
    { value: 11, suffix: "+", label: "Années d'expérience" },
  ];

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <MotionDiv variants={fadeUp}>
            <Badge className="bg-purple-bright/10 text-purple-light border-purple-bright/20 mb-6">
              Notre engagement
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Professionnalisme{" "}
              <span className="text-gradient-purple">et qualité</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chez RECACOR, nous mettons un point d&apos;honneur à offrir un
              service de qualité supérieure. Nos techniciens certifiés utilisent
              les dernières technologies pour garantir votre sécurité.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chaque intervention est réalisée selon des protocoles stricts,
              avec des équipements de pointe et des pièces de qualité.
            </p>
          </MotionDiv>

          <MotionDiv variants={fadeUp} custom={2}>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-deep to-purple-mid p-8 min-h-[280px] flex items-center justify-center">
              <div className="absolute inset-0 opacity-5">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
                  }}
                />
              </div>
              <div className="relative text-center">
                <Award className="w-16 h-16 text-purple-glow mx-auto mb-4" />
                <p className="text-white text-xl font-semibold">
                  Certifié & Agréé
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Normes européennes respectées
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Stats bar */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <MotionDiv key={stat.label} variants={fadeUp} custom={i}>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── NOS CENTRES ─────────────────── */
function CentresSection() {
  const centres = [
    {
      name: "Bordeaux",
      address: "Zone industrielle, 33000 Bordeaux",
      phone: "05 XX XX XX XX",
      hours: "Lun-Ven : 8h-18h",
    },
    {
      name: "Béziers",
      address: "Zone d'activité, 34500 Béziers",
      phone: "04 XX XX XX XX",
      hours: "Lun-Ven : 8h-18h",
    },
    {
      name: "Montpellier",
      address: "Parc d'activité, 34000 Montpellier",
      phone: "04 XX XX XX XX",
      hours: "Lun-Ven : 8h-18h",
    },
  ];

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-muted"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv variants={fadeUp} className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Nos centres</h2>
        </MotionDiv>
        <MotionDiv variants={fadeUp} custom={1} className="flex justify-center mb-12">
          <Separator className="w-16 bg-purple-bright h-1 rounded-full" />
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {centres.map((c, i) => (
            <MotionDiv
              key={c.name}
              variants={fadeUp}
              custom={i}
              className="group"
            >
              <div className="rounded-2xl border border-border bg-background p-6 hover:border-purple-bright/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-bright/5">
                {/* Image placeholder */}
                <div className="relative h-44 rounded-xl mb-5 overflow-hidden bg-gradient-to-br from-purple-deep/30 to-purple-mid/20 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-purple-light/40" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">
                  {c.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-purple-bright shrink-0" />
                    {c.address}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-purple-bright shrink-0" />
                    {c.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-purple-bright shrink-0" />
                    {c.hours}
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── MARQUES DE CONFIANCE ─────────────────── */
function MarquesSection() {
  const marques = [
    "Michelin",
    "Bridgestone",
    "Continental",
    "Goodyear",
    "Pirelli",
    "Hankook",
    "Dunlop",
    "Firestone",
  ];

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv variants={fadeUp} className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Marques de confiance
          </h2>
        </MotionDiv>
        <MotionDiv variants={fadeUp} custom={1} className="flex justify-center mb-12">
          <Separator className="w-16 bg-purple-bright h-1 rounded-full" />
        </MotionDiv>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {marques.map((m, i) => (
            <MotionDiv
              key={m}
              variants={fadeIn}
              custom={i}
              className="flex items-center justify-center h-20 rounded-xl border border-border bg-card hover:border-purple-bright/30 transition-colors"
            >
              <span className="text-muted-foreground font-semibold text-sm tracking-wider uppercase">
                {m}
              </span>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── AVIS CLIENTS ─────────────────── */
function AvisSection() {
  const avis = [
    {
      name: "Jean-Pierre M.",
      role: "Transporteur",
      text: "Service impeccable, les techniciens sont très professionnels. Je recommande vivement RECACOR pour la gestion de ma flotte.",
      rating: 5,
    },
    {
      name: "Sophie L.",
      role: "Particulier",
      text: "Accueil chaleureux et travail de qualité. Mon véhicule est entre de bonnes mains. Prix très compétitifs.",
      rating: 5,
    },
    {
      name: "Marc D.",
      role: "Artisan",
      text: "Réactivité et expertise au rendez-vous. RECACOR comprend les contraintes des professionnels. Service rapide et fiable.",
      rating: 5,
    },
  ];

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-muted"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv variants={fadeUp} className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Avis clients</h2>
        </MotionDiv>
        <MotionDiv variants={fadeUp} custom={1} className="flex justify-center mb-12">
          <Separator className="w-16 bg-purple-bright h-1 rounded-full" />
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {avis.map((a, i) => (
            <MotionDiv key={a.name} variants={fadeUp} custom={i}>
              <div className="rounded-2xl border border-border bg-background p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: a.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-purple-bright text-purple-bright"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{a.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.role}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── PRESENCE INTERNATIONALE ─────────────────── */
function PresenceSection() {
  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv variants={fadeUp} className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Une présence internationale
          </h2>
        </MotionDiv>
        <MotionDiv variants={fadeUp} custom={1} className="flex justify-center mb-12">
          <Separator className="w-16 bg-purple-bright h-1 rounded-full" />
        </MotionDiv>

        <MotionDiv
          variants={fadeUp}
          custom={2}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-deep/20 to-purple-mid/10 border border-border p-8 sm:p-12 flex flex-col items-center"
        >
          {/* Simplified Europe Map representation */}
          <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
            <Globe className="w-32 h-32 text-purple-bright/30" strokeWidth={0.8} />
            {/* Dots representing presence */}
            <div className="absolute top-[35%] left-[42%] w-3 h-3 rounded-full bg-purple-bright glow-purple" />
            <div className="absolute top-[40%] left-[48%] w-3 h-3 rounded-full bg-purple-bright glow-purple" />
            <div className="absolute top-[50%] left-[45%] w-3 h-3 rounded-full bg-purple-bright glow-purple" />
            <div className="absolute top-[32%] left-[50%] w-2 h-2 rounded-full bg-purple-light/50" />
            <div className="absolute top-[45%] left-[55%] w-2 h-2 rounded-full bg-purple-light/50" />
            <div className="absolute top-[55%] left-[52%] w-2 h-2 rounded-full bg-purple-light/50" />
          </div>
          <p className="text-muted-foreground text-center max-w-md mt-6">
            RECACOR étend son réseau à travers l&apos;Europe pour offrir un
            service de proximité à tous ses clients.
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── CONTACT CTA ─────────────────── */
function ContactSection() {
  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MotionDiv variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Contactez-nous
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Besoin d&apos;un devis ou d&apos;un renseignement ? Notre équipe est à
              votre disposition pour répondre à toutes vos questions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="h-5 w-5 text-purple-glow" />
                <span>05 XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="h-5 w-5 text-purple-glow" />
                <span>contact@recacor.fr</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-purple-glow" />
                <span>France & Europe</span>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv variants={fadeUp} custom={2}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nom"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                  />
                  <Input
                    placeholder="Prénom"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                />
                <Input
                  type="tel"
                  placeholder="Téléphone"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                />
                <textarea
                  rows={4}
                  placeholder="Votre message..."
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                />
                <Button className="w-full bg-white text-purple-deep hover:bg-white/90 font-semibold h-11">
                  Envoyer le message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── FAQ ─────────────────── */
function FAQSection() {
  const faqs = [
    {
      q: "Quels types de véhicules prenez-vous en charge ?",
      a: "Nous prenons en charge tous types de véhicules : poids lourds, utilitaires, véhicules de tourisme, engins agricoles et industriels.",
    },
    {
      q: "Proposez-vous un service sans rendez-vous ?",
      a: "Oui, la plupart de nos centres acceptent les clients sans rendez-vous. Nous recommandons toutefois de prendre rendez-vous pour les flottes.",
    },
    {
      q: "Quelles marques de pneumatiques proposez-vous ?",
      a: "Nous travaillons avec toutes les grandes marques : Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook et bien d'autres.",
    },
    {
      q: "Proposez-vous des contrats de maintenance pour les flottes ?",
      a: "Oui, nous proposons des contrats sur-mesure adaptés à la taille de votre flotte et à vos besoins spécifiques.",
    },
  ];

  return <FAQInner faqs={faqs} />;
}

function FAQInner({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-muted"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <MotionDiv variants={fadeUp} className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">FAQ</h2>
        </MotionDiv>
        <MotionDiv variants={fadeUp} custom={1} className="flex justify-center mb-12">
          <Separator className="w-16 bg-purple-bright h-1 rounded-full" />
        </MotionDiv>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <MotionDiv key={i} variants={fadeUp} custom={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left rounded-xl border border-border bg-background p-5 hover:border-purple-bright/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      open === i && "rotate-180"
                    )}
                  />
                </div>
                {open === i && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </button>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrajectoireSection />
      <ServicesSection />
      <ProfessionnalismeSection />
      <CentresSection />
      <MarquesSection />
      <AvisSection />
      <PresenceSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
