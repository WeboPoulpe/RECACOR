import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { StickyCallButton } from "@/components/sticky-call-button";
import { CookieBanner } from "@/components/cookie-banner";
import { UtmCapture } from "@/components/gtm";
import { AssetsProvider } from "@/components/dynamic-media";

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return (
    <AssetsProvider>
      <UtmCapture />
      <ScrollProgress />
      <Header />
      <main className="flex-1" lang="es">{children}</main>
      <Footer />
      <StickyCallButton />
      <CookieBanner />
    </AssetsProvider>
  );
}
