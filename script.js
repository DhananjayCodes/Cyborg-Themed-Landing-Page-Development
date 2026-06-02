const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const reveals = document.querySelectorAll('.reveal');
const particleField = document.getElementById('particle-field');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const PARTICLE_COUNT_MOBILE = 12;
const PARTICLE_COUNT_DESKTOP = 20;

const clearParticles = () => {
  if (particleField) {
    particleField.replaceChildren();
  }
};

const renderParticles = () => {
  if (!particleField || reducedMotionQuery.matches) {
    clearParticles();
    return;
  }

  if (particleField.childElementCount > 0) {
    return;
  }

  const particleCount =
    window.innerWidth < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;
    particleField.appendChild(particle);
  }
};

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (menuToggle && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((section) => observer.observe(section));
} else {
  reveals.forEach((section) => section.classList.add('in-view'));
}

renderParticles();

if (typeof reducedMotionQuery.addEventListener === 'function') {
  reducedMotionQuery.addEventListener('change', renderParticles);
} else if (typeof reducedMotionQuery.addListener === 'function') {
  reducedMotionQuery.addListener(renderParticles);
}
