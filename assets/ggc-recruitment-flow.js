/* Reveal each editable flow step as it enters the viewport. */
(() => {
  function init() {
    const section = document.getElementById('ggc-recruitment-process');
    if (!section || !section.classList.contains('ggc-flow')) return;
    const steps = Array.from(section.querySelectorAll('.ggc-flow-step'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ggc-flow-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.07, rootMargin:'0px 0px 70px 0px'});
    steps.forEach(step => observer.observe(step));
    section.classList.add('ggc-flow-ready');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
