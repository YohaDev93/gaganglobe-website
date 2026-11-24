/* Optional, progressive scroll reveal. Content remains visible without JS. */
(()=>{
  const section=document.getElementById('ggc-strength');
  if(!section || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards=[...section.querySelectorAll('.ggc-strength-card')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('ggc-in-view');observer.unobserve(entry.target)}
    });
  },{threshold:0.08,rootMargin:'0px 0px 40px 0px'});
  cards.forEach((card,i)=>{card.style.setProperty('--i',i%5);observer.observe(card)});
  document.documentElement.classList.add('ggc-motion-ready');
})();
