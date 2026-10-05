"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY, PHONE_PL_SUIVI, PHONE_PL_SUIVI_DISPLAY, PHONE_WHATSAPP_PL, PHONE_WHATSAPP_PL_DISPLAY, isFrenchPlCallPage, isPlTrackingPage } from "@/lib/tracking";

export function FooterPhoneLink() {
  const pathname = usePathname();
  const isAssistancePL = isFrenchPlCallPage(pathname);
  const isPlTracking = isPlTrackingPage(pathname);

  return (
    <PhoneLink
      location="footer"
      serviceType={isAssistancePL ? "pl" : "vl"}
      phoneNumber={isPlTracking ? PHONE_PL_SUIVI : isAssistancePL ? PHONE_WHATSAPP_PL : undefined}
      className="flex items-center gap-2.5 text-sm text-white hover:text-purple-glow transition-colors font-semibold"
    >
      <Phone className="h-4 w-4 text-purple-glow shrink-0" />
      {isPlTracking ? PHONE_PL_SUIVI_DISPLAY : isAssistancePL ? PHONE_WHATSAPP_PL_DISPLAY : PHONE_DISPLAY}
    </PhoneLink>
  );
}
