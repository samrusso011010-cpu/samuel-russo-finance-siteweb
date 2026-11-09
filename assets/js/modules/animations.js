/* =============================================================================
   ANIMATIONS — sans dépendance
   - reveal au scroll (IntersectionObserver)
   - reveal de titres ligne par ligne
   - parallax léger (hero + éléments [data-parallax])
   - compteurs animés [data-count]
   Respecte prefers-reduced-motion.
   ============================================================================= */

window.SRF = window.SRF || {};

(function (SRF) {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Reveal ---------------------------------------------------------- */
  var io = null;

  function initReveal() {
    var cfg = (SRF.config && SRF.config.motion) || {};
    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal], .reveal-lines').forEach(function (n) {
        n.classList.add('is-visible');
      });
      return;
    }

    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    }, { threshold: cfg.revealThreshold || 0.16, rootMargin: '0px 0px -8% 0px' });

    observe(document);
  }

  function observe(root) {
    if (!io) return;
    var nodes = root.querySelectorAll('[data-reveal]:not(.is-visible), .reveal-lines:not(.is-visible)');
    var i = 0;
    nodes.forEach(function (n) {
      // délai de cascade pour les groupes
      if (n.parentElement && n.parentElement.hasAttribute('data-stagger')) {
        n.style.setProperty('--reveal-delay', (i++ * 0.07) + 's');
      }
      io.observe(n);
    });
  }

  /* --- Titres ligne par ligne --------------------------------------- */
  function initLines() {
    document.querySelectorAll('.reveal-lines').forEach(function (block) {
      block.querySelectorAll('.line').forEach(function (line, i) {
        var span = line.querySelector('span');
        if (span) span.style.setProperty('--line-delay', (i * 0.09) + 's');
      });
    });
  }

  /* --- Parallax ----------------------------------------------------- */
  function initParallax() {
    var cfg = (SRF.config && SRF.config.motion) || {};
    if (reduced || cfg.enableParallax === false) return;

    var targets = [].slice.call(document.querySelectorAll('[data-parallax]'));
    if (!targets.length) return;

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      targets.forEach(function (t) {
        var speed = parseFloat(t.getAttribute('data-parallax')) || 0.12;
        var rect = t.getBoundingClientRect();
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        t.style.transform = 'translate3d(0,' + (-progress * speed * 100).toFixed(2) + 'px,0)';
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* --- Zoom du hero au changement de section -------------------------- */
  // L'image du hero grossit lentement à mesure qu'on défile vers la section
  // suivante — un effet de zoom cinématographique lié au défilement, séparé
  // du parallax (qui, lui, déplace le cadre plutôt que de le grossir).
  function initHeroZoom() {
    var cfg = (SRF.config && SRF.config.motion) || {};
    if (reduced || cfg.enableParallax === false) return;
    var hero = document.querySelector('.hero');
    var img = hero && hero.querySelector('.hero__media img, .hero__media video');
    if (!img) return;

    var ticking = false;
    function update() {
      var h = hero.offsetHeight || 1;
      var p = Math.min(Math.max(window.scrollY / h, 0), 1);
      img.style.transform = 'scale(' + (1 + p * 0.16).toFixed(3) + ')';
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* --- Barre de progression de lecture ------------------------------ */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress__bar');
    if (!bar) return;
    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* --- Titres mot-par-mot ------------------------------------------- */
  // Découpe le texte d'un titre en mots, chacun dans un petit masque
  // (overflow hidden) qui se lève au scroll. Refait à chaque changement de
  // langue puisque i18n remplace le texte brut de l'élément.
  function splitWords(el) {
    var words = el.textContent.trim().split(/\s+/).filter(Boolean);
    el.innerHTML = words.map(function (w, i) {
      return '<span class="word"><span style="--w-delay:' + (i * 0.045).toFixed(3) + 's">' +
        w + '</span></span>';
    }).join(' ');
  }

  function initSplitWords() {
    var els = document.querySelectorAll('[data-split-words]');
    if (!els.length) return;
    els.forEach(splitWords);
    document.addEventListener('srf:langchange', function () {
      els.forEach(splitWords);
    });
  }

  /* --- Boutons magnétiques ------------------------------------------- */
  // Léger effet d'attraction vers le curseur sur les CTA principaux —
  // uniquement souris précise, jamais sur tactile, jamais en reduced-motion.
  function initMagnetic() {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.btn--lg').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.2;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* --- Vidéos d'ambiance (fond de la section Confiance) ----------------- */
  // Ne joue que si la section est visible (économie de batterie/données).
  // Reste sur l'image fixe (poster) si le visiteur a demandé « réduire les
  // animations » ou activé l'économie de données.
  function initBgVideo() {
    var videos = document.querySelectorAll('[data-bg-video]');
    if (!videos.length) return;
    var conn = navigator.connection || {};
    var still = reduced || conn.saveData === true;

    videos.forEach(function (v) {
      v.muted = true; // requis pour l'autoplay (certains navigateurs lisent l'attribut trop tard)
      if (still) { v.removeAttribute('autoplay'); v.pause(); return; }

      function play() {
        var p = v.play();
        if (p && p.catch) p.catch(function () { /* autoplay refusé (ex. mode économie d'énergie iOS) : le poster reste affiché */ });
      }

      if (!('IntersectionObserver' in window)) { play(); return; }
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) play(); else v.pause(); });
      }, { threshold: 0.05 });
      io2.observe(v.closest('section') || v);
    });
  }

  /* --- Horloge « 1 Minute Finance » ----------------------------------- */
  // Compte de 00:00 à 01:00 à l'entrée dans le viewport — un clin d'œil au
  // concept de la marque plutôt qu'un chiffre statique.
  function initClock() {
    var clock = document.querySelector('[data-clock]');
    if (!clock) return;
    var minEl = clock.querySelector('[data-clock-min]');
    var secEl = clock.querySelector('[data-clock-sec]');
    if (!minEl || !secEl) return;

    function run() {
      if (reduced) { minEl.textContent = '01'; secEl.textContent = '00'; return; }
      var dur = 1100, start = performance.now();
      function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var total = Math.round(eased * 60);
        minEl.textContent = String(Math.floor(total / 60)).padStart(2, '0');
        secEl.textContent = String(total % 60).padStart(2, '0');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) { run(); return; }
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(); cObs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    cObs.observe(clock);
  }

  /* --- Compteurs -------------------------------------------------- */
  // Anime un [data-count] de 0 à sa valeur cible. Exposée (SRF.animations.animateCount)
  // pour les compteurs créés après coup, ex. le score du quiz financier.
  function animateCount(node) {
    if (!node) return;
    var target = parseFloat(node.getAttribute('data-count'));
    var suffix = node.getAttribute('data-count-suffix') || '';
    var dur = 1400;
    if (reduced) { node.textContent = target + suffix; return; }
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var nodes = [].slice.call(document.querySelectorAll('[data-count]'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) { nodes.forEach(animateCount); return; }
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cObs.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (n) { cObs.observe(n); });
  }

  SRF.animations = {
    init: function () {
      initLines();
      initSplitWords();
      initReveal();
      initParallax();
      initHeroZoom();
      initScrollProgress();
      initMagnetic();
      initBgVideo();
      initClock();
      initCounters();
    },
    observe: observe,
    animateCount: animateCount
  };
})(window.SRF);
