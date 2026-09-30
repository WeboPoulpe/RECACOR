const DIGEST_URL = "https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/leads-treatment-digest";
const LOGO_URL = "https://www.recacor.fr/logo-recacor-email.png";
const ADSFLOW_URL = "https://adsflowtracking.lovable.app/leads";
// Commerciaux VL : leurs quelques leads PL ne sont pas affichés dans le bloc poids lourd.
const VL_ONLY = ["Yassine", "Étienne"];
// Au-delà de ce stock de leads « Nouveau », la case est mise en surbrillance.
const BACKLOG_ALERT = 10;

const C = {
  brand: "#2E2D8A",
  accent: "#1B4FD8",
  ink: "#0F172A",
  muted: "#64748B",
  faint: "#94A3B8",
  line: "#E2E8F0",
  soft: "#F1F5F9",
  bg: "#EEF0F6",
  red: "#DC2626",
  redBg: "#FEF2F2",
  amber: "#B45309",
  amberBg: "#FFFBEB",
  green: "#15803D",
  greenBg: "#F0FDF4",
};

export type CommercialDigest = {
  commercial: string;
  segment: "vl" | "pl" | "autre";
  recus: number;
  pneus: number;
  recus_avec_qte: number;
  marques_sans_qte: string | null;
  a_traiter: number;
  a_traiter_24h: number;
  plus_ancien_j: number | null;
  repondeur_1: number;
  repondeur_2_3: number;
  devis_envoye: number;
  accord_verbal: number;
  rappels_echus: number;
  chauds_sans_relance_48h: number;
  recus_7j: number;
  delai_moyen_h: number | null;
  delai_median_h: number | null;
  contact_moins_1h_7j: number;
  jamais_contactes_7j: number;
  ventes: number;
  ca_ttc: number;
  m_recus: number;
  m_pneus: number;
  m_recus_avec_qte: number;
  m_contactes: number;
  m_contactes_24h: number;
  m_delai_moyen_h: number | null;
  m_ventes: number;
  m_ca_ttc: number;
};

export type LeadsDigest = {
  generated_at: string;
  window: { start: string; end: string };
  month: { start: string; end: string };
  commerciaux: CommercialDigest[];
};

export async function fetchLeadsDigest(at?: string): Promise<LeadsDigest> {
  const apiKey = process.env.ADSFLOW_ANALYTICS_API_KEY || process.env.MARKETING_ANALYTICS_API_KEY;
  if (!apiKey) {
    throw new Error("ADSFLOW_ANALYTICS_API_KEY est manquant");
  }
  const url = at ? `${DIGEST_URL}?at=${encodeURIComponent(at)}` : DIGEST_URL;
  const response = await fetch(url, { headers: { "X-Api-Key": apiKey }, cache: "no-store" });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`leads-treatment-digest HTTP ${response.status}: ${JSON.stringify(data)}`);
  }
  return data as LeadsDigest;
}

function escapeHtml(input: unknown) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDay(isoDate: string, withWeekday = true) {
  return new Intl.DateTimeFormat("fr-FR", {
    ...(withWeekday ? { weekday: "long" } : {}),
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function periodLabel(digest: LeadsDigest) {
  const { start, end } = digest.window;
  return start === end ? formatDay(start) : `du ${formatDay(start)} au ${formatDay(end)}`;
}

/** « hier » pour un seul jour, sinon « depuis lundi » / « depuis jeudi ». */
function periodShort(digest: LeadsDigest) {
  if (digest.window.start === digest.window.end) return "hier";
  const weekday = new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "UTC" }).format(
    new Date(`${digest.window.start}T00:00:00Z`)
  );
  return `depuis ${weekday}`;
}

function monthLabel(digest: LeadsDigest) {
  const name = new Intl.DateTimeFormat("fr-FR", { month: "long", timeZone: "UTC" }).format(
    new Date(`${digest.month.start}T00:00:00Z`)
  );
  const lastDay = Number(digest.month.end.slice(8, 10));
  return { name, range: lastDay === 1 ? "1er" : `du 1er au ${lastDay}` };
}

function formatDelay(hours: number | null) {
  if (hours === null || hours === undefined) return "—";
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} min`;
  if (hours < 48) return `${Math.round(hours)} h`;
  return `${Math.round(hours / 24)} j`;
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
    .format(value)
    .replace(/ /g, " ");
}

function formatInt(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value).replace(/ /g, " ");
}

function pct(part: number, total: number) {
  return total ? Math.round((part / total) * 100) : 0;
}

function sum(rows: CommercialDigest[], key: keyof CommercialDigest) {
  return rows.reduce((acc, row) => acc + (Number(row[key]) || 0), 0);
}

/** Moyenne des délais pondérée par le nombre de leads contactés. */
function weightedDelay(rows: CommercialDigest[], delayKey: "delai_moyen_h" | "m_delai_moyen_h", weight: (r: CommercialDigest) => number) {
  let total = 0;
  let count = 0;
  for (const row of rows) {
    const delay = row[delayKey];
    const w = weight(row);
    if (delay === null || delay === undefined || !w) continue;
    total += Number(delay) * w;
    count += w;
  }
  return count ? total / count : null;
}

function bySegment(digest: LeadsDigest, segment: "vl" | "pl") {
  return digest.commerciaux.filter(
    (row) => row.segment === segment && !(segment === "pl" && VL_ONLY.includes(row.commercial))
  );
}

/* ---------- petits blocs visuels ---------- */

function pill(value: string, tone: "red" | "amber" | "green" | "neutral") {
  const tones = {
    red: [C.red, C.redBg],
    amber: [C.amber, C.amberBg],
    green: [C.green, C.greenBg],
    neutral: [C.ink, "transparent"],
  } as const;
  const [color, bg] = tones[tone];
  if (tone === "neutral") return `<span style="color:${color}">${value}</span>`;
  return `<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:${bg};color:${color};font-weight:700">${value}</span>`;
}

function delayPill(hours: number | null) {
  if (hours === null || hours === undefined) return `<span style="color:${C.faint}">—</span>`;
  const tone = hours <= 4 ? "green" : hours <= 24 ? "amber" : "red";
  return pill(formatDelay(hours), tone);
}

function countPill(value: number, alertFrom = 1) {
  if (!value) return `<span style="color:${C.faint}">0</span>`;
  return value >= alertFrom ? pill(formatInt(value), "red") : pill(formatInt(value), "neutral");
}

function kpiTile(label: string, value: string, hint: string, color: string = C.brand, width = "33%") {
  return `<td width="${width}" valign="top" style="padding:0 5px">
    <div style="background:#ffffff;border:1px solid ${C.line};border-radius:14px;padding:13px 12px 11px">
      <div style="font-size:11px;font-weight:700;color:${C.muted};line-height:1.3">${label}</div>
      <div style="margin-top:6px;font-size:26px;line-height:1;font-weight:800;color:${color}">${value}</div>
      <div style="margin-top:6px;font-size:11.5px;color:${C.muted};line-height:1.35">${hint}</div>
    </div>
  </td>`;
}

function tilesRow(tiles: string[]) {
  return `<tr><td style="padding:0 19px 14px">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>${tiles.join("")}</tr></table>
  </td></tr>`;
}

function zero() {
  return `<span style="color:${C.faint}">0</span>`;
}

function backlogCell(row: CommercialDigest) {
  if (row.a_traiter > BACKLOG_ALERT) {
    return `<td style="${TD};background:#FEF08A"><strong style="font-size:15px;color:${C.red}">${row.a_traiter}</strong></td>`;
  }
  return `<td style="${TD}">${row.a_traiter || zero()}</td>`;
}

function segmentTitle(segment: "vl" | "pl", title: string) {
  return `<tr><td style="padding:28px 24px 12px">
    <table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td valign="middle" style="width:1%;white-space:nowrap;padding-right:10px">
        <span style="display:inline-block;padding:5px 11px;border-radius:8px;background:${segment === "pl" ? C.brand : C.accent};color:#ffffff;font-size:12px;font-weight:800;letter-spacing:0.06em">${segment.toUpperCase()}</span>
      </td>
      <td valign="middle" style="font-size:17px;font-weight:800;color:${C.ink}">${title}</td>
    </tr></table>
  </td></tr>`;
}

const TH = `padding:8px 6px;font-size:11px;font-weight:700;color:${C.muted};text-align:center;background:${C.soft};border-bottom:1px solid ${C.line};line-height:1.3`;
const TG = `padding:7px 6px 5px;font-size:10px;font-weight:800;color:${C.brand};text-transform:uppercase;letter-spacing:0.07em;text-align:center;background:#E8EAF6;border-left:2px solid #ffffff`;
const TD = `padding:10px 6px;font-size:13px;color:${C.ink};text-align:center;border-bottom:1px solid ${C.soft}`;

function tableWrap(head: string, body: string, groups = "") {
  return `<tr><td style="padding:0 24px">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border:1px solid ${C.line};border-radius:12px;overflow:hidden">
      ${groups ? `<tr>${groups}</tr>` : ""}
      <tr>${head}</tr>
      ${body}
    </table>
  </td></tr>`;
}

function tyresCell(row: CommercialDigest) {
  if (!row.recus) return `<span style="color:${C.faint}">—</span>`;
  if (row.recus_avec_qte) {
    const missing = row.recus - row.recus_avec_qte;
    return `<strong>${formatInt(row.pneus)}</strong>${missing ? `<div style="font-size:10.5px;color:${C.faint};white-space:nowrap">+${missing} sans qté</div>` : ""}`;
  }
  return row.marques_sans_qte
    ? `<span style="font-size:12px">${escapeHtml(row.marques_sans_qte)}</span>`
    : `<span style="color:${C.faint}">non précisé</span>`;
}

function nameCell(row: CommercialDigest) {
  return `<td style="${TD};text-align:left;font-weight:700;padding-left:10px">${escapeHtml(row.commercial)}</td>`;
}

/* ---------- sections ---------- */

function dailySection(digest: LeadsDigest, segment: "vl" | "pl") {
  const rows = bySegment(digest, segment).filter((r) => r.recus || r.a_traiter || r.repondeur_1 || r.rappels_echus || r.recus_7j);
  if (!rows.length) return "";
  const withTyres = segment === "pl";
  const day = periodShort(digest);
  const recus = sum(rows, "recus");
  const attente = sum(rows, "a_traiter_24h");
  const delay = weightedDelay(rows, "delai_moyen_h", (r) => r.recus_7j - r.jamais_contactes_7j);
  const ventes = sum(rows, "ventes");

  const w = withTyres ? "20%" : "25%";
  const tiles = [
    kpiTile(`Leads reçus ${day}`, formatInt(recus), segment === "pl" ? "demandes poids lourd" : "demandes voiture", C.brand, w),
    withTyres ? kpiTile("Pneus demandés", formatInt(sum(rows, "pneus")), "quantité indiquée par les clients", C.brand, w) : "",
    kpiTile(`Ventes ${day}`, formatInt(ventes), ventes ? formatEuro(sum(rows, "ca_ttc")) + " TTC" : "aucune vente saisie", C.green, w),
    kpiTile("Attendent un 1er appel", formatInt(attente), "depuis plus de 24 h", attente ? C.red : C.green, w),
    kpiTile("Délai moyen du 1er contact", formatDelay(delay), "leads des 7 derniers jours", delay !== null && delay > 24 ? C.red : delay !== null && delay > 4 ? C.amber : C.green, w),
  ];

  const groups = [
    `<th style="${TG};background:${C.soft};border-left:0"></th>`,
    `<th colspan="${withTyres ? 3 : 2}" style="${TG}">${day.charAt(0).toUpperCase() + day.slice(1)}</th>`,
    `<th colspan="3" style="${TG}">À faire</th>`,
    `<th colspan="3" style="${TG}">En cours</th>`,
    `<th style="${TG}">Réactivité</th>`,
  ].join("");

  const head = [
    `<th style="${TH};text-align:left;padding-left:10px">Commercial</th>`,
    `<th style="${TH}">Leads</th>`,
    withTyres ? `<th style="${TH}">Pneus</th>` : "",
    `<th style="${TH}">Ventes</th>`,
    `<th style="${TH}">Nouveaux<br />à appeler</th>`,
    `<th style="${TH}">dont<br />+24 h</th>`,
    `<th style="${TH}">Rappels<br />en retard</th>`,
    `<th style="${TH}">1er<br />répondeur</th>`,
    `<th style="${TH}">Devis<br />envoyé</th>`,
    `<th style="${TH}">Accord<br />verbal</th>`,
    `<th style="${TH}">Délai<br />1er contact</th>`,
  ].join("");

  const body = rows
    .map(
      (row) => `<tr>
        ${nameCell(row)}
        <td style="${TD};font-weight:700">${row.recus || zero()}</td>
        ${withTyres ? `<td style="${TD}">${tyresCell(row)}</td>` : ""}
        <td style="${TD}">${row.ventes ? `<strong style="color:${C.green}">${row.ventes}</strong><div style="font-size:10.5px;color:${C.muted};white-space:nowrap">${formatEuro(row.ca_ttc)}</div>` : zero()}</td>
        ${backlogCell(row)}
        <td style="${TD}">${row.a_traiter_24h ? pill(String(row.a_traiter_24h), "red") : zero()}</td>
        <td style="${TD}">${countPill(row.rappels_echus)}</td>
        <td style="${TD}">${row.repondeur_1 || zero()}</td>
        <td style="${TD}">${row.devis_envoye || zero()}</td>
        <td style="${TD};${row.accord_verbal ? `color:${C.green};font-weight:700` : ""}">${row.accord_verbal || zero()}</td>
        <td style="${TD}">${delayPill(row.delai_moyen_h)}</td>
      </tr>`
    )
    .join("");

  return (
    segmentTitle(segment, segment === "pl" ? "Poids lourd" : "Véhicule léger") +
    tilesRow(tiles) +
    tableWrap(head, body, groups)
  );
}

function monthSection(digest: LeadsDigest) {
  const { name, range } = monthLabel(digest);
  const blocks = (["pl", "vl"] as const)
    .map((segment) => {
      const rows = bySegment(digest, segment).filter((r) => r.m_recus || r.m_ventes);
      if (!rows.length) return "";
      const withTyres = segment === "pl";
      const recus = sum(rows, "m_recus");
      const contact24 = sum(rows, "m_contactes_24h");
      const ventes = sum(rows, "m_ventes");
      const ca = sum(rows, "m_ca_ttc");
      const delay = weightedDelay(rows, "m_delai_moyen_h", (r) => r.m_contactes);

      const rate = pct(contact24, recus);
      const tiles = tilesRow([
        kpiTile("Leads reçus", formatInt(recus), withTyres ? `${formatInt(sum(rows, "m_pneus"))} pneus demandés` : `depuis le 1er ${name}`),
        kpiTile("Appelés en moins de 24 h", `${rate} %`, `délai moyen du 1er contact : ${formatDelay(delay)}`, rate >= 70 ? C.green : rate >= 40 ? C.amber : C.red),
        kpiTile("Ventes conclues", formatInt(ventes), `${formatEuro(ca)} TTC`, C.green),
      ]);

      const head = [
        `<th style="${TH};text-align:left;padding-left:10px">Commercial</th>`,
        `<th style="${TH}">Leads<br />reçus</th>`,
        withTyres ? `<th style="${TH}">Pneus<br />demandés</th>` : "",
        `<th style="${TH}">Appelés<br />en - de 24 h</th>`,
        `<th style="${TH}">Délai moyen<br />1er contact</th>`,
        `<th style="${TH}">Ventes</th>`,
        `<th style="${TH}">CA TTC</th>`,
      ].join("");

      const body = rows
        .map((row) => {
          const rate = pct(row.m_contactes_24h, row.m_recus);
          const tone = !row.m_recus ? "neutral" : rate >= 70 ? "green" : rate >= 40 ? "amber" : "red";
          return `<tr>
            ${nameCell(row)}
            <td style="${TD};font-weight:700">${formatInt(row.m_recus)}</td>
            ${withTyres ? `<td style="${TD}">${row.m_pneus ? formatInt(row.m_pneus) : `<span style="color:${C.faint}">—</span>`}</td>` : ""}
            <td style="${TD}">${row.m_recus ? pill(`${rate} %`, tone) : `<span style="color:${C.faint}">—</span>`}</td>
            <td style="${TD}">${delayPill(row.m_delai_moyen_h)}</td>
            <td style="${TD}">${row.m_ventes || `<span style="color:${C.faint}">0</span>`}</td>
            <td style="${TD};font-weight:700">${row.m_ca_ttc ? formatEuro(row.m_ca_ttc) : `<span style="color:${C.faint}">—</span>`}</td>
          </tr>`;
        })
        .join("");

      return `${segmentTitle(segment, segment === "pl" ? "Poids lourd" : "Véhicule léger")}${tiles}${tableWrap(head, body)}`;
    })
    .join("");

  if (!blocks) return "";
  return `<tr><td style="padding:34px 24px 0"><div style="border-top:2px solid ${C.line}"></div></td></tr>
    <tr><td style="padding:22px 24px 0">
      <div style="font-size:11px;font-weight:700;color:${C.accent};text-transform:uppercase;letter-spacing:0.08em">2 · Le mois en cours</div>
      <div style="margin-top:4px;font-size:20px;font-weight:800;color:${C.ink}">Récap de ${escapeHtml(name)} <span style="font-weight:400;color:${C.muted};font-size:15px">· ${range}</span></div>
    </td></tr>
    ${blocks}`;
}

/* ---------- mail ---------- */

function mainRows(digest: LeadsDigest) {
  return [...bySegment(digest, "pl"), ...bySegment(digest, "vl")];
}

export function buildDailyLeadsSubject(digest: LeadsDigest) {
  const rows = mainRows(digest);
  return `Leads Recacor · ${periodLabel(digest)} · ${sum(rows, "recus")} reçus, ${sum(rows, "a_traiter_24h")} en attente`;
}

export type DailyLeadsEmailOptions = {
  /** Premier(s) envoi(s) : ajoute un mot expliquant le rythme et le contenu du mail. */
  intro?: boolean;
};

function introBlock() {
  return `<tr><td style="padding:14px 24px 0">
    <div style="background:#EEF2FF;border:1px solid #DBE3FF;border-radius:12px;padding:14px 16px;font-size:13.5px;line-height:1.6;color:${C.ink}">
      <strong style="color:${C.brand}">Nouveau : un point sur les leads deux fois par semaine.</strong><br />
      Tu recevras ce mail <strong>le lundi et le jeudi vers 7 h 30</strong>. Chaque envoi couvre les jours depuis le précédent
      (le lundi : de jeudi à dimanche ; le jeudi : de lundi à mercredi), montre ce qui reste à faire pour chaque commercial,
      puis récapitule le mois en cours.
      Les chiffres viennent directement d'AdsFlow ; le bouton en bas du mail ouvre le détail des leads.
    </div>
  </td></tr>`;
}

export function buildDailyLeadsEmailHtml(digest: LeadsDigest, options: DailyLeadsEmailOptions = {}) {
  const rows = mainRows(digest);
  const recus = sum(rows, "recus");
  const attente = sum(rows, "a_traiter_24h");
  const label = periodLabel(digest);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>Leads Recacor</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:Helvetica,Arial,sans-serif;color:${C.ink};-webkit-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden">${recus} leads reçus, ${attente} en attente depuis plus de 24 h.</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:24px 12px">
    <tr><td align="center">
      <table width="680" cellpadding="0" cellspacing="0" style="max-width:680px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 30px rgba(46,45,138,0.08)">

        <tr><td style="height:6px;background:${C.brand};background-image:linear-gradient(90deg,${C.brand},${C.accent})"></td></tr>
        <tr><td style="padding:22px 24px 18px;border-bottom:1px solid ${C.line}">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td valign="middle"><img src="${LOGO_URL}" width="150" height="31" alt="RECACOR" style="display:block;border:0;width:150px;height:auto" /></td>
            <td valign="middle" align="right" style="font-size:12px;color:${C.muted};line-height:1.4">
              <div style="font-weight:800;color:${C.brand};text-transform:uppercase;letter-spacing:0.08em">Suivi des leads</div>
              <div>${escapeHtml(label.charAt(0).toUpperCase() + label.slice(1))}</div>
            </td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:22px 24px 4px;font-size:15px;line-height:1.6">
          Bonjour Ramon,<br />
          voici le point sur la gestion des leads ${digest.window.start === digest.window.end ? "de " : ""}<strong>${escapeHtml(label)}</strong>.
        </td></tr>
        ${options.intro ? introBlock() : ""}

        <tr><td style="padding:22px 24px 0">
          <div style="font-size:11px;font-weight:700;color:${C.accent};text-transform:uppercase;letter-spacing:0.08em">1 · Depuis le dernier point</div>
          <div style="margin-top:4px;font-size:20px;font-weight:800;color:${C.ink}">Où en est chaque commercial ce matin</div>
        </td></tr>

        ${dailySection(digest, "pl")}
        ${dailySection(digest, "vl")}
        ${monthSection(digest)}

        <tr><td align="center" style="padding:30px 24px 0">
          <a href="${ADSFLOW_URL}" style="display:inline-block;padding:13px 26px;border-radius:12px;background:${C.brand};color:#ffffff;font-size:14px;font-weight:800;text-decoration:none">Voir le détail des leads dans AdsFlow →</a>
        </td></tr>

        <tr><td style="padding:24px 24px 24px">
          <div style="background:${C.soft};border-radius:12px;padding:14px 18px;font-size:12px;line-height:1.65;color:${C.muted}">
            <div style="font-weight:800;color:${C.ink};margin-bottom:4px">Comment lire ce mail</div>
            <div>• <strong style="color:${C.ink}">Nouveaux à appeler</strong> : leads jamais traités (statut Nouveau), surlignés en jaune au-delà de ${BACKLOG_ALERT}. « dont +24 h » = arrivés depuis plus d'un jour.</div>
            <div>• <strong style="color:${C.ink}">En cours</strong> : dossiers actuellement en 1er répondeur, devis envoyé ou accord verbal.</div>
            <div>• <strong style="color:${C.ink}">Délai 1er contact</strong> : temps entre l'arrivée du lead et le 1er appel, SMS ou WhatsApp du commercial (hors messages automatiques). Vert ≤ 4 h, orange ≤ 24 h, rouge au-delà.</div>
            <div>• <strong style="color:${C.ink}">Pneus</strong> : quantité écrite par le client (PL uniquement) ; sans quantité, la marque demandée est affichée.</div>
            <div>• Leads publicité et site uniquement, hors comptoir. Données AdsFlow lues à 7 h.</div>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function buildDailyLeadsEmailText(digest: LeadsDigest, options: DailyLeadsEmailOptions = {}) {
  const rows = mainRows(digest);
  const { name, range } = monthLabel(digest);
  const line = (row: CommercialDigest) =>
    `- ${row.commercial} : ${row.recus} reçus${row.segment === "pl" && row.pneus ? ` (${row.pneus} pneus)` : ""}, ${row.a_traiter} à traiter dont ${row.a_traiter_24h} +24 h, ${row.repondeur_1} 1er répondeur, ${row.devis_envoye} devis envoyés, ${row.accord_verbal} accords verbaux, 1er contact ${formatDelay(row.delai_moyen_h)}, ${row.rappels_echus} rappels en retard`;
  const monthLine = (row: CommercialDigest) =>
    `- ${row.commercial} : ${row.m_recus} leads, ${pct(row.m_contactes_24h, row.m_recus)} % contactés < 24 h, ${row.m_ventes} ventes, ${formatEuro(row.m_ca_ttc)}`;
  const pl = bySegment(digest, "pl");
  const vl = bySegment(digest, "vl");
  return [
    `Bonjour Ramon, voici le point sur la gestion des leads ${digest.window.start === digest.window.end ? "de " : ""}${periodLabel(digest)}.`,
    "",
    ...(options.intro
      ? [
          "Nouveau : tu recevras ce point le lundi et le jeudi vers 7 h 30. Chaque envoi couvre les jours depuis le précédent (le lundi : jeudi à dimanche ; le jeudi : lundi à mercredi), montre ce qui reste à faire pour chaque commercial et récapitule le mois en cours. Les chiffres viennent directement d'AdsFlow.",
          "",
        ]
      : []),
    `${sum(rows, "recus")} leads reçus, ${sum(pl, "pneus")} pneus demandés (PL), ${sum(rows, "a_traiter_24h")} en attente depuis +24 h.`,
    "",
    "POIDS LOURD",
    ...pl.filter((r) => r.recus || r.a_traiter || r.recus_7j).map(line),
    "",
    "VÉHICULE LÉGER",
    ...vl.filter((r) => r.recus || r.a_traiter || r.recus_7j).map(line),
    "",
    `RÉCAP ${name.toUpperCase()} (${range})`,
    ...pl.filter((r) => r.m_recus || r.m_ventes).map((r) => `PL ${monthLine(r)}`),
    ...vl.filter((r) => r.m_recus || r.m_ventes).map((r) => `VL ${monthLine(r)}`),
    "",
    `Détail dans AdsFlow : ${ADSFLOW_URL}`,
  ].join("\n");
}
