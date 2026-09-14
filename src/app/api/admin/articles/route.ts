import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { listArticles, writeArticle } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await listArticles();
    return NextResponse.json({ articles });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { slug, raw } = (await req.json()) as { slug: string; raw: string };
    if (!slug || !raw) {
      return NextResponse.json({ error: "slug et raw requis" }, { status: 400 });
    }
    await writeArticle(slug, raw);
    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

/** Pause every future blog publication without touching published articles or drafts. */
export async function PATCH(req: Request) {
  try {
    const { action } = (await req.json()) as { action?: string };
    if (action !== "pause-scheduled") {
      return NextResponse.json({ error: "action inconnue" }, { status: 400 });
    }

    const { sql } = await import("@/lib/db");
    const paused = await sql`
      UPDATE articles
      SET status = 'draft', publish_at = NULL, updated_at = NOW()
      WHERE status = 'scheduled'
      RETURNING slug
    ` as { slug: string }[];

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/api/public/articles/recent");
    for (const { slug } of paused) {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ ok: true, paused: paused.length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
