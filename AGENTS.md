# AGENTS.md

This file provides guidance to Codex et Claude Code when working with code in this repository.

---

## RITUEL DE DÉBUT DE SESSION — OBLIGATOIRE

À chaque nouvelle conversation, exécuter ces 3 étapes dans l'ordre :

**Étape 1 — Actions ouvertes**
Lire `/Users/redouanelmansouri/Desktop/PROJET_RECACOR/SUIVI_ACTIONS.md` (liste courte, une ligne par action) et ne demander à Redouane que les lignes du sujet du jour qui ne peuvent pas être vérifiées. Le détail d'un sujet est dans `SUIVI_JOURNAL.md` (chercher avec grep, ne pas lire en entier). En fin de session : une ligne courte dans `SUIVI_ACTIONS.md` par action ouverte ou fermée, le compte rendu détaillé dans `SUIVI_JOURNAL.md`.

**Étape 2 — Snapshot analytics AdsFlow (7 derniers jours) — une seule fois par jour**
Si le fichier `/Applications/PROJET_RECACOR/.snapshot_jour` contient déjà la date du jour, sauter cette étape sans rien afficher. Sinon, lancer la commande (elle enregistre la date à la fin).
```bash
START=$(date -v-7d +%Y-%m-%d 2>/dev/null || date -d '7 days ago' +%Y-%m-%d) && END=$(date +%Y-%m-%d) && . /Applications/PROJET_RECACOR/.env.audit && test -n "$MARKETING_ANALYTICS_API_KEY" && curl -s "https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics?start=$START&end=$END" -H "X-Api-Key: $MARKETING_ANALYTICS_API_KEY" | jq '{leads_crm:.crm_aggregate.total_leads, leads_meta:.meta_ads.leads, cpl_meta:.meta_ads.cpl, depense_meta:.meta_ads.spend, depense_gads:.google_ads.spend, conversions_gads:.google_ads.conversions, clics_seo:.search_console.clicks, sessions_ga4:.ga4.sessions}' && date +%Y-%m-%d > /Applications/PROJET_RECACOR/.snapshot_jour
```
Afficher le résultat sous forme de tableau et signaler toute anomalie.

**Étape 3 — Continuer avec la demande de Redouane**

---

## Contexte projet

Site Next.js de **Recacor** — spécialiste pneus VL et poids lourd, Le Crès (34920).
Repo GitHub : github.com/WeboPoulpe/RECACOR — déployé sur Vercel.

## Stack

- **Framework :** Next.js App Router, SSR/SSG, Vercel
- **DB :** Neon (PostgreSQL) via `@neondatabase/serverless`
- **Tracking :** GTM + GA4 + Consent Mode v2 + pixels Meta/TikTok/Snapchat
- **Emails :** Brevo (SMTP port 587)
- **Couleur principale :** Purple deep `#2E2D8A` / Accent `#1B4FD8`

## Commandes

```bash
# Dev local
npm run dev

# Build (vérifie les erreurs TS/Next)
npm run build

# IndexNow — soumettre les URLs aux moteurs
node scripts/indexnow.mjs
```

## GEL SEO jusqu'au 15/11/2026 (GO Redouane du 04/10/2026)

Trop de changements en septembre (37 commits en S39-S40, signaux contradictoires sur « pneus Montpellier »).
Jusqu'au 15/11 inclus, **ne pas modifier les pages publiques existantes** : titres, H1, metadata, URL, 301,
liens internes et ancres, page cible d'une requête. Cibles figées : « pneus Montpellier » → accueil,
« garage Le Crès » → `/le-cres`. Climatisation retirée du site (23/09) : ne pas la remettre.
- Autorisé : corriger une vraie erreur (lien cassé, faute, info fausse), indexation en attente,
  une nouvelle page sur une requête non couverte au plus tous les 15 jours, avec GO de Redouane.
- Le 15/11 : bilan Search Console page par page (positions par semaine), puis une seule page modifiée à la fois.
- Après le gel : avant toute modif SEO, `git log --since=60.days -- <page>` ; pas de retouche d'une page modifiée il y a moins de 6 semaines.

## Skill et guide SEO local obligatoires

Pour tout changement SEO, utiliser le skill `recacor-copy-seo` et lire avant l'édition :

`/Users/redouanelmansouri/Desktop/PROJET_RECACOR/04_Ressources/style_recacor_seo_local.md`

Cela couvre le contenu visible, les metadata, titres, FAQ, liens internes, CTA, textes JSON-LD, pages villes/services/marques et articles. Après modification, lancer `npm run copy:check -- <fichiers-modifiés>` lorsque le contrôle est compatible, vérifier le rendu visible et enrichir le guide uniquement si la session produit un apprentissage vérifié et réutilisable. Suivre alors le protocole d'enrichissement et compléter le journal daté du guide.

## IDs formulaires (ne jamais modifier)

- `devis-vl-form` — pneus voiture
- `devis-mecanique-form` — vidange/parallélisme
- `devis-pl-form` — poids lourd B2B
- `contact-form` — contact général

## Classes CSS critiques tracking

- `.phone-link` — tous les numéros cliquables
- `#sticky-call-btn` — bouton appel mobile fixe

## Architecture pages

- `src/app/(public)/` — pages publiques
- `src/app/admin/` — back-office
- `src/components/layout/` — header, footer (Schema.org AutoRepair dans footer.tsx)
- `src/lib/` — db.ts (Neon), villes.ts, tracking.ts, site-config.ts
- `src/components/schema-jsonld.tsx` — composants JSON-LD réutilisables

## Villes publiées (9 confirmées)

montpellier, castelnau-le-lez, vendargues, mauguio, lattes, perols, jacou, saint-jean-de-vedas, lunel

## Tarifs officiels

- Pneu VL monté : à partir de **45€**
- Vidange : à partir de **79€**
- Parallélisme : à partir de **65€** (contrôle offert)

## API Analytics AdsFlow

- **URL :** `https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics`
- **Auth :** `X-Api-Key: $MARKETING_ANALYTICS_API_KEY` (variable d'environnement locale, jamais dans Git)
- **Params :** `start`, `end` (YYYY-MM-DD)
