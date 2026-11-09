/* =============================================================================
   PRISE DE RENDEZ-VOUS
   Une seule source pour l'URL du calendrier : config.booking.url
   Deux modes : 'newtab' (par défaut) ou 'embed' (modale iframe)
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  SRF.booking = function () {
    var cfg = (SRF.config && SRF.config.booking) || {};
    var triggers = document.querySelectorAll('[data-booking]');
    if (!triggers.length) return;

    // Le calendrier Microsoft Bookings n'accepte d'être intégré que depuis une
    // page https (frame-ancestors https:) : en local (http://localhost) on
    // retombe automatiquement sur l'ouverture dans un nouvel onglet.
    var embed = cfg.mode === 'embed' && location.protocol === 'https:';

    // Applique l'URL/le libellé à tous les CTA de rendez-vous du site.
    triggers.forEach(function (t) {
      if (t.tagName === 'A') {
        t.setAttribute('href', cfg.url || '#');
        if (!embed) { t.setAttribute('target', '_blank'); t.setAttribute('rel', 'noopener'); }
      }
      // Libellé : uniquement si la page n'est pas pilotée par i18n
      // (sinon SRF.i18n garde la maîtrise du texte, dans les deux langues).
      if (cfg.label && t.hasAttribute('data-booking-label') && !SRF.i18n) {
        var span = t.querySelector('[data-booking-text]') || t;
        span.textContent = cfg.label;
      }
    });

    if (!embed) return;

    /* --- Mode modale --- */
    var modal = document.querySelector('[data-booking-modal]');
    if (!modal || modal.hasAttribute('data-booking-ready')) return; // idempotent
    modal.setAttribute('data-booking-ready', '');
    var frame = modal.querySelector('iframe');
    var lastFocus = null;

    // Lien de secours si le calendrier intégré ne s'affiche pas (bloqueur, réseau…).
    var fb = document.createElement('a');
    fb.className = 'modal__fallback';
    fb.href = cfg.url;
    fb.target = '_blank';
    fb.rel = 'noopener';
    fb.setAttribute('data-i18n', 'book.fallback');
    fb.textContent = SRF.i18n ? SRF.i18n.t('book.fallback') : "Le calendrier ne s'affiche pas? Ouvrez-le dans un nouvel onglet →";
    modal.appendChild(fb);

    function open(e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      if (frame && !frame.src) frame.src = cfg.url;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      var close = modal.querySelector('[data-booking-close]');
      if (close) close.focus();
    }
    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    triggers.forEach(function (t) { t.addEventListener('click', open); });
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.hasAttribute('data-booking-close')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  };
})(window.SRF);
