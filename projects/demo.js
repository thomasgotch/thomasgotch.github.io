/* Shared demo behaviour. Each initializer runs only on its own page. */
if (document.querySelector('#timer-display')) initializeOrbit();
if (document.querySelector('#component-preview')) initializePlayground();

function initializeOrbit() {
  const display = document.querySelector('#timer-display');
  const start = document.querySelector('#timer-start');
  const status = document.querySelector('#timer-status');
  let duration = 25 * 60;
  let remaining = duration;
  let running = false;
  let deadline = 0;
  let interval;

  function renderTime() {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    display.textContent = minutes + ':' + seconds;
    start.textContent = running ? 'Pause' : remaining === 0 ? 'Start again' : 'Start timer';
  }

  function pause() {
    if (running) remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    running = false;
    clearInterval(interval);
    renderTime();
  }

  function tick() {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (remaining === 0) {
      pause();
      status.textContent = 'Session complete. Take a breath.';
    }
    renderTime();
  }

  start.addEventListener('click', () => {
    if (running) {
      pause();
      status.textContent = remaining === 0 ? 'Session complete. Take a breath.' : 'Paused. Come back when you are ready.';
      return;
    }
    if (remaining === 0) remaining = duration;
    deadline = Date.now() + remaining * 1000;
    running = true;
    status.textContent = 'One thing at a time. You have got this.';
    interval = setInterval(tick, 250);
    renderTime();
  });
  document.querySelector('#timer-reset').addEventListener('click', () => {
    pause();
    remaining = duration;
    status.textContent = 'Ready when you are.';
    renderTime();
  });
  document.querySelectorAll('[data-minutes]').forEach(button => {
    button.addEventListener('click', () => {
      pause();
      duration = Number(button.dataset.minutes) * 60;
      remaining = duration;
      document.querySelectorAll('[data-minutes]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      status.textContent = button.textContent + ' selected. Ready when you are.';
      renderTime();
    });
  });
  document.addEventListener('visibilitychange', () => { if (running) tick(); });

  // Local tasks. Always render entered text with textContent.
  let tasks = [];
  try {
    const saved = JSON.parse(localStorage.getItem('orbit-tasks') || '[]');
    if (Array.isArray(saved)) tasks = saved.filter(item => typeof item?.text === 'string' && typeof item?.done === 'boolean').slice(0, 100);
  } catch { /* Storage is optional. */ }
  const list = document.querySelector('#task-list');
  const feedback = document.querySelector('#task-feedback');
  function saveAndRender() {
    try { localStorage.setItem('orbit-tasks', JSON.stringify(tasks)); } catch { /* Optional. */ }
    list.replaceChildren();
    tasks.forEach((task, index) => {
      const row = document.createElement('li');
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      const text = document.createElement('span');
      text.textContent = task.text;
      checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
        try { localStorage.setItem('orbit-tasks', JSON.stringify(tasks)); } catch { /* Optional. */ }
        updateCount();
      });
      const remove = document.createElement('button');
      remove.className = 'remove-task';
      remove.textContent = '\u00d7';
      remove.setAttribute('aria-label', 'Remove task: ' + task.text);
      remove.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveAndRender();
        feedback.textContent = 'Task removed.';
        const nextRemove = list.querySelectorAll('.remove-task')[Math.min(index, tasks.length - 1)];
        (nextRemove || document.querySelector('#task-input')).focus();
      });
      label.append(checkbox, text);
      row.append(label, remove);
      list.append(row);
    });
    updateCount();
  }
  function updateCount() {
    document.querySelector('#task-count').textContent = tasks.filter(task => !task.done).length + ' REMAINING';
  }
  document.querySelector('#task-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('#task-input');
    const text = input.value.trim();
    if (!text) return;
    if (tasks.length >= 100) { feedback.textContent = 'Remove a task before adding another.'; return; }
    tasks.push({ text, done: false });
    input.value = '';
    saveAndRender();
    feedback.textContent = 'Task added.';
    input.focus();
  });
  saveAndRender();
}

function initializePlayground() {
  const preview = document.querySelector('#component-preview');
  const theme = document.querySelector('#theme-toggle');
  const spacing = document.querySelector('#spacing-control');
  const toggle = document.querySelector('#sample-switch');
  const feedback = document.querySelector('#sample-feedback');
  theme.addEventListener('click', () => {
    const light = preview.classList.toggle('light');
    theme.setAttribute('aria-pressed', String(light));
    theme.textContent = light ? 'Dark preview' : 'Light preview';
  });
  spacing.addEventListener('input', () => {
    preview.style.setProperty('--space', spacing.value + 'px');
    document.querySelector('#spacing-value').textContent = spacing.value + 'px';
  });
  toggle.addEventListener('change', () => {
    document.querySelector('#switch-status').textContent = 'Notifications are ' + (toggle.checked ? 'on' : 'off') + ' in this preview.';
  });
  document.querySelector('#sample-action').addEventListener('click', () => {
    const name = document.querySelector('#sample-name').value.trim();
    feedback.textContent = name ? 'Hello, ' + name + '. That interaction worked.' : 'That interaction worked. Small details make a difference.';
  });
  document.querySelector('#sample-reset').addEventListener('click', () => {
    preview.classList.remove('light');
    theme.setAttribute('aria-pressed', 'false');
    theme.textContent = 'Light preview';
    spacing.value = '24';
    preview.style.setProperty('--space', '24px');
    document.querySelector('#spacing-value').textContent = '24px';
    toggle.checked = false;
    document.querySelector('#switch-status').textContent = 'Notifications are off in this preview.';
    document.querySelector('#sample-name').value = '';
    feedback.textContent = 'Preview reset. Try something new.';
  });
}
