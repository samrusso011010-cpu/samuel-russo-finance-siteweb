/* =============================================================================
   NAVIGATION
   - Transparente sur le hero, glassmorphism subtil au scroll
   - Menu plein écran sur mobile
   - Fermeture au clic, à l'échap, au changement de section
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  SRF.nav = function () {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav__toggle');
    var overlay = document.querySelector('.nav__overlay');
    if (!nav) return;

    /* --- État scrollé --- */
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* --- Menu mobile --- */
    function setMenu(open) {
      document.body.classList.toggle('menu-open', open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open && overlay) {
        var first = overlay.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', function () {
        setMenu(!document.body.classList.contains('menu-open'));
      });
    }

    if (overlay) {
      overlay.querySelectorAll('a').forEach(function (a, i) {
        a.style.setProperty('--i', i);
        a.addEventListener('click', function () { setMenu(false); });
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
    });

    /* --- Ferme le menu si on repasse en desktop --- */
    var mq = window.matchMedia('(min-width: 1121px)');
    (mq.addEventListener ? mq.addEventListener('change', h) : mq.addListener(h));
    function h(e) { if (e.matches) setMenu(false); }

    /* --- Lien actif selon la section visible ---
       Seuls les liens vers une ancre de la page (#section) participent :
       un lien externe (ex. l'outil de score financier) n'a pas de section
       à surligner et ferait planter querySelector si on le lui demandait. */
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'))
      .filter(function (l) { return (l.getAttribute('href') || '').charAt(0) === '#'; });
    var sections = links
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  };
})(window.SRF);
