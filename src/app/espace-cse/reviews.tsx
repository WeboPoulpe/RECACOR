import { ArrowUpRight, Star } from "lucide-react";
import { getGoogleReviews, type PlaceData } from "@/lib/google-reviews";

const mapsUrl = "https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès";
const reviewUrl = "https://g.page/r/CQgYeWa3dlAPEAE/review";

export async function CseGoogleReviews() {
  let data: PlaceData | null = null;
  try {
    data = await getGoogleReviews();
  } catch {
    // Aucun avis ni aucune note de remplacement : le lien Google reste accessible.
  }

  return (
    <section aria-labelledby="avis-cse-title" className="border-t border-slate-200 bg-[var(--recacor-paper)] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--recacor-blue)]">Avis Google</p>
            <h2 id="avis-cse-title" className="mt-3 font-heading text-4xl font-bold sm:text-5xl">L’expérience de nos clients au garage.</h2>
            {data && Number.isFinite(data.rating) && Number.isFinite(data.user_ratings_total) && (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Star className="size-5 fill-[var(--recacor-yellow)] text-[var(--recacor-night)]" aria-hidden="true" /><strong className="text-[var(--recacor-ink)]">{data.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/5</strong> sur {data.user_ratings_total} avis Google</p>
            )}
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--recacor-blue)] underline underline-offset-4">Consulter les avis sur Google<ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </div>
        {data?.reviews.length ? (
          <>
            <p className="mt-5 text-sm leading-6 text-slate-600">Une sélection d’avis publiés sur Google par les clients de Recacor.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.reviews.map((review) => (
                <figure key={`${review.author_name}:${review.text}`} className="flex flex-col rounded-xl border border-slate-200 border-t-4 border-t-[var(--recacor-yellow)] bg-white p-6">
                  <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--recacor-ink)]"><Star className="size-4 fill-[var(--recacor-yellow)]" aria-hidden="true" />{review.rating}/5</p>
                  <blockquote className="flex-1 whitespace-pre-line text-sm leading-7 text-slate-600">{review.text}</blockquote>
                  <figcaption className="mt-6 border-t border-slate-100 pt-4"><p className="text-sm font-semibold">{review.author_name}</p><p className="mt-1 text-xs text-slate-500">{review.relative_time_description}</p></figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : <p className="mt-5 text-sm leading-7 text-slate-600">Retrouvez les témoignages de nos clients directement sur la fiche Google du garage.</p>}
        <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--recacor-blue)] underline underline-offset-4">Laisser un avis Google<ArrowUpRight className="size-4" aria-hidden="true" /></a>
      </div>
    </section>
  );
}
