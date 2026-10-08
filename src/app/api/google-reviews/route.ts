import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

export type { GoogleReview, PlaceData } from "@/lib/google-reviews";

// Le résultat est partagé et conservé 48 h dans getGoogleReviews.
export const revalidate = 172800;

export async function GET() {
  try {
    const data = await getGoogleReviews();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=172800, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("[google-reviews]", e);
    return NextResponse.json({ error: "Les avis Google sont temporairement indisponibles." }, {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
