import { unstable_cache } from "next/cache";

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
const CACHE_SECONDS = 172800;

async function findPlaceId(): Promise<string> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", PLACE_NAME);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString(), { next: { revalidate: CACHE_SECONDS } });
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);
  const json = await res.json();
  const placeId = json.candidates?.[0]?.place_id;
  if (json.status !== "OK" || !placeId) {
    throw new Error(`${json.status ?? "UNKNOWN_ERROR"}: ${json.error_message ?? "Place introuvable"}`);
  }
  return placeId;
}

async function fetchReviews(placeId: string, sort: "most_relevant" | "newest") {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("language", "fr");
  url.searchParams.set("reviews_sort", sort);
  url.searchParams.set("key", API_KEY!);
  // Préserver la clé Data Cache déjà utilisée par le site.
  url.searchParams.set("cb", "20260827");

  const res = await fetch(url.toString(), { next: { revalidate: CACHE_SECONDS } });
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== "OK") {
    throw new Error(`${json.status}: ${json.error_message ?? "Google Places error"}`);
  }
  return json.result;
}

// La route publique et le rendu serveur CSE partagent le même résultat 48 h.
// Une exception ne devient jamais une valeur de remplacement mise en cache.
export const getGoogleReviews = unstable_cache(async (): Promise<PlaceData> => {
  if (!API_KEY) throw new Error("GOOGLE_PLACES_API_KEY manquant");
  const placeId = await findPlaceId();
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
  return {
    rating: relevant.rating,
    user_ratings_total: relevant.user_ratings_total,
    reviews,
  };
}, ["recacor-google-reviews"], { revalidate: CACHE_SECONDS });
