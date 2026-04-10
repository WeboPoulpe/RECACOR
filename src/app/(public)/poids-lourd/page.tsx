import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Truck, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Poids lourd | RECACOR",
  description:
    "Maintenance pneumatiques poids lourds : camions, utilitaires, véhicules de transport. RECACOR, votre partenaire de confiance.",
};

const prestations = [
  "Montage et démontage de pneumatiques",
  "Recreusage et regommage",
  "Maintenance préventive de flotte",
  "Dépannage sur site 24h/24",
  "Contrôle et expertise pneumatiques",
  "Contrats de gestion sur-mesure",
];

export default function PoidsLourdPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            <Truck className="h-3 w-3 mr-1" />
            Poids lourd
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Solutions poids lourd
          </h1>
          <p className="text-white/70 max-w-2xl">
            Des solutions complètes de maintenance pneumatiques pour vos flottes
            et véhicules industriels.
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
                Demander un devis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold mb-4">Bon à savoir</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  RECACOR assure la maintenance préventive et curative de vos
                  pneumatiques poids lourds avec des techniciens certifiés.
                </p>
                <p>
                  Nos équipes interviennent sur site pour minimiser
                  l&apos;immobilisation de vos véhicules.
                </p>
                <p>
                  Nous proposons des contrats de gestion adaptés à la taille de
                  votre flotte et à votre budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
