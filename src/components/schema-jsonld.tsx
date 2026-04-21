import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <Script
      id={`breadcrumb-${items[items.length - 1].name.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "AutoRepair", name: "Recacor" },
    areaServed: "Montpellier, Hérault",
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "EUR",
      },
    }),
  };
  return (
    <Script
      id={`service-${name.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  q: string;
  a: string;
}

export function FaqJsonLd({ items, id = "faq" }: { items: FaqItem[]; id?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <Script
      id={`faq-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
