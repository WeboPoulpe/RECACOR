"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { GoogleReview, PlaceData } from "@/app/api/google-reviews/route";

type Review = GoogleReview & { time?: number; author_url?: string };
type ReviewsData = Omit<PlaceData, "reviews"> & { reviews: Review[] };
const googleProfileUrl = "https://g.page/r/CQgYeWa3dlAPEAE/";
// Avis et photo confirmés dans Google Business Profile le 07/10/2026.
// Témoignage Recacor : aucune attribution à Jérôme ou à une intervention à Lyon.
const avisPoidsLourd = {
  author: "Saïd Djae",
  rating: 5,
  date: "2026-06-17",
  text: "Merci a patrick et naim pour avoir été aussi réactif pour l'équilibrage du camion, des vrais professionnels",
};

export function AvisRecacorPl() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    // Endpoint commun au site, avec cache Google et CDN de 48 heures.
    fetch("/api/google-reviews", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Avis indisponibles");
        const result = await response.json();
        if (typeof result.rating !== "number" || result.rating < 1 || result.rating > 5 ||
            !Number.isInteger(result.user_ratings_total) || result.user_ratings_total < 1 ||
            !Array.isArray(result.reviews)) throw new Error("Avis incomplets");
        const reviews = result.reviews
          .filter((review: Review) => review && typeof review.author_name === "string" &&
            typeof review.text === "string" && review.text.trim() &&
            Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5 &&
            !/crès|cres|montpellier/i.test(review.text) &&
            review.author_name !== avisPoidsLourd.author)
          .sort((a: Review, b: Review) => (b.time ?? 0) - (a.time ?? 0))
          .slice(0, 2);
        if (!controller.signal.aborted) setData({ ...result, reviews });
      })
      .catch(() => { /* Le lien Google reste disponible, sans note par défaut. */ })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="avis-recacor-title" className="border-y border-border bg-white py-12 sm:py-16">
      <div className="recacor-shell">
        <p className="recacor-eyebrow">Avis clients Recacor</p>
        <h2 id="avis-recacor-title" className="recacor-title mt-3">Ils ont fait confiance à Recacor.</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Un retour sur une prestation poids lourd et une sélection d’avis récents de la fiche Google Recacor.</p>
        {data && <p className="mt-4 flex flex-wrap items-center gap-2 text-sm"><Star aria-hidden="true" className="h-5 w-5 fill-yellow-400 text-yellow-500" /><strong>{data.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5</strong><span>sur {data.user_ratings_total} avis Google · note de la fiche Recacor</span></p>}
        <figure className="mt-7 grid overflow-hidden rounded-[4px] border border-border lg:grid-cols-[240px_1fr]">
          <div className="bg-slate-50">
            <Image
              src="/images/avis-pl/said-djae-camion.jpg"
              alt="Photo du camion jointe par Saïd Djae à son avis Google Recacor"
              width={384}
              height={512}
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 320px, 100vw"
              className="mx-auto h-auto max-h-80 w-auto max-w-full object-contain"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Avis client Recacor</p>
            <h3 className="mt-3 font-heading text-2xl font-bold">Équilibrage d’un camion</h3>
            <p aria-label={`${avisPoidsLourd.rating} sur 5`} className="mt-4 flex gap-1">
              {Array.from({ length: avisPoidsLourd.rating }, (_, index) => <Star key={index} aria-hidden="true" className="h-4 w-4 fill-yellow-400 text-yellow-500" />)}
            </p>
            <blockquote className="mt-4 text-base leading-8">{avisPoidsLourd.text}</blockquote>
            <figcaption className="mt-5 text-sm">
              <strong>{avisPoidsLourd.author}</strong>
              <span className="mt-1 block text-xs text-muted-foreground">Avis Google du <time dateTime={avisPoidsLourd.date}>17 juin 2026</time> · Photo jointe à l’avis</span>
            </figcaption>
          </div>
        </figure>
        {loading && <p role="status" className="mt-4 text-sm text-muted-foreground">Chargement des avis Google…</p>}
        {data && data.reviews.length > 0 && <div className="mt-5 grid gap-5 md:grid-cols-2">{data.reviews.map((review) => <figure key={`${review.author_name}:${review.text}`} className="rounded-[4px] border border-border p-6"><p aria-label={`${review.rating} sur 5`} className="flex gap-1">{Array.from({ length: review.rating }, (_, index) => <Star key={index} aria-hidden="true" className="h-4 w-4 fill-yellow-400 text-yellow-500" />)}</p><blockquote className="mt-4 whitespace-pre-line text-sm leading-7">{review.text}</blockquote><figcaption className="mt-5 flex items-center gap-3 text-sm font-bold">
            {review.profile_photo_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={review.profile_photo_url} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 shrink-0 rounded-full" />
            )}
            <div>{review.author_url?.startsWith("https://www.google.com/maps/") ? <a href={review.author_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{review.author_name}</a> : review.author_name}<span className="mt-1 block text-xs font-normal text-muted-foreground">{review.time ? new Date(review.time * 1000).toLocaleDateString("fr-FR") : review.relative_time_description}</span></div></figcaption></figure>)}</div>}
        <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold text-blue-700 underline underline-offset-4">Voir les avis Recacor sur Google</a>
        <p translate="no" className="mt-4 whitespace-nowrap text-sm text-muted-foreground">Google Maps</p>
      </div>
    </section>
  );
}
