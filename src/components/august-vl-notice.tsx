"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Snowflake, SunMedium } from "lucide-react";
import { hasConsent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const AUGUST_NOTICE_STORAGE_KEY = "recacor_august_notice_seen_at";
const AUGUST_NOTICE_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const AUGUST_NOTICE_DELAY_MS = 4000;

function shouldSuppressAugustNotice() {
  if (typeof window === "undefined") return true;
  if (window.location.pathname === "/pause-fraicheur-aout") return true;

  const stored = window.localStorage.getItem(AUGUST_NOTICE_STORAGE_KEY);
  if (!stored) return false;

  const shownAt = Number(stored);
  if (!Number.isFinite(shownAt)) return false;

  return Date.now() - shownAt < AUGUST_NOTICE_COOLDOWN_MS;
}

function markAugustNoticeSeen() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUGUST_NOTICE_STORAGE_KEY, String(Date.now()));
}

export function AugustVlNoticeHeaderLink({ className }: { className?: string }) {
  return (
    <Link
      href="/pause-fraicheur-aout"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/90 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-amber-800 transition hover:border-amber-300 hover:bg-white hover:text-amber-900",
        className,
      )}
    >
      <SunMedium className="h-3.5 w-3.5" />
      Horaires d&apos;août
    </Link>
  );
}

export function AugustVlNoticePopover() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const openedRef = useRef(false);

  useEffect(() => {
    if (shouldSuppressAugustNotice()) return;

    const scheduleOpen = () => {
      if (openedRef.current || shouldSuppressAugustNotice()) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (shouldSuppressAugustNotice()) return;
        openedRef.current = true;
        setOpen(true);
        markAugustNoticeSeen();
      }, AUGUST_NOTICE_DELAY_MS);
    };

    if (hasConsent()) {
      scheduleOpen();
    } else {
      const onCookieClosed = () => scheduleOpen();
      window.addEventListener("recacor:cookie:closed", onCookieClosed);
      return () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        window.removeEventListener("recacor:cookie:closed", onCookieClosed);
      };
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-24 z-[108] rounded-[4px] border border-amber-200 bg-[linear-gradient(140deg,rgba(255,252,244,0.98)_0%,rgba(255,255,255,0.98)_48%,rgba(239,249,255,0.98)_100%)] p-4 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:right-6 sm:left-auto sm:w-[min(420px,calc(100vw-3rem))] sm:bottom-6"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.25)]">
              <SunMedium className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="pr-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--recacor-night)]">
                  Horaires d&apos;août
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Fermer l'information d'août"
                >
                  <span className="block text-base leading-none">×</span>
                </button>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                En août, l&apos;atelier VL ferme de <strong>12h à 14h</strong> et le{" "}
                <strong>samedi</strong>. Pour le poids lourd, appeler avant déplacement.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/pause-fraicheur-aout"
                  className="inline-flex items-center gap-2 rounded-[4px] border border-blue-200 bg-white px-3.5 py-2 text-sm font-black text-blue-800 transition hover:border-blue-300 hover:text-blue-900"
                  onClick={() => setOpen(false)}
                >
                  Voir le détail
                  <Snowflake className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 transition hover:text-slate-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function AugustVlNotice({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <div
        className={cn(
          "border border-amber-200/80 bg-[linear-gradient(105deg,rgba(255,248,230,0.96)_0%,rgba(255,255,255,0.98)_42%,rgba(239,249,255,0.98)_100%)] text-slate-900 shadow-[0_20px_48px_rgba(7,27,51,0.08)] backdrop-blur-sm",
          className,
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="flex items-start gap-3 leading-6">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.25)]">
              <SunMedium className="h-4 w-4" />
            </span>
            <span className="max-w-4xl">
              <span className="font-black text-[var(--recacor-night)]">Pause fraîcheur d&apos;août :</span>{" "}
              l&apos;atelier VL ferme de <strong>12h à 14h</strong> et le <strong>samedi</strong>{" "}
              pendant le mois d&apos;août. Pour le poids lourd, appeler le garage avant déplacement.
            </span>
          </p>
          <Link
            href="/pause-fraicheur-aout"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[4px] border border-blue-200 bg-white/80 px-4 py-2 font-black text-blue-800 transition hover:border-blue-300 hover:bg-white hover:text-blue-900"
          >
            Voir le détail
            <Snowflake className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-[4px] border border-amber-200 bg-gradient-to-br from-white via-amber-50 to-cyan-50 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            <SunMedium className="h-3.5 w-3.5" />
            Pause fraîcheur d&apos;août
          </p>
          <h2 className="mt-3 font-heading text-3xl font-black uppercase leading-none text-[var(--recacor-night)] sm:text-4xl">
            On garde l&apos;atelier frais, on vous reçoit au bon créneau.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
            En août, l&apos;atelier VL fait une pause de <strong>12h à 14h</strong> et
            reste <strong>fermé le samedi</strong>. Ce rythme temporaire nous aide à
            préserver l&apos;équipe pendant la chaleur et à garder une prise en charge
            plus confortable au garage.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Pour le poids lourd, la mécanique utilitaire et les demandes pro, le plus
            simple reste d&apos;appeler avant de venir afin de confirmer le bon créneau.
          </p>
        </div>

        <div className="min-w-[240px] rounded-[4px] border border-slate-200 bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-800">
            Horaires VL en août
          </p>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-4">
              <span>Lundi à vendredi</span>
              <strong>8h-12h · 14h-17h</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Samedi</span>
              <strong>Fermé</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Poids lourd</span>
              <strong>Appeler avant déplacement</strong>
            </div>
          </div>
          <Link
            href="/pause-fraicheur-aout"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
          >
            Voir la page info août
            <Snowflake className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
