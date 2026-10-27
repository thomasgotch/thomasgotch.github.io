const settings = {
  name: 'thomas gotch',
  email: 'tcgotch@berkeley.edu',
  customCursorDefault: true,
  revealOnScroll: true,
};

const projects = {
  volunteering: {
    image: '',
    imagePosition: '',
    imageFit: 'cover', 
    showArtOverlay: false,
    title: 'volunteering',
    summary: 'my way to show gratitude for my opportunities',
    thetfordVoices: "my first volunteer experience was as a band musician in a charity near my home, called thetford voices. \
      their work is aimed at sharing the gift of music with young people who otherwise wouldn't have the opportunity to partake, \
      due to financial difficulties, illnesses and disabilities, and other hardships. \n\n \
      i really enjoyed working with these children and giving them a chance to experience singing in a choir, \
      especially given that choir was the thing which sparked my own musical career. \n\n \
      i still volunteer every summer and christmas holiday with thetford voices when i'm home, and have\
      made good friends with some of the other volunteers.",
    dorneyBoatClub: "having enjoyed spending time volunteering with thetford voices, i started looking for more ways to \
      share my favourite things with others who have been less fortunate. \n\n \
      rowing was an obvious choice; it is a very expensive sport and so is generally only done at prestigious schools with \
      ample sporting budget. however, i discovered that there was a local boat club which wanted to make rowing more \
      accessible, and so used some of eton's facilities to provide more young people from the community with a chance to row. \n\n \
      i started volunteering at dorney boat club every week during term time, along with some of my close eton friends from \
      rowing. one element of rowing which i particularly wanted to share was the camaraderie and community which is built between \
      rowers, and i'd say that my friends and i did a good job at showing that.",
    stMarks: "now that i am away in america for university, i had to leverage my limited connections in the country to see if \
      there were any opportunities for more volunteer work that i could reasonably fit into my schedule. my organ teacher from eton \
      was kind enough to connect me with one of her old organist friends in berkeley, who is the director of music at st mark's, a \
      small parish church on bancroft way. \n\n since the start of this semester, i've been singing here on a weekly basis in order to \
      help others have a (hopefully) more enjoyable church experience with choral music.",
  },
  stealth: {
    image: '',
    imagePosition: 'bottom', // e.g. 'center top' or '50% 30%'
    imageFit: 'contain', // 'cover' crops to fill; 'contain' shows the whole image
    showArtOverlay: true, // true keeps the original lettering and shapes over the image
    title: 'stealth',
    summary: 'currently building',
    idea: 'something in the realm of fashion tech. think depop and vinted, but with more consumer agency. more coming soon...',
    demo: '',
  },
  spapl: {
    // image: 'assets/projects/quaver.svg', // e.g. 'assets/projects/spapl.jpg'
    image: '',
    imagePosition: 'bottom',
    imageFit: 'contain',
    showArtOverlay: true,
    title: 'spAPL',
    summary: 'a music sourcing tool',
    idea: "spotify api 'premium' listening: a tool to download spotify tracks and playlists to be used offline (for non-commerical purposes, and only with the rights to the music of course)",
    approach: "with this being my first technical project, i had to teach myself how to code (before vibe coding became big), and did lots of thinking about \
      how i might bypass the paywall. \n\n \
      initially, i wrote a script which would automatically create me a new gmail account based on my existing one (using the + modifier to bypass recaptcha), \
      and then use this email to generate a new paypal and spotify account, then link them together to have unlimited 1-mo free trials. however, paypal eventually \
      caught on and started blocking my ip. i didn't want to go down the spoofing route, so instead thought to localise the operation by just downloading all the \
      songs rather than trying to use spotify. \n\n \
      i extracted all the data from the song/playlist requested with the spotify api, then used this data to search for the song(s) with a query string on youtube, \
      and finally downloaded each song with yt-dlp. i also added an override function to always ensure that the right version of the song on youtube was allocated to \
      the spotify song id.",
    results: "i was successfully able to maintain spAPL and share it with friends and family for a few months. however, i eventually became tired of the constant maintenance \
      (since youtube changed their cypher relatively frequently to try and break projects like these), and so disbanded the project once i had downloaded most of the songs that i enjoyed \
      listening to. \n\n \
      overall, i see this project as the first time that i was able to dedicate myself to building and shipping a meaningful product, and also a very useful experience for learning to code; \
      i wrote the project in python, but also taught myself a small amount of html/css/js in order to create a gui so that friends and family wouldn't be scared by a cli.",
    demo: '',
  },
  horsepower: {
    image: '',
    imagePosition: '',
    imageFit: 'cover', 
    showArtOverlay: false,
    title: 'horsepower.vip',
    summary: 'curating a community of petrolheads',
    idea: '',
    approach: '',
    demo: 'https://www.instagram.com/horsepower.vip/',
  },
  ibm_quantum: {
    image: '',
    imagePosition: 'center',
    imageFit: 'cover',
    showArtOverlay: false,
    title: 'ibm quantum hackathon',
    summary: "ibm's qiskit fall fest 2026",
    problem: 'coming soon',
    approach: `coming soon
    
    ![winning team](assets/projects/ibm_hackathon.jpg)`,
    demo: '',
  },
  musical_studies: {
    image: '',
    imagePosition: 'center',
    imageFit: 'cover',
    showArtOverlay: false,
    title: 'musical studies',
    summary: 'my journey and experiences with music',
    demo: '',
    beginning: "most people ask whether my parents were musicians; the answer is no.\n\n \
    they had both studied a little bit of music, but had chosen to pursue other interests and hence not taken it very far. \n\n \
    however, i am very grateful for the commitment that they have had in supporting my musical development. \n\n \
    this was first made manifest when i was scouted to sing at a cathedral choir near my school at age seven (st edmundsbury cathedral). \
    my mum had to taxi me from home to choir, then to school, then back to choir, almost every day. it was incredibly draining for her and so we decided \
    that it would be best for me to move to a choir school - not only to save on fuel costs, but also to further my development as a \
    chorister by moving to a better choir (wells cathedral). \n\n \
    i also picked up the cello during this time, and found it to be a fun hobby, but hadn't yet reachd a level where i felt able to express myself \
    through my instrument.",
    firstMainDevelopment: "my first main musical development happened after transferring schools again: we found that wells was too far from home \
    for a nine-year-old (roughly a six hour drive), and so i moved to winchester cathedral when i was ten. here, i started learning \
    the cello more seriously, and also picked up the piano. i was able to progress on the piano very quickly and it soon became of a \
    similar standard to my cello playing.",
    musicAtEton: "",
    musicNow: "",
  },
  rowing: {
    image: '',
    imagePosition: '',
    imageFit: 'cover', 
    showArtOverlay: false,
    title: 'rowing',
    summary: "how i've been involved in the world of rowing",
    demo: '',
    achievements: "- ranked #1 nationally in age group via gb u19 trials process in 2 consecutive years (2025 u18, 2026 u19) \n \
      - 2x national champion, 1x 2nd place \n \
      - selected as captain for 2025-26 season at eton, school 1st viii \n \
      - recruited to cal heavyweight men's rowing '30",
    beginning: "rowing was not a sport that i had ever thought about much until i was thrust into it during my first year at eton. \
      one of the coaches sends an email out to all housemasters at the beginning of every year, asking them to send their smallest \
      first-years down to the lake to try their hand at being a coxswain (the little guy who steers the boat and yells a bit). \
      at the time, i fit the ‘little guy’ bill quite perfectly, and so i was instructed to be ‘on my bike’ (literally) and head to the lake. \n\n \
      the only guidance i had been given by older ‘wet bobs*’ in my house was that i needed lots of layers. \
      other than this crucial information, it was very much a trial by fire, with a rather steep learning curve. \n\n \
      \
      *an eton term for a rower, as opposed to a ‘dry bob’ (cricket player)",
    gettingToGrips: "i stuck through the first few months of rowing, struggling to balance the time commitment with my academic and musical endeavours, \
    in order to see whether it was something that i wanted to take further.\n\n \
    that year, my crew ended up winning the national championships, which made me realise that i had a talent for the sport. this, along with the \
    friends i had already made, convinced me to return for another season. \n\n \
    i knew that there was a pathway to prestigious universities through the top end of rowing, but that it was not a 'free pass' by any means, \
    and would still take an incredible amount of determination. more coming soon",
  },
};


/* project images */
function applyProjectImages() {
  document.querySelectorAll('[data-project]').forEach(card => {
    const project = projects[card.dataset.project];
    const art = card.querySelector('.art');
    if (!art || !project || typeof project.image !== 'string' || !project.image.trim()) return;
    const image = document.createElement('img');
    image.className = 'project-background';
    image.alt = ''; // decorative: the project title below names the card
    image.decoding = 'async';
    image.style.objectFit = project.imageFit === 'contain' ? 'contain' : 'cover';
    image.style.objectPosition = project.imagePosition || 'center';
    image.addEventListener('load', () => {
      art.prepend(image);
      art.classList.add('has-project-image');
      art.classList.toggle('image-only', !project.showArtOverlay);
    }, { once: true });
    image.addEventListener('error', () => {
      image.remove();
      art.classList.remove('has-project-image', 'image-only');
    }, { once: true });
    image.src = project.image.trim();
  });
}
applyProjectImages();

document.querySelectorAll('[data-name]').forEach(element => {
  element.textContent = settings.name;
});
document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});
document.querySelector('#email-link').href = 'mailto:' + settings.email;
document.title = settings.name;

/* project filters */
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

/* project notes: native dialogs support esc and keyboard focus */

/* inline popup images: ![description](assets/projects/photo.jpg)
   text stays plain text; only image markers create image elements. */
function renderProjectText(element, value) {
  const text = typeof value === 'string' ? value : '';
  element.replaceChildren();
  const marker = /!\[([^\]\n]*)\]\(\s*(?:<([^>\n]+)>|([^\s)]+))\s*\)/g;
  let offset = 0;
  for (const match of text.matchAll(marker)) {
    let source;
    try {
      source = new URL(match[2] || match[3], document.baseURI);
      const localPreview = new URL(document.baseURI).protocol === 'file:';
      if (!['https:', 'http:'].includes(source.protocol) && !(localPreview && source.protocol === 'file:')) continue;
    } catch { continue; }
    element.append(document.createTextNode(text.slice(offset, match.index)));
    const image = document.createElement('img');
    image.className = 'dialog-inline-image';
    image.alt = match[1];
    image.loading = 'lazy';
    image.decoding = 'async';
    image.src = source.href;
    element.append(image);
    offset = match.index + match[0].length;
  }
  element.append(document.createTextNode(text.slice(offset)));
}

const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.open];
    document.querySelector('#dialog-small-title').textContent = 'notes on ' + project.title || '';
    document.querySelector('#dialog-title').textContent = project.title || '';
    renderProjectText(document.querySelector('#dialog-summary'), project.summary);
    // add sections in index.html using data-project-section="yourProjectField".
    dialog.querySelectorAll('[data-project-section]').forEach(section => {
      const value = project[section.dataset.projectSection];
      const content = typeof value === 'string' ? value.trim() : '';
      renderProjectText(section.querySelector('[data-section-content]'), content);
      section.style.display = content ? '' : 'none';
    });
    const demoLink = document.querySelector('#dialog-demo');
    const demo = typeof project.demo === 'string' ? project.demo.trim() : '';
    // display:none also overrides the button's display:flex styling.
    demoLink.style.display = demo ? '' : 'none';
    if (demo) demoLink.href = demo;
    else demoLink.removeAttribute('href');
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

/* copy email, with visible fallback when clipboard access unavailable */
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

/* native smooth anchor scrolling is in css. reveals run once with 12px shift.
   no scroll hijacking or parallax. reduced motion respected */
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

/* optional native cursor: storage optional, touch devices stay native. */
const cursorToggle = document.querySelector('#cursor-toggle');
let customCursor = settings.customCursorDefault;
try {
  const saved = localStorage.getItem('mono-custom-cursor');
  if (saved !== null) customCursor = saved === 'on';
} catch { /* Use the configured default. */ }

function updateCursor() {
  document.documentElement.dataset.customCursor = customCursor ? 'on' : 'off';
  cursorToggle.setAttribute('aria-pressed', String(customCursor));
  cursorToggle.textContent = 'rat cursor: ' + (customCursor ? 'on' : 'off') + ' (desktop only)';
}
cursorToggle.addEventListener('click', () => {
  customCursor = !customCursor;
  updateCursor();
  try { localStorage.setItem('mono-custom-cursor', customCursor ? 'on' : 'off'); } catch { /* Optional. */ }
});
updateCursor();

