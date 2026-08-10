document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Apparitions douces au scroll (désactivées si mouvement réduit demandé)
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Année dans le pied de page
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Formulaire de contact -> ouverture du client mail (pas d'envoi serveur)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nom = data.get('nom') || '';
      const societe = data.get('societe') || '';
      const email = data.get('email') || '';
      const telephone = data.get('telephone') || '';
      const sujet = data.get('sujet') || 'Prise de contact — site Avens Conseil';
      const message = data.get('message') || '';
      const body = `Nom : ${nom}\nSociété : ${societe}\nEmail : ${email}\nTéléphone : ${telephone}\n\n${message}`;
      const mailto = `mailto:contact@avensconseil.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
});
