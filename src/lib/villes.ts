export interface Ville {
  slug: string;
  name: string;
  distance: string;
  description: string;
  cp: string;
}

export const villes: Ville[] = [
  {
    slug: "montpellier",
    name: "Montpellier",
    cp: "34000",
    distance: "10 min",
    description:
      "La capitale de l'Hérault est à seulement 10 minutes de notre garage au Crès. Pas besoin de vous déplacer loin pour trouver les meilleurs prix pneus de la région.",
  },
  {
    slug: "lattes",
    name: "Lattes",
    cp: "34970",
    distance: "15 min",
    description:
      "Entre Montpellier et la mer, Lattes est à 15 minutes de nos ateliers. Venez changer vos pneus en toute simplicité sans rendez-vous.",
  },
  {
    slug: "lunel",
    name: "Lunel",
    cp: "34400",
    distance: "20 min",
    description:
      "À 20 minutes du Crès via l'A9, Lunel est une ville rapidement accessible. Nos techniciens vous attendent pour pneus, vidange et parallélisme.",
  },
  {
    slug: "le-cres",
    name: "Le Crès",
    cp: "34920",
    distance: "Notre garage",
    description:
      "Notre garage principal est installé au Crès, 1240 Route de Nîmes. Un accueil chaleureux, un stock immédiat et des prix imbattables.",
  },
];

export const findVille = (slug: string) => villes.find((v) => v.slug === slug);
