import { NextResponse } from "next/server";

type Params = { params: Promise<{ conseiller: string }> };

// Relais du bouton « Écrire à mon conseiller » des modèles WhatsApp (Meta refuse wa.me dans un bouton).
// Liste fermée : numéros WhatsApp des profils AdsFlow, Rubén repris du site. Aucune autre destination possible.
const CONSEILLERS: Record<string, string> = {
  patrick: "33607621043",
  kevin: "33649346360",
  claire: "33682496992",
  jerome: "33687528406",
  christophe: "33695487249",
  valerie: "33682496984",
  ruben: "33689504543",
  yassine: "33687601575",
};

export async function GET(req: Request, { params }: Params) {
  const { conseiller } = await params;
  const slug = conseiller
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  const numero = CONSEILLERS[slug];
  const destination = numero ? `https://wa.me/${numero}` : new URL("/contact", req.url).toString();
  const response = NextResponse.redirect(destination, { status: 302 });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}
