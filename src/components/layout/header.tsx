"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { AugustVlNoticeHeaderLink } from "@/components/august-vl-notice";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY } from "@/lib/tracking";
import { useAssetUrl } from "@/components/dynamic-media";

const navigation = [
  { name: "Pneus voiture", href: "/pneus-voiture" },
  { name: "Mécanique", href: "/mecanique" },
  { name: "Contrôle technique", href: "/services/prise-en-charge-controle-technique" },
  { name: "Clim", href: "/services/climatisation-auto-montpellier" },
  { name: "Pneus PL", href: "/pneus-utilitaires-pl" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoUrl = useAssetUrl("site_logo", "/logo-recacor.webp");
  const scrollThreshold = 132;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  return (
    <>
      {/* Top info bar */}
      <div className={cn(
        "hidden lg:block fixed top-0 left-0 right-0 z-[51] transition-transform duration-500",
        scrolled ? "-translate-y-full" : "translate-y-0"
      )}>
        <div className="bg-[var(--recacor-night)] text-white text-xs py-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-yellow-400" /> 1240 Route de Nîmes, 34920 Le Crès</span>
              <span className="text-white/50">Lun–Ven 8h–17h · Sam 8h–12h</span>
            </div>
            <PhoneLink location="header" className="flex items-center gap-1.5 font-semibold hover:text-yellow-400 transition-colors">
              <Phone className="h-3 w-3" /> {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "recacor-header-in fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 bg-white shadow-[0_1px_30px_rgba(7,27,51,0.08)] border-b border-slate-200"
            : "top-8 bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="Recacor — Accueil">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Recacor"
                width={153}
                height={32}
                className={cn(
                  "h-7 sm:h-8 w-auto transition-all",
                  scrolled ? "" : "brightness-0 invert"
                )}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    scrolled
                      ? "text-foreground/70 hover:text-blue-700"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <AugustVlNoticeHeaderLink
                className={cn(
                  "ml-1",
                  scrolled ? "" : "border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/15 hover:text-white",
                )}
              />
              <PhoneLink
                location="header"
                className="inline-flex items-center gap-2 rounded-[4px] bg-yellow-400 px-5 py-2.5 text-sm font-black uppercase text-slate-950 transition hover:bg-yellow-300 ml-2"
                showIcon
              >
                Appeler
              </PhoneLink>
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "lg:hidden relative z-50 rounded-[4px] p-2 transition-colors",
                open ? "text-white" : scrolled ? "text-foreground" : "text-white"
              )}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
          <div className="recacor-mobile-menu fixed inset-0 z-40 overflow-y-auto bg-[var(--recacor-night)]">
            <nav className="min-h-full flex flex-col items-center justify-center gap-2 py-32">
              {navigation.map((item, i) => (
                <div
                  key={item.name}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="recacor-mobile-menu-item"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                  className="block py-2 font-heading text-4xl font-black uppercase text-white/70 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              <div className="recacor-mobile-menu-item mt-3" style={{ animationDelay: `${navigation.length * 40}ms` }}>
                <AugustVlNoticeHeaderLink className="border-white/20 bg-white/10 text-white hover:border-white/35 hover:bg-white/15 hover:text-white" />
              </div>
              <div className="recacor-mobile-menu-item mt-8" style={{ animationDelay: `${navigation.length * 40}ms` }}>
                <PhoneLink
                  location="header"
                  className="inline-flex items-center gap-3 rounded-[4px] bg-yellow-400 px-8 py-4 text-lg font-black uppercase text-slate-950"
                  showIcon
                >
                  {PHONE_DISPLAY}
                </PhoneLink>
              </div>
            </nav>
          </div>
        )}
    </>
  );
}
