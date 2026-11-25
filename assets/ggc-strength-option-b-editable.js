/* Progressive enhancement: content is visible even when JS is disabled. */
(() => {
  const init = () => {
    const section = document.querySelector('.ggc-strength-b3');
    if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = [...section.querySelectorAll('.ggc-b3-card')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ggc-b3-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 70px 0px' });
    section.classList.add('ggc-b3-ready');
    cards.forEach(card => observer.observe(card));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
