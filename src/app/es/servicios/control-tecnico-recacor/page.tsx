import type { Metadata } from "next";
import { ControlTecnicoEsClient } from "./client";

export const metadata: Metadata = {
  title: "ITV / control técnico en Le Crès cerca de Montpellier | Recacor",
  description:
    "La ITV (Inspección Técnica de Vehículos) es el equivalente español del control técnico. Recacor prepara y gestiona el paso por el control técnico en Francia desde Le Crès.",
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
    title: "ITV / control técnico en Le Crès cerca de Montpellier | Recacor",
    description:
      "La ITV (Inspección Técnica de Vehículos) es el equivalente español del control técnico. Recacor prepara y gestiona el paso por el control técnico en Francia desde Le Crès.",
    url: "https://www.recacor.fr/es/servicios/control-tecnico-recacor",
    siteName: "Recacor",
    locale: "es_ES",
    type: "website",
  },
};

export default function ControlTecnicoEsPage() {
  return <ControlTecnicoEsClient />;
}
