import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { Onboarding } from "@/components/onboarding";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Onboarding />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
