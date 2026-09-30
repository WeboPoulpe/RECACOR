import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import {
  buildDailyLeadsEmailHtml,
  buildDailyLeadsEmailText,
  buildDailyLeadsSubject,
  fetchLeadsDigest,
  type LeadsDigest,
} from "@/lib/reports/ramon-daily-leads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parisDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(date);
}

/** Le mot d'explication s'affiche jusqu'à la date RAMON_DAILY_LEADS_INTRO_UNTIL (AAAA-MM-JJ) incluse. */
function showIntro(now = new Date()) {
  const until = process.env.RAMON_DAILY_LEADS_INTRO_UNTIL || "";
  return /^\d{4}-\d{2}-\d{2}$/.test(until) && parisDate(now) <= until;
}

function parisClock(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return {
    weekday: parts.find((p) => p.type === "weekday")?.value || "",
    hour: Number(parts.find((p) => p.type === "hour")?.value),
  };
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret") || "";
  const expected = process.env.CRON_SECRET || "";

  if (!expected) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET manquant" }, { status: 500 });
  }
  if (auth !== `Bearer ${expected}` && querySecret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const preview = url.searchParams.get("preview") === "1";
  const force = url.searchParams.get("force") === "1";

  // Envoi lundi et jeudi. Deux crons (5 h 30 et 6 h 30 UTC) : seul celui qui tombe à 7 h à Paris envoie, été comme hiver.
  const clock = parisClock(new Date());
  if (!preview && !force && (clock.hour !== 7 || !["Mon", "Thu"].includes(clock.weekday))) {
    return NextResponse.json({ ok: true, skipped: "hors_creneau", paris: clock });
  }

  const digest = await fetchLeadsDigest(url.searchParams.get("at") || undefined);
  const subject = buildDailyLeadsSubject(digest);
  const options = { intro: showIntro() || url.searchParams.get("intro") === "1" };
  const html = buildDailyLeadsEmailHtml(digest, options);

  if (preview) {
    return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }

  if (process.env.RAMON_DAILY_LEADS_ENABLED !== "1") {
    return NextResponse.json({ ok: true, skipped: "desactive", subject });
  }

  const recipients = parseList(process.env.RAMON_DAILY_LEADS_TO || "");
  const ccRecipients = parseList(process.env.RAMON_DAILY_LEADS_CC || "");
  if (!recipients.length) {
    return NextResponse.json({ ok: false, error: "RAMON_DAILY_LEADS_TO manquant" }, { status: 500 });
  }

  if (recipients.length !== 1) {
    return NextResponse.json({ ok: false, error: "Un seul destinataire principal est attendu" }, { status: 500 });
  }

  const text = buildDailyLeadsEmailText(digest, options);
  // Brevo dédoublonne une livraison répétée dans les 15 minutes avec cette clé.
  const idempotencyKey = `ramon-leads-${parisDate(new Date())}`;
  const result = await sendEmail({
    to: recipients[0],
    cc: ccRecipients,
    idempotencyKey,
    subject,
    html,
    text,
    replyTo: process.env.RAMON_REPORT_REPLY_TO || "marketing@recacor.fr",
  });

  return NextResponse.json({
    ok: result.ok,
    sent: result.ok ? 1 + ccRecipients.length : 0,
    failed: result.ok ? 0 : 1,
    window: digest.window,
    delivery: { to: recipients[0], cc: ccRecipients, ...result },
  }, { status: result.ok ? 200 : 502 });
}

/**
 * Envoi de test : POST { to, digest? } — n'envoie qu'à `to` (jamais à Ramon).
 * Sans `digest`, les données sont lues dans AdsFlow comme pour l'envoi du matin.
 */
export async function POST(req: Request) {
  const expected = process.env.CRON_SECRET || "";
  if (!expected || req.headers.get("authorization") !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { to?: string; digest?: LeadsDigest; intro?: boolean };
  if (!body.to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.to)) {
    return NextResponse.json({ ok: false, error: "adresse `to` manquante ou invalide" }, { status: 400 });
  }

  const digest = body.digest || (await fetchLeadsDigest());
  const result = await sendEmail({
    to: body.to,
    subject: `[TEST] ${buildDailyLeadsSubject(digest)}`,
    html: buildDailyLeadsEmailHtml(digest, { intro: body.intro ?? showIntro() }),
    text: buildDailyLeadsEmailText(digest, { intro: body.intro ?? showIntro() }),
    replyTo: process.env.RAMON_REPORT_REPLY_TO || "marketing@recacor.fr",
  });
  return NextResponse.json({ to: body.to, ...result });
}
