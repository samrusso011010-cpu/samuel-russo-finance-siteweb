/* =============================================================================
   BILINGUE — FRANÇAIS / ANGLAIS
   -----------------------------------------------------------------------------
   Site principalement francophone, version anglaise complète.

   Fonctionnement :
   - Chaque texte du HTML porte  data-i18n="clé"  (ou data-i18n-html pour du HTML).
   - Les attributs se traduisent via  data-i18n-attr="placeholder:clé; aria-label:clé".
   - La langue est mémorisée dans localStorage ('srf-lang') et lisible via ?lang=en.
   - Changer de langue déclenche l'événement 'srf:langchange' (les grilles se
     régénèrent à partir de data/*.js).

   Ajouter une traduction : compléter les deux blocs  fr:  et  en:  ci-dessous.
   ============================================================================= */

window.SRF = window.SRF || {};

window.SRF.i18n = {
  default: 'fr',
  supported: ['fr', 'en'],
  storageKey: 'srf-lang',

  strings: {
    fr: {
      'meta.title': 'Samuel Russo Finance | Conseiller en sécurité financière',
      'meta.description': "Samuel Russo, conseiller en sécurité financière au Québec, rattaché à iA Groupe financier. Une stratégie financière pensée pour votre réalité : protection, investissements, planification et retraite.",

      'lang.fr': 'FR', 'lang.en': 'EN',
      'nav.menuOpen': 'Ouvrir le menu', 'nav.menuClose': 'Fermer le menu',
      'a11y.skip': 'Aller au contenu',

      'nav.about': 'À propos',
      'nav.services': 'Services',
      'nav.concepts': 'Concepts',
      'nav.minute': '1 Minute Finance',
      'nav.socials': 'Réseaux',
      'nav.book': 'Prendre rendez-vous',
      'nav.newsletter': "S'inscrire à 1 Minute Finance",

      'hero.role': 'Conseiller en sécurité financière',
      'hero.t1': 'Bâtir.', 'hero.t2': 'Protéger.', 'hero.t3': 'Faire croître.',
      'hero.sub': 'Une stratégie financière pensée pour votre réalité, vos objectifs et votre avenir.',
      'hero.ctaApproach': 'Découvrir mon approche',
      'hero.scroll': 'Défiler',

      'approach.overline': 'Mon approche',
      'approach.statement': 'Je ne crois pas aux plans financiers copiés-collés.',
      'approach.quote': "« Votre situation financière est unique. Votre revenu. Votre famille. Vos projets. Vos risques. Votre patrimoine. Votre vision de l'avenir. <b>Mon rôle est de transformer tout ça en stratégie.</b> »",
      'approach.s1num': '01 — Revenus', 'approach.s1title': 'Comprendre',
      'approach.s1text': 'Faire le portrait clair de la situation financière actuelle : revenus, dépenses, actifs, dettes.',
      'approach.s2num': '02 — Fondation', 'approach.s2title': 'Sécuriser',
      'approach.s2text': 'Liquidités, protection du revenu et gestion des risques avant toute prise de risque.',
      'approach.s3num': '03 — Croissance', 'approach.s3title': 'Faire croître',
      'approach.s3text': 'Investissements structurés et création de patrimoine, alignés sur votre horizon et votre tolérance.',
      'approach.s4num': '04 — Objectifs', 'approach.s4title': 'Projeter',
      'approach.s4text': 'Retraite, projets de vie et liberté financière : traduire la stratégie en décisions concrètes.',

      'about.overline': 'Derrière le conseiller',
      'about.title': 'Derrière le conseiller.',
      'about.p1': "Je suis Samuel Russo, conseiller en sécurité financière. J'aide mes clients à mieux comprendre leur situation financière, à structurer leurs décisions et à bâtir une stratégie cohérente avec leurs objectifs.",
      'about.p2': 'Mon approche est simple : moins de décisions prises au hasard, plus de décisions prises avec intention.',
      'about.meta1dt': "Champ d'action", 'about.meta1dd': 'Protection · Investissement · Retraite · Succession et héritage',
      'about.metaYrsDt': 'Pratique', 'about.metaYrsDd': '4e année de pratique',
      'about.metaEduDt': 'Formation', 'about.metaEduDd': 'Diplôme collégial en comptabilité et gestion',
      'about.meta2dt': 'Région', 'about.meta2dd': 'Québec, Canada',
      'about.meta3dt': 'Langues', 'about.meta3dd': 'Français · Anglais',
      'about.cta': 'En savoir plus sur moi',

      'services.overline': 'Services',
      'services.title': 'Ce que je peux vous aider à bâtir.',
      'services.lead': 'Pas un catalogue de produits. Des besoins, et une stratégie pour y répondre.',
      'services.s1title': 'Protéger',
      'services.s1items': 'Protection du revenu|Assurance vie|Invalidité|Maladie grave|Protection familiale',
      'services.s1desc': "Mettre la famille et le revenu à l'abri des imprévus.",
      'services.s2title': 'Faire croître',
      'services.s2items': "Investissements|CELI|REER|CELIAPP|Stratégies d'épargne",
      'services.s2desc': "Mettre l'argent au travail, avec méthode et discipline.",
      'services.s3title': 'Structurer',
      'services.s3items': 'Planification financière|Optimisation|Gestion des liquidités|Endettement|Organisation financière',
      'services.s3desc': "Remettre de l'ordre et une direction dans l'ensemble.",
      'services.s4title': 'Préparer',
      'services.s4items': 'Retraite|RRQ|RREGOP|Décaissement|Transmission du patrimoine',
      'services.s4desc': 'Transformer une vie de travail en revenu durable.',
      'services.talk': 'Parlons-en',
      'services.ctaConcepts': 'Explorer les concepts',

      'concepts.overline': 'Concepts financiers',
      'concepts.title': 'Comprendre son argent.',
      'concepts.lead': 'Les concepts financiers expliqués simplement.',
      'concepts.all': 'Tous',
      'concepts.reading': 'min de lecture',
      'concepts.soon': 'Page à venir',
      'concepts.noscript': 'Activez JavaScript pour parcourir la bibliothèque de concepts.',

      'nav.score': 'Score financier',
      'nav.trust': 'Confiance',

      'trust.overline': 'Confiance',
      'trust.title': 'La confiance se vérifie.',
      'trust.lead': "Mon inscription est publique et vérifiable en tout temps. Voici ce qui encadre mon travail.",
      'trust.leadStories': "Mon inscription est publique et vérifiable en tout temps — et voici ce que disent de mon travail celles et ceux qui me recommandent.",
      'trust.srcFacebook': 'Recommandation Facebook',
      'trust.srcGoogle': 'Avis Google',
      'trust.linkGoogle': 'Voir tous les avis sur Google',
      'trust.c1label': 'Inscription AMF',
      'trust.c1value': 'N° 261755',
      'trust.c1link': "Vérifier au registre de l'AMF",
      'trust.c2label': 'Rattachement',
      'trust.c2value': 'iA Groupe financier',
      'trust.c3label': 'Titre professionnel',
      'trust.c3value': 'Conseiller en sécurité financière',
      'trust.storiesTitle': 'Expériences clients',
      'trust.consent': 'Publié avec le consentement du client.',
      'quiz.overline': 'Ton score financier',
      'quiz.title': 'Où en êtes-vous, vraiment?',
      'quiz.lead': 'Un aperçu honnête de votre situation financière — et une piste claire pour avancer.',
      'quiz.start': 'Commencer le test',
      'quiz.teaserText': 'Répondez à quelques questions simples et obtenez votre score sur 100, avec des pistes concrètes pour avancer.',
      'quiz.question': 'Question',
      'quiz.back': 'Précédent',
      'quiz.resultOverline': 'Ton résultat',
      'quiz.scoreOutOf': 'sur 100',
      'quiz.recoTitle': 'Trois pistes pour avancer',
      'quiz.retake': 'Refaire le test',
      'quiz.ctaConcepts': 'Explorer les concepts',
      'quiz.disclaimer': "Ce test est un outil éducatif d'auto-évaluation. Il ne constitue pas une analyse financière personnalisée et ne remplace pas une rencontre avec un conseiller. Rien n'est enregistré ni transmis : vos réponses restent dans votre navigateur.",
      'quiz.emailLabel': 'Recevoir ce résultat par courriel avant notre rencontre',
      'quiz.emailPlaceholder': 'Votre adresse courriel',
      'quiz.emailSubmit': 'Envoyer',
      'quiz.emailSuccess': 'Merci, votre résultat est noté.',
      'quiz.noscript': 'Activez JavaScript pour faire le test.',

      'omf.overline': '1 Minute Finance',
      'omf.pitch1': 'Un concept.', 'omf.pitch2': 'Une minute.', 'omf.pitch3': 'Une meilleure décision financière.',
      'omf.cta': "S'inscrire à 1 Minute Finance",
      'omf.read': 'Lire', 'omf.watch': 'Voir', 'omf.article': 'Article',

      'nl.overline': 'Infolettre',
      'nl.title1': '1 Minute', 'nl.title2': 'Finance',
      'nl.lead': 'Une fois par semaine. Une minute. Une idée qui peut changer votre façon de gérer votre argent.',
      'nl.placeholder': 'Votre adresse courriel',
      'nl.submit': "Je m'inscris",
      'nl.note': "En vous inscrivant, vous acceptez de recevoir l'infolettre 1 Minute Finance de Samuel Russo. Désinscription en un clic, en tout temps. Votre adresse n'est jamais partagée.",
      'nl.invalid': 'Entrez une adresse courriel valide.',
      'nl.success': 'Merci. Vérifiez votre boîte de réception : la prochaine idée arrive bientôt.',
      'nl.error': 'Un problème est survenu. Réessayez dans un instant.',

      'soc.overline': 'Réseaux',
      'soc.title': 'Où me suivre.',
      'soc.lead': "Des idées simples sur l'argent, là où vous êtes déjà.",
      'soc.aria': 'Réseaux sociaux',
      'soc.follow': 'Suivre Samuel',

      'book.overline': 'Rendez-vous',
      'book.title': 'Et si on commençait par une conversation?',
      'book.text': "« Vous n'avez pas besoin d'avoir toutes les réponses avant de prendre rendez-vous. La première étape consiste simplement à comprendre où vous êtes et où vous voulez aller. »",
      'book.newTitle': 'Première rencontre',
      'book.newText': 'Faire connaissance et comprendre votre situation, vos questions et vos objectifs.',
      'book.clientTitle': 'Client actuel',
      'book.clientText': 'Rendez-vous de suivi : réviser votre stratégie, un changement de vie, une question.',
      'book.choose': 'Vous choisissez le type de rendez-vous sur la page de réservation.',
      'book.contactLine': 'Vous préférez parler à quelqu’un?',
      'book.fallback': "Le calendrier ne s'affiche pas? Ouvrez-le dans un nouvel onglet →",

      'footer.brand1': 'Votre avenir financier ne se planifie pas',
      'footer.brand2': 'tout seul.',
      'footer.colExplore': 'Explorer',
      'footer.colSocials': 'Réseaux',
      'footer.role': 'Conseiller en sécurité financière',
      'footer.email': 'Écrire un courriel',
      'footer.phone': 'Téléphoner',
      'footer.regLabel': 'Renseignements réglementaires —',
      'footer.verify': "Vérifier l'inscription au registre de l'AMF →",
      'footer.legalLinks': "Mentions légales · Politique de confidentialité · Conditions d'utilisation",
      'footer.bottomNote': 'Conçu comme une marque, pas comme une brochure.',

      'crumb.home': 'Accueil'
    },

    en: {
      'meta.title': 'Samuel Russo Finance | Financial Security Advisor',
      'meta.description': 'Samuel Russo, financial security advisor in Québec, affiliated with iA Financial Group. A financial strategy built around your reality: protection, investing, planning and retirement.',

      'lang.fr': 'FR', 'lang.en': 'EN',
      'nav.menuOpen': 'Open menu', 'nav.menuClose': 'Close menu',
      'a11y.skip': 'Skip to content',

      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.concepts': 'Concepts',
      'nav.minute': '1 Minute Finance',
      'nav.socials': 'Social',
      'nav.book': 'Book a meeting',
      'nav.newsletter': 'Subscribe to 1 Minute Finance',

      'hero.role': 'Financial Security Advisor',
      'hero.t1': 'Build.', 'hero.t2': 'Protect.', 'hero.t3': 'Grow.',
      'hero.sub': 'A financial strategy built around your reality, your goals and your future.',
      'hero.ctaApproach': 'See my approach',
      'hero.scroll': 'Scroll',

      'approach.overline': 'My approach',
      'approach.statement': "I don't believe in copy-paste financial plans.",
      'approach.quote': '"Your financial situation is unique. Your income. Your family. Your projects. Your risks. Your assets. Your vision of the future. <b>My job is to turn all of that into a strategy.</b>"',
      'approach.s1num': '01 — Income', 'approach.s1title': 'Understand',
      'approach.s1text': 'Get a clear picture of the current situation: income, spending, assets, debts.',
      'approach.s2num': '02 — Foundation', 'approach.s2title': 'Secure',
      'approach.s2text': 'Cash reserves, income protection and risk management before taking on any risk.',
      'approach.s3num': '03 — Growth', 'approach.s3title': 'Grow',
      'approach.s3text': 'Structured investing and wealth building, aligned with your horizon and tolerance.',
      'approach.s4num': '04 — Goals', 'approach.s4title': 'Project',
      'approach.s4text': 'Retirement, life projects and financial freedom: turning strategy into concrete decisions.',

      'about.overline': 'Behind the advisor',
      'about.title': 'Behind the advisor.',
      'about.p1': 'I\'m Samuel Russo, a financial security advisor. I help my clients better understand their finances, structure their decisions and build a strategy that fits their goals.',
      'about.p2': 'My approach is simple: fewer decisions made at random, more decisions made with intent.',
      'about.meta1dt': 'Focus', 'about.meta1dd': 'Protection · Investing · Retirement · Estate and inheritance planning',
      'about.metaYrsDt': 'Experience', 'about.metaYrsDd': '4th year of practice',
      'about.metaEduDt': 'Education', 'about.metaEduDd': 'College diploma in accounting and management',
      'about.meta2dt': 'Region', 'about.meta2dd': 'Québec, Canada',
      'about.meta3dt': 'Languages', 'about.meta3dd': 'French · English',
      'about.cta': 'More about me',

      'services.overline': 'Services',
      'services.title': 'What I can help you build.',
      'services.lead': 'Not a product catalogue. Real needs, and a strategy to meet them.',
      'services.s1title': 'Protect',
      'services.s1items': 'Income protection|Life insurance|Disability|Critical illness|Family protection',
      'services.s1desc': 'Shielding your family and income from the unexpected.',
      'services.s2title': 'Grow',
      'services.s2items': 'Investments|TFSA|RRSP|FHSA|Savings strategies',
      'services.s2desc': 'Putting money to work, with method and discipline.',
      'services.s3title': 'Structure',
      'services.s3items': 'Financial planning|Optimization|Cash-flow management|Debt|Financial organization',
      'services.s3desc': 'Bringing order and direction to the whole picture.',
      'services.s4title': 'Prepare',
      'services.s4items': 'Retirement|QPP|RREGOP|Drawdown|Estate transfer',
      'services.s4desc': 'Turning a working life into lasting income.',
      'services.talk': "Let's talk",
      'services.ctaConcepts': 'Explore the concepts',

      'concepts.overline': 'Financial concepts',
      'concepts.title': 'Understanding your money.',
      'concepts.lead': 'Financial concepts explained simply.',
      'concepts.all': 'All',
      'concepts.reading': 'min read',
      'concepts.soon': 'Coming soon',
      'concepts.noscript': 'Enable JavaScript to browse the concept library.',

      'nav.score': 'Financial Score',
      'nav.trust': 'Trust',

      'trust.overline': 'Trust',
      'trust.title': 'Trust can be verified.',
      'trust.lead': 'My registration is public and can be verified at any time. Here is what frames my work.',
      'trust.leadStories': 'My registration is public and can be verified at any time — and here is what the people who recommend me say about my work.',
      'trust.srcFacebook': 'Facebook recommendation',
      'trust.srcGoogle': 'Google review',
      'trust.linkGoogle': 'See all reviews on Google',
      'trust.c1label': 'AMF registration',
      'trust.c1value': 'No. 261755',
      'trust.c1link': 'Verify in the AMF register',
      'trust.c2label': 'Affiliation',
      'trust.c2value': 'iA Financial Group',
      'trust.c3label': 'Professional title',
      'trust.c3value': 'Financial Security Advisor',
      'trust.storiesTitle': 'Client experiences',
      'trust.consent': 'Published with the client’s consent.',
      'quiz.overline': 'Your financial score',
      'quiz.title': 'Where do you really stand?',
      'quiz.lead': 'An honest snapshot of your financial situation — and a clear path forward.',
      'quiz.start': 'Start the test',
      'quiz.teaserText': 'Answer a few simple questions and get your score out of 100, with concrete ways to move forward.',
      'quiz.question': 'Question',
      'quiz.back': 'Back',
      'quiz.resultOverline': 'Your result',
      'quiz.scoreOutOf': 'out of 100',
      'quiz.recoTitle': 'Three ways to move forward',
      'quiz.retake': 'Retake the test',
      'quiz.ctaConcepts': 'Explore the concepts',
      'quiz.disclaimer': "This test is an educational self-assessment tool. It does not constitute personalized financial analysis and does not replace a meeting with an advisor. Nothing is saved or transmitted: your answers stay in your browser.",
      'quiz.emailLabel': 'Get this result by email before our meeting',
      'quiz.emailPlaceholder': 'Your email address',
      'quiz.emailSubmit': 'Send',
      'quiz.emailSuccess': 'Thanks, your result has been noted.',
      'quiz.noscript': 'Enable JavaScript to take the test.',

      'omf.overline': '1 Minute Finance',
      'omf.pitch1': 'One concept.', 'omf.pitch2': 'One minute.', 'omf.pitch3': 'One better financial decision.',
      'omf.cta': 'Subscribe to 1 Minute Finance',
      'omf.read': 'Read', 'omf.watch': 'Watch', 'omf.article': 'Article',

      'nl.overline': 'Newsletter',
      'nl.title1': '1 Minute', 'nl.title2': 'Finance',
      'nl.lead': 'Once a week. One minute. One idea that can change how you manage your money.',
      'nl.placeholder': 'Your email address',
      'nl.submit': 'Subscribe',
      'nl.note': 'By subscribing, you agree to receive the 1 Minute Finance newsletter from Samuel Russo. One-click unsubscribe, any time. Your address is never shared.',
      'nl.invalid': 'Enter a valid email address.',
      'nl.success': 'Thank you. Check your inbox — the next idea is on its way.',
      'nl.error': 'Something went wrong. Please try again in a moment.',

      'soc.overline': 'Social',
      'soc.title': 'Where to follow me.',
      'soc.lead': 'Simple ideas about money, right where you already are.',
      'soc.aria': 'Social networks',
      'soc.follow': 'Follow Samuel',

      'book.overline': 'Meeting',
      'book.title': 'What if we started with a conversation?',
      'book.text': '"You don\'t need to have all the answers before booking a meeting. The first step is simply understanding where you are and where you want to go."',
      'book.newTitle': 'First meeting',
      'book.newText': 'Getting to know each other and understanding your situation, questions and goals.',
      'book.clientTitle': 'Current client',
      'book.clientText': 'Follow-up meeting: reviewing your strategy, a life change, a question.',
      'book.choose': 'You choose the type of meeting on the booking page.',
      'book.contactLine': 'Prefer to talk to someone?',
      'book.fallback': "Calendar not showing? Open it in a new tab →",

      'footer.brand1': 'Your financial future won\'t plan',
      'footer.brand2': 'itself.',
      'footer.colExplore': 'Explore',
      'footer.colSocials': 'Social',
      'footer.role': 'Financial Security Advisor',
      'footer.email': 'Send an email',
      'footer.phone': 'Call',
      'footer.regLabel': 'Regulatory information —',
      'footer.verify': 'Verify the registration in the AMF register →',
      'footer.legalLinks': 'Legal notice · Privacy policy · Terms of use',
      'footer.bottomNote': 'Designed as a brand, not a brochure.',

      'crumb.home': 'Home'
    }
  },

  /* --- moteur --------------------------------------------------------- */
  _lang: null,

  resolve: function () {
    var url;
    try { url = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    var stored;
    try { stored = localStorage.getItem(this.storageKey); } catch (e) {}
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    var pick = url || stored || (this.supported.indexOf(nav) > -1 ? nav : this.default);
    return this.supported.indexOf(pick) > -1 ? pick : this.default;
  },

  get: function () { return this._lang || this.default; },

  t: function (key) {
    var l = this.get();
    var tbl = this.strings[l] || {};
    if (key in tbl) return tbl[key];
    var fb = this.strings[this.default] || {};
    return key in fb ? fb[key] : key;
  },

  /* renvoie une valeur bilingue : chaîne simple, ou objet {fr,en} */
  pick: function (val) {
    if (val && typeof val === 'object') return val[this.get()] || val[this.default] || '';
    return val;
  },

  set: function (lang, opts) {
    if (this.supported.indexOf(lang) === -1) lang = this.default;
    this._lang = lang;
    try { localStorage.setItem(this.storageKey, lang); } catch (e) {}
    this.render();
    if (!opts || !opts.silent) {
      document.dispatchEvent(new CustomEvent('srf:langchange', { detail: { lang: lang } }));
    }
  },

  render: function () {
    var self = this;
    var l = this.get();
    document.documentElement.setAttribute('lang', l === 'fr' ? 'fr-CA' : 'en-CA');

    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      var v = self.t(n.getAttribute('data-i18n'));
      if (n.hasAttribute('data-i18n-html')) n.innerHTML = v; else n.textContent = v;
    });

    // listes : "a|b|c" -> <li>a</li><li>b</li>...
    document.querySelectorAll('[data-i18n-list]').forEach(function (n) {
      var parts = self.t(n.getAttribute('data-i18n-list')).split('|');
      n.innerHTML = parts.map(function (p) { return '<li>' + p.trim() + '</li>'; }).join('');
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (n) {
      n.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var kv = pair.split(':');
        if (kv.length === 2) n.setAttribute(kv[0].trim(), self.t(kv[1].trim()));
      });
    });

    // <title> + meta description (clés surchargeables par page)
    document.title = this.t(this.metaTitleKey || 'meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', this.t(this.metaDescKey || 'meta.description'));

    // état du sélecteur
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
    });
  },

  init: function () {
    var self = this;
    this._lang = this.resolve();
    this.render();
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { self.set(b.getAttribute('data-lang')); });
    });
  }
};
