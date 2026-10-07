# Faits Recacor publiables — source unique des chiffres du site

Règle : un fait absent de ce fichier ne s'écrit pas sur le site. Il va dans « À faire confirmer » et la page est rédigée sans lui.
Mise à jour : 01/10/2026 (ajout : pneus de voiture électrique, page `/pneus-voiture-electrique`).

## Identité

| Fait | Valeur | Source |
|---|---|---|
| Nom | Recacor | site, fiche Google |
| Atelier principal | 1240 Route de Nîmes, 34920 Le Crès (près de Montpellier) | `PROJET_RECACOR/knowledge/business.md` |
| Standard | 04 99 53 33 90 | `src/lib/tracking.ts` |
| Horaires atelier du Crès | lundi–vendredi 8 h–12 h / 14 h–18 h, samedi 8 h–12 h, dimanche fermé | fiche Google vérifiée le 14/09/2026 (`knowledge/business.md`) |
| Autres sites cités pour le PL | Servian, Vergèze | page `/depannage-poids-lourd-urgence` en ligne depuis le 17/09/2026 |

## Dépannage pneu poids lourd

| Fait | Valeur | Source |
|---|---|---|
| Flotte | une dizaine de camions d'intervention | Redouane, 30/09/2026 |
| Équipement | chaque camion a du stock de pneus pour réparer ou remplacer sur place | Redouane, 30/09/2026 |
| Zone | le long de l'A9 de Perpignan à Avignon, et de l'A75 jusqu'à Millau | Redouane, 30/09/2026 |
| Autoroute | pas d'intervention sur l'autoroute elle-même ; les PL sortent souvent à la prochaine sortie pour se faire dépanner, ce qui leur coûte moins cher qu'un dépannage sur autoroute. Argument à mettre en avant ; ne jamais mettre en avant l'agrément, la borne orange ou le 112 | Redouane, 30/09/2026 |
| Disponibilité | 24 h/24, 7 j/7, astreinte midi, soir, nuit et week-end | page dépannage, `knowledge/tarifs.md` |
| Ligne PL France | Patrick, 06 07 62 10 43 (appel et WhatsApp) : contact des pages PL françaises existantes de dépannage, garage et pneus PL ; exception commerciale Jérôme sur la nouvelle page Lyon / Rhône-Alpes (GO du 07/10/2026) | Redouane, 30/09/2026 ; `src/lib/tracking.ts` |
| Ligne chauffeurs étrangers | Rubén, 06 89 50 45 43 (page roumaine) | `src/lib/tracking.ts` |
| Langues au téléphone | anglais, italien, polonais, roumain, portugais | page dépannage en ligne |
| Périmètre | pneus uniquement, pas de mécanique | page `/pneus-utilitaires-pl`, section assistance |
| Recreusage | en atelier seulement, jamais sur route | page dépannage |

## Atelier poids lourd du Crès

| Fait | Valeur | Source |
|---|---|---|
| Véhicules | camions, remorques, engins de chantier | page `/pneus-utilitaires-pl#atelier` |
| Prestations | parallélisme et géométrie, montage et démontage, réparation, recreusage si la carcasse le permet | page `/pneus-utilitaires-pl#atelier` |
| Freinage | disques et plaquettes de frein pour camions | Redouane, 30/09/2026 |
| Comptoir | pneus poids lourd disponibles au comptoir, devis sur place | page `/pneus-utilitaires-pl#atelier` |
| Mécanique moteur | non (pneus, géométrie et freinage seulement) | section assistance de `/pneus-utilitaires-pl`, Redouane 30/09/2026 |

## Vente de pneus PL — Lyon / secteur Rhône-Alpes (07/10/2026)

| Fait | Valeur | Source |
|---|---|---|
| Contact commercial | Jérôme Mesnard, appel et WhatsApp 06 87 52 84 06 | `knowledge/business.md`, `04_Ressources/commerciaux_zones_pl.md`, raccord AdsFlow/Meta consigné le 07/10 |
| Zone de cette page | Rhône (69), Ain (01), Isère (38), Loire (42), Savoie (73), Haute-Savoie (74) | répartition commerciale validée, pilote du 07/10 dans `SUIVI_JOURNAL.md` |
| Limite géographique | Ardèche (07) et Drôme (26) affectées à Claire ; ne pas les présenter comme secteur de Jérôme | `04_Ressources/commerciaux_zones_pl.md` |
| Livraison | France entière ; disponibilité selon dimension et quantité, délai confirmé avant commande | `knowledge/business.md` (livraison), page `/preventes-hankook` (confirmation avant commande) |
| Partenaires secteur Jérôme | des partenaires peuvent intervenir ; commune, besoin, disponibilité et conditions à confirmer avec Jérôme | Redouane, correction explicite dans cette conversation, 07/10/2026 |
| Hankook SmartWork AM09 | pneu mixte route/chantier, toutes positions | page `/hankook-pro`, profils déjà publiés |
| Hankook SmartWork DM09 | pneu mixte route/chantier, essieux moteurs / traction | page `/hankook-pro`, profils déjà publiés |
| Parcours commercial | dimension (ou photo du flanc), quantité, essieu, usage et commune pour préparer le devis | modèles Jérôme validés/préparés le 28/09, campagne du 07/10 |
| Autorisation page | création d'une nouvelle page Lyon / Rhône-Alpes avec Jérôme comme contact, sans bascule des pages existantes | Redouane, conversation Codex du 07/10/2026 |

Ne pas parler du Crès sur ce parcours commercial (correction explicite Redouane, 07/10). Ne pas inventer de nom de partenaire, prestation précise, disponibilité 24/7, délai d’intervention ou tarif. Les interventions des partenaires sont étudiées selon la commune et le besoin. Aucun stock garanti ni délai de livraison chiffré. Les profils chantier ne sont pas présentés comme une gamme universelle de pneus routiers.

## Pneus de voiture électrique (faits externes sourcés, recherche du 01/10/2026)

Faits généraux cités sur `/pneus-voiture-electrique`. Ce ne sont pas des engagements de Recacor.

| Fait | Valeur | Source |
|---|---|---|
| Profondeur minimale légale | 1,6 mm | arrêté du 24/10/1994 relatif aux pneumatiques |
| Restitution LLD/LOA | certains guides de restitution facturent les pneus sous 4 mm (50 % d'usure) : Volkswagen Financial Services (VW, Audi), Mazda Lease | vwfs.fr, guides de restitution VW et Audi (PDF) ; guide Mazda Lease professionnels (PDF) |
| Restitution, même marque | Mazda Lease : même marque sur un même train, pneus conformes aux spécifications constructeur | guide Mazda Lease professionnels (PDF) |
| Forfait pneus inclus | certains contrats imposent le réseau du loueur ou de la marque pour le remplacement (ex. Free2Move Lease Belgique) | guide conducteur Stellantis Financial Services (PDF) |
| Autre marque que l'origine | autorisée si la dimension est celle de la réception du véhicule et les indices de charge et de vitesse au moins égaux | TNPF, fiche synthèse conformité montage VL |
| Même essieu | interdit de monter deux marques ou modèles différents sur le même essieu | TNPF, « montage de pneus de marques différentes » |
| Usure | pneus de VE : environ 10 000 km de moins (≈ 29 000 km contre 39 000 km) ; permutation conseillée tous les 10 000 à 15 000 km | Hyundai France, FAQ électrique |
| Monte décalée | ne pas permuter avant/arrière quand les dimensions diffèrent | manuel d'atelier Tesla Model 3 |
| Indice HL | « High Load » : environ 25 % de charge en plus qu'un pneu standard, pensé pour VE et hybrides rechargeables | Continental, communiqué du 21/01/2021 |
| Homologations | AO (Audi), étoile (BMW), MO (Mercedes), N0, N1… (Porsche), T0 (Tesla) | Allopneus, guide exigences constructeurs ; greendrive-accessories (Tesla) |
| Exemples de montes décalées | Porsche Taycan 225/55 R19 / 275/45 R19 ; Mercedes EQE 255/45 R19 / 285/40 R19 ; Tesla Model Y Performance 255/35 R21 / 275/35 R21 ; BMW i4 M50 245/40 R19 / 255/40 R19 (selon finition et jantes) | autotijd.be, reifen.com, mavis.com, goodyear.com |

Position Recacor (Redouane, 01/10/2026) : Recacor ne fait pas la restitution des véhicules, n'est pas dans un réseau de loueur et n'a pas d'offre dédiée au leasing. Ces limites ne s'écrivent jamais sur le site : la page dit ce que Recacor fait (devis selon le contrat et la dimension, montage au Crès), sans tarif affiché pour ces dimensions.

## Prix

Parallélisme voiture : à partir de 65 €, contrôle offert (tarifs officiels, `CLAUDE.md`). Pneus de voiture électrique : aucun prix affiché, devis selon la dimension.

Aucun tarif poids lourd n'est affiché sur le site, atelier comme dépannage (décision de Redouane, 30/09/2026). Le prix est annoncé au téléphone avant l'intervention.

## À faire confirmer

- Délai moyen d'arrivée sur l'A9 ou l'A75 (aucun délai publié tant qu'il n'est pas confirmé).
- Nombre d'interventions par mois.
- Répartition des camions par site (Le Crès, Servian, Vergèze).
- Sortie d'autoroute la plus proche de l'atelier du Crès.
- Nombre de postes PL et hauteur d'accueil de l'atelier.
- Horaires spécifiques de l'atelier PL, s'ils diffèrent de ceux du magasin.
- Photos réelles des camions d'intervention et de l'atelier.
- Pneus de VE : marques et indices HL en stock, délai de commande en 19–22 pouces (rien de publié tant que ce n'est pas confirmé).
- Chiffres d'usure « 20 % » (Michelin) et « 30 à 50 % » (Syndicat du pneu) : non lus à la source, non publiés.
- Dimensions Tesla Model 3 Performance « Highland » (forum seulement) : non publiées.
