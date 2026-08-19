/* =====================================================================
   PDPA Challenge Hub — App Logic
   No branding, multiplayer bingo, Gen-Z energy.
   ===================================================================== */
const $ = id => document.getElementById(id);
const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);

const run = { player: '', department: '', scores: { bingo: 0, jeopardy: 0, crossword: 0, risk: 0 }, saved: false, savedId: null };
let bingo, jeop, cw, risk, jTimer = null;

/* NAV */
function showView(name) {
  clearInterval(jTimer);
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = $('view-' + name);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'results') renderResults();
  if (name === 'menu') renderChips();
}
document.addEventListener('click', e => { const n = e.target.closest('[data-go]'); if (n) showView(n.dataset.go); });
document.querySelectorAll('[data-game]').forEach(b => b.addEventListener('click', () => {
  const g = b.dataset.game;
  if (g === 'bingo') { startBingo(); showView('bingo'); }
  else if (g === 'jeopardy') { startJeopardy(); showView('jeopardy'); }
  else if (g === 'crossword') { startCrossword(); showView('crossword'); }
  else if (g === 'risk') { startRisk(); showView('risk'); }
}));

/* SCORING */
const total = () => Object.values(run.scores).reduce((a, b) => a + b, 0);
function tier() { const pct = total() / MAX_TOTAL; const t = TIERS.find(t => pct >= t.min); return { ...t, pct: Math.round(pct * 100) }; }
function updateHUD() { const t = tier(); $('hud-score').textContent = total() + ' PTS'; $('hud-fill').style.width = t.pct + '%'; $('hud-tier').textContent = t.name.toUpperCase(); renderChips(); }
function renderChips() { document.querySelectorAll('[data-chip]').forEach(el => { const k = el.dataset.chip; el.textContent = run.scores[k] + ' / ' + MAX_SCORE[k]; }); }
function award(game, pts) { run.scores[game] = Math.max(0, run.scores[game] + pts); updateHUD(); }

/* CONFETTI */
function celebrate() {
  const box = $('confetti'); box.innerHTML = '';
  const colors = ['#7C3AED', '#EC4899', '#06B6D4', '#84CC16', '#F59E0B', '#EF4444'];
  for (let i = 0; i < 50; i++) { const b = document.createElement('i'); b.style.left = Math.random() * 100 + '%'; b.style.top = (-10 - Math.random() * 40) + 'px'; b.style.background = colors[i % 6]; b.style.animationDelay = (Math.random() * 0.5).toFixed(2) + 's'; box.appendChild(b); }
  setTimeout(() => box.innerHTML = '', 2500);
}

/* START */
$('player-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('in-name').value.trim();
  if (!name) { $('start-msg').textContent = 'Enter your name to start!'; return; }
  run.player = name; run.department = $('in-dept').value.trim();
  $('hud-player').textContent = name.toUpperCase();
  $('hud').classList.remove('hidden'); updateHUD(); showView('menu');
});
$('restart-btn').addEventListener('click', () => {
  run.player = ''; run.department = ''; run.scores = { bingo: 0, jeopardy: 0, crossword: 0, risk: 0 };
  run.saved = false; run.savedId = null; bingo = jeop = cw = risk = undefined; clearInterval(jTimer);
  $('in-name').value = ''; $('in-dept').value = '';
  $('hud').classList.add('hidden'); $('q-panel').classList.add('hidden');
  $('bingo-input').classList.add('hidden');
  updateHUD(); showView('welcome');
});

/* =====================================================================
   BINGO — NETWORKING STYLE
   4x4 board. Tap a square → enter the name of someone who does that action.
   Complete a line (row/col/diagonal) = BINGO = +100. Full house = +100 more.
   Each claimed square = +25.
   ===================================================================== */
const BINGO_LINES = (() => { const l = []; for (let r = 0; r < 4; r++) l.push([0,1,2,3].map(c => r*4+c)); for (let c = 0; c < 4; c++) l.push([0,1,2,3].map(r => r*4+c)); l.push([0,5,10,15],[3,6,9,12]); return l; })();

function startBingo() {
  if (bingo) { renderBingoBoard(); return; }
  bingo = { board: shuffle(BINGO_ITEMS), claimed: new Array(16).fill(null), lines: new Set(), activeCell: -1 };
  renderBingoBoard();
}

function renderBingoBoard() {
  const grid = $('bingo-board'); grid.innerHTML = '';
  bingo.board.forEach((item, i) => {
    const cell = document.createElement('button'); cell.type = 'button';
    cell.className = 'bingo-cell' + (bingo.claimed[i] ? ' marked' : '');
    cell.dataset.i = i;
    if (bingo.claimed[i]) {
      cell.innerHTML = '<small style="opacity:0.7">' + item.action + '</small><br><b>' + bingo.claimed[i] + '</b>';
    } else {
      cell.textContent = item.action;
    }
    cell.addEventListener('click', () => openBingoInput(i));
    grid.appendChild(cell);
  });
  const claimed = bingo.claimed.filter(Boolean).length;
  $('bingo-progress').textContent = claimed + ' of 16 claimed';
  $('bingo-lines').textContent = bingo.lines.size + (bingo.lines.size === 1 ? ' line' : ' lines');
}

function openBingoInput(i) {
  if (bingo.claimed[i]) return; // already claimed
  bingo.activeCell = i;
  $('bi-action').textContent = bingo.board[i].action;
  $('bi-name').value = '';
  $('bingo-input').classList.remove('hidden');
  $('bi-name').focus();
}

$('bi-confirm').addEventListener('click', confirmBingo);
$('bi-name').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); confirmBingo(); } });
$('bi-cancel').addEventListener('click', () => { $('bingo-input').classList.add('hidden'); });

function confirmBingo() {
  const name = $('bi-name').value.trim();
  if (!name) return;
  const i = bingo.activeCell;
  bingo.claimed[i] = name;
  award('bingo', 25);
  $('bingo-input').classList.add('hidden');

  const msgs = ['Claimed! +25'];

  // Check lines
  BINGO_LINES.forEach((line, idx) => {
    if (bingo.lines.has(idx)) return;
    if (line.every(n => bingo.claimed[n])) {
      bingo.lines.add(idx);
      award('bingo', 100);
      msgs.push('BINGO! Line complete! +100');
      celebrate();
    }
  });

  // Full house
  if (bingo.claimed.every(Boolean) && bingo.lines.size > 0) {
    const alreadyFull = bingo.fullHouse;
    if (!alreadyFull) {
      bingo.fullHouse = true;
      award('bingo', 100);
      msgs.push('FULL HOUSE! +100 bonus!');
      celebrate();
      setTimeout(() => showView('results'), 2000);
    }
  }

  $('bingo-msg').textContent = msgs.join(' '); $('bingo-msg').className = 'feedback ok';
  renderBingoBoard();
}

/* =====================================================================
   JEOPARDY
   ===================================================================== */
function startJeopardy() {
  if (jeop) { renderJBoard(); return; }
  jeop = { tiles: [], active: null };
  JEOPARDY.forEach((cat, ci) => cat.tiles.forEach((t, ti) => {
    jeop.tiles.push({ id: ci+'-'+ti, col: ci, category: cat.category, value: t.value, q: t.q, why: t.why, answer: t.options[0], options: shuffle(t.options), state: 'open' });
  }));
  renderJBoard();
}
function renderJBoard() {
  const board = $('j-board'); board.innerHTML = '';
  JEOPARDY.forEach((cat, ci) => {
    const col = document.createElement('div'); col.className = 'j-col';
    col.innerHTML = '<div class="j-cat">' + cat.category + '</div>';
    jeop.tiles.filter(t => t.col === ci).forEach(t => {
      const b = document.createElement('button'); b.type = 'button';
      b.className = 'j-tile' + (t.state === 'open' ? '' : ' done ' + t.state);
      b.textContent = t.state === 'open' ? t.value : (t.state === 'ok' ? '✓' : '·');
      b.disabled = t.state !== 'open';
      b.addEventListener('click', () => openQuestion(t)); col.appendChild(b);
    });
    board.appendChild(col);
  });
  const done = jeop.tiles.filter(t => t.state !== 'open').length;
  $('j-progress').textContent = done + ' / ' + jeop.tiles.length + ' answered';
  $('j-progress').className = 'feedback ok';
  if (done === jeop.tiles.length) { setTimeout(() => showView('results'), 1500); }
}
function openQuestion(tile) {
  jeop.active = tile;
  $('q-cat').textContent = tile.category + ' · ' + tile.value + ' pts';
  $('q-text').textContent = tile.q;
  $('q-explain').classList.add('hidden'); $('q-next').classList.add('hidden'); $('q-skip').classList.remove('hidden');
  $('q-panel').classList.remove('hidden');
  const box = $('q-options'); box.innerHTML = '';
  tile.options.forEach((opt, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'option'; b.dataset.opt = opt;
    b.innerHTML = '<span class="key">' + 'ABCD'[i] + '</span><span>' + opt + '</span>';
    b.addEventListener('click', () => answerQuestion(opt)); box.appendChild(b);
  });
  startTimer();
  $('q-panel').scrollIntoView({ behavior: 'smooth' });
}
function startTimer() {
  clearInterval(jTimer); const r = $('q-timer');
  if (!$('timer-toggle').checked) { r.classList.add('hidden'); return; }
  let left = 30; r.classList.remove('hidden'); r.classList.remove('low'); r.textContent = '30s';
  jTimer = setInterval(() => { left--; r.textContent = left + 's'; r.classList.toggle('low', left <= 10); if (left <= 0) { clearInterval(jTimer); answerQuestion(null, true); } }, 1000);
}
function answerQuestion(picked, timedOut = false) {
  clearInterval(jTimer); const tile = jeop.active; if (!tile || tile.state !== 'open') return;
  const correct = picked === tile.answer; tile.state = correct ? 'ok' : 'no';
  document.querySelectorAll('#q-options .option').forEach(b => { b.disabled = true; if (b.dataset.opt === tile.answer) b.classList.add('correct'); else if (b.dataset.opt === picked) b.classList.add('picked-wrong'); });
  if (correct) { award('jeopardy', tile.value); celebrate(); }
  $('q-explain').innerHTML = (correct ? '<b>✅ Correct! +' + tile.value + '</b> ' : (timedOut ? '<b>⏰ Time up!</b> ' : '<b>❌ Not quite.</b> ')) + tile.why;
  $('q-explain').classList.remove('hidden'); $('q-timer').classList.add('hidden');
  $('q-next').classList.remove('hidden'); $('q-skip').classList.add('hidden'); renderJBoard();
}
$('q-next').addEventListener('click', () => { $('q-panel').classList.add('hidden'); jeop.active = null; });
$('q-skip').addEventListener('click', () => { clearInterval(jTimer); $('q-panel').classList.add('hidden'); jeop.active = null; });

/* =====================================================================
   CROSSWORD
   ===================================================================== */
function cellKey(r, c) { return r + ',' + c; }
function startCrossword() {
  if (cw) { renderClues(); return; }
  cw = { cells: new Map(), entries: [], selected: 0, penalty: 0 };
  CROSSWORD.entries.forEach((def, ei) => {
    const keys = [];
    for (let i = 0; i < def.answer.length; i++) {
      const r = def.dir === 'down' ? def.row + i : def.row;
      const c = def.dir === 'across' ? def.col + i : def.col;
      const key = cellKey(r, c); keys.push(key);
      if (!cw.cells.has(key)) cw.cells.set(key, { r, c, entries: [], num: null });
      cw.cells.get(key).entries.push(ei);
    }
    cw.entries.push({ ...def, index: ei, keys, solved: false, revealed: false });
    const head = cw.cells.get(keys[0]); if (head.num === null) head.num = def.num;
  });
  const grid = $('cw-grid'); grid.innerHTML = '';
  for (let r = 0; r < CROSSWORD.rows; r++) for (let c = 0; c < CROSSWORD.cols; c++) {
    const key = cellKey(r, c); const wrap = document.createElement('div'); wrap.className = 'cw-cell';
    if (!cw.cells.has(key)) { wrap.classList.add('cw-block'); grid.appendChild(wrap); continue; }
    const cell = cw.cells.get(key);
    if (cell.num !== null) { const n = document.createElement('span'); n.className = 'cw-num'; n.textContent = cell.num; wrap.appendChild(n); }
    const input = document.createElement('input'); input.type = 'text'; input.maxLength = 1; input.autocomplete = 'off'; input.dataset.key = key;
    input.addEventListener('input', onCwInput); input.addEventListener('keydown', onCwKey); input.addEventListener('focus', () => selectFromCell(key));
    wrap.appendChild(input); cell.input = input; grid.appendChild(wrap);
  }
  renderClues(); selectEntry(0); $('cw-msg').textContent = ''; updateCwChips();
}
function renderClues() {
  const host = $('cw-clues'); host.innerHTML = '';
  ['across', 'down'].forEach(dir => {
    const g = document.createElement('div'); g.innerHTML = '<h2 style="font-size:16px;margin-bottom:8px">' + (dir === 'across' ? 'Across' : 'Down') + '</h2>';
    const list = document.createElement('div'); list.className = 'clue-list';
    cw.entries.filter(e => e.dir === dir).forEach(e => {
      const b = document.createElement('button'); b.type = 'button';
      b.className = 'clue' + (e.index === cw.selected ? ' active' : '') + (e.solved ? ' solved' : '');
      b.dataset.entry = e.index;
      b.innerHTML = '<span class="clue-num">' + e.num + (e.dir === 'across' ? 'A' : 'D') + '</span><span>' + e.clue + ' (' + e.answer.length + ')</span>';
      b.addEventListener('click', () => { selectEntry(e.index); const f = e.keys.find(k => !cw.cells.get(k).input.value) || e.keys[0]; cw.cells.get(f).input.focus(); });
      list.appendChild(b);
    }); g.appendChild(list); host.appendChild(g);
  });
}
function selectEntry(i) { cw.selected = i; cw.cells.forEach((cell, key) => { cell.input.parentElement.classList.toggle('active', cw.entries[i].keys.includes(key) && !cw.entries[i].solved); }); document.querySelectorAll('.clue').forEach(b => b.classList.toggle('active', +b.dataset.entry === i)); }
function selectFromCell(key) { const owners = cw.cells.get(key).entries; if (owners.includes(cw.selected)) return; const u = owners.find(i => !cw.entries[i].solved); selectEntry(u !== undefined ? u : owners[0]); }
function onCwInput(e) { e.target.value = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase(); checkCrossword(); if (e.target.value) moveInEntry(e.target.dataset.key, 1); }
function moveInEntry(key, step) { const entry = cw.entries[cw.selected]; const at = entry.keys.indexOf(key); const next = entry.keys[at + step]; if (next) cw.cells.get(next).input.focus(); }
function onCwKey(e) { const key = e.target.dataset.key; const { r, c } = cw.cells.get(key); const jump = (rr, cc) => { const t = cw.cells.get(cellKey(rr, cc)); if (t) { t.input.focus(); t.input.select(); e.preventDefault(); } }; if (e.key === 'Backspace' && !e.target.value) { moveInEntry(key, -1); e.preventDefault(); } else if (e.key === 'ArrowRight') jump(r, c+1); else if (e.key === 'ArrowLeft') jump(r, c-1); else if (e.key === 'ArrowDown') jump(r+1, c); else if (e.key === 'ArrowUp') jump(r-1, c); }
function checkCrossword() {
  const msgs = [];
  cw.entries.forEach(entry => { if (entry.solved) return; if (entry.keys.map(k => cw.cells.get(k).input.value.toUpperCase()).join('') !== entry.answer) return; entry.solved = true; entry.keys.forEach(k => cw.cells.get(k).input.parentElement.classList.add('solved')); if (!entry.revealed) { award('crossword', 75); msgs.push('✅ ' + entry.answer + ' +75!'); } else { msgs.push(entry.answer + ' filled.'); } });
  if (cw.entries.filter(e => e.solved).length === cw.entries.length && !cw.bonus) { cw.bonus = true; award('crossword', 100); msgs.push('Full grid! +100 bonus!'); setTimeout(() => showView('results'), 2000); }
  if (msgs.length) { $('cw-msg').textContent = msgs.join(' '); $('cw-msg').className = 'feedback ok'; celebrate(); renderClues(); selectEntry(cw.selected); }
  updateCwChips();
}
function updateCwChips() { $('cw-progress').textContent = cw.entries.filter(e => e.solved).length + ' / ' + cw.entries.length + ' solved'; $('cw-penalty').textContent = cw.penalty ? '−' + cw.penalty + ' hints' : 'no hints'; }
$('cw-hint').addEventListener('click', () => { const e = cw.entries[cw.selected]; if (e.solved) return; const at = e.keys.findIndex((k, i) => cw.cells.get(k).input.value.toUpperCase() !== e.answer[i]); if (at < 0) return; cw.cells.get(e.keys[at]).input.value = e.answer[at]; cw.penalty += 15; award('crossword', -15); $('cw-msg').textContent = '💡 Hint used. −15.'; $('cw-msg').className = 'feedback no'; checkCrossword(); });
$('cw-reveal').addEventListener('click', () => { const e = cw.entries[cw.selected]; if (e.solved) return; e.revealed = true; e.keys.forEach((k, i) => { cw.cells.get(k).input.value = e.answer[i]; }); checkCrossword(); });

/* =====================================================================
   SPOT THE RISK
   ===================================================================== */
function startRisk() { if (risk && !risk.finished) { renderRisk(); return; } resetRisk(); }
function resetRisk() {
  risk = { deck: shuffle(RISK_CARDS), at: 0, streak: 0, bonuses: 0, answered: false, finished: false };
  run.scores.risk = 0; updateHUD(); renderRisk();
}
function renderRisk() {
  const card = risk.deck[risk.at];
  $('risk-text').textContent = card.text;
  $('risk-count').textContent = (risk.at + 1) + ' / ' + risk.deck.length;
  $('risk-explain').classList.add('hidden'); $('risk-next').classList.add('hidden'); $('risk-restart').classList.add('hidden');
  $('risk-ok').disabled = false; $('risk-bad').disabled = false; risk.answered = false; renderStreak();
}
function renderStreak() {
  const lit = risk.streak === 0 ? 0 : (risk.streak % 4 === 0 ? 4 : risk.streak % 4);
  $('risk-streak').innerHTML = 'Streak ' + [0,1,2,3].map(i => '<span class="pip' + (i < lit ? ' on' : '') + '"></span>').join('') + ' <span>' + risk.streak + '</span>';
}
function answerRisk(saidRisk) {
  if (risk.answered) return; risk.answered = true;
  const card = risk.deck[risk.at]; const correct = saidRisk === card.risk;
  $('risk-ok').disabled = true; $('risk-bad').disabled = true;
  let lead;
  if (correct) { risk.streak++; award('risk', 25); lead = '<b>✅ Correct! +25</b> ';
    if (risk.streak % 4 === 0 && risk.bonuses < 4) { risk.bonuses++; award('risk', 25); lead = '<b>🔥 Streak bonus! +25 +25</b> '; celebrate(); }
  } else { risk.streak = 0; lead = '<b>❌ ' + (card.risk ? 'That\'s a risk!' : 'That\'s actually fine.') + '</b> '; }
  $('risk-explain').innerHTML = lead + card.why; $('risk-explain').classList.remove('hidden'); renderStreak();
  if (risk.at >= risk.deck.length - 1) { risk.finished = true; $('risk-restart').classList.remove('hidden'); $('risk-count').textContent = 'Done! ' + run.scores.risk + ' / ' + MAX_SCORE.risk; setTimeout(() => showView('results'), 1500); }
  else $('risk-next').classList.remove('hidden');
}
$('risk-ok').addEventListener('click', () => answerRisk(false));
$('risk-bad').addEventListener('click', () => answerRisk(true));
$('risk-next').addEventListener('click', () => { risk.at++; renderRisk(); });
$('risk-restart').addEventListener('click', resetRisk);

/* =====================================================================
   RESULTS + CERTIFICATE
   ===================================================================== */
const GAME_LABELS = { bingo: 'PDPA Bingo', jeopardy: 'Jeopardy', crossword: 'Crossword', risk: 'Spot the Risk' };
function renderResults() {
  const t = tier();
  $('res-medal').textContent = t.medal;
  $('res-summary').textContent = total() + ' / ' + MAX_TOTAL + ' points (' + t.pct + '%)';
  $('res-title').textContent = t.title;
  $('res-subtitle').textContent = t.subtitle;
  $('res-player').textContent = run.player || 'Player';
  $('cert-total').textContent = total();
  $('cert-pct').textContent = t.pct + '%';
  $('cert-games').textContent = Object.keys(run.scores).filter(k => run.scores[k] > 0).length;
  // Icon based on tier
  const icons = ['\u{1F6E1}\uFE0F', '\u{2694}\uFE0F', '\u{1F9E0}', '\u{1F331}'];
  const idx = TIERS.indexOf(TIERS.find(x => x.name === t.name));
  $('cert-icon').textContent = icons[idx] || '\u{1F3AE}';
  const table = $('res-table'); table.innerHTML = '';
  Object.keys(GAME_LABELS).forEach(k => { const pct = Math.round(run.scores[k] / MAX_SCORE[k] * 100); const row = document.createElement('div'); row.className = 'score-row'; row.innerHTML = '<b>' + GAME_LABELS[k] + '</b><span class="bar"><i style="width:' + pct + '%"></i></span><span class="val">' + run.scores[k] + ' / ' + MAX_SCORE[k] + '</span>'; table.appendChild(row); });
  celebrate();
}

/* BOOT */ updateHUD();
