import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AugustVlNotice } from "@/components/august-vl-notice";
import { ScrollProgress } from "@/components/scroll-progress";
import { StickyCallButton } from "@/components/sticky-call-button";
import { CookieBanner } from "@/components/cookie-banner";
import { UtmCapture } from "@/components/gtm";
import { AssetsProvider } from "@/components/dynamic-media";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssetsProvider>
      <UtmCapture />
      <ScrollProgress />
      <Header />
      <div className="pt-16 lg:pt-24">
        <div className="recacor-shell pt-2 lg:pt-3">
          <AugustVlNotice compact className="rounded-[4px]" />
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCallButton />
      <CookieBanner />
    </AssetsProvider>
  );
}
