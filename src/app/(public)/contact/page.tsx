"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">Contact</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl text-lg"
          >
            Une question, un devis ? Notre équipe vous répond sous 24h.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {["Devis gratuit", "Réponse sous 24h", "Sans engagement"].map((t) => (
              <div key={t} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white/70 text-xs font-medium">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted to-transparent" />
      </section>

      {/* Form + info */}
      <section className="relative py-20 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-purple-bright/[0.04] border border-border">
                <h2 className="text-xl font-black mb-1">Envoyez-nous un message</h2>
                <p className="text-sm text-muted-foreground mb-8">Remplissez le formulaire, nous vous recontactons rapidement.</p>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Nom</label>
                      <Input placeholder="Votre nom" className="h-11" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Prénom</label>
                      <Input placeholder="Votre prénom" className="h-11" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Email</label>
                      <Input type="email" placeholder="votre@email.fr" className="h-11" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Téléphone</label>
                      <Input type="tel" placeholder="06 XX XX XX XX" className="h-11" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Type de demande</label>
                    <div className="flex flex-wrap gap-2">
                      {["Devis flotte", "Devis particulier", "Dépannage", "Partenariat", "Autre"].map((t) => (
                        <button key={t} type="button" className="px-4 py-2 rounded-full text-xs font-medium border border-border bg-muted text-foreground/70 hover:border-purple-bright/30 hover:text-purple-bright transition-colors">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Décrivez votre besoin..."
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    />
                  </div>
                  <Button className="w-full h-12 bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold rounded-xl text-base hover:shadow-lg hover:shadow-purple-bright/25 transition-shadow">
                    Envoyer ma demande
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              {[
                { icon: Phone, label: "Téléphone", value: "05 XX XX XX XX", desc: "Lun-Ven, 8h-18h" },
                { icon: Mail, label: "Email", value: "contact@recacor.fr", desc: "Réponse sous 24h" },
                { icon: MapPin, label: "Siège social", value: "Sud de la France", desc: "3 centres à votre service" },
                { icon: Clock, label: "Horaires", value: "Lun-Ven : 8h-18h", desc: "Sam : 8h-12h (certains centres)" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-white p-6 flex items-start gap-4 hover:border-purple-bright/20 transition-colors">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-purple-bright/[0.08] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-purple-bright" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-purple-deep to-purple-mid p-8 text-center">
                <MapPin className="w-8 h-8 text-purple-glow mx-auto mb-3" />
                <p className="text-white font-bold text-sm">Bordeaux · Béziers · Montpellier</p>
                <p className="text-white/40 text-xs mt-1">Trouvez le centre le plus proche</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
