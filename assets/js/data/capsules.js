/* =============================================================================
   1 MINUTE FINANCE — CAPSULES & PUBLICATIONS  (DONNÉES DE DÉMONSTRATION)
   -----------------------------------------------------------------------------
   Remplacer librement par du contenu réel. Aucune de ces publications n'est réelle.

   - title / category : chaîne simple OU objet { fr, en }
   - date     : ISO (AAAA-MM-JJ)
   - duration : durée affichée (ex. « 1:00 »)
   - type     : 'video' | 'article'
   - platform : 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'site'
   - url        : lien « Voir »       ·  articleUrl : lien « Lire »
   - image      : visuel (placeholder)
   ============================================================================= */

window.SRF = window.SRF || {};

window.SRF.capsules = [
  {
    id: 'cap-001',
    title: { fr: 'Le CELI n’est pas un compte d’épargne', en: 'The TFSA is not a savings account' },
    category: { fr: 'Épargne', en: 'Savings' },
    date: '2026-09-02', duration: '1:00', type: 'video', platform: 'youtube',
    url: '#', articleUrl: '#', image: 'assets/img/placeholder-capsule-1.svg'
  },
  {
    id: 'cap-002',
    title: { fr: 'Reporter la RRQ : ce que ça change vraiment', en: 'Deferring the QPP: what really changes' },
    category: { fr: 'Retraite', en: 'Retirement' },
    date: '2026-08-26', duration: '0:58', type: 'video', platform: 'instagram',
    url: '#', articleUrl: '', image: 'assets/img/placeholder-capsule-2.svg'
  },
  {
    id: 'cap-003',
    title: { fr: 'Trois dépenses qui grugent votre rendement', en: 'Three costs eating your returns' },
    category: { fr: 'Investissement', en: 'Investing' },
    date: '2026-08-19', duration: '1:04', type: 'video', platform: 'tiktok',
    url: '#', articleUrl: '', image: 'assets/img/placeholder-capsule-3.svg'
  },
  {
    id: 'cap-004',
    title: { fr: 'Fonds d’urgence : combien, et où le garder', en: 'Emergency fund: how much, and where to keep it' },
    category: { fr: 'Fondation', en: 'Foundation' },
    date: '2026-08-12', duration: '3 min', type: 'article', platform: 'site',
    url: '', articleUrl: '#', image: 'assets/img/placeholder-capsule-4.svg'
  },
  {
    id: 'cap-005',
    title: { fr: 'CELIAPP : l’outil des futurs propriétaires', en: 'FHSA: the future homeowner’s tool' },
    category: { fr: 'Épargne', en: 'Savings' },
    date: '2026-08-05', duration: '1:00', type: 'video', platform: 'linkedin',
    url: '#', articleUrl: '#', image: 'assets/img/placeholder-capsule-5.svg'
  },
  {
    id: 'cap-006',
    title: { fr: 'Assurance invalidité : le risque qu’on oublie', en: 'Disability insurance: the risk we forget' },
    category: { fr: 'Protection', en: 'Protection' },
    date: '2026-07-29', duration: '0:55', type: 'video', platform: 'facebook',
    url: '#', articleUrl: '', image: 'assets/img/placeholder-capsule-6.svg'
  }
];
