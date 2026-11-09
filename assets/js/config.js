/* =============================================================================
   SAMUEL RUSSO FINANCE — CONFIGURATION CENTRALE
   -----------------------------------------------------------------------------
   Toutes les valeurs modifiables du site sont regroupées ici.
   Ne jamais coder en dur une URL de calendrier, un lien social ou une clé
   d'infolettre ailleurs dans le code : tout passe par cet objet.
   ============================================================================= */

window.SRF = window.SRF || {};

window.SRF.config = {

  /* ---------------------------------------------------------------------------
     IDENTITÉ
     ------------------------------------------------------------------------- */
  brand: {
    name: 'Samuel Russo Finance',
    shortName: 'SRF',
    title: 'Conseiller en sécurité financière',
    affiliation: 'iA Groupe financier',
    tagline: 'Votre avenir financier ne se planifie pas tout seul.',
    email: 'samuel.russo@agc.ia.ca',
    phone: '450-712-1430',
    region: 'Québec, Canada',
    locale: 'fr-CA'
  },

  /* ---------------------------------------------------------------------------
     PRISE DE RENDEZ-VOUS
     Une seule source de vérité pour l'URL du calendrier.
     Exemples : Calendly, GoHighLevel, Google Calendar Appointments, TidyCal…
     ------------------------------------------------------------------------- */
  booking: {
    // Microsoft Bookings
    url: 'https://bookings.cloud.microsoft/book/SamuelRusso@indall.onmicrosoft.com/?ismsaljsauthenabled',
    label: 'Prendre rendez-vous',
    // 'newtab' ouvre le calendrier dans un nouvel onglet.
    // 'embed'  affiche le calendrier dans une fenêtre modale (iframe) : le visiteur
    //          réserve sans quitter le site. Microsoft Bookings autorise l'intégration
    //          depuis toute page https (le site en ligne) ; en local (http) le site
    //          retombe tout seul sur un nouvel onglet. Un lien de secours est affiché
    //          dans la fenêtre au cas où le calendrier ne se charge pas.
    mode: 'embed'
  },

  /* ---------------------------------------------------------------------------
     PAGES D'AVIS (section Confiance)
     Laisser '' pour masquer le lien correspondant. Ajouter l'adresse de la
     fiche Google dès qu'elle est prête (« Voir tous les avis sur Google »).
     ------------------------------------------------------------------------- */
  reviews: {
    facebook: 'https://www.facebook.com/samuelrusso.finance/reviews/?id=61553330466519&sk=reviews',
    google: ''
  },

  /* ---------------------------------------------------------------------------
     CONTENU DE DÉMONSTRATION
     Les capsules « 1 Minute Finance » (data/capsules.js) et les publications
     réseaux (data/socials.js) sont des exemples, pas de vraies publications.
     Tant qu'elles n'ont pas été remplacées par du vrai contenu avec de vrais
     liens, elles restent masquées sur le site public.
     Passer à true pour les réafficher une fois les données réelles en place.
     ------------------------------------------------------------------------- */
  features: {
    capsules: false,
    socialPosts: false
  },

  /* ---------------------------------------------------------------------------
     SCORE FINANCIER
     Outil externe — une seule source de vérité pour son URL, comme booking.url.
     Tous les liens « Score financier » du site (nav, pied de page, section
     dédiée) pointent automatiquement ici (voir [data-score] dans main.js).
     ------------------------------------------------------------------------- */
  score: {
    url: 'https://score-financier.vercel.app/score-financier-quiz.html'
  },

  /* ---------------------------------------------------------------------------
     INFOLETTRE « 1 MINUTE FINANCE »
     Aucune intégration réelle n'est activée par défaut.
     Choisir un provider ci-dessous quand une plateforme sera configurée.
     provider : 'none' | 'mailchimp' | 'convertkit' | 'gohighlevel' | 'custom'
     ------------------------------------------------------------------------- */
  newsletter: {
    provider: 'none',
    // Utilisé par les providers de type POST (mailchimp, convertkit, custom, gohighlevel)
    endpoint: '',
    // Champ caché anti-bot / clés spécifiques au provider
    hiddenFields: {},
    // Message affiché après une inscription réussie
    successMessage: 'Merci. Vérifiez votre boîte de réception : la prochaine idée arrive bientôt.',
    errorMessage: 'Un problème est survenu. Réessayez dans un instant.'
  },

  /* ---------------------------------------------------------------------------
     RÉSEAUX SOCIAUX
     Mettre l'URL à '' pour masquer un réseau.
     ------------------------------------------------------------------------- */
  socials: {
    facebook: 'https://www.facebook.com/samuelrusso.finance',
    instagram: 'https://www.instagram.com/samuelrusso.finance/',
    linkedin: 'https://ca.linkedin.com/in/samuel-russo-800089264',
    tiktok: 'https://www.tiktok.com/@samuel..russo',
    youtube: 'https://www.youtube.com/@samuelrusso.finance'
  },

  /* ---------------------------------------------------------------------------
     CONFORMITÉ / MENTIONS RÉGLEMENTAIRES
     Ne rien inventer : laisser les placeholders tant que l'information
     officielle n'est pas fournie.
     ------------------------------------------------------------------------- */
  compliance: {
    legalName: 'PLACEHOLDER — Nom légal / cabinet (à confirmer)',
    amfNumber: '261755',
    amfRegistryUrl: 'https://lautorite.qc.ca/grand-public/registres/registre-des-entreprises-et-des-individus-autorises-a-exercer',

    // Textes réglementaires — versions FR et EN.
    permitInfo: {
      fr: "Samuel Russo, conseiller en sécurité financière, rattaché à iA Groupe financier — " +
          "inscrit au registre de l'Autorité des marchés financiers (AMF) sous le numéro 261755.",
      en: "Samuel Russo, financial security advisor, affiliated with iA Financial Group — " +
          "registered in the register of the Autorité des marchés financiers (AMF) under number 261755."
    },
    regulator: {
      fr: 'Autorité des marchés financiers (AMF)',
      en: 'Autorité des marchés financiers (AMF)'
    },
    disclaimer: {
      fr: "Le contenu de ce site est fourni à titre informatif et éducatif seulement. " +
          "Il ne constitue pas un conseil financier, fiscal ou juridique personnalisé. " +
          "Aucun rendement n'est garanti. Consultez un professionnel pour une analyse adaptée à votre situation.",
      en: "The content of this site is provided for information and educational purposes only. " +
          "It does not constitute personalized financial, tax or legal advice. " +
          "No return is guaranteed. Consult a professional for analysis suited to your situation."
    },
    updatedAt: '2026'
  },

  /* ---------------------------------------------------------------------------
     SEO / PARTAGE
     ------------------------------------------------------------------------- */
  seo: {
    url: 'https://www.samuelrussofinance.ca',
    ogImage: '/assets/img/og-image.jpg'
  },

  /* ---------------------------------------------------------------------------
     PRÉFÉRENCES D'ANIMATION
     ------------------------------------------------------------------------- */
  motion: {
    // Respecte automatiquement prefers-reduced-motion, quel que soit ce réglage.
    enableParallax: true,
    revealThreshold: 0.16
  }
};
