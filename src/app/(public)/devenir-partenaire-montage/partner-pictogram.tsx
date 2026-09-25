import type { ReactNode } from "react";

export type PictogramKind =
  | "garage"
  | "calendar"
  | "payment"
  | "customers"
  | "pricing"
  | "tyre"
  | "mechanic"
  | "alignment"
  | "climate"
  | "services";

const shapes: Record<PictogramKind, ReactNode> = {
  garage: <><path d="M10 29 32 13l22 16v23H10z" /><path d="M21 52V35h22v17M27 42h10" /><path d="m18 25 14-10 14 10" className="accent" /></>,
  calendar: <><rect x="12" y="17" width="40" height="35" rx="4" /><path d="M12 27h40M22 12v10M42 12v10M22 36h7m7 0h7m-21 8h7" /><path d="M39 43h7" className="accent" /></>,
  payment: <><rect x="10" y="18" width="44" height="30" rx="5" /><path d="M10 28h44M18 39h10" /><circle cx="43" cy="39" r="5" className="accent-fill" /></>,
  customers: <><circle cx="32" cy="22" r="8" /><circle cx="16" cy="28" r="6" /><circle cx="48" cy="28" r="6" /><path d="M17 51c0-9 6-15 15-15s15 6 15 15M5 49c0-6 4-11 11-12m43 12c0-6-4-11-11-12" /><path d="M29 15a8 8 0 0 1 9 8" className="accent" /></>,
  pricing: <><path d="M13 18h23l16 16-18 18-21-21z" /><circle cx="23" cy="27" r="3" className="accent-fill" /><path d="M30 37h11m-5-5v11" className="accent" /></>,
  tyre: <><circle cx="32" cy="33" r="20" /><circle cx="32" cy="33" r="8" className="accent" /><path d="M32 13v12m0 16v12M12 33h12m16 0h12M18 19l9 9m10 10 9 9m0-28-9 9m-10 10-9 9" /></>,
  mechanic: <><path d="m15 17 8 8-8 8-5-5a12 12 0 0 0 15 15l17-17a12 12 0 0 0-15-15l5 5-8 8z" /><path d="m35 39 12 12 7-7-12-12" className="accent" /></>,
  alignment: <><circle cx="17" cy="32" r="9" /><circle cx="47" cy="32" r="9" /><path d="M26 32h12M8 15v-5m0 0 5 5m-5-5-5 5M56 49v5m0 0-5-5m5 5 5-5" className="accent" /><path d="M27 26h10m-10 12h10" /></>,
  climate: <><path d="M32 11v42M14 21l36 22M14 43l36-22" /><path d="m32 11-5 6m5-6 5 6M32 53l-5-6m5 6 5-6M14 21l8 1m-8-1 3 7m33-7-8 1m8-1-3 7M14 43l8-1m-8 1 3-7m33 7-8-1m8 1-3-7" className="accent" /></>,
  services: <><path d="M12 25h40v27H12zM8 25l5-12h38l5 12M26 25v27m12-27v27" /><path d="M24 17h16" className="accent" /><path d="M19 34h3m20 0h3m-26 8h3m20 0h3" /></>,
};

export function PartnerPictogram({ kind, className = "" }: { kind: PictogramKind; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" role="img" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#EAF2FB" />
      <g stroke="#123B67" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">{shapes[kind]}</g>
      <style>{`.accent{stroke:#F2B900}.accent-fill{fill:#F2B900;stroke:#F2B900}`}</style>
    </svg>
  );
}
