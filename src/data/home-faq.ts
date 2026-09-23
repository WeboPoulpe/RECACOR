export interface HomeFaqItem {
  q: string;
  a: string;
}

export interface HomeFaqCategory {
  label: string;
  icon: "car" | "wrench" | "snowflake" | "truck";
  items: HomeFaqItem[];
}

export const HOME_FAQ_CATEGORIES: HomeFaqCategory[] = [
  {
    label: "Pneus voiture",
    icon: "car",
    items: [
      {
        q: "Quel est le prix d'un pneu monté à Montpellier ?",
        a: "Chez Recacor Le Crès, le pneu voiture monté commence à partir de 45€. Le prix exact dépend de la dimension, de la marque et de la disponibilité du stock.",
      },
      {
        q: "Faut-il prendre rendez-vous pour changer ses pneus ?",
        a: "Vous pouvez passer sans rendez-vous selon l'affluence atelier. Pour une dimension précise ou un jeu complet, il est conseillé d'appeler avant de venir.",
      },
      {
        q: "Quelles marques de pneus sont disponibles ?",
        a: "Recacor travaille avec Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook, Yokohama, BFGoodrich et des marques budget selon les dimensions.",
      },
    ],
  },
  {
    label: "Mécanique",
    icon: "wrench",
    items: [
      {
        q: "Quel est le tarif d'une vidange au Crès ?",
        a: "La vidange commence à partir de 79€, selon le véhicule, l'huile utilisée et le filtre. Un devis peut être demandé en ligne ou par téléphone.",
      },
      {
        q: "Combien coûte un parallélisme ?",
        a: "Le réglage du parallélisme commence à partir de 65€. Le contrôle est offert afin de confirmer si un réglage est vraiment nécessaire.",
      },
      {
        q: "Peut-on grouper pneus, vidange et parallélisme ?",
        a: "Oui. Beaucoup de clients profitent du passage pneus pour contrôler la géométrie, faire la vidange ou vérifier le freinage.",
      },
    ],
  },
];
