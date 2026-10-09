/* =============================================================================
   TON SCORE FINANCIER — QUIZ D'AUTO-ÉVALUATION  (bilingue FR / EN)
   -----------------------------------------------------------------------------
   Actuellement NON chargé par index.html — la section #score renvoie vers
   l'outil externe config.score.url à la place. Voir l'en-tête de
   modules/quiz.js pour réintégrer ce quiz sur le site.

   Outil éducatif, 100 % client (rien n'est envoyé nulle part par défaut — voir
   modules/quiz.js). Ne constitue pas une analyse financière personnalisée.

   Pour ajouter/modifier une question : éditer le tableau `questions`.
   Chaque option vaut 0, 1 ou 2 points ; le score final est ramené sur 100.
   Pour ajuster les paliers de résultat : éditer le tableau `bands`
   (`min`/`max` en pourcentage du score total).
   ============================================================================= */

window.SRF = window.SRF || {};

window.SRF.quiz = {
  questions: [
    {
      id: 'urgence',
      pillar: { fr: 'Fondation', en: 'Foundation' },
      text: {
        fr: 'Avez-vous un fonds d’urgence couvrant au moins 3 mois de dépenses?',
        en: 'Do you have an emergency fund covering at least 3 months of expenses?'
      },
      options: [
        { points: 2, text: { fr: 'Oui, largement', en: 'Yes, comfortably' } },
        { points: 1, text: { fr: 'Partiellement', en: 'Partially' } },
        { points: 0, text: { fr: 'Pas encore', en: 'Not yet' } }
      ]
    },
    {
      id: 'protection',
      pillar: { fr: 'Protection', en: 'Protection' },
      text: {
        fr: 'Êtes-vous protégé en cas d’invalidité ou de maladie grave?',
        en: 'Are you protected in case of disability or critical illness?'
      },
      options: [
        { points: 2, text: { fr: 'Oui, une protection adéquate', en: 'Yes, adequate coverage' } },
        { points: 1, text: { fr: 'Une protection de base seulement', en: 'Basic coverage only' } },
        { points: 0, text: { fr: 'Aucune protection', en: 'No coverage' } }
      ]
    },
    {
      id: 'epargne',
      pillar: { fr: 'Croissance', en: 'Growth' },
      text: {
        fr: 'Cotisez-vous régulièrement à un REER, un CELI ou un CELIAPP?',
        en: 'Do you regularly contribute to an RRSP, TFSA or FHSA?'
      },
      options: [
        { points: 2, text: { fr: 'Oui, de façon régulière', en: 'Yes, regularly' } },
        { points: 1, text: { fr: 'Occasionnellement', en: 'Occasionally' } },
        { points: 0, text: { fr: 'Rarement ou jamais', en: 'Rarely or never' } }
      ]
    },
    {
      id: 'dettes',
      pillar: { fr: 'Structure', en: 'Structure' },
      text: {
        fr: 'Savez-vous clairement combien vous devez et à quel taux?',
        en: 'Do you know clearly how much you owe and at what rate?'
      },
      options: [
        { points: 2, text: { fr: 'Oui, très clairement', en: 'Yes, very clearly' } },
        { points: 1, text: { fr: 'Approximativement', en: 'Roughly' } },
        { points: 0, text: { fr: 'Pas vraiment', en: 'Not really' } }
      ]
    },
    {
      id: 'retraite',
      pillar: { fr: 'Retraite', en: 'Retirement' },
      text: {
        fr: 'Avez-vous une idée claire de l’âge et du revenu visés à la retraite?',
        en: 'Do you have a clear idea of your target retirement age and income?'
      },
      options: [
        { points: 2, text: { fr: 'Oui, un plan clair', en: 'Yes, a clear plan' } },
        { points: 1, text: { fr: 'Une idée approximative', en: 'A rough idea' } },
        { points: 0, text: { fr: 'Aucune idée', en: 'No idea' } }
      ]
    },
    {
      id: 'revision',
      pillar: { fr: 'Discipline', en: 'Discipline' },
      text: {
        fr: 'Avez-vous révisé votre stratégie financière dans la dernière année?',
        en: 'Have you reviewed your financial strategy in the past year?'
      },
      options: [
        { points: 2, text: { fr: 'Oui', en: 'Yes' } },
        { points: 1, text: { fr: 'Il y a plus d’un an', en: 'More than a year ago' } },
        { points: 0, text: { fr: 'Jamais', en: 'Never' } }
      ]
    }
  ],

  /* max = 2 points × 6 questions = 12 → score ramené sur 100 */
  maxPoints: 12,

  bands: [
    {
      key: 'foundation',
      min: 0, max: 39,
      label: { fr: 'À bâtir', en: 'To build' },
      summary: {
        fr: "Les bases méritent d'être consolidées. C'est le meilleur moment pour structurer, pas pour paniquer.",
        en: "The basics deserve to be strengthened. This is the best time to structure, not to panic."
      },
      recommendations: [
        { fr: 'Commencer par un coussin de liquidités avant toute autre stratégie.',
          en: 'Start with a cash cushion before any other strategy.' },
        { fr: "Vérifier ce qui vous protège déjà (au travail, au fédéral) avant d'ajouter une couverture.",
          en: "Check what already protects you (at work, federally) before adding coverage." },
        { fr: 'Fixer une seule habitude simple : un virement automatique, même petit.',
          en: 'Set one simple habit: an automatic transfer, even a small one.' }
      ]
    },
    {
      key: 'progress',
      min: 40, max: 74,
      label: { fr: 'En mouvement', en: 'In motion' },
      summary: {
        fr: 'De bonnes bases sont en place. Le prochain gain vient de la coordination entre vos comptes et vos objectifs.',
        en: 'Good foundations are in place. The next gain comes from coordinating your accounts with your goals.'
      },
      recommendations: [
        { fr: "Revoir l'ordre REER / CELI / CELIAPP selon votre revenu actuel et futur.",
          en: 'Revisit the RRSP / TFSA / FHSA order based on your current and future income.' },
        { fr: 'Confirmer que vos protections suivent vos revenus, pas vos revenus d’il y a 5 ans.',
          en: 'Confirm your coverage keeps up with your income, not your income from 5 years ago.' },
        { fr: 'Mettre une date claire sur votre projet de retraite, même approximative.',
          en: 'Put a clear date on your retirement plan, even a rough one.' }
      ]
    },
    {
      key: 'strong',
      min: 75, max: 100,
      label: { fr: 'Bien structuré', en: 'Well structured' },
      summary: {
        fr: "Une base solide. À ce stade, l'enjeu devient l'optimisation et la transmission, pas la survie.",
        en: "A solid foundation. At this stage, the challenge becomes optimization and transfer, not survival."
      },
      recommendations: [
        { fr: "Explorer des stratégies d'optimisation fiscale plus avancées.",
          en: 'Explore more advanced tax optimization strategies.' },
        { fr: 'Planifier le décaissement à la retraite, pas seulement l’accumulation.',
          en: 'Plan retirement drawdown, not just accumulation.' },
        { fr: 'Revoir la transmission de votre patrimoine et vos bénéficiaires.',
          en: 'Review your estate transfer plan and your beneficiaries.' }
      ]
    }
  ]
};
