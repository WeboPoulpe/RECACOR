import type { Metadata } from "next";
import { GaragePlClient } from "./client";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Garage poids lourd - pneus, géométrie et freins camion",
  description:
    "Atelier poids lourd au Crès, près de Montpellier : pneus, parallélisme et géométrie, disques et plaquettes de frein, recreusage, pour camions, remorques et engins.",
  alternates: { canonical: "/garage-poids-lourd" },
  openGraph: {
    title: "Garage poids lourd au Crès - Recacor",
    description:
      "Pneus poids lourd, parallélisme et géométrie, disques et plaquettes de frein, recreusage, au Crès près de Montpellier.",
    url: "https://www.recacor.fr/garage-poids-lourd",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function GaragePoidsLourdPage() {
  const heroImage = await getAsset("pl_hero_image", "");
  return <GaragePlClient heroImage={heroImage} />;
}
