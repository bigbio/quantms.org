const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// Mobile menu: open/close, Esc to close, focus trap, restore focus
(function () {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.querySelector('.nav-hamburger');
  if (!menu || !toggle) return;
  const closeBtn = menu.querySelector('.mobile-close');
  const focusables = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];

  function openMenu() {
    menu.hidden = false;
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    (closeBtn || focusables()[0]).focus();
  }
  function closeMenu(restoreFocus = true) {
    menu.classList.remove('open');
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', () => closeMenu());
  menu.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link) closeMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key === 'Tab') {
      const items = focusables();
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Close the overlay if the viewport grows past the mobile breakpoint
  window.matchMedia('(min-width: 769px)').addEventListener('change', e => {
    if (e.matches && menu.classList.contains('open')) closeMenu(false);
  });
})();

// Scroll animations
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.animate-in').forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// Terminal tab switching (hero + mokume examples)
// Buttons carry data-tab; each one points at its panel through aria-controls.
function initTabs(tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  function select(tab, focus) {
    tabs.forEach(t => {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.classList.toggle('active', on);
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
}
document.querySelectorAll('.ht-tabs, .terminal-tabs').forEach(initTabs);

// Load portal stats (homepage only)
// The live file is published by the quantms-portal build. A copy is kept in
// this repo (data/portal-stats.json) as a fallback, and the real numbers are
// also written into the HTML so the section never shows placeholders.
const PORTAL_STATS_SOURCES = [
  'https://portal.quantms.org/data/portal-stats.json',
  'data/portal-stats.json'
];

function fetchStats(url) {
  const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), 5000) : null;
  return fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
    .then(r => (r.ok ? r.json() : null))
    .catch(() => null)
    .finally(() => { if (timer) clearTimeout(timer); });
}

function loadPortalStats() {
  Promise.all(PORTAL_STATS_SOURCES.map(fetchStats)).then(results => {
    // Prefer the most recently generated stats file that loaded
    const stats = results
      .filter(s => s && typeof s === 'object')
      .sort((a, b) => String(b.generated_at || '').localeCompare(String(a.generated_at || '')))[0];
    if (stats) {
      document.querySelectorAll('[data-stat]').forEach(el => {
        const value = Number(stats[el.getAttribute('data-stat')]);
        if (Number.isFinite(value) && value > 0) {
          el.setAttribute('data-target', value);
          el.textContent = formatStat(value);
        }
      });
    }
    // If nothing loaded, the numbers already in the HTML stay as they are
    initStatCounters();
  });
}

// Stat counter animation
function formatStat(value) {
  // Decide the unit after rounding, so 999,500 shows as "1.0M" rather than "1000K"
  if (value >= 999500) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return Math.round(value / 1000) + 'K';
  return String(value);
}

function initStatCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (target) el.textContent = formatStat(target);
    });
    return;
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (!target || el.dataset.counted) return;
        el.dataset.counted = 'true';
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = formatStat(current);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = formatStat(target);
        }
        requestAnimationFrame(update);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => statObserver.observe(el));
}

// Load stats on page load, then init counters
if (document.getElementById('portal-stats')) loadPortalStats();
