"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY, PHONE_WHATSAPP_PL, PHONE_WHATSAPP_PL_DISPLAY, isFrenchPlCallPage } from "@/lib/tracking";

export function FooterPhoneLink() {
  const isAssistancePL = isFrenchPlCallPage(usePathname());

  return (
    <PhoneLink
      location="footer"
      serviceType={isAssistancePL ? "pl" : "vl"}
      phoneNumber={isAssistancePL ? PHONE_WHATSAPP_PL : undefined}
      className="flex items-center gap-2.5 text-sm text-white hover:text-purple-glow transition-colors font-semibold"
    >
      <Phone className="h-4 w-4 text-purple-glow shrink-0" />
      {isAssistancePL ? PHONE_WHATSAPP_PL_DISPLAY : PHONE_DISPLAY}
    </PhoneLink>
  );
}
