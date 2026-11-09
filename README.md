# Samuel Russo Finance — site web

Marque personnelle + éducation financière + génération de prises de rendez-vous.
Site **statique**, sans étape de compilation : HTML, CSS moderne et JavaScript vanilla.
Aucune dépendance à installer. Aucun `node_modules`.

---

## 1. Lancer le site en local

### Option A — script fourni (Windows, aucune installation)
```bash
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
Puis ouvrir <http://localhost:4321>.

### Option B — n'importe quel serveur statique
```bash
npx serve .
# ou : python -m http.server 4321
# ou : extension « Live Server » dans VS Code
```

> Ouvrir `index.html` par double-clic fonctionne aussi, mais un serveur local
> reproduit mieux le comportement réel (chemins absolus, `fetch`, etc.).

### Mettre en ligne
Déposer le dossier tel quel sur **Netlify, Vercel, Cloudflare Pages, GitHub Pages**
ou tout hébergement statique. Rien d'autre à configurer.

---

## 2. Où se trouve quoi

```
samuel-russo-finance/
├── index.html                  Page d'accueil (toutes les sections)
├── favicon.svg  robots.txt  sitemap.xml  site.webmanifest
├── serve.ps1                   Petit serveur local
├── assets/
│   ├── css/main.css            Système visuel complet (tokens en haut du fichier)
│   ├── img/                    Placeholders SVG — À REMPLACER par de vraies photos
│   └── js/
│       ├── config.js           ⚙️  TOUT ce qui se personnalise sans toucher au code
│       ├── main.js             Point d'entrée
│       ├── data/
│       │   ├── concepts.js      Bibliothèque de concepts financiers
│       │   ├── capsules.js      Capsules « 1 Minute Finance » (démo)
│       │   ├── socials.js       Publications réseaux sociaux (démo)
│       │   ├── quiz.js          Questions + paliers du quiz (dormant — voir §7)
│       │   └── testimonials.js  Expériences clients (vide tant qu'aucun accord écrit)
│       └── modules/
│           ├── nav.js           Navigation + menu mobile plein écran
│           ├── animations.js    Reveal au scroll, parallax, compteurs
│           ├── render.js        Génère les grilles à partir de data/
│           ├── newsletter.js    Infolettre (abstraction multi-plateformes)
│           ├── booking.js       Prise de rendez-vous (URL centralisée)
│           └── quiz.js          Moteur du quiz « Ton score financier »
└── pages/
    ├── a-propos.html            Page « À propos » détaillée
    └── concepts/
        ├── _TEMPLATE.html       Gabarit pour un nouveau concept
        └── reer.html            Exemple de page concept complète
```

---

## 3. Personnalisation courante — `assets/js/config.js`

Un seul fichier contrôle :

| Bloc          | Sert à                                                            |
|---------------|------------------------------------------------------------------|
| `brand`       | Nom, titre, courriel, téléphone, région                         |
| `booking`     | **URL unique du calendrier** (Calendly, GoHighLevel…) + mode    |
| `newsletter`  | Plateforme d'infolettre (voir §6)                                |
| `socials`     | Liens Instagram / TikTok / Facebook / LinkedIn / YouTube        |
| `compliance`  | Mentions réglementaires, disclaimer, nom légal, n° de certificat|
| `seo`         | URL du site, image de partage                                    |
| `motion`      | Activer/désactiver le parallax                                   |

Les placeholders sont préfixés `PLACEHOLDER_`. **Ne rien inventer** côté conformité :
laisser tel quel tant que l'information officielle n'est pas fournie.

---

## 4. Remplacer les images

Les fichiers de `assets/img/` sont des **placeholders SVG éditoriaux**.
Pour les remplacer, déposer une vraie image **avec le même nom** (ou changer le nom
dans le HTML / les fichiers `data/`) :

| Fichier                         | Emplacement            | Format conseillé          |
|---------------------------------|------------------------|---------------------------|
| `hero.svg`                      | Hero plein écran       | `.jpg`/`.webp` ~1920×1200 |
| `portrait.jpg`                  | À propos + page dédiée | portrait 4:5 (≥900×1125)  |
| `og-image.svg`                  | Partage réseaux        | 1200×630                  |
| `placeholder-capsule-*.svg`     | Cartes 1 Minute Finance| 16:10                     |
| `placeholder-vertical-*.svg`    | Grille réseaux         | 9:16                      |

Style recherché : éditorial, cinématographique, authentique. Éviter les clichés
de banque d'images. **Ne pas générer de fausse photo de Samuel Russo.**

Si vous remplacez `hero.svg` par un `.jpg`, pensez à changer l'extension dans
`index.html` (`<img src="assets/img/hero.jpg" …>`).

**Portrait de Samuel :** déposer la photo sous
`assets/img/portrait.jpg`. Le HTML l'utilise déjà et retombe automatiquement sur
`portrait.svg` tant que le fichier n'existe pas (attribut `onerror`).

---

## 5. Ajouter un concept financier

1. Ouvrir `assets/js/data/concepts.js`, copier un bloc, ajuster les champs.
   La grille de la page d'accueil se régénère automatiquement.
2. (Optionnel) Créer la page dédiée : copier `pages/concepts/_TEMPLATE.html`
   en `pages/concepts/<slug>.html`, remplir le contenu, puis ajouter
   `hasPage: true` au concept dans `concepts.js`.
3. Ajouter l'URL dans `sitemap.xml`.

Tant que `hasPage` est absent, la carte affiche « Page à venir » sans lien mort.

---

## 6. Brancher l'infolettre

Par défaut : `provider: 'none'` → le formulaire simule un succès (aucune donnée envoyée).

Dans `config.js → newsletter` :

| `provider`     | À renseigner dans `endpoint`                                  |
|----------------|--------------------------------------------------------------|
| `mailchimp`    | URL du formulaire hébergé (`…/subscribe/post?u=…&id=…`)      |
| `convertkit`   | `https://app.convertkit.com/forms/<id>/subscriptions`        |
| `gohighlevel`  | URL du webhook / endpoint de formulaire GHL                  |
| `custom`       | Votre propre API (reçoit `POST { email }`)                   |

Le module `newsletter.js` contient déjà l'implémentation de chaque cas.

---

## 7. Le score financier

Section `#score` (entre Concepts et 1 Minute Finance). Tous les liens « Score
financier » du site (nav, menu mobile, pied de page, bouton de la section) pointent
vers l'outil externe défini dans `config.js → score.url` — une seule URL à changer
pour tout le site, comme pour `booking.url`.

**Historique :** un quiz complet (6 questions → score sur 100 → recommandations) a été
développé directement sur le site, puis remplacé par ce renvoi externe. Le code reste
disponible, non chargé par `index.html` :
- `assets/js/data/quiz.js` — questions, paliers, recommandations (bilingue)
- `assets/js/modules/quiz.js` — moteur (intro → questions → résultat)

L'en-tête de `modules/quiz.js` explique comment le reconnecter si vous préférez un
jour réintégrer le test directement sur le site plutôt que de renvoyer vers l'outil
externe.

---

## 8. Brancher le calendrier de rendez-vous

Dans `config.js → booking` :
- `url` : l'adresse de votre calendrier (**une seule fois, ici**).
- `mode: 'newtab'` : ouvre le calendrier dans un nouvel onglet.
- `mode: 'embed'` (actuel) : ouvre le calendrier dans une fenêtre modale sur le site —
  le visiteur réserve sans le quitter. Microsoft Bookings accepte l'intégration depuis
  toute page **https** ; sur `http://localhost` le site ouvre donc un nouvel onglet à la
  place (normal). Un lien de secours « ouvrir dans un nouvel onglet » est affiché dans la
  fenêtre. **À tester une fois le site en ligne** ; si ça ne convient pas, repasser à `'newtab'`.

Tous les boutons « Prendre rendez-vous » du site utilisent automatiquement cette valeur.
La section « Rendez-vous » explique les deux parcours (nouvelle personne / client actuel)
et les deux types se choisissent sur la même page Microsoft Bookings.

---

## 9. Bilingue — français / anglais

Le site est **entièrement bilingue** (FR par défaut, EN complet).

- **Sélecteur FR / EN** dans la barre de navigation (et dans le menu mobile).
- La langue est mémorisée (`localStorage`) et forçable par URL : `?lang=en`.
- Balises `hreflang` en place pour Google.

**Où sont les traductions :**

| Fichier | Contenu |
|---|---|
| `assets/js/i18n.js` | tous les textes de la page d'accueil + navigation + footer (blocs `fr:` et `en:`) |
| `assets/js/i18n-pages.js` | textes des pages `/pages/` (À propos, concepts) |
| `assets/js/data/*.js` | champs `{ fr, en }` pour concepts, capsules, publications |
| `assets/js/config.js` | `compliance.*` : versions `{ fr, en }` des mentions réglementaires |

**Ajouter / modifier une traduction :** repérer la clé (`data-i18n="…"` dans le HTML),
compléter les deux blocs `fr:` et `en:` du fichier correspondant. Un texte manquant
en anglais retombe automatiquement sur le français.

**Ajouter une langue (ex. espagnol) :** ajouter `'es'` à `supported`, créer le bloc
`es: { … }` dans `i18n.js` et `i18n-pages.js`.

---

## 10. Accessibilité & performance

- HTML sémantique, navigation clavier, focus visible, `alt`, labels, lien d'évitement.
- `prefers-reduced-motion` respecté (animations neutralisées).
- Aucune librairie tierce ; seules les polices Google sont chargées (avec `preconnect`).
- Images en `loading="lazy"` sauf le hero (`fetchpriority="high"`).
- Objectif Lighthouse : vert sur les 4 axes. Vérifier après avoir mis de vraies images
  (les compresser : viser < 250 Ko pour le hero).

---

## 11. Évolutions prévues (architecture déjà en place)

Page À propos étendue · pages de concepts · pages de services · blog ·
épisodes 1 Minute Finance · intégrations YouTube/Instagram/TikTok · formulaire de
contact · analytics · autres langues (voir §8).

Rien de tout cela n'est actif : la structure permet de l'ajouter proprement.

---

## 12. Menu et sections (site déroulant)

Le menu compte **8 entrées maximum, bouton compris** : À propos · Services · Confiance ·
Concepts · Score financier · 1 Minute Finance · Réseaux · Prendre rendez-vous. Chaque
entrée fait défiler la page jusqu'à sa section (« Score financier » ouvre l'outil externe).
Sous ~1120 px de large, le menu devient le menu plein écran (hamburger).

**Section Confiance (`#confiance`)** : affiche toujours les éléments vérifiables (inscription
AMF + lien vers le registre, rattachement iA, titre). Les **expériences clients** viennent de
`assets/js/data/testimonials.js` : 7 recommandations de la page Facebook (textes intacts,
noms réduits à « Prénom I. », mention de la source et lien vers la page d'avis).
Liens « Voir tous les avis » : `config.js → reviews` (Facebook renseigné ; ajouter l'adresse
Google dans `reviews.google` pour afficher le lien Google). Un avis s'affiche si `publish: true`
(Facebook/Google) ou `consent: true` (avis obtenu directement). Avant la mise en avant :
validation par la conformité d'iA ; l'en-tête du fichier détaille la marche à suivre.

**Vidéo d'ambiance (fond de la section Confiance)** : `assets/video/confiance-bg.mp4`
(+ `.webm` en secours) et `confiance-poster.jpg` (image fixe). Boucle muette, voile noir à
74 % pour garder le texte lisible, vidéo « collée » à l'écran pendant qu'on défile dans la
section. Elle ne se charge et ne joue que lorsque la section est visible, et reste sur
l'image fixe si le visiteur a demandé « réduire les animations » ou activé l'économie de
données. Fichiers volontairement légers (≈ 2,9 Mo mp4 / 2,1 Mo webm, 720×1280, 11 s) : la
vidéo originale (iPhone, 4K, 77 Mo) est trop lourde pour le web — **ne pas la mettre sur le
site** (GitHub refuse aussi les envois par navigateur au-delà de 25 Mo par fichier). Pour la
remplacer : même noms de fichiers, mêmes dimensions verticales, poids sous ~4 Mo, sans son.

**Contenu de démo masqué** : `config.js → features` (`capsules`, `socialPosts`) à `false`
tant que les vraies capsules / vraies publications n'existent pas.

---

## 13. Conformité — rappel

Pas de promesse de rendement, pas de garantie, pas de faux témoignage, pas de
faux chiffre de performance. Les numéros de permis / titres / certifications
ne doivent être ajoutés que lorsqu'ils sont fournis officiellement
(`config.js → compliance`).
