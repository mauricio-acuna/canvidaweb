document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  const header = document.querySelector('[data-header]');
  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      const startedAt = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / 900, 1);
        element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(element);
    });
  }, { threshold: 0.7 });

  document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));
});
