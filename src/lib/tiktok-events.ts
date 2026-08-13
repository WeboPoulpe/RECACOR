import { createHash, randomUUID } from "node:crypto";

const TIKTOK_EVENTS_ENDPOINT =
  "https://business-api.tiktok.com/open_api/v1.3/event/track/";
const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID || "D7P28BBC77U7DHO9VME0";

type TikTokLeadData = {
  form_id: string;
  service_type: string;
  telephone?: string;
  email?: string;
  cp?: string;
  page_source?: string;
  ttclid?: string;
  ttp?: string;
  consent_status?: "granted" | "denied" | null;
  submission_id?: string;
};

export type TikTokStandardEvent = "Lead" | "Contact" | "Schedule";

type TikTokEventData = {
  form_id?: string;
  service_type?: string;
  telephone?: string;
  email?: string;
  page_source?: string;
  ttclid?: string;
  ttp?: string;
  consent_status?: "granted" | "denied" | null;
  submission_id?: string;
  event_id?: string;
  properties?: Record<string, string | undefined>;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string | undefined): string | undefined {
  const normalized = email?.trim().toLowerCase();
  return normalized ? sha256(normalized) : undefined;
}

function hashPhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;

  const normalized = digits.startsWith("0")
    ? `33${digits.slice(1)}`
    : digits;
  return sha256(normalized);
}

function getClientIp(req: Request): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || undefined;
}

function getPageUrl(data: TikTokLeadData, req: Request): string {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://www.recacor.fr";
  const pagePath = data.page_source?.startsWith("/") ? data.page_source : "/";

  try {
    return new URL(pagePath, siteOrigin).toString();
  } catch {
    return new URL("/", req.url).toString();
  }
}

function getEventUser(data: TikTokEventData, req: Request): Record<string, unknown> {
  const user: Record<string, unknown> = {};
  const email = hashEmail(data.email);
  const phone = hashPhone(data.telephone);
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || undefined;

  if (email) user.email = [email];
  if (phone) user.phone = [phone];
  if (data.ttclid) user.ttclid = data.ttclid;
  if (data.ttp) user.ttp = data.ttp;
  if (ip) user.ip = ip;
  if (userAgent) user.user_agent = userAgent;

  return user;
}

export async function sendTikTokStandardEvent(
  event: TikTokStandardEvent,
  data: TikTokEventData,
  req: Request,
): Promise<void> {
  const accessToken = process.env.TIKTOK_EVENTS_API_ACCESS_TOKEN;

  // Never send lead or device data without explicit consent.
  if (!accessToken || data.consent_status !== "granted") return;

  const eventId = data.event_id || data.submission_id || randomUUID();
  const properties = Object.fromEntries(
    Object.entries(data.properties || {}).filter(([, value]) => Boolean(value)),
  );

  const response = await fetch(TIKTOK_EVENTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Access-Token": accessToken,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(5000),
    body: JSON.stringify({
      event_source: "web",
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          user: getEventUser(data, req),
          page: { url: getPageUrl(data as TikTokLeadData, req) },
          properties,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}${detail ? ` — ${detail}` : ""}`);
  }
}

export async function sendTikTokLeadEvent(
  data: TikTokLeadData,
  req: Request,
  leadId?: number,
): Promise<void> {
  await sendTikTokStandardEvent(
    "Lead",
    {
      ...data,
      event_id: data.submission_id || (leadId ? `recacor_lead_${leadId}` : undefined),
      properties: {
        form_id: data.form_id,
        service_type: data.service_type,
      },
    },
    req,
  );
}
