const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const closeMenu = () => { menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label','Open menu'); nav?.classList.remove('open'); };
menuButton?.addEventListener('click', () => {
 const open = menuButton.getAttribute('aria-expanded') !== 'true';
 menuButton.setAttribute('aria-expanded', String(open));
 menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
 nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
 }), { threshold: .08 });
 document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const form = document.querySelector('#enquiry-form');
form?.addEventListener('input', event => event.target.setCustomValidity?.(''));
form?.addEventListener('submit', event => {
 event.preventDefault();
 const name = form.elements.name.value.trim();
 const message = form.elements.message.value.trim();
 form.elements.name.setCustomValidity(name.length < 2 ? 'Please enter your name (at least two characters).' : '');
 form.elements.message.setCustomValidity(message.length < 10 ? 'Please add a message with at least ten characters.' : '');
 if (!form.reportValidity()) return;
 const service = form.elements.service.value;
 const occasion = form.elements.event.value.trim();
 const time = form.elements.preferredTime.value.trim();
 const lines = ['Hello Ma Sarada Caterers and Decorators,', `My name is ${name}.`, `I would like to discuss: ${service}.`];
 if (occasion) lines.push(`Occasion: ${occasion}`);
 if (time) lines.push(`Preferred contact time: ${time}`);
 lines.push(`Message: ${message}`, 'Please let me know the details and availability. Thank you.');
 const url = `https://wa.me/916291112868?text=${encodeURIComponent(lines.join('\n'))}`;
 const handoff = document.querySelector('#enquiry-handoff');
 handoff.href = url; handoff.hidden = false;
 document.querySelector('#form-status').textContent = 'Your enquiry is ready to review in WhatsApp. It has not been sent; no booking is confirmed.';
 window.open(url, '_blank', 'noopener,noreferrer');
});
