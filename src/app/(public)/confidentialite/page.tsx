import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité Recacor, conforme RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">Politique de confidentialité</h1>
        <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
          <p>
            Recacor s&apos;engage à protéger vos données personnelles conformément au
            Règlement Général sur la Protection des Données (RGPD).
          </p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Données collectées</h2>
          <p>
            Via les formulaires de contact et de devis, nous collectons : nom, prénom,
            téléphone, email, code postal et toute information que vous nous transmettez
            volontairement.
          </p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Utilisation des données</h2>
          <p>
            Vos données sont utilisées uniquement pour répondre à votre demande, établir
            un devis et vous recontacter. Elles ne sont jamais revendues.
          </p>
          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
            de suppression et de portabilité de vos données. Contactez-nous à contact@recacor.fr.
          </p>
        </div>
      </div>
    </section>
  );
}
