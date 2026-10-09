/* =============================================================================
   BIBLIOTHÈQUE DE CONCEPTS FINANCIERS  (bilingue FR / EN)
   -----------------------------------------------------------------------------
   Pour ajouter un concept : copier un bloc, changer les champs.
   La section « Comprendre son argent » se régénère automatiquement.

   Champs :
   - slug        : identifiant unique = URL future (/pages/concepts/<slug>.html)
   - label       : étiquette courte (ex. « REER ») — identique FR/EN
   - category    : { fr, en }
   - title       : { fr, en }  — la question / accroche
   - excerpt     : { fr, en }  — 1 à 2 phrases
   - readingTime : minutes de lecture estimées
   - status      : 'published' | 'draft'
   - accent      : true pour mettre la carte en évidence
   - hasPage     : true si /pages/concepts/<slug>.html existe déjà
   ============================================================================= */

window.SRF = window.SRF || {};

window.SRF.concepts = [
  {
    slug: 'reer',
    label: { fr: 'REER', en: 'RRSP' },
    category: { fr: 'Retraite', en: 'Retirement' },
    title: {
      fr: 'Quand devriez-vous réellement utiliser votre REER?',
      en: 'When should you actually use your RRSP?'
    },
    excerpt: {
      fr: "Le REER n'est pas toujours le bon premier réflexe. Tout dépend de votre revenu aujourd'hui, de votre revenu à la retraite et de ce que vous cherchez à accomplir.",
      en: "The RRSP isn't always the right first move. It depends on your income today, your income in retirement and what you're trying to achieve."
    },
    readingTime: 4,
    status: 'published',
    accent: true,
    hasPage: true
  },
  {
    slug: 'celi',
    label: { fr: 'CELI', en: 'TFSA' },
    category: { fr: 'Épargne', en: 'Savings' },
    title: {
      fr: 'Pourquoi le CELI est beaucoup plus qu’un compte d’épargne.',
      en: 'Why the TFSA is much more than a savings account.'
    },
    excerpt: {
      fr: 'Bien utilisé, le CELI devient un outil de croissance à long terme, de flexibilité et de planification de la retraite — pas seulement un coussin de sécurité.',
      en: 'Used well, the TFSA becomes a tool for long-term growth, flexibility and retirement planning — not just a safety cushion.'
    },
    readingTime: 4,
    status: 'published'
  },
  {
    slug: 'celiapp',
    label: { fr: 'CELIAPP', en: 'FHSA' },
    category: { fr: 'Épargne', en: 'Savings' },
    title: {
      fr: 'Un outil fiscal puissant pour les futurs propriétaires.',
      en: 'A powerful tax tool for future homeowners.'
    },
    excerpt: {
      fr: "Déduction à l'entrée, retrait libre d'impôt pour l'achat d'une première propriété : le CELIAPP combine les meilleurs avantages du REER et du CELI.",
      en: 'Deductible going in, tax-free coming out for a first home: the FHSA combines the best of the RRSP and the TFSA.'
    },
    readingTime: 3,
    status: 'published'
  },
  {
    slug: 'rrq',
    label: { fr: 'RRQ', en: 'QPP' },
    category: { fr: 'Retraite', en: 'Retirement' },
    title: {
      fr: 'Prendre la RRQ à 60, 65 ou 70 ans?',
      en: 'Take the QPP at 60, 65 or 70?'
    },
    excerpt: {
      fr: "Reporter sa rente peut l'augmenter de façon importante. Mais la bonne décision dépend de votre santé, de vos autres revenus et de votre espérance de vie.",
      en: 'Deferring your pension can increase it significantly. But the right call depends on your health, your other income and your life expectancy.'
    },
    readingTime: 5,
    status: 'published'
  },
  {
    slug: 'rregop',
    label: 'RREGOP',
    category: { fr: 'Retraite', en: 'Retirement' },
    title: {
      fr: 'Que devient votre pension lorsque vous quittez le secteur public?',
      en: 'What happens to your pension when you leave the public sector?'
    },
    excerpt: {
      fr: 'Transfert, rente différée, valeur ajoutée : les options liées au RREGOP méritent une analyse avant de prendre une décision irréversible.',
      en: 'Transfer, deferred annuity, added value: RREGOP options deserve analysis before an irreversible decision.'
    },
    readingTime: 5,
    status: 'published'
  },
  {
    slug: 'assurance-vie',
    label: { fr: 'Assurance vie', en: 'Life insurance' },
    category: { fr: 'Protection', en: 'Protection' },
    title: {
      fr: 'Protéger sa famille ou bâtir une stratégie patrimoniale?',
      en: 'Protect your family, or build an estate strategy?'
    },
    excerpt: {
      fr: "L'assurance vie peut jouer deux rôles très différents. Comprendre lequel vous concerne évite de payer pour une protection mal adaptée.",
      en: 'Life insurance can play two very different roles. Knowing which one applies to you avoids paying for the wrong coverage.'
    },
    readingTime: 4,
    status: 'published'
  },
  {
    slug: 'retraite',
    label: { fr: 'Retraite', en: 'Retirement' },
    category: { fr: 'Retraite', en: 'Retirement' },
    title: {
      fr: "Le montant dont vous avez besoin n’est pas toujours celui que vous pensez.",
      en: "The amount you need isn't always the one you think."
    },
    excerpt: {
      fr: 'Votre nombre magique dépend de votre coût de vie réel, de vos rentes gouvernementales et du moment où vous voulez arrêter — pas d’une règle générale.',
      en: 'Your magic number depends on your real cost of living, your government pensions and when you want to stop — not on a rule of thumb.'
    },
    readingTime: 6,
    status: 'published'
  },
  {
    slug: 'smith-manoeuvre',
    label: { fr: 'Smith Manœuvre', en: 'Smith Manoeuvre' },
    category: { fr: 'Stratégie', en: 'Strategy' },
    title: {
      fr: 'Comprendre le principe derrière cette stratégie.',
      en: 'Understanding the principle behind this strategy.'
    },
    excerpt: {
      fr: "Rendre déductibles les intérêts de son hypothèque, progressivement : une stratégie avancée qui demande de la rigueur et une tolérance au risque bien comprise.",
      en: 'Gradually making your mortgage interest tax-deductible: an advanced strategy that demands discipline and a clear understanding of risk.'
    },
    readingTime: 6,
    status: 'published'
  }
];
