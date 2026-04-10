import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | RECACOR",
  description:
    "Contactez RECACOR pour toute question sur la maintenance de vos pneumatiques.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            Contact
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-white/70 max-w-2xl">
            Une question, un devis ? Notre équipe est à votre disposition.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold mb-6">
                Envoyez-nous un message
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nom"
                      className="text-sm text-muted-foreground mb-1.5 block"
                    >
                      Nom
                    </label>
                    <Input id="nom" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label
                      htmlFor="prenom"
                      className="text-sm text-muted-foreground mb-1.5 block"
                    >
                      Prénom
                    </label>
                    <Input id="prenom" placeholder="Votre prénom" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.fr"
                  />
                </div>
                <div>
                  <label
                    htmlFor="telephone"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Téléphone
                  </label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="06 XX XX XX XX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Votre message..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <Button className="w-full bg-purple-bright hover:bg-purple-light text-white font-semibold h-11">
                  Envoyer le message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Infos */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-bright" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    contact@recacor.fr
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-purple-bright" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Téléphone</h3>
                  <p className="text-sm text-muted-foreground">
                    05 XX XX XX XX
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-purple-bright" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-sm text-muted-foreground">
                    Siège social RECACOR
                    <br />
                    France & Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
