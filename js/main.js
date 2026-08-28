/* Ameer Salman M — portfolio. Theme toggle, smooth scroll, nav state. */
(function () {
  'use strict';

  var $  = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- year ---------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- theme ---------- */
  var toggle = $('#themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = $('#menuToggle');
  var navLinks = $('#navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- smooth scroll ----------
     Handled here rather than by CSS alone so the sticky nav offset is exact
     and the URL hash updates without the browser jumping. */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      if (navLinks) navLinks.classList.remove('is-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');

      var navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 60;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH - 20;

      window.scrollTo({ top: top, behavior: calm.matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- nav: hairline on scroll, active section ---------- */
  var nav = $('#nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('is-stuck', window.pageYOffset > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var links = $$('.nav-links a');
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var ratios = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { ratios[e.target.id] = e.intersectionRatio; });
      var best = null, top = 0;
      Object.keys(ratios).forEach(function (id) {
        if (ratios[id] > top) { top = ratios[id]; best = id; }
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', top > 0 && a.getAttribute('href') === '#' + best);
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5, 1] });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
