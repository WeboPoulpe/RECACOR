import { NextResponse } from "next/server";

export const revalidate = 86400; // 24h cache

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export interface PlaceData {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_NAME = "Recacor Le Crès";

async function findPlaceId(): Promise<string | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", PLACE_NAME);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString());
  const json = await res.json();
  return json.candidates?.[0]?.place_id ?? null;
}

async function fetchReviews(placeId: string, sort: "most_relevant" | "newest") {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("language", "fr");
  url.searchParams.set("reviews_sort", sort);
  url.searchParams.set("key", API_KEY!);
  // Param ignoré par Google : sa seule fonction est de renouveler la clé du
  // Data Cache Vercel (qui survit aux redéploiements) après suppression d'un avis.
  url.searchParams.set("cb", "20260827");

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  const json = await res.json();

  if (json.status !== "OK") {
    throw new Error(`${json.status}: ${json.error_message ?? "Google Places error"}`);
  }

  return json.result;
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "GOOGLE_PLACES_API_KEY manquant" }, { status: 500 });
  }

  try {
    const placeId = await findPlaceId();
    if (!placeId) {
      return NextResponse.json({ error: "Place introuvable" }, { status: 502 });
    }

    const [relevant, newest] = await Promise.all([
      fetchReviews(placeId, "most_relevant"),
      fetchReviews(placeId, "newest"),
    ]);

    const relevantReviews = (relevant.reviews ?? []).filter((r: GoogleReview) => r.text?.trim());
    const newestReviews = (newest.reviews ?? []).filter((r: GoogleReview) => r.text?.trim());
    const seen = new Set<string>();
    const reviews = [...relevantReviews.slice(0, 3), ...newestReviews]
      .filter((review: GoogleReview) => {
        const key = `${review.author_name}:${review.text}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 5);

    const data: PlaceData = {
      rating: relevant.rating,
      user_ratings_total: relevant.user_ratings_total,
      reviews,
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("[google-reviews]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
