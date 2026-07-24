(function () {
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700', 'ease-out');
    animObserver.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .animate-fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 100) {
          header.classList.add('bg-gris-oscuro/95', 'backdrop-blur-sm', 'shadow-lg');
          header.classList.remove('bg-transparent');
        } else {
          header.classList.remove('bg-gris-oscuro/95', 'backdrop-blur-sm', 'shadow-lg');
          header.classList.add('bg-transparent');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();
