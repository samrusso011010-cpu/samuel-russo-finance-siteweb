/* =============================================================================
   TRADUCTIONS DES PAGES SECONDAIRES  (À propos, pages de concepts)
   -----------------------------------------------------------------------------
   Chargé uniquement par les pages de /pages/. Fusionne ses clés dans SRF.i18n.
   Pour une nouvelle page concept : ajouter un bloc de clés « concept.<slug>.* ».
   ============================================================================= */

(function () {
  if (!window.SRF || !SRF.i18n) return;

  var fr = {
    'meta.about.title': 'À propos — Samuel Russo | Conseiller en sécurité financière',
    'meta.about.description': "Samuel Russo, conseiller en sécurité financière rattaché à iA Groupe financier : parcours, philosophie et façon de travailler.",

    'about.crumb': 'À propos',
    'about.kicker': 'Derrière le conseiller',
    'about.h1': 'Moins de décisions au hasard. Plus de décisions avec intention.',
    'about.lead': "Je suis Samuel Russo, conseiller en sécurité financière. J'accompagne des particuliers et des familles du Québec dans la mise en ordre et la mise en mouvement de leurs finances.",
    'about.h2parcours': 'Mon parcours',
    'about.parcours': "Section à compléter avec le parcours réel : formation, titres professionnels, expérience. Cette page est structurée pour recevoir cette information dès qu'elle sera fournie — sans rien inventer entre-temps.",
    'about.h2philo': 'Ma philosophie',
    'about.philo1': "Une bonne stratégie financière ne commence pas par un produit. Elle commence par une compréhension claire de votre situation : ce que vous gagnez, ce que vous devez, ce que vous voulez protéger et ce vers quoi vous avancez.",
    'about.philo2': "À partir de là, chaque décision — épargner, investir, s'assurer, rembourser — trouve sa place dans un ensemble cohérent, au lieu d'être prise isolément.",
    'about.callout': "« Votre situation financière est unique. Mon rôle est de transformer tout ça en stratégie. »",
    'about.h2methode': 'Ma façon de travailler',
    'about.m1': "On fait d'abord le portrait complet, sans jugement.",
    'about.m2': 'On sécurise la fondation avant de prendre du risque.',
    'about.m3': 'On avance par étapes, avec des décisions que vous comprenez.',
    'about.m4': 'On révise la stratégie quand votre vie change.',
    'about.ctaConcepts': 'Explorer les concepts',
    'page.backHome': "Retour à l'accueil",

    'meta.reer.title': "REER : quand devriez-vous réellement l'utiliser? | Samuel Russo Finance",
    'meta.reer.description': "Le REER n'est pas toujours le bon premier réflexe. Comprendre quand il travaille vraiment pour vous, selon votre revenu aujourd'hui et à la retraite.",
    'reer.crumbConcepts': 'Concepts',
    'reer.kicker': 'Retraite · 4 min de lecture',
    'reer.h1': 'Quand devriez-vous réellement utiliser votre REER?',
    'reer.lead': "Le REER est un outil, pas un objectif. Il travaille vraiment pour vous quand votre taux d'imposition est plus élevé aujourd'hui qu'il ne le sera au moment du retrait.",
    'reer.p1': "Cotiser à un REER procure une déduction fiscale immédiate : le montant cotisé réduit votre revenu imposable de l'année. En contrepartie, chaque dollar retiré plus tard est imposé comme un revenu. L'avantage réel dépend donc de l'écart entre ces deux taux.",
    'reer.h2yes': 'Le REER a du sens quand…',
    'reer.yes1': "Votre revenu actuel vous place dans une tranche d'imposition élevée.",
    'reer.yes2': 'Vous prévoyez un revenu plus modeste à la retraite.',
    'reer.yes3': 'Vous utilisez le remboursement d\'impôt de façon productive (dette, CELI, autre cotisation).',
    'reer.yes4': "Vous visez le RAP (achat d'une première propriété) ou le REEP (retour aux études).",
    'reer.h2no': 'Le REER est moins évident quand…',
    'reer.no1': 'Votre revenu est encore bas : la déduction vaut peu, et le CELI ou le CELIAPP peuvent primer.',
    'reer.no2': "Vos revenus de retraite prévus (régime d'employeur, RRQ, placements) seront élevés.",
    'reer.no3': 'Un retrait imposable risquerait de réduire des prestations liées au revenu (SV, SRG).',
    'reer.callout': "La vraie question n'est pas « REER ou CELI? », mais « dans quel ordre, et pour quel objectif? »",
    'reer.h2pratique': 'En pratique',
    'reer.pratique': "Pour la plupart des gens, la réponse combine plusieurs comptes. On regarde votre revenu actuel, votre projection de retraite, vos droits de cotisation inutilisés et vos projets à court terme, puis on répartit l'épargne en conséquence.",
    'reer.other': 'Autres concepts'
  };

  var en = {
    'meta.about.title': 'About — Samuel Russo | Financial Security Advisor',
    'meta.about.description': 'Samuel Russo, financial security advisor affiliated with iA Financial Group: background, philosophy and how he works.',

    'about.crumb': 'About',
    'about.kicker': 'Behind the advisor',
    'about.h1': 'Fewer decisions at random. More decisions with intent.',
    'about.lead': 'I\'m Samuel Russo, a financial security advisor. I help individuals and families in Québec bring order to their finances and put them in motion.',
    'about.h2parcours': 'My background',
    'about.parcours': 'Section to be completed with the real background: education, professional designations, experience. This page is structured to receive that information as soon as it is provided — without inventing anything in the meantime.',
    'about.h2philo': 'My philosophy',
    'about.philo1': 'A good financial strategy doesn\'t start with a product. It starts with a clear understanding of your situation: what you earn, what you owe, what you want to protect and where you\'re heading.',
    'about.philo2': 'From there, every decision — saving, investing, insuring, paying down debt — finds its place in a coherent whole, instead of being made in isolation.',
    'about.callout': '"Your financial situation is unique. My job is to turn all of that into a strategy."',
    'about.h2methode': 'How I work',
    'about.m1': 'First we build the full picture, without judgment.',
    'about.m2': 'We secure the foundation before taking on risk.',
    'about.m3': 'We move step by step, with decisions you understand.',
    'about.m4': 'We revisit the strategy when your life changes.',
    'about.ctaConcepts': 'Explore the concepts',
    'page.backHome': 'Back to home',

    'meta.reer.title': 'RRSP: when should you actually use it? | Samuel Russo Finance',
    'meta.reer.description': "The RRSP isn't always the right first move. Understanding when it truly works for you, based on your income today and in retirement.",
    'reer.crumbConcepts': 'Concepts',
    'reer.kicker': 'Retirement · 4 min read',
    'reer.h1': 'When should you actually use your RRSP?',
    'reer.lead': "The RRSP is a tool, not a goal. It truly works for you when your tax rate is higher today than it will be when you withdraw.",
    'reer.p1': 'Contributing to an RRSP gives an immediate tax deduction: the amount contributed lowers your taxable income for the year. In return, every dollar withdrawn later is taxed as income. The real benefit depends on the gap between those two rates.',
    'reer.h2yes': 'The RRSP makes sense when…',
    'reer.yes1': 'Your current income puts you in a high tax bracket.',
    'reer.yes2': 'You expect a more modest income in retirement.',
    'reer.yes3': 'You put the tax refund to productive use (debt, TFSA, another contribution).',
    'reer.yes4': 'You\'re aiming for the HBP (first home) or the LLP (back to school).',
    'reer.h2no': 'The RRSP is less obvious when…',
    'reer.no1': 'Your income is still low: the deduction is worth little, and the TFSA or FHSA may come first.',
    'reer.no2': 'Your expected retirement income (employer plan, QPP, investments) will be high.',
    'reer.no3': 'A taxable withdrawal could reduce income-tested benefits (OAS, GIS).',
    'reer.callout': 'The real question isn\'t "RRSP or TFSA?", but "in what order, and for which goal?"',
    'reer.h2pratique': 'In practice',
    'reer.pratique': 'For most people, the answer combines several accounts. We look at your current income, your retirement projection, your unused contribution room and your short-term plans, then split savings accordingly.',
    'reer.other': 'Other concepts'
  };

  Object.keys(fr).forEach(function (k) { SRF.i18n.strings.fr[k] = fr[k]; });
  Object.keys(en).forEach(function (k) { SRF.i18n.strings.en[k] = en[k]; });
})();
