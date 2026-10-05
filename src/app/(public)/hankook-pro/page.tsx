import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Truck, MapPin, Check, Factory, Wrench, Globe2, Handshake } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { PHONE_DISPLAY } from "@/lib/tracking";

export const revalidate = 86400;

// Page d'atterrissage des publicités Meta Hankook PL : volontairement hors référencement.
export const metadata: Metadata = {
  title: "Pneus poids lourd Hankook AM09 et DM09 | Recacor",
  description: "Demandez votre tarif professionnel pour les pneus poids lourd Hankook AM09 et DM09. Livraison partout en France.",
  alternates: { canonical: "/hankook-pro" },
  robots: { index: false, follow: false },
};

const points = [
  "AM09 : toutes positions, chantier et usage mixte",
  "DM09 : moteur et traction",
  "Tarif professionnel selon vos dimensions",
  "Livraison partout en France",
];

const profils = [
  {
    nom: "Hankook SmartWork AM09",
    accroche: "Toutes positions",
    image: "/images/hankook/hankook-smartwork-am09-profil.webp",
    alt: "Pneu poids lourd Hankook SmartWork AM09, profil toutes positions",
    largeur: 261,
    hauteur: 412,
    usage: "Un seul profil pour tous les essieux de vos véhicules de chantier : directeur, moteur et remorque.",
    atouts: [
      "Pneu mixte route et chantier (on/off road), pour les bennes et l'usage mixte",
      "Barrettes de liaison au centre : meilleure tenue en ligne droite et dispersion des chocs",
      "Épaulement fermé : stabilité et usure plus régulière",
    ],
  },
  {
    nom: "Hankook SmartWork DM09",
    accroche: "Moteur et traction",
    image: "/images/hankook/hankook-smartwork-dm09-profil.webp",
    alt: "Pneu poids lourd Hankook SmartWork DM09, profil moteur et traction",
    largeur: 620,
    hauteur: 996,
    usage: "Le profil des essieux moteurs : il transmet la puissance et garde l'adhérence sur chaussée mouillée ou terrain boueux.",
    atouts: [
      "Sculpture directionnelle et rainures en zigzag pour la traction et le freinage",
      "Éjecteurs de pierres qui gardent les rainures dégagées",
      "Pneu mixte route et chantier (on/off road), pour les camions qui travaillent sur site",
    ],
  },
];

const choisir = [
  { titre: "Vous roulez sur chantier, en benne ou en usage mixte", texte: "L'AM09 convient à toutes les positions : vous gardez le même profil sur tout le véhicule." },
  { titre: "Vous équipez un essieu moteur", texte: "Le DM09 est conçu pour la traction. Indiquez vos dimensions, nous vérifions la disponibilité." },
  { titre: "Vous hésitez entre les deux", texte: "Donnez-nous votre véhicule et votre usage, un commercial vous conseille le bon profil par essieu." },
];

const hankook = [
  {
    Icon: Globe2,
    titre: "Une marque mondiale depuis 1941",
    texte: "Hankook est un fabricant sud-coréen fondé en 1941. Il produit dans 12 usines réparties sur 8 pays.",
  },
  {
    Icon: Factory,
    titre: "Choisi par les constructeurs",
    texte: "Ses pneus poids lourd équipent des véhicules neufs en première monte, notamment les remorques Schmitz Cargobull.",
  },
  {
    Icon: Wrench,
    titre: "Conçu aussi en Europe",
    texte: "Hankook dispose d'un centre technique européen à Hanovre, en Allemagne, depuis 1997.",
  },
  {
    Icon: Truck,
    titre: "Une gamme complète",
    texte: "SmartFlex pour la route, SmartWork pour l'usage mixte route et chantier : un profil pour chaque essieu.",
  },
];

export default function HankookProPage() {
  return (
    <main>
      <section className="bg-[#ffd500] pt-24 pb-8">
        <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="text-[#041a3d]">
            <p className="text-xs font-black uppercase tracking-widest">Arrivage Hankook PL</p>
            <h1 className="mt-2 text-4xl font-black leading-[1.05] sm:text-5xl">
              Gros pneus.
              <br />
              Petits prix.
            </h1>
            <ul className="mt-5 space-y-2 text-sm font-semibold sm:text-base">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href="#demande"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#041a3d] px-5 py-4 text-base font-black text-white sm:w-auto"
            >
              Demandez votre tarif
            </a>
          </div>
          <Image
            src="/images/hankook/hankook-gros-pneus-petits-prix-4x5.webp"
            alt="Pneus poids lourd Hankook AM09 et DM09, livraison partout en France"
            width={1080}
            height={1350}
            priority
            sizes="(max-width: 767px) 100vw, 40vw"
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-black sm:text-3xl">Deux profils pour le chantier et la route</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Les Hankook SmartWork AM09 et DM09 sont des pneus mixtes route et chantier. Voici à quoi sert chacun.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {profils.map((profil) => (
              <article key={profil.nom} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-5">
                <div className="flex h-56 items-center justify-center rounded-lg bg-[#f4f4f1]">
                  <Image
                    src={profil.image}
                    alt={profil.alt}
                    width={profil.largeur}
                    height={profil.hauteur}
                    loading="lazy"
                    sizes="(max-width: 767px) 40vw, 20vw"
                    className="h-48 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#11296d]">{profil.accroche}</p>
                  <h3 className="mt-1 text-xl font-black">{profil.nom}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{profil.usage}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {profil.atouts.map((atout) => (
                      <li key={atout} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#11296d]" />
                        {atout}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-black">Quel profil choisir ?</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {choisir.map((item) => (
              <div key={item.titre} className="rounded-xl bg-[#fff8cc] p-4">
                <h3 className="text-sm font-black text-[#041a3d]">{item.titre}</h3>
                <p className="mt-1 text-sm text-[#041a3d]/80">{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f1] py-10">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-black sm:text-3xl">Pourquoi des pneus Hankook ?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Un fabricant reconnu et une gamme poids lourd qui couvre la route comme le chantier.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hankook.map(({ Icon, titre, texte }) => (
              <article key={titre} className="rounded-xl bg-white p-5">
                <Icon className="h-6 w-6 text-[#11296d]" />
                <h3 className="mt-3 text-base font-black">{titre}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{texte}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#11296d] p-5 text-white">
            <Handshake className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">
              <strong>Chez Recacor :</strong> un interlocuteur commercial dédié, la vérification des dimensions avant commande,
              l'atelier du Crès pour le montage et la livraison partout en France.
            </p>
          </div>
        </div>
      </section>

      <section id="demande" className="bg-background py-10">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-black">Votre tarif professionnel</h2>
          <p className="mb-5 mt-2 text-sm text-muted-foreground">
            Indiquez vos dimensions, la quantité et vos coordonnées. Un commercial vous répond avec la disponibilité et le tarif.
          </p>
          <div className="rounded-xl border border-border bg-white p-4 sm:p-6">
            <DevisPlForm />
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-xl bg-[#11296d] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Truck className="h-4 w-4" /> Besoin immédiat ? Appelez le service PL.
            </p>
            <PhoneLink
              location="cta"
              serviceType="pl"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-black text-[#10244a]"
              showIcon
            >
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Atelier Recacor, Le Crès (34920), livraison en France entière.
          </p>
        </div>
      </section>
    </main>
  );
}
