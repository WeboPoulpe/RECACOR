export const PL_JEROME_CONTACT = {
  name: "Jérôme",
  phoneNumber: "+33687528406",
  phoneDisplay: "06 87 52 84 06",
  whatsappUrl: "https://wa.me/33687528406",
  pagePath: "/pneus-utilitaires-pl/lyon-rhone-alpes",
  sectorSummary: "Rhône · Ain · Isère · Loire · Savoie · Haute-Savoie",
} as const;

export const PL_CLAIRE_CONTACT = {
  name: "Claire",
  phoneNumber: "+33682496992",
  phoneDisplay: "06 82 49 69 92",
  whatsappUrl: "https://wa.me/33682496992",
  pagePath: "/pneus-utilitaires-pl/zone-sud-corse",
  sectorSummary: "Sud & Corse · 24 départements",
} as const;

export type PlCommercialContact = typeof PL_JEROME_CONTACT | typeof PL_CLAIRE_CONTACT;

export function getPlCommercialContact(pathname?: string | null) {
  return [PL_JEROME_CONTACT, PL_CLAIRE_CONTACT].find((contact) =>
    pathname === contact.pagePath || pathname === `${contact.pagePath}/merci`
  );
}
