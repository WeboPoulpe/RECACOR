import type { Metadata } from "next";
import { ControlTecnicoEsClient } from "./client";

export const metadata: Metadata = {
  title: "Control técnico en Le Crès cerca de Montpellier | Recacor",
  description:
    "Precontrol gratuito, presupuesto y gestión del paso por el control técnico desde el taller Recacor de Le Crès.",
  alternates: { canonical: "/es/servicios/control-tecnico-recacor" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "Control técnico en Le Crès cerca de Montpellier | Recacor",
    description:
      "Precontrol gratuito, presupuesto y gestión del paso por el control técnico desde el taller Recacor de Le Crès.",
    url: "https://www.recacor.fr/es/servicios/control-tecnico-recacor",
    siteName: "Recacor",
    locale: "es_ES",
    type: "website",
  },
};

export default function ControlTecnicoEsPage() {
  return <ControlTecnicoEsClient />;
}
