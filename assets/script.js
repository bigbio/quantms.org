// Live data portal numbers (homepage only).
// The page ships the last known values; each source that loads replaces them. Catalogue
// numbers come from the dataset-search API, index numbers and the breakdown lists from the
// statistics file of the peptide search index, and cell lines from the cell-lines API.
const DATASETS_API = 'https://api.quantms.org/dataset-search';
const INDEX_STATS = 'https://browse.quantms.org/quantms/apps/statistics/stats.json';
const CELL_LINES = 'https://api.quantms.org/cell-lines/overview';
const DATASET_SEARCH = 'https://portal.quantms.org/apps/dataset-search';

function getJSON(url) {
  return fetch(url).then(r => {
    if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
    return r.json();
  });
}

async function loadCatalogue() {
  const datasets = [];
  for (let page = 1; ; page++) {
    const res = await getJSON(`${DATASETS_API}/datasets?page_size=200&page=${page}`);
    datasets.push(...res.datasets);
    if (page >= res.total_pages) break;
  }
  return {
    datasets: new Set(datasets.map(d => d.dataset_ref)).size,
    accessions: new Set(datasets.map(d => d.accession)).size,
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
    if (!el) continue;
    if (typeof value === 'number') {
      el.textContent = compact(value);
      el.title = value.toLocaleString('en-US');
    } else {
      el.textContent = value;
    }
  }
}

// One list of the breakdown: the top rows of a stats.json list, linked to dataset search
// when that application has a matching filter.
function bars(list, rows, label, filter) {
  const top = rows.slice(0, 5);
  const max = top[0] ? top[0].datasets : 1;
  list.replaceChildren(...top.map(row => {
    const li = document.createElement('li');
    li.style.setProperty('--n', row.datasets);
    li.style.setProperty('--max', max);
    const name = document.createElement(filter ? 'a' : 'span');
    name.textContent = row[label];
    if (filter) {
      name.href = `${DATASET_SEARCH}?${filter}=${encodeURIComponent(row[label])}`;
      name.target = '_blank';
      name.rel = 'noopener';
    }
    const count = document.createElement('b');
    count.textContent = row.datasets;
    li.append(name, document.createElement('i'), count);
    return li;
  }));
}

const dataBlock = document.getElementById('data');
if (dataBlock) {
  const date = iso => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  loadCatalogue().then(v => show(dataBlock, v)).catch(err => console.warn('portal catalogue:', err));
  getJSON(INDEX_STATS).then(s => {
    show(dataBlock, {
      organisms: s.kpis.organisms,
      proteins: s.kpis.proteins,
      peptides: s.kpis.peptides,
      tissues: s.tissues.length,
      instruments: s.instruments.length,
      generated: date(s.generated_at),
    });
    bars(dataBlock.querySelector('[data-list="species"]'), s.species, 'organism', 'organism');
    bars(dataBlock.querySelector('[data-list="tissues"]'), s.tissues, 'tissue', null);
    bars(dataBlock.querySelector('[data-list="instruments"]'), s.instruments, 'instrument', 'instrument');
  }).catch(err => console.warn('portal index:', err));
  getJSON(CELL_LINES).then(c => show(dataBlock, { lines: c.tiles.lines, lineages: c.tiles.lineages }))
    .catch(err => console.warn('cell lines:', err));
}

// Pipeline maps: hovering, tapping or focusing a step shows what it does,
// and hovering a line, a legend key or a step of one workflow fades the other workflow.
document.querySelectorAll('.metro-card').forEach(metro => {
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
});

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

// Pipeline tabs: one map per pipeline; the arrow keys move between tabs.
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    const move = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!move) return;
    const next = tabs[(i + move + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});
if (location.hash === '#dia') selectTab(document.getElementById('tab-dia'));
