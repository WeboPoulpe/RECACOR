"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  grantConsent,
  denyConsent,
  getOrCreateCookieBannerVariant,
  hasConsent,
  syncStoredConsentIntegrations,
  trackCookieBannerImpression,
  trackCookieCustomizeOpen,
  type CookieBannerVariant,
} from "@/lib/tracking";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [variant] = useState<CookieBannerVariant>(() => getOrCreateCookieBannerVariant());
  const impressionTrackedRef = useRef(false);
  const previewRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).has("cookiePreview")) {
      previewRef.current = true;
      const previewTimer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(previewTimer);
    }

    const consent = hasConsent();
    if (consent === "granted") {
      syncStoredConsentIntegrations();
    }

    const timer = !consent ? window.setTimeout(() => setVisible(true), 0) : null;
    const handler = () => setVisible(true);
    window.addEventListener("recacor:cookie", handler);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      window.removeEventListener("recacor:cookie", handler);
    };
  }, []);

  useEffect(() => {
    if (!visible || impressionTrackedRef.current || previewRef.current) return;
    trackCookieBannerImpression(variant);
    impressionTrackedRef.current = true;
  }, [variant, visible]);

  useEffect(() => {
    if (!visible) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Le dialogue natif bloque aussi les interactions au clavier avec la page.
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const closeBanner = () => {
    setVisible(false);
    setDetails(false);
    impressionTrackedRef.current = false;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("recacor:cookie:closed"));
    }
  };

  const accept = () => { if (!previewRef.current) grantConsent(variant); closeBanner(); };
  const deny = () => { if (!previewRef.current) denyConsent(variant); closeBanner(); };
  const isCentered = variant === "center";

  return (
    visible && (
      <dialog
        ref={dialogRef}
        tabIndex={-1}
        className={`recacor-cookie-pop outline-none ${isCentered ? "recacor-cookie-pop--center" : "recacor-cookie-pop--bottom"}`}
        aria-modal="true"
        aria-labelledby="recacor-cookie-title"
        onCancel={(event) => event.preventDefault()}
      >
        <div className="recacor-cookie-pop__card">
          <div className="recacor-cookie-pop__head">
            <span className="recacor-cookie-pop__wheel" aria-hidden="true">
              <Image src="/images/cookie-tire-recacor.png" alt="" width={56} height={58} priority />
            </span>
            <div>
              <p className="recacor-cookie-pop__eyebrow">Cookies</p>
              <h2 id="recacor-cookie-title" className="font-heading text-lg font-black uppercase leading-tight text-white">
                On prend soin de vous
              </h2>
            </div>
          </div>
          <div>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Comme pour vos pneus, on s&apos;assure que tout roule. Ce site utilise des
              cookies essentiels, de mesure d&apos;audience et publicitaires.
            </p>
            {details && (
              <div className="recacor-cookie-pop__details">
                <p className="text-xs leading-relaxed text-white/70">
                  <strong className="text-white">Essentiels</strong> — nécessaires au fonctionnement du site.
                </p>
                <p className="text-xs leading-relaxed text-white/70">
                  <strong className="text-white">Analyse</strong> — Google Analytics pour mesurer l&apos;audience.
                </p>
                <p className="text-xs leading-relaxed text-white/70">
                  <strong className="text-white">Marketing</strong> — Meta Pixel, TikTok, Snapchat pour des publicités pertinentes.
                </p>
                <Link href="/confidentialite" className="text-xs font-bold text-yellow-400 hover:underline">
                  Politique de confidentialité →
                </Link>
              </div>
            )}
            <div className="recacor-cookie-pop__actions">
              <button type="button" onClick={deny} className="recacor-cookie-pop__btn recacor-cookie-pop__btn--deny">
                Continuer sans accepter
              </button>
              <button type="button" onClick={accept} className="recacor-cookie-pop__btn recacor-cookie-pop__btn--accept">
                Accepter et continuer
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = !details;
                  if (next && !previewRef.current) trackCookieCustomizeOpen(variant);
                  setDetails(next);
                }}
                className="recacor-cookie-pop__customize"
              >
                {details ? "Masquer les détails" : "Personnaliser"}
              </button>
            </div>
          </div>
          <span className="recacor-cookie-pop__tread" aria-hidden="true" />
        </div>
      </dialog>
    )
  );
}
