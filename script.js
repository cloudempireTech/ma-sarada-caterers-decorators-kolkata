const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}
const form = document.querySelector('#enquiry-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const service = form.elements.service.value;
  const occasion = form.elements.event.value.trim();
  const message = form.elements.message.value.trim();
  const lines = [`Hello Ma Sarada Caterers and Decorators,`, `My name is ${name}. I would like to discuss ${service.toLowerCase()}.`];
  if (occasion) lines.push(`Occasion: ${occasion}.`);
  lines.push(`Message: ${message}`, `Please let me know how best to continue. Thank you.`);
  document.querySelector('#prepared').value = lines.join('\n');
  document.querySelector('#form-result').hidden = false;
  document.querySelector('#copy-status').textContent = 'Your message is prepared. It has not been sent.';
  document.querySelector('#form-result').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center'});
});
document.querySelector('#copy-enquiry')?.addEventListener('click', async () => {
  const text = document.querySelector('#prepared').value;
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(text); status.textContent = 'Message copied. Check the business contact details on its listing before sending.'; }
  catch { document.querySelector('#prepared').select(); status.textContent = 'Select and copy the message above.'; }
});
