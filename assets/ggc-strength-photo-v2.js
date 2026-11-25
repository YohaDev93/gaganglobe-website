/* GGC strength photo reveal; optional enhancement, never hides content without JS. */
(() => {
  const init = () => {
    const section = document.querySelector('#ggc-strength.ggc-strength-v2');
    if (!section || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = [...section.querySelectorAll('.ggc-strength-card')];
    if (!cards.length) return;
    cards.forEach((card, index) => card.style.setProperty('--ggc-strength-delay', `${(index % 5) * 75}ms`));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('ggc-strength-in-view');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    cards.forEach(card => observer.observe(card));
    section.classList.add('ggc-strength-motion-ready');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
