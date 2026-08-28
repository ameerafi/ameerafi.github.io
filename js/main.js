/* Ameer Salman — portfolio behaviour. Vanilla, no dependencies. */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- year ---------- */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

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
  var rail = $('#rail');
  if (menuBtn && rail) {
    menuBtn.addEventListener('click', function () {
      var open = rail.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('#rail a').forEach(function (a) {
      a.addEventListener('click', function () {
        rail.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- rail scrollspy ----------
     The rail is the pipeline: your scroll position is the packet. */
  var railLinks = $$('#rail a');
  var targets = railLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    var seen = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.intersectionRatio; });
      var best = null, bestRatio = 0;
      Object.keys(seen).forEach(function (id) {
        if (seen[id] > bestRatio) { bestRatio = seen[id]; best = id; }
      });
      railLinks.forEach(function (a) {
        a.classList.toggle('is-active', bestRatio > 0 && a.getAttribute('href') === '#' + best);
      });
    }, { rootMargin: '-84px 0px -45% 0px', threshold: [0, .12, .3, .6, 1] });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- case study tabs ---------- */
  var tabs = $$('.tab');
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

  function selectTab(i, focus) {
    tabs.forEach(function (t, n) {
      var on = n === i;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (panels[n]) panels[n].hidden = !on;
    });
    if (focus) tabs[i].focus();
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(i); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1
            : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
      if (n === null) return;
      e.preventDefault();
      selectTab((n + tabs.length) % tabs.length, true);
    });
  });


})();
