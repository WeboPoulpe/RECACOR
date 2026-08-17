"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DevisVlForm = dynamic(() => import("@/components/forms/devis-vl").then((module) => module.DevisVlForm), {
  ssr: false,
});
const AvisSection = dynamic(() => import("@/components/avis-section").then((module) => module.AvisSection), {
  ssr: false,
});
const HomeBlogPreviewClient = dynamic(
  () => import("@/components/home-blog-preview-client").then((module) => module.HomeBlogPreviewClient),
  { ssr: false },
);

function useNearViewport() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) {
      window.setTimeout(() => setReady(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return { hostRef, ready };
}

export function DeferredDevisVlForm() {
  const { hostRef, ready } = useNearViewport();
  return <div ref={hostRef} className="min-h-[580px]">{ready ? <DevisVlForm /> : null}</div>;
}

export function DeferredAvisSection() {
  const { hostRef, ready } = useNearViewport();
  return <div ref={hostRef} className="min-h-[620px]">{ready ? <AvisSection /> : null}</div>;
}

export function DeferredHomeBlogPreview() {
  const { hostRef, ready } = useNearViewport();
  return <div ref={hostRef}>{ready ? <HomeBlogPreviewClient /> : null}</div>;
}
