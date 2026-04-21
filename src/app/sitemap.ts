import type { MetadataRoute } from "next";
import { villes } from "@/lib/villes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://recacor.fr";
  const now = new Date();

  const staticRoutes = [
    "",
    "/pneus-voiture",
    "/mecanique",
    "/pneus-utilitaires-pl",
    "/services/vidange",
    "/services/parallelisme-geometrie",
    "/services/recreusage",
    "/nos-centres",
    "/blog",
    "/contact",
    "/maquette",
    "/a-propos",
    "/mentions-legales",
    "/cgv",
    "/confidentialite",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...villes.map((v) => ({
      url: `${base}/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
