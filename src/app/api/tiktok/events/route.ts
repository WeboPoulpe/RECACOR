import { NextResponse } from "next/server";
import {
  sendTikTokStandardEvent,
  type TikTokStandardEvent,
} from "@/lib/tiktok-events";

export const runtime = "nodejs";

const ALLOWED_EVENTS: TikTokStandardEvent[] = ["Contact", "Schedule"];

type EventPayload = {
  event?: string;
  service_type?: string;
  phone_location?: string;
  page_source?: string;
  ttclid?: string;
  ttp?: string;
  consent_status?: "granted" | "denied" | null;
  event_id?: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as EventPayload;

    if (!ALLOWED_EVENTS.includes(data.event as TikTokStandardEvent)) {
      return NextResponse.json({ error: "Événement TikTok non autorisé" }, { status: 400 });
    }

    if (data.consent_status !== "granted") {
      return NextResponse.json({ ok: true, sent: false, reason: "consent" });
    }

    await sendTikTokStandardEvent(data.event as TikTokStandardEvent, {
      service_type: data.service_type?.slice(0, 40),
      page_source: data.page_source?.startsWith("/") ? data.page_source : "/",
      ttclid: data.ttclid?.slice(0, 512),
      ttp: data.ttp?.slice(0, 512),
      consent_status: "granted",
      event_id: data.event_id?.slice(0, 120),
      properties: {
        service_type: data.service_type?.slice(0, 40),
        phone_location: data.phone_location?.slice(0, 40),
      },
    }, req);

    return NextResponse.json({ ok: true, sent: true });
  } catch (error) {
    console.error("[tiktok standard event]", error);
    return NextResponse.json({ error: "Échec de l'envoi TikTok" }, { status: 500 });
  }
}
