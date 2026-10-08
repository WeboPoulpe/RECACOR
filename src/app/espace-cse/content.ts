// Source : convention de partenariat CE/CSE transmise par Redouane le 08/10/2026.
// Les taux de remise restent hors du contenu tant que leur affichage n’est pas confirmé.
export const partnershipBenefits = [
  { category: "Pneus premium", title: "Vos marques premium", description: "Des conditions réservées aux adhérents du CSE sur les pneus premium, selon la prestation et les conditions de la convention.", icon: "tyre" },
  { category: "Pneus seconde ligne / éco-budget", title: "Un choix selon votre budget", description: "Le partenariat couvre aussi les pneus seconde ligne et éco-budget. L’atelier vous accompagne dans le choix de la gamme et de la dimension.", icon: "car" },
  { category: "Révisions, vidange et mécanique", title: "L’entretien au même endroit", description: "Les avantages du partenariat s’étendent aux révisions, à la vidange et à la mécanique, avec un devis détaillé avant toute intervention.", icon: "wrench" },
] as const;

export const partnershipFaq = [
  { q: "À qui s’adresse le partenariat CSE Recacor ?", a: "Le partenariat s’adresse aux comités sociaux et économiques d’établissements dont les adhérents peuvent se rendre au garage Recacor du Crès, près de Montpellier. Un représentant du CSE prépare la convention avec Recacor et désigne un référent pour son suivi." },
  { q: "Comment les salariés bénéficient-ils des avantages ?", a: "Une fois la convention signée, les adhérents du CSE présentent un justificatif d’appartenance lors de leur passage chez Recacor : carte d’adhérent ou attestation du CSE. Les conditions prévues dans leur convention s’appliquent aux prestations concernées." },
  { q: "Quelles prestations sont concernées ?", a: "La convention prévoit des avantages sur les pneus premium, les pneus seconde ligne ou éco-budget, ainsi que sur les révisions, la vidange et la mécanique. Le taux appliqué par prestation est précisé avec Recacor dans la convention, sur les tarifs publics en vigueur." },
  { q: "Les remises CSE se cumulent-elles avec les autres offres ?", a: "Les remises de la convention ne sont pas cumulables avec d’autres offres, sauf accord écrit de Recacor. Le devis permet de connaître le tarif applicable avant l’intervention." },
  { q: "Le formulaire signe-t-il la convention de partenariat ?", a: "Non. Il transmet à Recacor les informations nécessaires pour préparer la convention : établissement, adresse, représentant et référent. Les conditions, la durée, la reconduction et le préavis sont définis dans la convention, puis celle-ci est signée séparément par les deux parties." },
  { q: "Faut-il transmettre une liste des salariés ?", a: "Non. Le formulaire demande uniquement les coordonnées de l’établissement et de ses interlocuteurs. Ne transmettez pas de liste d’adhérents ni de données personnelles les concernant. Leur appartenance au CSE est justifiée lors du passage au garage." },
] as const;
