/* =============================================================================
   INFOLETTRE « 1 MINUTE FINANCE »
   -----------------------------------------------------------------------------
   Abstraction propre : aucune plateforme n'est branchée par défaut.
   Le provider est choisi dans config.js -> newsletter.provider

   Pour brancher une plateforme réelle :
   - 'mailchimp'   : endpoint = URL du formulaire embed (…/post?u=…&id=…)
   - 'convertkit'  : endpoint = https://app.convertkit.com/forms/<id>/subscriptions
   - 'gohighlevel' : endpoint = URL du webhook / form endpoint GHL
   - 'custom'      : endpoint = votre propre API (POST { email })
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  var providers = {
    none: function (email) {
      // Mode démonstration : on simule un succès sans rien envoyer.
      return Promise.resolve({ ok: true, demo: true });
    },

    // GoHighLevel via la fonction serveur /api/subscribe (voir api/subscribe.js).
    // La clé GoHighLevel reste côté serveur. Le succès n'est affiché que si le
    // serveur confirme réellement l'inscription.
    ghl: function (email, cfg, extra) {
      return fetch(cfg.endpoint || '/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          lang: extra && extra.lang,
          website: extra && extra.website,   // piège à robots (champ caché, doit rester vide)
          elapsed: extra && extra.elapsed
        })
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.ok === true }; }); });
    },

    custom: function (email, cfg) {
      return fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({ email: email }, cfg.hiddenFields || {}))
      }).then(function (r) { return { ok: r.ok }; });
    },

    convertkit: function (email, cfg) {
      var body = new FormData();
      body.append('email_address', email);
      Object.keys(cfg.hiddenFields || {}).forEach(function (k) { body.append(k, cfg.hiddenFields[k]); });
      return fetch(cfg.endpoint, { method: 'POST', body: body })
        .then(function (r) { return { ok: r.ok }; });
    },

    gohighlevel: function (email, cfg) {
      return fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({ email: email }, cfg.hiddenFields || {}))
      }).then(function (r) { return { ok: r.ok }; });
    },

    mailchimp: function (email, cfg) {
      // Mailchimp bloque le POST direct (CORS). On ouvre le formulaire hébergé.
      var url = cfg.endpoint + (cfg.endpoint.indexOf('?') > -1 ? '&' : '?') +
        'EMAIL=' + encodeURIComponent(email);
      window.open(url, '_blank', 'noopener');
      return Promise.resolve({ ok: true, external: true });
    }
  };

  // Exposé pour être réutilisé ailleurs (ex. la capture de courriel du quiz
  // « Ton score financier ») sans dupliquer la logique des providers.
  SRF.newsletterProviders = providers;

  SRF.newsletter = function () {
    var form = document.querySelector('[data-newsletter-form]');
    if (!form) return;

    var section = form.closest('.newsletter') || form.parentElement;
    var input = form.querySelector('input[type="email"]');
    var status = section.querySelector('[data-newsletter-status]');
    var cfg = (SRF.config && SRF.config.newsletter) || { provider: 'none' };
    var handler = providers[cfg.provider] || providers.none;
    var openedAt = Date.now();
    var honeypot = form.querySelector('input[name="nl_hp"]');

    function msgFor(kind) {
      // priorité : i18n (bilingue) > config > défaut
      if (SRF.i18n) {
        if (kind === 'ok') return SRF.i18n.t('nl.success');
        if (kind === 'err') return SRF.i18n.t('nl.error');
        if (kind === 'invalid') return SRF.i18n.t('nl.invalid');
      }
      if (kind === 'ok') return cfg.successMessage || 'Merci pour votre inscription.';
      if (kind === 'err') return cfg.errorMessage || 'Un problème est survenu.';
      return 'Entrez une adresse courriel valide.';
    }

    function say(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'newsletter__status' + (kind === 'ok' || kind === 'err' ? ' is-' + kind : (kind ? ' is-err' : ''));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (input && input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say(msgFor('invalid'), 'err');
        if (input) input.focus();
        return;
      }

      var btn = form.querySelector('button');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = '…'; }
      say('');

      var extra = {
        lang: ((SRF.i18n && SRF.i18n._lang) || document.documentElement.lang || 'fr').slice(0, 2),
        website: honeypot ? honeypot.value : '',
        elapsed: Date.now() - openedAt
      };

      Promise.resolve(handler(email, cfg, extra))
        .then(function (res) {
          if (res && res.ok) {
            say(msgFor('ok'), 'ok');
            section.classList.add('is-done');
          } else {
            say(msgFor('err'), 'err');
          }
        })
        .catch(function () { say(msgFor('err'), 'err'); })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = btn.dataset.label ||
              (SRF.i18n ? SRF.i18n.t('nl.submit') : "Je m'inscris");
          }
        });
    });
  };
})(window.SRF);
