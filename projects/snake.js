/* EDIT: GAME SETTINGS. Board size is in cells, speeds are milliseconds per move. */
const SnakeCore = (() => {
  const size = 20;
  const speeds = { easy: 170, normal: 130, fast: 95 };
  const directions = { up: { x: 0, y: -1 }, right: { x: 1, y: 0 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 } };
  const same = (a, b) => a.x === b.x && a.y === b.y;
  const opposite = (a, b) => directions[a].x === -directions[b].x && directions[a].y === -directions[b].y;

  function placeFood(snake, random = Math.random) {
    const free = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!snake.some(segment => segment.x === x && segment.y === y)) free.push({ x, y });
      }
    }
    return free.length ? free[Math.floor(random() * free.length)] : null;
  }

  function create(random = Math.random) {
    const snake = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];
    return { snake, direction: 'right', food: placeFood(snake, random), score: 0, ended: false, won: false };
  }

  function step(state, requested = state.direction, wrap = false, random = Math.random) {
    if (state.ended) return state;
    const direction = directions[requested] && !opposite(requested, state.direction) ? requested : state.direction;
    const delta = directions[direction];
    let head = { x: state.snake[0].x + delta.x, y: state.snake[0].y + delta.y };
    if (wrap) head = { x: (head.x + size) % size, y: (head.y + size) % size };
    const eating = same(head, state.food);
    // The tail moves away on a non-eating tick, so that cell is legal to enter.
    const body = eating ? state.snake : state.snake.slice(0, -1);
    const collision = head.x < 0 || head.x >= size || head.y < 0 || head.y >= size || body.some(segment => same(segment, head));
    if (collision) return { ...state, direction, ended: true };
    const snake = [head, ...state.snake];
    if (!eating) snake.pop();
    const food = eating ? placeFood(snake, random) : state.food;
    return { snake, direction, food, score: state.score + (eating ? 10 : 0), ended: food === null, won: food === null };
  }
  function delay(score, speed) { return Math.max(55, speeds[speed] - Math.floor(score / 50) * 7); }
  return { size, speeds, directions, opposite, placeFood, create, step, delay };
})();

// Export the pure rules for verification. The game also runs directly in a browser.
if (typeof module !== 'undefined' && module.exports) module.exports = SnakeCore;
if (typeof document !== 'undefined') initializeSnake();

function initializeSnake() {
  const canvas = document.querySelector('#board');
  const context = canvas.getContext('2d');
  const overlay = document.querySelector('#screen-message');
  const title = document.querySelector('#message-title');
  const play = document.querySelector('#screen-start');
  const pauseButton = document.querySelector('#pause-button');
  const status = document.querySelector('#game-status');
  let state = SnakeCore.create();
  let phase = 'ready';
  let turns = [];
  let timer;
  let best = 0;
  const cell = canvas.width / SnakeCore.size;
  const scoreKey = 'pocket-snake-best-normal-walls';
  try {
    const saved = Number(localStorage.getItem(scoreKey));
    if (Number.isFinite(saved) && saved > 0) best = Math.floor(saved);
  } catch { /* storage is optional */ }

  function render() {
    context.fillStyle = '#a7bd83';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#233c230b';
    for (let y = 0; y < SnakeCore.size; y++) {
      for (let x = 0; x < SnakeCore.size; x++) context.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
    }
    if (state.food) {
      context.fillStyle = '#233c23';
      context.fillRect(state.food.x * cell + 5, state.food.y * cell + 5, cell - 10, cell - 10);
    }
    state.snake.forEach((segment, index) => {
      const x = segment.x * cell, y = segment.y * cell;
      context.fillStyle = '#233c23';
      context.fillRect(x + 1, y + 1, cell - 2, cell - 2);
      if (index > 0) {
        context.fillStyle = '#a7bd83';
        context.fillRect(x + 5, y + 5, cell - 10, cell - 10);
      }
    });
    document.querySelector('#score').textContent = String(state.score).padStart(4, '0');
    document.querySelector('#best').textContent = String(best).padStart(4, '0');
    pauseButton.disabled = phase === 'ready' || phase === 'over';
    pauseButton.textContent = phase === 'paused' ? 'resume' : 'pause';
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(tick, SnakeCore.delay(state.score, 'normal'));
  }
  function tick() {
    if (phase !== 'running') return;
    const scoreBefore = state.score;
    state = SnakeCore.step(state, turns.shift() || state.direction);
    if (state.score > best) {
      best = state.score;
      try { localStorage.setItem(scoreKey, String(best)); } catch { /* optional */ }
    }
    if (state.ended) {
      phase = 'over';
      title.textContent = state.won ? 'you win' : 'game over';
      play.textContent = 'play again';
      overlay.hidden = false;
      status.textContent = title.textContent + '. score ' + state.score;
    } else if (state.score !== scoreBefore) {
      status.textContent = 'score ' + state.score;
    }
    render();
    if (phase === 'running') schedule();
  }

  function start(initialDirection) {
    if (phase === 'running') return;
    if (phase !== 'paused') {
      state = SnakeCore.create();
      turns = [];
      // A direction key can start a fresh game facing any direction.
      if (SnakeCore.directions[initialDirection]) {
        const delta = SnakeCore.directions[initialDirection];
        const head = state.snake[0];
        state.snake = state.snake.map((_, i) => ({ x: head.x - delta.x * i, y: head.y - delta.y * i }));
        state.direction = initialDirection;
        state.food = SnakeCore.placeFood(state.snake);
      }
    }
    phase = 'running';
    overlay.hidden = true;
    status.textContent = 'playing';
    render(); schedule();
    canvas.focus({ preventScroll: true });
  }
  function pause() {
    if (phase === 'paused') { start(); return; }
    if (phase !== 'running') return;
    phase = 'paused'; clearTimeout(timer);
    title.textContent = 'paused'; play.textContent = 'resume';
    overlay.hidden = false; status.textContent = 'paused';
    render();
  }
  function restart() { clearTimeout(timer); phase = 'ready'; start(); }
  function steer(direction) {
    if (phase === 'ready' || phase === 'over') { start(direction); return; }
    if (phase === 'paused') start();
    const last = turns.at(-1) || state.direction;
    if (turns.length < 2 && direction !== last && !SnakeCore.opposite(direction, last)) turns.push(direction);
  }

  play.addEventListener('click', () => start());
  pauseButton.addEventListener('click', pause);
  document.querySelector('#restart-button').addEventListener('click', restart);
  document.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => { steer(button.dataset.direction); canvas.focus({ preventScroll: true }); });
  });
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
    if (event.target.closest('input, select, textarea, [contenteditable="true"]')) return;
    const key = event.key.toLowerCase();
    const keys = { arrowup: 'up', w: 'up', arrowright: 'right', d: 'right', arrowdown: 'down', s: 'down', arrowleft: 'left', a: 'left' };
    if (keys[key]) {
      event.preventDefault(); steer(keys[key]); canvas.focus({ preventScroll: true }); return;
    }
    if (event.target.closest('button, a') && (key === ' ' || key === 'enter')) return;
    if (key === ' ' || key === 'p' || key === 'escape') {
      event.preventDefault(); if (!event.repeat) pause();
    }
    if (key === 'enter' && !event.repeat) { event.preventDefault(); start(); }
  });
  let swipe;
  canvas.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') return;
    swipe = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointerup', event => {
    if (!swipe) return;
    const dx = event.clientX - swipe.x, dy = event.clientY - swipe.y;
    swipe = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return;
    steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  });
  canvas.addEventListener('pointercancel', () => { swipe = null; });
  document.addEventListener('visibilitychange', () => { if (document.hidden && phase === 'running') pause(); });
  render();
}

