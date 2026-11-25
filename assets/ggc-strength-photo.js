/* GGC strength card reveal: progressive enhancement with reduced-motion support. */
(() => {
  const init = () => {
    const section = document.querySelector('#ggc-strength.ggc-strength-photo');
    if (!section) return;
    const cards = [...section.querySelectorAll('.ggc-strength-card')];
    if (!cards.length || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only opt in once the DOM is ready; animation triggers as each card becomes visible.
    cards.forEach((card, index) => {
      card.style.setProperty('--ggc-strength-delay', `${(index % 5) * 90}ms`);
    });
    section.classList.add('ggc-strength-motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('ggc-strength-in-view');
        observer.unobserve(entry.target);
      });
    }, {threshold:0.10, rootMargin:'0px 0px 35px 0px'});
    cards.forEach(card => observer.observe(card));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
