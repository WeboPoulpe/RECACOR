import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — 60 ans d'expertise pneumatique",
  description:
    "Recacor : 60 ans d'expertise en pneumatiques. Origine Espagne, réseau européen, présence en Hérault.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            60 ans d&apos;expertise<br />
            <span className="text-purple-glow">pneumatique</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Recacor est un groupe espagnol spécialisé dans les pneumatiques VL, PL,
            agricoles et industriels, avec plus de 60 ateliers en Espagne et une
            expansion en France.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">
          <h2 className="text-2xl font-black">Notre histoire</h2>
          <p className="text-muted-foreground">
            Fondé en Espagne, avec siège à Córdoba, Recacor a développé depuis plus de
            60 ans une expertise reconnue dans la maintenance de pneumatiques.
          </p>
          <h2 className="text-2xl font-black mt-10">Notre engagement</h2>
          <p className="text-muted-foreground">
            Nous travaillons avec les plus grandes marques (Michelin, Bridgestone,
            Continental, Goodyear, Pirelli, Yokohama) et proposons des alternatives
            économiques adaptées à chaque besoin.
          </p>
        </div>
      </section>
    </>
  );
}
