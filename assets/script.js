// Live data portal numbers (homepage only).
// Catalogue numbers come from the dataset-search API; protein and peptide counts come from
// the statistics file of the peptide search index; model and tool counts come from the PRIDE
// FTP models folder. Placeholders hold each value's place while it loads; a group is removed
// if its source fails.
const DATASETS_API = 'https://api.quantms.org/dataset-search';
const INDEX_STATS = 'https://browse.quantms.org/quantms/apps/statistics/stats.json';
const MODELS_FTP = 'https://ftp.pride.ebi.ac.uk/pub/databases/pride/resources/proteomes/quantms-models/';

function getJSON(url) {
  return fetch(url).then(r => {
    if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
    return r.json();
  });
}

async function loadCatalogue() {
  const collections = (await getJSON(`${DATASETS_API}/collections`)).collections;
  const datasets = [];
  for (let page = 1; ; page++) {
    const res = await getJSON(`${DATASETS_API}/datasets?page_size=200&page=${page}`);
    datasets.push(...res.datasets);
    if (page >= res.total_pages) break;
  }
  return {
    collections: collections.length,
    datasets: new Set(datasets.map(d => d.dataset_ref)).size,
    accessions: new Set(datasets.map(d => d.accession)).size,
  };
}

async function loadIndex() {
  const stats = await getJSON(INDEX_STATS);
  return {
    proteins: stats.kpis.proteins,
    peptides: stats.kpis.peptides,
    generated: stats.generated_at.slice(0, 10),
  };
}

// Paths of the files below an Apache directory index, relative to the root, walking sub-folders.
async function listFiles(url, prefix = '') {
  const res = await fetch(url + prefix);
  if (!res.ok) throw new Error(`${url + prefix}: HTTP ${res.status}`);
  const names = [...(await res.text()).matchAll(/<a href="([^"?/][^"]*)">/g)].map(m => m[1]);
  const nested = await Promise.all(names.map(n => n.endsWith('/') ? listFiles(url, prefix + n) : [prefix + n]));
  return nested.flat();
}

// Released models are the files of the FTP folder; their folders are <collection>/<tool>/.
async function loadModels() {
  const files = await listFiles(MODELS_FTP);
  return {
    models: files.length,
    tools: new Set(files.map(f => f.split('/')[1])).size,
  };
}

function compact(value) {
  if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
  if (value >= 1e4) return (value / 1e3).toFixed(1) + 'K';
  return value.toLocaleString('en-US');
}

function show(box, values) {
  for (const [key, value] of Object.entries(values)) {
    const el = box.querySelector(`[data-num="${key}"]`);
    if (typeof value === 'number') {
      el.textContent = compact(value);
      el.title = value.toLocaleString('en-US');
    } else {
      el.textContent = value;
    }
    el.classList.add('data-in');
  }
  box.removeAttribute('aria-busy');
}

function drop(box, group, err) {
  console.warn(`portal ${group}:`, err);
  box.querySelectorAll(`[data-group="${group}"]`).forEach(el => { el.hidden = true; });
  box.removeAttribute('aria-busy');
}

const numbersBox = document.getElementById('portal-numbers');
if (numbersBox) {
  // Shown only when this script runs, so visitors without JavaScript never see placeholders.
  numbersBox.querySelectorAll('[data-group]').forEach(el => { el.hidden = false; });
  numbersBox.setAttribute('aria-busy', 'true');
  loadCatalogue().then(v => show(numbersBox, v)).catch(err => drop(numbersBox, 'catalog', err));
  loadIndex().then(v => show(numbersBox, v)).catch(err => drop(numbersBox, 'index', err));
}

const modelsBox = document.getElementById('model-numbers');
if (modelsBox) {
  modelsBox.querySelectorAll('[data-group="models"]').forEach(el => { el.hidden = false; });
  modelsBox.setAttribute('aria-busy', 'true');
  loadModels().then(v => show(modelsBox, v)).catch(err => drop(modelsBox, 'models', err));
}

// Pipeline map in the home intro: hovering, tapping or focusing a step shows what it does,
// and hovering a line, a legend key or a step of one workflow fades the other workflow.
const metro = document.querySelector('.metro-card');
if (metro) {
  const tip = metro.querySelector('.metro-tip');
  const steps = [...metro.querySelectorAll('.metro-step')];
  let active = null;

  // Parameter names (--name) are set as code so they never break across lines.
  function fill(el, text) {
    el.replaceChildren(...text.split(/(--[a-z_]+)/).map((part, i) => (
      i % 2 ? Object.assign(document.createElement('code'), { textContent: part }) : part
    )));
  }

  function showTip(step) {
    if (active) active.classList.remove('is-active');
    active = step;
    step.classList.add('is-active');
    tip.querySelector('b').textContent = step.getAttribute('aria-label');
    fill(tip.querySelector('span'), step.dataset.tip);
    fill(tip.querySelector('small'), step.dataset.meta || '');
    tip.hidden = false;
    // Centre above the step, or below it when there is no room inside the figure.
    const box = metro.getBoundingClientRect();
    const mark = step.querySelector('.metro-hit').getBoundingClientRect();
    const left = mark.left + mark.width / 2 - box.left - tip.offsetWidth / 2;
    tip.style.left = `${Math.max(8, Math.min(left, box.width - tip.offsetWidth - 8))}px`;
    const above = mark.top - box.top - tip.offsetHeight - 6;
    tip.style.top = `${above >= 8 ? above : mark.bottom - box.top + 6}px`;
  }

  function hideTip() {
    if (active) active.classList.remove('is-active');
    active = null;
    tip.hidden = true;
  }

  function highlight(route) {
    if (route) metro.dataset.focus = route;
    else delete metro.dataset.focus;
  }

  // One tab stop for the whole map; the arrow keys move between steps.
  steps.forEach((step, i) => { step.tabIndex = i ? -1 : 0; });

  metro.addEventListener('pointerover', e => {
    const step = e.target.closest('.metro-step');
    if (step) showTip(step); else hideTip();
    const route = e.target.closest('[data-route]');
    highlight(route && route.dataset.route);
  });
  // A touch pointer leaves as soon as the finger lifts, so a tapped step keeps its
  // tooltip until the next tap outside the map.
  metro.addEventListener('pointerleave', e => {
    if (e.pointerType === 'touch') return;
    hideTip();
    highlight(null);
  });
  document.addEventListener('pointerdown', e => {
    if (metro.contains(e.target)) return;
    hideTip();
    highlight(null);
  });
  // On narrow screens the map scrolls sideways; keep the tooltip on its step.
  metro.querySelector('.metro-scroll').addEventListener('scroll', () => { if (active) showTip(active); }, { passive: true });

  metro.addEventListener('focusin', e => {
    const step = e.target.closest('.metro-step');
    if (!step) return;
    showTip(step);
    highlight(step.dataset.route);
  });
  metro.addEventListener('focusout', () => {
    hideTip();
    highlight(null);
  });
  metro.addEventListener('keydown', e => {
    const i = steps.indexOf(e.target);
    if (i < 0) return;
    if (e.key === 'Escape') {
      hideTip();
      return;
    }
    const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!move) return;
    e.preventDefault();
    const next = steps[(i + move + steps.length) % steps.length];
    steps[i].tabIndex = -1;
    next.tabIndex = 0;
    next.focus();
  });
}

// Homepage search: sends the query to the matching portal application. "Any" guesses the
// kind from the text; without JavaScript the form falls back to dataset search.
const searchForm = document.getElementById('site-search');
if (searchForm) {
  const input = searchForm.querySelector('#search-q');
  const kind = searchForm.querySelector('#search-kind');
  const PORTAL = 'https://portal.quantms.org/apps/';

  function guessKind(q) {
    if (/^(PXD|MSV|PDC|JPST|IPX|PRD)\d+/i.test(q)) return 'dataset';
    if (/^[OPQ][0-9][A-Z0-9]{3}[0-9](-\d+)?$|^[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}(-\d+)?$/i.test(q)) return 'protein';
    if (/^[ACDEFGHIKLMNPQRSTVWY]{7,}$/.test(q)) return 'peptide';
    if (/^[A-Za-z0-9-]{2,15}$/.test(q)) return 'protein';
    return 'dataset';
  }

  function target(q, k) {
    if (k === 'peptide') return `${PORTAL}peptide-search?mode=peptide&sequence=${encodeURIComponent(q.toUpperCase())}`;
    if (k === 'protein') return `${PORTAL}peptide-search?mode=protein&query=${encodeURIComponent(q)}`;
    return `${PORTAL}dataset-search?q=${encodeURIComponent(q)}`;
  }

  searchForm.addEventListener('submit', e => {
    const q = input.value.trim();
    e.preventDefault();
    if (!q) { input.focus(); return; }
    const k = kind.value === 'auto' ? guessKind(q) : kind.value;
    window.open(target(q, k), '_blank', 'noopener');
  });

  searchForm.querySelectorAll('[data-example]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    input.value = a.dataset.example;
    kind.value = 'auto';
    input.focus();
  }));
}
