/* =============================================================
   EDIT: SETTINGS - start here to personalize your portfolio.
   Cursor artwork and colours are configured in style.css.
   ============================================================= */
const settings = {
  name: 'thomas gotch',
  email: 'tcgotch@berkeley.edu',
  customCursorDefault: true, // true = on for first-time visitors
  revealOnScroll: true,
};

/* EDIT: PROJECT NOTES - match IDs with data-project in index.html.
   demo is a relative link; replace it with your own project URL. */
const projects = {
  fieldnotes: {
    title: 'Fieldnotes',
    category: 'DESIGN / EDITORIAL CONCEPT',
    summary: 'An editorial home for ideas worth keeping.',
    idea: 'An independent journal that gives stories, observations, and everyday discoveries room to breathe.',
    approach: 'A restrained palette, editorial typography, and a clear reading hierarchy. The example site includes three short essays to explore.',
    demo: 'projects/fieldnotes.html',
  },
  orbit: {
    title: 'Orbit',
    category: 'DEVELOPMENT / PRODUCT CONCEPT',
    summary: 'A quieter approach to getting things done.',
    idea: 'A focus tool built around one small promise: make it easier to give your attention to the task in front of you.',
    approach: 'A focused interface, clear states, and subtle visual feedback. The example includes a working focus timer and a small task list.',
    demo: 'projects/orbit.html',
  },
  form: {
    title: 'Form & Function',
    category: 'DESIGN + DEVELOPMENT / SYSTEM CONCEPT',
    summary: 'A flexible foundation for cohesive digital products.',
    idea: 'A component system exploring the relationship between consistent visual language and reusable code.',
    approach: 'Start with typography, spacing, and colour, then build accessible components that work together. Try the example playground to change theme, spacing, and component states.',
    demo: 'projects/form.html',
  },
};

/* PAGE SETUP - usually no editing needed below this line. */
document.querySelectorAll('[data-name]').forEach(element => {
  element.textContent = settings.name;
});
document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});
document.querySelector('#email-link').href = 'mailto:' + settings.email;
document.title = settings.name;

/* Project filters. */
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-project]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all'
        && !card.dataset.category.split(' ').includes(button.dataset.filter);
    });
  });
});

/* Project notes: native dialogs support Escape and keyboard focus. */
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.open];
    ['title', 'category', 'summary', 'idea', 'approach'].forEach(key => {
      document.querySelector('#dialog-' + key).textContent = project[key];
    });
    document.querySelector('#dialog-demo').href = project.demo;
    dialog.showModal();
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

/* Copy email, with a visible fallback when clipboard access is unavailable. */
document.querySelector('#copy-email').addEventListener('click', async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(settings.email);
    button.textContent = 'email copied';
    document.querySelector('#copy-status').textContent = 'email copied';
    setTimeout(() => { button.textContent = 'copy email'; }, 2500);
  } catch {
    button.textContent = settings.email;
    document.querySelector('#copy-status').textContent = 'Email address: ' + settings.email;
  }
});

/* Native smooth anchor scrolling is in CSS. Reveals run once, with a 12px shift.
   No scroll hijacking or parallax. Reduced motion is respected. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const navLinks = document.querySelectorAll('nav a');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.hash === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-10% 0px -55% 0px' });
  document.querySelectorAll('main > section[id]').forEach(section => navObserver.observe(section));

  if (settings.revealOnScroll && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.section-heading, .project, .about-grid, .contact-main').forEach(element => {
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
}

/* Optional native cursor: storage is optional, and touch devices stay native. */
const cursorToggle = document.querySelector('#cursor-toggle');
let customCursor = settings.customCursorDefault;
try {
  const saved = localStorage.getItem('mono-custom-cursor');
  if (saved !== null) customCursor = saved === 'on';
} catch { /* Use the configured default. */ }

function updateCursor() {
  document.documentElement.dataset.customCursor = customCursor ? 'on' : 'off';
  cursorToggle.setAttribute('aria-pressed', String(customCursor));
  cursorToggle.textContent = 'rat cursor: ' + (customCursor ? 'on' : 'off');
}
cursorToggle.addEventListener('click', () => {
  customCursor = !customCursor;
  updateCursor();
  try { localStorage.setItem('mono-custom-cursor', customCursor ? 'on' : 'off'); } catch { /* Optional. */ }
});
updateCursor();

