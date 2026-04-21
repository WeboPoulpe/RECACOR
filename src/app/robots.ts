import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/merci", "/api/"],
      },
    ],
    sitemap: "https://recacor.fr/sitemap.xml",
  };
}
