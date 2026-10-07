"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getPlCommercialContact } from "@/lib/pl-commercial-contact";
import { PhoneLink } from "@/components/phone-link";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

// Le pied de page local reste inchangé ailleurs. Ce parcours commercial dispose
// de son propre contact et présente les partenaires de son secteur.
export function FooterRouting({ children }: { children: ReactNode }) {
  const contact = getPlCommercialContact(usePathname());
  if (!contact) return children;

  return (
    <footer className="bg-[var(--recacor-night)] pb-24 pt-10 text-white lg:pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "@id": "https://www.recacor.fr/#organization", name: "Recacor", url: "https://www.recacor.fr" }) }} />
      <div className="recacor-shell grid gap-8 sm:grid-cols-2">
        <div><p className="font-heading text-4xl font-black">RECACOR</p><p className="mt-3 text-sm leading-7 text-white/75">Pneus poids lourd, livraison et partenaires d’intervention dans le secteur de Jérôme.</p><p className="mt-2 text-xs leading-6 text-white/60">Rhône · Ain · Isère · Loire · Savoie · Haute-Savoie</p></div>
        <div className="space-y-4"><p className="font-bold">Votre contact : Jérôme</p><PhoneLink location="footer" serviceType="pl" phoneNumber={contact.phoneNumber} className="block text-sm underline underline-offset-4">Appeler le {contact.phoneDisplay}</PhoneLink><a href={contact.whatsappUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400"><MessageCircle className="h-4 w-4" /> Écrire sur WhatsApp</a></div>
      </div>
      <div className="recacor-shell mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-xs text-white/65"><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link><Link href="/cgv">CGV</Link><CookieSettingsButton /></div>
    </footer>
  );
}
