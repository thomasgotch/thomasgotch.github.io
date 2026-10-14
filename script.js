// Personalize these values, then edit the page copy and project content below.
const profile = { name: 'Your Name', email: 'hello@example.com' };
document.querySelectorAll('[data-name]').forEach(el => el.textContent = profile.name);
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelector('#email-link').href = `mailto:${profile.email}`;
document.title = `${profile.name} — Designer & Developer`;

const projects = {
  fieldnotes: {title:'Fieldnotes', category:'DESIGN / EDITORIAL CONCEPT', summary:'An editorial home for ideas worth keeping.', idea:'A sample independent journal that gives stories, observations, and everyday discoveries room to breathe.', approach:'A restrained palette, expressive editorial typography, and a clear reading hierarchy. Use this space to explain how your visual decisions support the experience.'},
  orbit: {title:'Orbit', category:'DEVELOPMENT / PRODUCT CONCEPT', summary:'A quieter approach to getting things done.', idea:'A sample focus tool built around one small promise: make it easier to give your attention to the task in front of you.', approach:'A focused interface, clear states, and subtle visual feedback. Replace this text with the technology you used, an interesting technical challenge, and how you solved it.'},
  form: {title:'Form & Function', category:'DESIGN + DEVELOPMENT / SYSTEM CONCEPT', summary:'A flexible foundation for cohesive digital products.', idea:'A sample component system exploring the relationship between consistent visual language and reusable code.', approach:'Start with typography, spacing, and color, then build accessible components that work together. Describe your own process and include the tradeoffs that shaped the final result.'}
};
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected));});
  document.querySelectorAll('[data-project]').forEach(project => {project.hidden=button.dataset.filter!=='all'&&!project.dataset.category.split(' ').includes(button.dataset.filter);});
}));
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  ['title','category','summary','idea','approach'].forEach(key => document.querySelector(`#dialog-${key}`).textContent=project[key]);
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-contact').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click', event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#copy-email').addEventListener('click', async event => {
  const button=event.currentTarget;
  try {await navigator.clipboard.writeText(profile.email);button.textContent='Email copied ✓';document.querySelector('#copy-status').textContent='Email address copied';setTimeout(()=>button.innerHTML='Copy email address <span>⧉</span>',2500);}
  catch {button.textContent=profile.email;document.querySelector('#copy-status').textContent=`Email address: ${profile.email}`;}
});
const navLinks=document.querySelectorAll('nav a');
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`));});},{rootMargin:'-10% 0px -55% 0px',threshold:0});
document.querySelectorAll('main>section[id]').forEach(section=>observer.observe(section));
