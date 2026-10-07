export const PL_JEROME_CONTACT = {
  name: "Jérôme",
  phoneNumber: "+33687528406",
  phoneDisplay: "06 87 52 84 06",
  whatsappUrl: "https://wa.me/33687528406",
  pagePath: "/pneus-utilitaires-pl/lyon-rhone-alpes",
} as const;

export function getPlCommercialContact(pathname?: string | null) {
  return pathname === PL_JEROME_CONTACT.pagePath ||
    pathname === `${PL_JEROME_CONTACT.pagePath}/merci`
    ? PL_JEROME_CONTACT
    : undefined;
}
