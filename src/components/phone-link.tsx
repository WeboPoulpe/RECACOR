"use client";

import { pushPhoneClick, PHONE_NUMBER } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import type { ReactNode } from "react";

interface PhoneLinkProps {
  location: "header" | "footer" | "sticky" | "cta" | "page" | "hero" | "formulaire" | "article-footer" | "article-sidebar" | "article-cta";
  serviceType?: "vl" | "pl" | "mecanique";
  phoneNumber?: string;
  className?: string;
  children: ReactNode;
  showIcon?: boolean;
}

export function PhoneLink({
  location,
  serviceType = "vl",
  phoneNumber = PHONE_NUMBER,
  className,
  children,
  showIcon = false,
}: PhoneLinkProps) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={() => pushPhoneClick(location, serviceType)}
      className={cn("phone-link", className)}
    >
      {showIcon && <Phone className="h-4 w-4" />}
      {children}
    </a>
  );
}
