// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); });

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// Hero terminal tab switching
function heroTab(tab) {
  document.querySelectorAll('.ht-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ht-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[onclick="heroTab('${tab}')"]`).classList.add('active');
  document.getElementById(`hero-${tab}`).classList.add('active');
}

// Library terminal tab switching
function switchTab(tab) {
  document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.t-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
  document.getElementById(`tab-${tab}`).classList.add('active');
}

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
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
  return value.toString();
}

function initStatCounters() {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
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
  document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));
}

// Load stats on page load, then init counters
if (document.getElementById('portal-stats')) loadPortalStats();
