"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { grantConsent, denyConsent, hasConsent } from "@/lib/tracking";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    const consent = hasConsent();
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    grantConsent();
    setVisible(false);
  };

  const deny = () => {
    denyConsent();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          data-cursor-visible
          className="fixed bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-md z-[101]"
        >
          <div className="rounded-2xl bg-white border border-border shadow-2xl shadow-purple-deep/10 p-5 pb-20 lg:pb-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-bright/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-purple-bright" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">Cookies &amp; confidentialité</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser
                  notre trafic. Vous pouvez accepter ou refuser.
                </p>
                {details && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <p className="text-xs text-muted-foreground">
                      <strong>Essentiels :</strong> nécessaires au fonctionnement du site.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Analyse :</strong> Google Analytics pour mesurer l&apos;audience.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Marketing :</strong> Meta, Google Ads pour personnaliser la pub.
                    </p>
                    <Link
                      href="/confidentialite"
                      className="text-xs text-purple-bright hover:underline inline-block mt-1"
                    >
                      Politique de confidentialité →
                    </Link>
                  </div>
                )}
              </div>
              <button
                onClick={() => setVisible(false)}
                className="shrink-0 text-muted-foreground hover:text-foreground p-1"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={accept}
                className="w-full px-5 py-3 rounded-xl bg-purple-bright text-white font-bold text-sm hover:bg-purple-mid transition-colors shadow-sm"
              >
                Accepter tout
              </button>
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setDetails(!details)}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  {details ? "Masquer les détails" : "Personnaliser"}
                </button>
                <button
                  onClick={deny}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
