import type { Metadata } from "next";
import { ContactClient } from "./client";

export const metadata: Metadata = {
  title: "Contact Recacor — Garage Pneus Montpellier Le Crès",
  description:
    "Contactez Recacor au Crès : téléphone, formulaire, horaires et itinéraire. Réponse sous 1h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactClient />;
}
