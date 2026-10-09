/* =============================================================================
   TON SCORE FINANCIER — QUIZ D'AUTO-ÉVALUATION (actuellement NON utilisé)
   -----------------------------------------------------------------------------
   Ce moteur hébergeait le quiz directement sur la page. La section #score du
   site renvoie maintenant vers l'outil externe config.score.url
   (https://score-financier.vercel.app/…) — ce fichier n'est plus chargé par
   index.html (voir ses balises <script> retirées).

   Gardé au cas où l'on voudrait un jour réintégrer le test sur le site : pour
   le reconnecter, remettre <script src="assets/js/data/quiz.js"> et
   <script src="assets/js/modules/quiz.js" defer> dans index.html, redonner à
   #score son <div class="quiz" data-quiz data-reveal="scale"><div
   class="quiz__body" data-quiz-body></div></div>, et rappeler SRF.quizEngine()
   dans main.js.

   100 % client : aucune réponse n'est envoyée nulle part par défaut. Le seul
   envoi possible est l'adresse courriel optionnelle en fin de test, via la
   même abstraction que l'infolettre (config.newsletter — voir modules/newsletter.js).
   Rien n'est inventé : provider 'none' tant qu'aucune plateforme n'est branchée.
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  function L(val) { return SRF.i18n ? SRF.i18n.pick(val) : (val && val.fr) || val; }
  function T(key, fb) { return SRF.i18n ? SRF.i18n.t(key) : fb; }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  SRF.quizEngine = function () {
    var root = document.querySelector('[data-quiz]');
    var body = root && root.querySelector('[data-quiz-body]');
    var data = SRF.quiz;
    if (!root || !body || !data) return;

    var answers = [];   // points choisis, un par question
    var step = 0;       // -1 = intro, 0..N-1 = questions, N = résultat
    var total = data.questions.length;

    function paint() {
      if (step === -1) return paintIntro();
      if (step === total) return paintResult();
      paintQuestion(step);
    }

    function paintIntro() {
      body.innerHTML = '';
      var wrap = el('div', 'quiz__intro');
      var p = el('p', null, L({
        fr: "Répondez honnêtement — il n'y a pas de bonne ou de mauvaise réponse, seulement un point de départ.",
        en: 'Answer honestly — there is no right or wrong answer, only a starting point.'
      }));
      var btn = el('button', 'btn btn--accent', T('quiz.start', 'Commencer le test') +
        ' <span class="btn__arrow" aria-hidden="true">→</span>');
      btn.addEventListener('click', function () { step = 0; answers = []; paint(); });
      wrap.appendChild(p);
      wrap.appendChild(btn);
      body.appendChild(wrap);
    }

    function paintQuestion(i) {
      var q = data.questions[i];
      body.innerHTML = '';

      var progress = el('div', 'quiz__progress');
      progress.setAttribute('role', 'progressbar');
      progress.setAttribute('aria-valuenow', String(i + 1));
      progress.setAttribute('aria-valuemin', '1');
      progress.setAttribute('aria-valuemax', String(total));
      var bar = el('div', 'quiz__progress-bar');
      bar.style.width = Math.round(((i) / total) * 100) + '%';
      progress.appendChild(bar);

      var meta = el('p', 'quiz__meta', T('quiz.question', 'Question') + ' ' + (i + 1) + ' / ' + total +
        ' · ' + L(q.pillar));
      var h3 = el('h3', 'quiz__question', L(q.text));
      var opts = el('div', 'quiz__options');
      opts.setAttribute('role', 'radiogroup');

      q.options.forEach(function (opt, oi) {
        var b = el('button', 'quiz__option', L(opt.text));
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', answers[i] === opt.points ? 'true' : 'false');
        if (answers[i] === opt.points) b.classList.add('is-selected');
        b.addEventListener('click', function () {
          answers[i] = opt.points;
          window.setTimeout(function () {
            step = i + 1 < total ? i + 1 : total;
            paint();
          }, 220);
          opts.querySelectorAll('.quiz__option').forEach(function (o) { o.classList.remove('is-selected'); });
          b.classList.add('is-selected');
        });
        opts.appendChild(b);
      });

      var nav = el('div', 'quiz__nav');
      var back = el('button', 'quiz__back', '← ' + T('quiz.back', 'Précédent'));
      if (i === 0) back.setAttribute('hidden', '');
      back.addEventListener('click', function () { step = Math.max(0, i - 1); paint(); });
      nav.appendChild(back);

      body.appendChild(progress);
      body.appendChild(meta);
      body.appendChild(h3);
      body.appendChild(opts);
      body.appendChild(nav);
    }

    function computeScore() {
      var sum = answers.reduce(function (a, b) { return a + (b || 0); }, 0);
      return Math.round((sum / data.maxPoints) * 100);
    }

    function bandFor(score) {
      return data.bands.filter(function (b) { return score >= b.min && score <= b.max; })[0] || data.bands[0];
    }

    function paintResult() {
      body.innerHTML = '';
      var score = computeScore();
      var band = bandFor(score);

      var overline = el('p', 'overline overline--plain', T('quiz.resultOverline', 'Ton résultat'));
      var scoreRow = el('div', 'quiz__score',
        '<span class="quiz__score-num" data-count="' + score + '">0</span>' +
        '<span class="quiz__score-suffix">' + T('quiz.scoreOutOf', 'sur 100') + '</span>');
      var gauge = el('div', 'quiz__gauge', '<div class="quiz__gauge-fill" style="width:0%"></div>');
      var bandEl = el('p', 'quiz__band accent', L(band.label));
      var summary = el('p', 'quiz__summary', L(band.summary));

      var recoTitle = el('p', 'quiz__reco-title', T('quiz.recoTitle', 'Trois pistes pour avancer'));
      var reco = el('ul', 'quiz__reco');
      band.recommendations.forEach(function (r) { reco.appendChild(el('li', null, L(r))); });

      var emailWrap = el('div', 'quiz__email-form');
      emailWrap.innerHTML =
        '<form class="quiz__email" data-quiz-email>' +
          '<label class="quiz__email-label" for="quiz-email">' + T('quiz.emailLabel', 'Recevoir ce résultat par courriel') + '</label>' +
          '<input type="email" id="quiz-email" placeholder="' + T('quiz.emailPlaceholder', 'Votre adresse courriel') + '" autocomplete="email">' +
          '<button type="submit" class="btn btn--ghost">' + T('quiz.emailSubmit', 'Envoyer') + '</button>' +
          '<p class="quiz__email-status" data-quiz-email-status role="status" aria-live="polite"></p>' +
        '</form>';

      var ctaRow = el('div', 'cta-row');
      ctaRow.innerHTML =
        '<a class="btn btn--accent" href="#rendez-vous" data-booking data-booking-label>' +
          '<span data-booking-text data-i18n="nav.book">' + T('nav.book', 'Prendre rendez-vous') + '</span>' +
          '<span class="btn__arrow" aria-hidden="true">→</span></a>' +
        '<a class="btn btn--ghost" href="#concepts">' + T('quiz.ctaConcepts', 'Explorer les concepts') + '</a>';

      var retake = el('button', 'quiz__retake link-arrow', T('quiz.retake', 'Refaire le test') +
        ' <span class="accent" aria-hidden="true">→</span>');
      retake.addEventListener('click', function () { step = -1; answers = []; paint(); });

      var disclaimer = el('p', 'disclaimer', T('quiz.disclaimer', ''));

      var result = el('div', 'quiz__result');
      [overline, scoreRow, gauge, bandEl, summary, recoTitle, reco, emailWrap, ctaRow, retake, disclaimer]
        .forEach(function (n) { result.appendChild(n); });
      body.appendChild(result);

      // Applique le lien de rendez-vous centralisé (config.booking) au CTA généré dynamiquement
      if (SRF.booking) SRF.booking();

      // Anime la jauge + le compteur de score
      requestAnimationFrame(function () {
        body.querySelector('.quiz__gauge-fill').style.width = score + '%';
      });
      if (SRF.animations && SRF.animations.animateCount) {
        SRF.animations.animateCount(body.querySelector('[data-count]'));
      }

      // Envoi optionnel du résultat par courriel (réutilise le provider de l'infolettre)
      var form = body.querySelector('[data-quiz-email]');
      var status = body.querySelector('[data-quiz-email-status]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        var email = (input.value || '').trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          status.textContent = T('nl.invalid', 'Entrez une adresse courriel valide.');
          status.className = 'quiz__email-status is-err';
          return;
        }
        var cfg = (SRF.config && SRF.config.newsletter) || { provider: 'none' };
        // Étiquette la source dans les champs cachés, sans modifier la config globale.
        var quizCfg = Object.assign({}, cfg, {
          hiddenFields: Object.assign({}, cfg.hiddenFields, { source: 'quiz-score', score: score, band: band.key })
        });
        var send = (SRF.newsletterProviders && SRF.newsletterProviders[cfg.provider]) || null;
        var result = send ? send(email, quizCfg) : Promise.resolve({ ok: true, demo: true });
        Promise.resolve(result).then(function () {
          status.textContent = T('quiz.emailSuccess', 'Merci, votre résultat est noté.');
          status.className = 'quiz__email-status is-ok';
          root.classList.add('is-email-done');
        });
      });
    }

    step = -1;
    paint();

    document.addEventListener('srf:langchange', function () {
      // on ne perd pas la progression : on redessine juste l'écran courant
      paint();
    });
  };
})(window.SRF);
