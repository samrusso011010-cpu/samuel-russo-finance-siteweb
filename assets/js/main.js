/* =============================================================================
   POINT D'ENTRÉE
   Ordre de chargement (voir index.html) :
   config.js -> data/*.js -> modules/*.js -> main.js
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Année du footer
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();

    // Langue (FR / EN) — avant tout le reste pour poser les bons libellés
    if (SRF.i18n) SRF.i18n.init();

    // Coordonnées / mentions depuis la config
    applyConfigText();

    // Contenus dynamiques
    if (SRF.render) SRF.render();

    // Re-applique config + coordonnées après un changement de langue
    document.addEventListener('srf:langchange', applyConfigText);

    // Comportements
    if (SRF.nav) SRF.nav();
    if (SRF.booking) SRF.booking();
    if (SRF.newsletter) SRF.newsletter();
    if (SRF.animations) SRF.animations.init();
  });

  // Choisit la bonne langue pour une valeur de config ("texte" ou {fr,en}).
  function pick(val) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return SRF.i18n ? SRF.i18n.pick(val) : (val.fr || val.en || '');
    }
    return val;
  }

  function applyConfigText() {
    var c = SRF.config || {};
    var affLabel = (SRF.i18n && SRF.i18n.get() === 'en') ? 'Affiliated with ' : 'Rattaché à ';
    setText('[data-cfg="brand.tagline"]', pick(c.brand && c.brand.tagline));
    setText('[data-cfg="brand.affiliation"]',
      c.brand && c.brand.affiliation ? affLabel + c.brand.affiliation : '');
    setText('[data-cfg="compliance.disclaimer"]', pick(c.compliance && c.compliance.disclaimer));
    setText('[data-cfg="compliance.permitInfo"]', pick(c.compliance && c.compliance.permitInfo));
    setText('[data-cfg="compliance.legalName"]', pick(c.compliance && c.compliance.legalName));
    setText('[data-cfg="compliance.regulator"]', pick(c.compliance && c.compliance.regulator));

    if (c.compliance && c.compliance.amfRegistryUrl) {
      document.querySelectorAll('[data-amf-link]').forEach(function (a) {
        a.href = c.compliance.amfRegistryUrl;
      });
    }

    // Coordonnées
    if (c.brand && c.brand.email) {
      document.querySelectorAll('[data-email]').forEach(function (a) {
        a.href = 'mailto:' + c.brand.email;
        if (!a.textContent.trim() || a.hasAttribute('data-email-show')) a.textContent = c.brand.email;
      });
    }
    if (c.brand && c.brand.phone) {
      document.querySelectorAll('[data-phone]').forEach(function (a) {
        a.href = 'tel:+1' + c.brand.phone.replace(/[^0-9]/g, '');
        if (!a.textContent.trim() || a.hasAttribute('data-phone-show')) a.textContent = c.brand.phone;
      });
    }

    // Liens sociaux (footer + section réseaux)
    if (c.socials) {
      document.querySelectorAll('[data-social]').forEach(function (a) {
        var key = a.getAttribute('data-social');
        var url = c.socials[key];
        if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
        else { (a.closest('[data-social-item]') || a).style.display = 'none'; }
      });
    }

    // Orbite des réseaux : si une URL est vide (réseau masqué), les badges restants
    // se répartissent à nouveau régulièrement sur le cercle.
    var orbit = document.querySelector('.orbit');
    if (orbit) {
      var shown = [].slice.call(orbit.querySelectorAll('.orbit__item')).filter(function (n) {
        return n.style.display !== 'none';
      });
      orbit.style.setProperty('--n', Math.max(shown.length, 1));
      shown.forEach(function (n, i) { n.style.setProperty('--i', i); });
    }

    // Liens « Voir tous les avis » (Facebook / Google) : masqués tant que l'URL est vide.
    document.querySelectorAll('[data-review-link]').forEach(function (a) {
      var url = c.reviews && c.reviews[a.getAttribute('data-review-link')];
      if (url) { a.href = url; a.style.display = ''; }
      else { a.style.display = 'none'; }
    });

    // Score financier — outil externe, même principe que le calendrier de rendez-vous :
    // une seule URL (config.score.url) reprise par tous les liens du site.
    if (c.score && c.score.url) {
      document.querySelectorAll('[data-score]').forEach(function (a) {
        a.href = c.score.url;
        a.target = '_blank';
        a.rel = 'noopener';
      });
    }
  }

  function setText(sel, val) {
    if (!val) return;
    document.querySelectorAll(sel).forEach(function (n) { n.textContent = val; });
  }
})(window.SRF);
