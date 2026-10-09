/* =============================================================================
   RENDU DES CONTENUS DYNAMIQUES  (bilingue FR / EN)
   Concepts financiers · Capsules 1 Minute Finance · Réseaux sociaux
   Les champs de texte peuvent être une chaîne simple ou un objet { fr, en }.
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  function L(val) { return SRF.i18n ? SRF.i18n.pick(val) : (val && val.fr) || val; }
  function T(key, frFallback) { return SRF.i18n ? SRF.i18n.t(key) : frFallback; }

  var PLATFORM_LABEL = {
    youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok',
    facebook: 'Facebook', linkedin: 'LinkedIn'
  };
  function platform(p) {
    if (p === 'site') return T('omf.article', 'Article');
    return PLATFORM_LABEL[p] || p;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function formatDate(iso) {
    var locale = SRF.i18n && SRF.i18n.get() === 'en' ? 'en-CA' : 'fr-CA';
    try {
      return new Date(iso + 'T00:00:00').toLocaleDateString(locale, {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    } catch (e) { return iso; }
  }

  /* ---- CONCEPTS ---------------------------------------------------------- */
  function renderConcepts() {
    var grid = document.querySelector('[data-concepts-grid]');
    var filters = document.querySelector('[data-concepts-filters]');
    if (!grid || !SRF.concepts) return;

    var items = SRF.concepts.filter(function (c) { return c.status === 'published'; });
    var allLabel = T('concepts.all', 'Tous');
    var cats = [allLabel].concat(items.map(function (c) { return L(c.category); })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }));

    if (filters) {
      filters.innerHTML = '';
      cats.forEach(function (cat, i) {
        var b = el('button', null, cat);
        b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        b.addEventListener('click', function () {
          filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          paint(cat);
        });
        filters.appendChild(b);
      });
    }

    function paint(cat) {
      grid.innerHTML = '';
      items
        .filter(function (c) { return !cat || cat === allLabel ? true : L(c.category) === cat; })
        .forEach(function (c) {
          var a = el('a', 'concept' + (c.accent ? ' is-accent' : ''));
          a.href = c.hasPage ? 'pages/concepts/' + c.slug + '.html' : '#concepts';
          a.setAttribute('data-reveal', '');
          var footRight = c.hasPage
            ? (c.readingTime + ' ' + T('concepts.reading', 'min de lecture'))
            : T('concepts.soon', 'Page à venir');
          a.innerHTML =
            '<span class="concept__cat">' + L(c.category) + '</span>' +
            '<span class="concept__label">' + L(c.label) + '</span>' +
            '<p class="concept__q">' + L(c.title) + '</p>' +
            '<p class="concept__excerpt">' + L(c.excerpt) + '</p>' +
            '<span class="concept__foot"><span>' + footRight + '</span>' +
            '<span class="arrow" aria-hidden="true">&rarr;</span></span>';
          if (!c.hasPage) {
            a.setAttribute('aria-disabled', 'true');
            a.addEventListener('click', function (ev) { ev.preventDefault(); });
          }
          grid.appendChild(a);
        });
      if (SRF.animations && SRF.animations.observe) SRF.animations.observe(grid);
    }

    paint(allLabel);
  }

  /* ---- CAPSULES 1 MINUTE FINANCE --------------------------------------- */
  function renderCapsules() {
    var grid = document.querySelector('[data-capsules-grid]');
    if (!grid || !SRF.capsules) return;
    grid.innerHTML = '';

    SRF.capsules
      .slice()
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; })
      .forEach(function (c) {
        var card = el('article', 'capsule');
        card.setAttribute('data-reveal', '');
        var actions = '';
        if (c.articleUrl) actions += '<a href="' + c.articleUrl + '">' + T('omf.read', 'Lire') + '</a>';
        if (c.url) actions += '<a href="' + c.url + '"' +
          (c.url.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + T('omf.watch', 'Voir') + '</a>';

        card.innerHTML =
          '<div class="capsule__media">' +
            '<img src="' + c.image + '" alt="" loading="lazy" width="640" height="400">' +
            '<span class="capsule__badge">' + platform(c.platform) + '</span>' +
            '<span class="capsule__dur">' + c.duration + '</span>' +
          '</div>' +
          '<div class="capsule__body">' +
            '<span class="capsule__meta">' + L(c.category) + ' · ' + formatDate(c.date) + '</span>' +
            '<h3 class="capsule__title">' + L(c.title) + '</h3>' +
            '<div class="capsule__actions">' + actions + '</div>' +
          '</div>';
        grid.appendChild(card);
      });

    if (SRF.animations && SRF.animations.observe) SRF.animations.observe(grid);
  }

  /* ---- RÉSEAUX SOCIAUX ------------------------------------------------- */
  function renderSocials() {
    var grid = document.querySelector('[data-socials-grid]');
    if (!grid || !SRF.socialPosts) return;
    grid.innerHTML = '';

    SRF.socialPosts.forEach(function (p) {
      var a = el('a', 'social-card');
      a.href = p.url;
      if (p.url && p.url.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
      a.setAttribute('data-reveal', '');
      a.setAttribute('aria-label', platform(p.platform) + ' — ' + L(p.caption));
      a.innerHTML =
        '<img src="' + p.image + '" alt="" loading="lazy" width="360" height="640">' +
        '<span class="social-card__overlay">' +
          '<span class="social-card__platform">' + platform(p.platform) + '</span>' +
          '<span class="social-card__caption">' + L(p.caption) + '</span>' +
        '</span>';
      grid.appendChild(a);
    });

    if (SRF.animations && SRF.animations.observe) SRF.animations.observe(grid);
  }

  SRF.render = function () {
    renderConcepts();
    renderCapsules();
    renderSocials();
  };

  // Régénère tout quand la langue change
  document.addEventListener('srf:langchange', function () { SRF.render(); });
})(window.SRF);
