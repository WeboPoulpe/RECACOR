"use client";

import { useEffect, useState } from "react";
import { Phone, ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_NUMBER, PHONE_PL_SUIVI, PHONE_WHATSAPP_PL, PHONE_WHATSAPP_PL_ETRANGER, isFrenchPlCallPage, isPlTrackingPage, pushPhoneClick } from "@/lib/tracking";

export function StickyCallButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Pages PL (trafic Google Ads d'intervention, surtout mobile) : bouton affiché dès l'arrivée.
  // Le bouton appelle la même ligne que le reste de la page : Patrick sur les pages PL françaises
  // (jamais le fixe de l'atelier), Rubén sur la page roumaine.
  const isRomanianPlPage = pathname === "/ro/depannage-poids-lourd-urgence";
  const isPlPage = isRomanianPlPage || isFrenchPlCallPage(pathname) || pathname.startsWith("/pneus-utilitaires-pl");
  const phoneNumber = isRomanianPlPage
    ? PHONE_WHATSAPP_PL_ETRANGER
    : isPlTrackingPage(pathname)
      ? PHONE_PL_SUIVI
      : isFrenchPlCallPage(pathname)
        ? PHONE_WHATSAPP_PL
        : PHONE_NUMBER;

  const isControleTechniquePage =
    pathname === "/services/prise-en-charge-controle-technique" ||
    pathname === "/formulaire/controle-technique" ||
    pathname === "/es/servicios/control-tecnico-recacor";

  const isSpanishControlPage = pathname === "/es/servicios/control-tecnico-recacor";

  const quoteHref = isSpanishControlPage
    ? "/es/servicios/control-tecnico-recacor#devis"
    : isControleTechniquePage
      ? "/formulaire/controle-technique"
    : isPlPage
      ? "#devis"
    : "/formulaire";
  const quoteLabel = isSpanishControlPage
    ? "Presupuesto CT"
    : isControleTechniquePage
      ? "Devis CT"
      : "Devis gratuit";

  useEffect(() => {
    const onScroll = () => {
      // Ne jamais recouvrir un formulaire en cours de saisie.
      const forms = document.querySelectorAll<HTMLElement>("form[data-recacor-form]");
      const viewportHeight = window.innerHeight;
      const formOnScreen = Array.from(forms).some((form) => {
        const rect = form.getBoundingClientRect();
        return rect.top < viewportHeight && rect.bottom > 0;
      });
      setVisible((isPlPage || window.scrollY > 600) && !formOnScreen);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isPlPage]);

  return (
    visible && (
        <div className="recacor-sticky-in lg:hidden fixed bottom-4 left-4 right-4 z-[100] flex gap-3">
          <a
            id="sticky-call-btn"
            href={`tel:${phoneNumber}`}
            onClick={() => pushPhoneClick("sticky", isPlPage ? "pl" : undefined)}
            className="phone-link flex-1 flex items-center justify-center gap-2 rounded-[4px] bg-[var(--recacor-night)] text-white font-black uppercase py-4 shadow-[0_8px_30px_rgba(7,27,51,0.24)]"
          >
            <Phone className="h-5 w-5" />
            Appeler
          </a>
          <Link
            href={quoteHref}
            className="flex-1 flex items-center justify-center gap-2 rounded-[4px] bg-yellow-400 text-slate-950 font-black uppercase py-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-yellow-500/30"
          >
            <ClipboardList className="h-5 w-5" />
            {quoteLabel}
          </Link>
        </div>
    )
  );
}
