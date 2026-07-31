import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/asset/"],
        disallow: ["/merci", "/api/", "/admin", "/admin/"],
      },
    ],
    sitemap: "https://www.recacor.fr/sitemap.xml",
  };
}
