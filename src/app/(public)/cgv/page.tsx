import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV Recacor.",
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">Conditions générales de vente</h1>
        <p className="text-muted-foreground">Contenu CGV à compléter.</p>
      </div>
    </section>
  );
}
