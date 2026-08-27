/* Mohammed Arshak — portfolio behaviour. Vanilla, no dependencies. */
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

  /* ---------- pipeline ---------- */
  var COPY = {
    ingest:  ['Ingest',  'Around fifteen source systems: database change streams, cross-account replicated files, and bank statements that arrive as text and have to be parsed before anyone can trust them.'],
    model:   ['Model',   'Roughly 120 ETL jobs turning raw settlement data into reconciled, categorised transactions \u2014 with the finance business rules written down and encoded, not held in someone\u2019s head.'],
    serve:   ['Serve',   'Redshift, Athena and dashboards the operations team runs themselves. Around 400 million transactions a month, reported daily and monthly.'],
    observe: ['Observe', 'Alarms that raise a ticket, validation that stops a bad load before it commits, and cluster maintenance that keeps the whole thing inside a five-working-day regulatory window.']
  };

  var stages = $$('.stage');
  var detail = $('#stageDetail');
  var auto = true;
  var idx = 0;

  function showStage(i) {
    idx = i;
    stages.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    var key = stages[i].dataset.stage;
    if (detail && COPY[key]) detail.innerHTML = '<b>' + COPY[key][0] + '</b> — ' + COPY[key][1];
  }

  stages.forEach(function (s, i) {
    var stop = function () { auto = false; showStage(i); };
    s.addEventListener('click', stop);
    s.addEventListener('mouseenter', stop);
    s.addEventListener('focus', stop);
  });

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stages.length && !calm) {
    setInterval(function () {
      if (auto) showStage((idx + 1) % stages.length);
    }, 3400);
  }

  /* ---------- packet travel distance ----------
     Keyframes translate by --run, which has to match the live conduit width. */
  function measure() {
    $$('.conduit').forEach(function (c) {
      c.style.setProperty('--run', (c.offsetWidth - 4) + 'px');
    });
  }
  measure();
  window.addEventListener('resize', function () {
    clearTimeout(measure._t);
    measure._t = setTimeout(measure, 140);
  });
})();
