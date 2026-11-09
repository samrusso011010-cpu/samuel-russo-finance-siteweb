/* =============================================================================
   RECOMMANDATIONS ET EXPÉRIENCES CLIENTS  (bilingue FR / EN)
   -----------------------------------------------------------------------------
   Ces avis proviennent de la page Facebook publique « Samuel Russo, conseiller en
   sécurité financière » (config.js → reviews.facebook). Textes copiés TELS QUELS
   (aucune correction : ce sont les mots des personnes). Les noms sont réduits à
   « Prénom I. » ; pour afficher un nom complet, modifier le champ `name`.

   Pour ajouter / retirer un avis : ajouter ou supprimer un bloc ci-dessous, ou
   mettre  publish: false  pour le masquer sans le supprimer.
   Pour un avis Google : source: 'google' (le lien « Voir tous les avis sur Google »
   apparaît dès que config.js → reviews.google est renseigné).

   À GARDER EN TÊTE
   - Les avis sont publics sur Facebook, mais les republier avec le nom d'une
     personne sur un site commercial gagne à avoir son accord (un message suffit,
     conservé par écrit). Pour un avis obtenu directement (hors Facebook/Google),
     l'accord écrit est requis : source: 'direct' + consent: true.
   - La publicité d'un représentant est encadrée (iA Groupe financier, AMF) :
     faire valider la section par la conformité d'iA avant de la promouvoir.
   - Jamais de promesse de rendement ni de chiffre de performance.

   Champs :
   - id       : identifiant unique
   - name     : « Prénom I. »
   - context  : { fr, en }  facultatif — uniquement un fait vrai (ex. « Collègue »)
   - quote    : { fr, en }  texte ; si `en` est absent, l'original français s'affiche
   - source   : 'facebook' | 'google' | 'direct'
   - publish  : true pour afficher (ou consent: true pour source 'direct')
   - date     : AAAA-MM
   ============================================================================= */

window.SRF = window.SRF || {};

window.SRF.testimonials = [
  {
    id: 'fb-annie-l',
    name: 'Annie L.',
    quote: {
      fr: 'C’est un véritable privilège d’être accompagnée par un professionnel aussi compétent, honnête et dévoué. Son écoute attentive et sa gentillesse naturelle me permettent de me sentir réellement comprise dans mes besoins et mes objectifs. Je le recommande vivement !'
    },
    source: 'facebook', publish: true, date: '2026-03'
  },
  {
    id: 'fb-lyne-p',
    name: 'Lyne P.',
    quote: {
      fr: 'Service professionnel et très attentionné, si vous cherchez quelqu’un de confiance, honnête et intègre je vous le recommande fortement.'
    },
    source: 'facebook', publish: true, date: '2026-03'
  },
  {
    id: 'fb-jasmine-m',
    name: 'Jasmine M.',
    quote: {
      fr: 'Service impeccable ! Un professionnel à l’écoute, disponible et très humain dans son approche. Je recommande fortement. 🙌'
    },
    source: 'facebook', publish: true, date: '2026-03'
  },
  {
    id: 'fb-nancy-l',
    name: 'Nancy L.',
    quote: {
      fr: 'Samuel Russo est un conseiller attentif, respectueux et vraiment très compétent! Je recommande ses services sans aucune réserve!'
    },
    source: 'facebook', publish: true, date: '2026-03'
  },
  {
    id: 'fb-yoan-p',
    name: 'Yoan P.',
    quote: {
      fr: 'Très bon service, rapide, attentionné et surtout humain! Une perle pour mon entreprise et placement!'
    },
    source: 'facebook', publish: true, date: '2026-03'
  },
  {
    id: 'fb-nathalie-c',
    name: 'Nathalie C.',
    quote: {
      fr: 'service professionnel a l\'écoute de nos besoins. super sympathique. je recommande sans hesitez'
    },
    source: 'facebook', publish: true, date: '2026-03'
  },
  {
    id: 'fb-justin-b',
    name: 'Justin B.',
    context: { fr: 'Collègue', en: 'Colleague' },
    quote: {
      fr: 'Samuel est un collègue hors pair, travaillant et très professionnel. Je ne doute aucunement du service qu’il donne à ses clients après avoir vu la façon dont il travaille. Je le recommande à 100%'
    },
    source: 'facebook', publish: true, date: '2026-03'
  }
];
