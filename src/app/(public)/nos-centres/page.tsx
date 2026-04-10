import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos centres | RECACOR",
  description:
    "Retrouvez tous les centres de maintenance pneumatiques RECACOR près de chez vous.",
};

const centres = [
  {
    name: "Bordeaux",
    address: "Zone industrielle, 33000 Bordeaux",
    phone: "05 XX XX XX XX",
    hours: "Lun-Ven : 8h-18h | Sam : 8h-12h",
  },
  {
    name: "Béziers",
    address: "Zone d'activité, 34500 Béziers",
    phone: "04 XX XX XX XX",
    hours: "Lun-Ven : 8h-18h | Sam : 8h-12h",
  },
  {
    name: "Montpellier",
    address: "Parc d'activité, 34000 Montpellier",
    phone: "04 XX XX XX XX",
    hours: "Lun-Ven : 8h-18h",
  },
];

export default function NosCentresPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            Notre réseau
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nos centres
          </h1>
          <p className="text-white/70 max-w-2xl">
            Trouvez le centre RECACOR le plus proche de chez vous.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centres.map((centre) => (
              <div
                key={centre.name}
                className="rounded-2xl border border-border bg-card p-6 hover:border-purple-bright/40 transition-colors"
              >
                <div className="h-40 rounded-xl mb-5 bg-gradient-to-br from-purple-deep/30 to-purple-mid/20 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-purple-light/40" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">
                  {centre.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-purple-bright mt-0.5 shrink-0" />
                    {centre.address}
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-purple-bright mt-0.5 shrink-0" />
                    {centre.phone}
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-purple-bright mt-0.5 shrink-0" />
                    {centre.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
