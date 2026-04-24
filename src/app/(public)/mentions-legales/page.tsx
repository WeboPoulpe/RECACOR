import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Recacor.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">Mentions légales</h1>
        <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
          <p><strong>Éditeur :</strong> Recacor — SARL au capital de [X] €</p>
          <p><strong>Siège social :</strong> 1240 Route de Nîmes, 34920 Le Crès</p>
          <p><strong>Téléphone :</strong> 06 07 62 10 43</p>
          <p><strong>Email :</strong> contact@recacor.fr</p>
          <p><strong>SIRET :</strong> [à compléter]</p>
          <p><strong>Directeur de publication :</strong> [à compléter]</p>
          <p><strong>Hébergeur :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
        </div>
      </div>
    </section>
  );
}
