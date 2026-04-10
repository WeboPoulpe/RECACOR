import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Car, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Particulier | RECACOR",
  description:
    "Entretien et remplacement de pneumatiques pour véhicules particuliers. RECACOR, qualité et proximité.",
};

const prestations = [
  "Montage et équilibrage",
  "Permutation des pneumatiques",
  "Contrôle de pression et géométrie",
  "Réparation de crevaisons",
  "Stockage saisonnier",
  "Conseil personnalisé",
];

export default function ParticulierPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            <Car className="h-3 w-3 mr-1" />
            Particulier
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Solutions particuliers
          </h1>
          <p className="text-white/70 max-w-2xl">
            Entretien et remplacement de pneumatiques pour votre véhicule
            personnel, avec ou sans rendez-vous.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Nos prestations</h2>
              <ul className="space-y-3">
                {prestations.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-bright shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 bg-purple-bright hover:bg-purple-light text-white font-semibold"
                )}
              >
                Prendre rendez-vous
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold mb-4">Bon à savoir</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Nous proposons un large choix de pneumatiques de toutes
                  marques, adaptés à votre véhicule et à votre budget.
                </p>
                <p>
                  Nos techniciens réalisent un diagnostic complet de vos
                  pneumatiques avant toute intervention.
                </p>
                <p>
                  Profitez de nos offres saisonnières pour le changement de vos
                  pneumatiques été/hiver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
