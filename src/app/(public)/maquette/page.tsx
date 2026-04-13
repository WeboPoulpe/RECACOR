"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Smartphone,
  Search,
  BarChart3,
  Sparkles,
  Globe,
  Layers,
  CheckCircle,
  Eye,
  MousePointer2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Lang = "fr" | "es";

const t = {
  fr: {
    badge: "Présentation maquette",
    heroTitle: "Votre futur site web",
    heroHighlight: "RECACOR",
    heroSub: "Voici ce que nous avons préparé pour vous",
    heroDesc: "Naviguez sur cette maquette interactive pour découvrir le design, les fonctionnalités et les avantages de votre futur site vitrine.",
    ctaExplore: "Explorer le site",
    ctaContact: "Nous contacter",

    whatTitle: "C'est quoi",
    whatHighlight: "cette maquette ?",
    whatCards: [
      {
        icon: Eye,
        title: "Une prévisualisation réelle",
        desc: "Ce que vous voyez ici est exactement ce que vos clients verront. Ce n'est pas une image statique, c'est un vrai site web interactif que vous pouvez parcourir.",
      },
      {
        icon: MousePointer2,
        title: "Cliquez partout",
        desc: "Toutes les pages fonctionnent : accueil, services, centres, blog, contact. Naviguez comme si le site était déjà en ligne.",
      },
      {
        icon: Smartphone,
        title: "Testez sur mobile",
        desc: "Ouvrez ce lien sur votre téléphone. Le site s'adapte automatiquement à toutes les tailles d'écran.",
      },
    ],

    whyTitle: "Pourquoi ce site va",
    whyHighlight: "faire la différence",
    whyCards: [
      {
        icon: Sparkles,
        title: "Image premium",
        desc: "Un design professionnel et unique qui positionne RECACOR comme le leader du secteur. Vos clients ont confiance dès le premier regard.",
      },
      {
        icon: BarChart3,
        title: "Plus de clients",
        desc: "Des formulaires de contact et boutons d'appel placés stratégiquement sur chaque page pour transformer les visiteurs en clients.",
      },
      {
        icon: Search,
        title: "Visible sur Google",
        desc: "Le site est construit pour apparaître dans les premiers résultats Google quand vos clients cherchent un service pneumatique.",
      },
      {
        icon: TrendingUp,
        title: "Prêt à grandir",
        desc: "Le site peut évoluer facilement : ajout de nouvelles pages, espace client, réservation en ligne, nouveaux centres...",
      },
    ],

    numbersTitle: "Le site",
    numbersHighlight: "en chiffres",
    numbers: [
      { value: "6", label: "Pages complètes" },
      { value: "<1s", label: "Temps de chargement" },
      { value: "100%", label: "Adapté mobile" },
      { value: "40+", label: "Animations" },
    ],

    techTitle: "Sous le",
    techHighlight: "capot",
    techDesc: "Les technologies utilisées, expliquées simplement.",
    techItems: [
      { name: "Next.js", explain: "Le moteur du site. C'est comme le châssis d'un camion : c'est lui qui porte tout. Il rend le site ultra-rapide et bien référencé sur Google." },
      { name: "Tailwind CSS", explain: "L'outil de design. Il permet de créer un site unique et sur-mesure, pas un modèle générique qu'on retrouve partout." },
      { name: "Framer Motion", explain: "Ce qui fait que le site \"bouge\". Toutes les animations que vous voyez (apparitions au scroll, effets de survol, particules) viennent de là." },
      { name: "TypeScript", explain: "Un filet de sécurité pour le code. Il empêche les erreurs et garantit que le site fonctionne sans bugs." },
      { name: "Sharp", explain: "Un outil d'optimisation d'images. Vos photos chargent 10x plus vite sans perte de qualité visible." },
      { name: "Vercel", explain: "L'hébergement du site. Vos pages sont distribuées sur des serveurs dans le monde entier pour un chargement instantané." },
    ],

    pagesTitle: "Les pages",
    pagesHighlight: "du site",
    pages: [
      { name: "Accueil", href: "/", desc: "La vitrine principale avec vidéo, services, avis clients, partenaires" },
      { name: "Nos centres", href: "/nos-centres", desc: "Présentation détaillée de chaque centre : équipe, équipements, spécialités" },
      { name: "Poids lourd", href: "/poids-lourd", desc: "Page dédiée aux transporteurs et gestionnaires de flottes" },
      { name: "Particulier", href: "/particulier", desc: "Page dédiée aux automobilistes : services, avantages, tarifs" },
      { name: "Blog", href: "/blog", desc: "Articles de conseils et actualités pour montrer votre expertise" },
      { name: "Contact", href: "/contact", desc: "Formulaire de demande de devis et coordonnées de chaque centre" },
    ],

    includedTitle: "Tout ce qui est inclus",
    included: [
      "Design sur-mesure et unique",
      "Site interactif avec animations",
      "Vidéo en fond sur la page d'accueil",
      "Présentation à l'ouverture du site",
      "Adapté à tous les écrans (PC, tablette, mobile)",
      "Visible sur Google (SEO optimisé)",
      "Formulaire de contact avec types de demande",
      "Blog pour publier des articles",
      "Logos de vos marques partenaires",
      "Avis clients avec défilement automatique",
      "Carte de présence européenne",
      "Chargement ultra-rapide",
      "Compteurs animés (chiffres clés)",
      "Page de présentation des centres détaillée",
      "FAQ organisée par catégories",
      "Boutons d'appel et de prise de RDV",
      "Sécurisé (HTTPS)",
      "Prêt pour les évolutions futures",
    ],

    creditLabel: "Maquette réalisée par",
  },
  es: {
    badge: "Presentación maqueta",
    heroTitle: "Su futuro sitio web",
    heroHighlight: "RECACOR",
    heroSub: "Esto es lo que hemos preparado para usted",
    heroDesc: "Navegue por esta maqueta interactiva para descubrir el diseño, las funcionalidades y las ventajas de su futuro sitio web.",
    ctaExplore: "Explorar el sitio",
    ctaContact: "Contactarnos",

    whatTitle: "¿Qué es",
    whatHighlight: "esta maqueta?",
    whatCards: [
      {
        icon: Eye,
        title: "Una vista previa real",
        desc: "Lo que ve aquí es exactamente lo que verán sus clientes. No es una imagen estática, es un sitio web real e interactivo que puede recorrer.",
      },
      {
        icon: MousePointer2,
        title: "Haga clic en todo",
        desc: "Todas las páginas funcionan: inicio, servicios, centros, blog, contacto. Navegue como si el sitio ya estuviera en línea.",
      },
      {
        icon: Smartphone,
        title: "Pruebe en móvil",
        desc: "Abra este enlace en su teléfono. El sitio se adapta automáticamente a todos los tamaños de pantalla.",
      },
    ],

    whyTitle: "Por qué este sitio va a",
    whyHighlight: "marcar la diferencia",
    whyCards: [
      {
        icon: Sparkles,
        title: "Imagen premium",
        desc: "Un diseño profesional y único que posiciona a RECACOR como líder del sector. Sus clientes confían desde el primer vistazo.",
      },
      {
        icon: BarChart3,
        title: "Más clientes",
        desc: "Formularios de contacto y botones de llamada estratégicamente colocados en cada página para convertir visitantes en clientes.",
      },
      {
        icon: Search,
        title: "Visible en Google",
        desc: "El sitio está construido para aparecer en los primeros resultados de Google cuando sus clientes buscan un servicio de neumáticos.",
      },
      {
        icon: TrendingUp,
        title: "Listo para crecer",
        desc: "El sitio puede evolucionar fácilmente: nuevas páginas, área de clientes, reservas en línea, nuevos centros...",
      },
    ],

    numbersTitle: "El sitio",
    numbersHighlight: "en cifras",
    numbers: [
      { value: "6", label: "Páginas completas" },
      { value: "<1s", label: "Tiempo de carga" },
      { value: "100%", label: "Adaptado a móvil" },
      { value: "40+", label: "Animaciones" },
    ],

    techTitle: "Bajo el",
    techHighlight: "capó",
    techDesc: "Las tecnologías utilizadas, explicadas de forma sencilla.",
    techItems: [
      { name: "Next.js", explain: "El motor del sitio. Es como el chasis de un camión: lo sostiene todo. Hace que el sitio sea ultrarrápido y bien posicionado en Google." },
      { name: "Tailwind CSS", explain: "La herramienta de diseño. Permite crear un sitio único y a medida, no una plantilla genérica que se ve en todas partes." },
      { name: "Framer Motion", explain: "Lo que hace que el sitio \"se mueva\". Todas las animaciones que ve (apariciones al hacer scroll, efectos al pasar el ratón, partículas) vienen de aquí." },
      { name: "TypeScript", explain: "Una red de seguridad para el código. Evita errores y garantiza que el sitio funcione sin fallos." },
      { name: "Sharp", explain: "Una herramienta de optimización de imágenes. Sus fotos cargan 10 veces más rápido sin pérdida visible de calidad." },
      { name: "Vercel", explain: "El alojamiento del sitio. Sus páginas se distribuyen en servidores de todo el mundo para una carga instantánea." },
    ],

    pagesTitle: "Las páginas",
    pagesHighlight: "del sitio",
    pages: [
      { name: "Inicio", href: "/", desc: "La vitrina principal con vídeo, servicios, opiniones de clientes, socios" },
      { name: "Nuestros centros", href: "/nos-centres", desc: "Presentación detallada de cada centro: equipo, equipos, especialidades" },
      { name: "Vehículo pesado", href: "/poids-lourd", desc: "Página dedicada a transportistas y gestores de flotas" },
      { name: "Particular", href: "/particulier", desc: "Página dedicada a automovilistas: servicios, ventajas, tarifas" },
      { name: "Blog", href: "/blog", desc: "Artículos de consejos y noticias para mostrar su experiencia" },
      { name: "Contacto", href: "/contact", desc: "Formulario de solicitud de presupuesto y datos de contacto de cada centro" },
    ],

    includedTitle: "Todo lo que está incluido",
    included: [
      "Diseño a medida y único",
      "Sitio interactivo con animaciones",
      "Vídeo de fondo en la página de inicio",
      "Presentación al abrir el sitio",
      "Adaptado a todas las pantallas (PC, tablet, móvil)",
      "Visible en Google (SEO optimizado)",
      "Formulario de contacto con tipos de solicitud",
      "Blog para publicar artículos",
      "Logos de sus marcas asociadas",
      "Opiniones de clientes con desplazamiento automático",
      "Mapa de presencia europea",
      "Carga ultrarrápida",
      "Contadores animados (cifras clave)",
      "Página de presentación de centros detallada",
      "FAQ organizada por categorías",
      "Botones de llamada y de cita",
      "Seguro (HTTPS)",
      "Listo para futuras evoluciones",
    ],

    creditLabel: "Maqueta realizada por",
  },
};

export default function MaquettePage() {
  const [lang, setLang] = useState<Lang>("fr");
  const c = t[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Language switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <button
              onClick={() => setLang("fr")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                lang === "fr"
                  ? "bg-white text-purple-deep shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              )}
            >
              <span className="text-lg">🇫🇷</span> Français
            </button>
            <button
              onClick={() => setLang("es")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                lang === "es"
                  ? "bg-white text-purple-deep shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              )}
            >
              <span className="text-lg">🇪🇸</span> Español
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">{c.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl"
          >
            {c.heroTitle}{" "}
            <span className="text-purple-glow">{c.heroHighlight}</span>
            <br />
            <span className="text-xl sm:text-2xl font-bold text-white/60 mt-2 block">
              {c.heroSub}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed"
          >
            {c.heroDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow">
              {c.ctaExplore} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm hover:bg-white/10 transition-all">
              {c.ctaContact}
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* What is this */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              {c.whatTitle}{" "}
              <span className="text-gradient-purple">{c.whatHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.whatCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-white p-8 text-center hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-black tracking-tight mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-12">
            <h3 className="text-center text-white font-black text-2xl mb-8">
              {c.numbersTitle}{" "}
              <span className="text-purple-glow">{c.numbersHighlight}</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {c.numbers.map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-4xl sm:text-5xl font-black text-white">{n.value}</div>
                  <p className="text-white/50 text-sm mt-2">{n.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              {c.whyTitle}{" "}
              <span className="text-gradient-purple">{c.whyHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.whyCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-white p-8 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <card.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight mb-2 group-hover:text-purple-deep transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech explained */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              {c.techTitle}{" "}
              <span className="text-gradient-purple">{c.techHighlight}</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">{c.techDesc}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.techItems.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-bright/[0.08] mb-4">
                  <span className="font-black text-sm text-purple-bright">{tech.name}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tech.explain}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pages */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              {c.pagesTitle}{" "}
              <span className="text-gradient-purple">{c.pagesHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.pages.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Link href={p.href} className="group block">
                  <div className="rounded-2xl border border-border bg-white p-6 h-full hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg group-hover:text-purple-deep transition-colors">{p.name}</h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-purple-bright group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-10 text-center">
              {c.includedTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.included.map((item, i) => (
                <motion.div
                  key={i}
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

      {/* Credit */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            {c.creditLabel}{" "}
            <a
              href="https://webomax.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-bright hover:text-purple-mid font-semibold transition-colors"
            >
              WeboMax
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
