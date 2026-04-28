import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RECACOR | Spécialiste pneumatiques Montpellier — Le Crès",
  description:
    "RECACOR, spécialiste pneus VL, poids lourd, agricole et recreusage à Montpellier — Le Crès. Devis rapide, assistance PL Hérault, 60 ans d'expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = SITE_CONFIG.gtmId;
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        <Script id="gtm-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500,
            });
            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
