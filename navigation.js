/* Independent of other page scripts: the unenhanced navigation stays visible. */
(() => {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('#sidebar-content');
  const toggle = document.querySelector('#navigation-toggle');
  const label = document.querySelector('#navigation-label');
  if (!sidebar || !content || !toggle || !label) return;
  const compact = window.matchMedia('(max-width: 900px)');
  let open = false;

  function render() {
    const expanded = !compact.matches || open;
    content.hidden = !expanded;
    toggle.hidden = !compact.matches;
    toggle.setAttribute('aria-expanded', String(expanded));
    label.textContent = compact.matches && open ? 'close' : 'menu';
  }
  function close(restoreFocus = false) {
    if (!compact.matches || !open) return;
    open = false;
    render();
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    open = !open;
    render();
  });
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!compact.matches || !open) return;
      close();
      const target = link.hash ? document.querySelector(link.hash) : null;
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close(true);
  });
  document.addEventListener('click', event => {
    if (!sidebar.contains(event.target)) close();
  });
  function changeLayout() {
    const previouslyFocused = document.activeElement;
    open = false;
    render();
    if (compact.matches && content.contains(previouslyFocused)) toggle.focus();
    if (!compact.matches && previouslyFocused === toggle) sidebar.querySelector('.wordmark').focus();
  }
  if (compact.addEventListener) compact.addEventListener('change', changeLayout);
  else compact.addListener(changeLayout);
  render();
  document.documentElement.classList.add('navigation-ready');
})();
