import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = "/Users/redouanelmansouri/Desktop/RECACOR";
const outputDir = path.join(projectRoot, "public/ads/controle-technique");
const logoPath = path.join(projectRoot, "public/logo-recacor.webp");
const bgPassagePath = path.join(projectRoot, "public/illustrations/services/controle-technique-passage-hero-20260723.png");
const bgConseilPath = path.join(projectRoot, "public/illustrations/services/controle-technique-hero-20260723.png");

const brand = {
  yellow: "#FFC400",
  indigo: "#2E2D8A",
  blue: "#1B4FD8",
  purple: "#8B6CFF",
  green: "#9DF2B7",
  white: "#FFFFFF",
  textDark: "#101828",
  mutedDark: "rgba(16,24,40,0.72)",
};

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function textBlock({
  x,
  y,
  lines,
  fill = brand.white,
  size = 42,
  weight = 800,
  lineHeight = 1.05,
  family = "Arial, Helvetica, sans-serif",
  letterSpacing = 0,
  uppercase = false,
}) {
  return lines
    .map((line, index) => {
      const safeLine = escapeXml(uppercase ? line.toUpperCase() : line);
      const dy = index === 0 ? 0 : size * lineHeight;
      return `<text x="${x}" y="${y}" dy="${dy}" fill="${fill}" font-size="${size}" font-weight="${weight}" font-family="${family}" letter-spacing="${letterSpacing}">${safeLine}</text>`;
    })
    .join("");
}

function badge({ x, y, w, h, fill, stroke = "none", text, textFill = brand.textDark, fontSize = 32 }) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.round(h / 2)}" fill="${fill}" stroke="${stroke}" />
    <text x="${x + w / 2}" y="${y + h / 2 + fontSize * 0.34}" text-anchor="middle" fill="${textFill}" font-size="${fontSize}" font-weight="800" font-family="Arial, Helvetica, sans-serif">${escapeXml(text)}</text>
  `;
}

function featurePill({ x, y, text, width }) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="54" rx="27" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.26)" />
    <circle cx="${x + 24}" cy="${y + 27}" r="8" fill="${brand.purple}" />
    <text x="${x + 44}" y="${y + 35}" fill="${brand.white}" font-size="25" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(text)}</text>
  `;
}

function ctSticker({ x, y, scale = 1, priceLine = "Gratuit", serviceLine = "Pack VL" }) {
  const w = 250 * scale;
  const h = 170 * scale;
  const rx = 18 * scale;
  return `
    <g transform="translate(${x},${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" fill="rgba(199,220,255,0.96)" stroke="#5D9BFF" stroke-width="${4 * scale}" />
      <rect x="${12 * scale}" y="${12 * scale}" width="${w - 24 * scale}" height="${h - 24 * scale}" rx="${12 * scale}" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="${2 * scale}" />
      <text x="${w / 2}" y="${32 * scale}" text-anchor="middle" fill="${brand.textDark}" font-size="${16 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">AB-482-CT</text>
      <text x="${24 * scale}" y="${78 * scale}" fill="rgba(93,155,255,0.18)" font-size="${86 * scale}" font-weight="900" font-family="Arial Black, Arial, Helvetica, sans-serif">CT</text>
      <text x="${128 * scale}" y="${68 * scale}" text-anchor="middle" fill="${brand.textDark}" font-size="${18 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">01/08/2028</text>
      <text x="${128 * scale}" y="${100 * scale}" text-anchor="middle" fill="${brand.textDark}" font-size="${34 * scale}" font-weight="900" font-family="Arial Black, Arial, Helvetica, sans-serif">CT</text>
      <rect x="${160 * scale}" y="${76 * scale}" width="${64 * scale}" height="${24 * scale}" rx="${12 * scale}" fill="${brand.green}" />
      <text x="${192 * scale}" y="${93 * scale}" text-anchor="middle" fill="#166534" font-size="${14 * scale}" font-weight="900" font-family="Arial, Helvetica, sans-serif">VALIDÉ</text>
      <text x="${128 * scale}" y="${122 * scale}" text-anchor="middle" fill="${brand.textDark}" font-size="${14 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">ÉVITER LA CONTRE-VISITE</text>
      <text x="${18 * scale}" y="${146 * scale}" fill="${brand.textDark}" font-size="${11 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">Pré-contrôle :</text>
      <text x="${118 * scale}" y="${146 * scale}" fill="${brand.textDark}" font-size="${11 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">${escapeXml(priceLine)}</text>
      <text x="${18 * scale}" y="${160 * scale}" fill="${brand.textDark}" font-size="${11 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">Service :</text>
      <text x="${86 * scale}" y="${160 * scale}" fill="${brand.textDark}" font-size="${11 * scale}" font-weight="800" font-family="Arial, Helvetica, sans-serif">${escapeXml(serviceLine)}</text>
    </g>
  `;
}

async function createCreative({
  filename,
  width,
  height,
  backgroundPath,
  headlineWhite,
  headlineAccent,
  subline,
  priceBadge,
  secondaryBadge,
  featureLines,
  footerText,
  stickerPriceLine,
  stickerServiceLine,
  priceBadgeX,
  priceBadgeWidth,
  secondaryBadgeX,
}) {
  const bg = await sharp(backgroundPath).resize(width, height, { fit: "cover" }).toBuffer();
  const logoMeta = await sharp(logoPath).resize({ width: Math.round(width * 0.22) }).toBuffer();

  const sublineLines = Array.isArray(subline) ? subline : [subline];

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlayMain" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(10,16,32,0.86)" />
          <stop offset="50%" stop-color="rgba(10,16,32,0.56)" />
          <stop offset="100%" stop-color="rgba(10,16,32,0.18)" />
        </linearGradient>
        <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.94)" />
        </linearGradient>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#overlayMain)" />
      <rect x="0" y="${height - 180}" width="${width}" height="180" fill="url(#bottomFade)" />

      <rect x="48" y="42" width="${width - 96}" height="${height - 84}" rx="34" fill="none" stroke="rgba(255,255,255,0.16)" />

      <g transform="translate(70,62)">
        <rect x="0" y="0" width="212" height="56" rx="28" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.24)" />
        <text x="106" y="37" text-anchor="middle" fill="${brand.white}" font-size="28" font-weight="700" font-family="Arial, Helvetica, sans-serif">Contrôle technique</text>
      </g>

      <g transform="translate(${width - 346},62)">
        <rect x="0" y="0" width="274" height="86" rx="22" fill="rgba(255,255,255,0.78)" />
      </g>

      ${textBlock({
        x: 72,
        y: 172,
        lines: headlineWhite,
        size: width >= 1080 ? 82 : 68,
        weight: 900,
        family: "Arial Black, Arial, Helvetica, sans-serif",
      })}
      ${textBlock({
        x: 72,
        y: 172 + (width >= 1080 ? 164 : 146),
        lines: headlineAccent,
        size: width >= 1080 ? 76 : 62,
        weight: 900,
        family: "Arial Black, Arial, Helvetica, sans-serif",
        fill: brand.purple,
      })}

      ${textBlock({
        x: 74,
        y: width >= 1080 ? 470 : 426,
        lines: sublineLines,
        size: width >= 1080 ? 31 : 28,
        weight: 500,
        fill: "rgba(255,255,255,0.92)",
        lineHeight: 1.22,
      })}

      ${badge({
        x: priceBadgeX ?? 72,
        y: width >= 1080 ? 548 : 500,
        w: priceBadgeWidth ?? (width >= 1080 ? 338 : 288),
        h: 92,
        fill: brand.yellow,
        text: priceBadge,
        textFill: brand.textDark,
        fontSize: width >= 1080 ? 42 : 36,
      })}

      ${secondaryBadge
        ? badge({
            x: secondaryBadgeX ?? (width >= 1080 ? 428 : 384),
            y: width >= 1080 ? 558 : 510,
            w: width >= 1080 ? 232 : 202,
            h: 72,
            fill: "rgba(255,255,255,0.10)",
            stroke: "rgba(255,255,255,0.28)",
            text: secondaryBadge,
            textFill: brand.white,
            fontSize: width >= 1080 ? 25 : 22,
          })
        : ""}

      ${ctSticker({
        x: width >= 1080 ? 772 : 648,
        y: width >= 1080 ? 530 : 458,
        scale: width >= 1080 ? 1 : 0.84,
        priceLine: stickerPriceLine || "Gratuit",
        serviceLine: stickerServiceLine || "Pack VL",
      })}

      ${featurePill({ x: 72, y: width >= 1080 ? 676 : 622, text: featureLines[0], width: width >= 1080 ? 336 : 294 })}
      ${featurePill({ x: width >= 1080 ? 424 : 386, y: width >= 1080 ? 676 : 622, text: featureLines[1], width: width >= 1080 ? 338 : 296 })}
      ${featurePill({ x: 72, y: width >= 1080 ? 746 : 692, text: featureLines[2], width: width >= 1080 ? 388 : 336 })}

      <g transform="translate(${width - 352},${height - 136})">
        <rect x="0" y="0" width="280" height="82" rx="41" fill="${brand.yellow}" />
        <text x="140" y="52" text-anchor="middle" fill="${brand.textDark}" font-size="30" font-weight="900" font-family="Arial, Helvetica, sans-serif">Obtenir mon devis</text>
      </g>

      <text x="72" y="${height - 68}" fill="${brand.mutedDark}" font-size="24" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(footerText)}</text>
    </svg>
  `;

  const output = await sharp(bg)
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: logoMeta, top: 84, left: width - Math.round(width * 0.22) - 72 },
    ])
    .png()
    .toBuffer();

  await fs.mkdir(outputDir, { recursive: true });
  const destination = path.join(outputDir, filename);
  await fs.writeFile(destination, output);
  return destination;
}

async function main() {
  const outputs = [];

  outputs.push(
    await createCreative({
      filename: "ct-meta-square-vl-20260724.png",
      width: 1080,
      height: 1080,
      backgroundPath: bgPassagePath,
      headlineWhite: ["Contrôle technique", "pris en charge"],
      headlineAccent: ["au Crès", "près de Montpellier"],
      subline: [
        "Pré-contrôle offert, devis si un point bloque,",
        "puis passage au centre coordonné par le garage.",
      ],
      priceBadge: "VL dès 87,22€",
      secondaryBadge: "Pré-contrôle offert",
      featureLines: ["Devis avant réparation", "Garage au Crès", "Éviter la contre-visite"],
      footerText: "Recacor · 1240 Route de Nîmes · Le Crès",
      stickerPriceLine: "Offert",
      stickerServiceLine: "Pack VL",
      priceBadgeWidth: 340,
      secondaryBadgeX: 430,
    }),
  );

  outputs.push(
    await createCreative({
      filename: "ct-meta-square-utilitaire-20260724.png",
      width: 1080,
      height: 1080,
      backgroundPath: bgConseilPath,
      headlineWhite: ["Contrôle technique", "utilitaire"],
      headlineAccent: ["préparé au Crès", "avant le passage"],
      subline: [
        "Le garage regarde le véhicule avant passage,",
        "établit un devis si besoin et coordonne la suite.",
      ],
      priceBadge: "Utilitaire dès 97,02€",
      secondaryBadge: "Pré-contrôle offert",
      featureLines: ["Atelier sur place", "Un seul interlocuteur", "Demande de devis rapide"],
      footerText: "Recacor · Offre VL et utilitaires selon le besoin",
      stickerPriceLine: "Offert",
      stickerServiceLine: "Utilitaire",
      priceBadgeX: 56,
      priceBadgeWidth: 380,
      secondaryBadgeX: 452,
    }),
  );

  outputs.push(
    await createCreative({
      filename: "ct-meta-story-20260724.png",
      width: 1080,
      height: 1920,
      backgroundPath: bgPassagePath,
      headlineWhite: ["Préparer la voiture", "avant le passage"],
      headlineAccent: ["au contrôle technique"],
      subline: [
        "Recacor peut regarder le véhicule, faire un devis",
        "si un point bloque et organiser le passage au centre.",
      ],
      priceBadge: "Pré-contrôle offert",
      secondaryBadge: "VL dès 87,22€",
      featureLines: ["Devis avant réparation", "Garage au Crès", "Éviter la contre-visite"],
      footerText: "Plus d'infos sur recacor.fr",
      stickerPriceLine: "Offert",
      stickerServiceLine: "Pack VL",
      priceBadgeWidth: 342,
      secondaryBadgeX: 430,
    }),
  );

  process.stdout.write(`${outputs.join("\n")}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
