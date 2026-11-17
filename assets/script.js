document.querySelectorAll('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{const n=document.querySelector('.links');const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));}));document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.links')?.classList.remove('open')));

// GGC home hero carousel. Works without a library or backend.
(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = [...carousel.querySelectorAll('[data-slide-to]')];
  const prev = carousel.querySelector('[data-slide-prev]');
  const next = carousel.querySelector('[data-slide-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let timer;
  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const current = i === active;
      slide.classList.toggle('is-active', current);
      slide.setAttribute('aria-hidden', String(!current));
      slide.inert = !current;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === active);
      dot.setAttribute('aria-pressed', String(i === active));
    });
  };
  const stop = () => { clearInterval(timer); timer = undefined; };
  const play = () => {
    stop();
    if (reducedMotion.matches || document.hidden) return;
    timer = setInterval(() => show(active + 1), 6500);
  };
  prev?.addEventListener('click', () => { show(active - 1); play(); });
  next?.addEventListener('click', () => { show(active + 1); play(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); play(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', e => { if (!carousel.contains(e.relatedTarget)) play(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : play());
  reducedMotion.addEventListener?.('change', play);
  show(0);
  play();
})();
