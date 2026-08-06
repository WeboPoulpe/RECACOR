"use client";

import Link from "next/link";
import { Snowflake, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

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
          "border-y border-amber-200 bg-gradient-to-r from-amber-50 via-white to-cyan-50 text-slate-900",
          className,
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex items-start gap-2 leading-6">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <SunMedium className="h-4 w-4" />
            </span>
            <span>
              <strong>Pause fraîcheur d&apos;août :</strong> l&apos;atelier VL ferme de{" "}
              <strong>12h à 14h</strong> et le <strong>samedi</strong> pendant le mois
              d&apos;août. Pour le poids lourd, appeler le garage avant déplacement.
            </span>
          </p>
          <Link
            href="/pause-fraicheur-aout"
            className="inline-flex shrink-0 items-center gap-2 font-bold text-blue-800 underline underline-offset-4 hover:text-blue-900"
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
