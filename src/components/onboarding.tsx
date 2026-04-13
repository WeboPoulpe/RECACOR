"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Truck, Shield, MapPin, X } from "lucide-react";

const slides = [
  {
    badge: "Présentation maquette",
    title: "Site vitrine RECACOR",
    subtitle: "Proposition de maquette interactive",
    description:
      "Vous naviguez sur la maquette du futur site RECACOR. Découvrez le design, les animations et les fonctionnalités prévues.",
    icon: "🎨",
    gradient: "from-purple-deep via-purple-mid to-purple-bright",
  },
  {
    badge: "Technologie",
    title: "Next.js + Framer Motion",
    subtitle: "Performance & animations premium",
    description:
      "Construit avec les dernières technologies web : chargement ultra-rapide, animations fluides, SEO optimisé, 100% responsive.",
    icon: "⚡",
    gradient: "from-purple-mid via-purple-bright to-purple-light",
  },
  {
    badge: "Contenu",
    title: "6 pages complètes",
    subtitle: "Accueil · Centres · PL · Particulier · Blog · Contact",
    description:
      "Chaque page est pensée pour convertir les visiteurs en clients, avec des CTAs stratégiques et un parcours utilisateur optimisé.",
    icon: "📄",
    gradient: "from-purple-bright via-purple-mid to-purple-deep",
  },
  {
    badge: "Détails",
    title: "Page /maquette",
    subtitle: "Stack technique & bénéfices détaillés",
    description:
      "Retrouvez toutes les infos techniques, les fonctionnalités et les bénéfices business sur la page dédiée accessible depuis le menu.",
    icon: "📋",
    gradient: "from-purple-deep via-purple-bright to-purple-light",
  },
];

export function Onboarding() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("recacor-onboarding-seen");
    if (!seen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const close = () => {
    setClosing(true);
    document.body.style.overflow = "";
    sessionStorage.setItem("recacor-onboarding-seen", "1");
    setTimeout(() => setVisible(false), 500);
  };

  const next = () => {
    if (active < slides.length - 1) {
      setActive(active + 1);
    } else {
      close();
    }
  };

  if (!visible) return null;

  const slide = slides[active];

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-cursor-visible
          className="fixed inset-0 z-[10000] flex items-center justify-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={close} />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[90vw] max-w-lg z-10"
          >
            {/* Skip button */}
            <button
              onClick={close}
              className="absolute -top-12 right-0 text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              Passer <X className="h-4 w-4" />
            </button>

            <div className={`rounded-3xl bg-gradient-to-br ${slide.gradient} p-8 sm:p-10 overflow-hidden relative`}>
              {/* Background decorations */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
                  }}
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-28 h-28 border border-white/5 rounded-full"
              />

              {/* Content */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white/80 text-xs font-medium tracking-wider uppercase border border-white/10">
                      {slide.badge}
                    </span>

                    {/* Icon */}
                    <div className="mt-6 text-6xl">{slide.icon}</div>

                    {/* Title */}
                    <h2 className="mt-4 text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-purple-glow font-semibold text-sm mt-1">
                      {slide.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-white/60 leading-relaxed text-sm">
                      {slide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                        style={{ width: i === active ? 32 : 8 }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full" />
                        {i === active && (
                          <motion.div
                            className="absolute inset-0 bg-white rounded-full"
                            layoutId="onboarding-dot"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Next / Start button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow"
                  >
                    {active === slides.length - 1 ? "Découvrir" : "Suivant"}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
