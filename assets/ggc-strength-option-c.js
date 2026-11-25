(() => {
  function init() {
    const section = document.querySelector('.ggc-strength-c5');
    if (!section) return;
    const layout = section.querySelector('[data-ggc-strength-c5-layout]');
    const svg = section.querySelector('.ggc-c5-connectors');
    const halo = section.querySelector('.ggc-b3-halo');
    if (!layout || !svg || !halo) return;
    const cards = Array.from(section.querySelectorAll('.ggc-b3-card'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 801px)');
    const NS = 'http://www.w3.org/2000/svg';
    let queued = false;
    function relativeRect(el, layoutRect) {
      const r = el.getBoundingClientRect();
      return { x: r.left - layoutRect.left, y: r.top - layoutRect.top, w: r.width, h: r.height };
    }
    function element(tag, cls, attrs) {
      const node = document.createElementNS(NS, tag);
      node.setAttribute('class', cls);
      for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
      return node;
    }
    function draw() {
      queued = false;
      svg.replaceChildren();
      if (!desktop.matches) return;
      const base = layout.getBoundingClientRect();
      if (base.width < 1 || base.height < 1) return;
      const center = relativeRect(halo, base);
      const centerX = center.x + center.w / 2;
      const centerY = center.y + center.h / 2;
      const radius = center.w * 0.48;
      svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
      svg.setAttribute('preserveAspectRatio', 'none');
      cards.forEach((card, i) => {
        const r = relativeRect(card, base);
        const onLeft = !!card.closest('.ggc-b3-left');
        const endX = onLeft ? r.x + r.w - 5 : r.x + 5;
        const endY = r.y + r.h / 2;
        const vx = endX - centerX, vy = endY - centerY;
        const norm = Math.hypot(vx, vy) || 1;
        const startX = centerX + radius * vx / norm;
        const startY = centerY + radius * vy / norm;
        svg.appendChild(element('line', 'ggc-c5-wire-glow', { x1:startX, y1:startY, x2:endX, y2:endY }));
        svg.appendChild(element('line', 'ggc-c5-wire', { x1:startX, y1:startY, x2:endX, y2:endY, style:`animation-delay:${-i*0.37}s` }));
        svg.appendChild(element('circle', 'ggc-c5-node', { cx:startX, cy:startY, r:5 }));
        svg.appendChild(element('circle', 'ggc-c5-node-end', { cx:endX, cy:endY, r:4 }));
      });
    }
    function scheduleDraw() { if (queued) return; queued = true; window.requestAnimationFrame(draw); }
    if ('IntersectionObserver' in window && !reduceMotion.matches) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ggc-c5-visible');
            observer.unobserve(entry.target);
            entry.target.addEventListener('transitionend', scheduleDraw, { once:true });
          }
        });
      }, { threshold:0.08, rootMargin:'0px 0px 70px 0px' });
      section.classList.add('ggc-c5-ready');
      cards.forEach(card => observer.observe(card));
    }
    scheduleDraw();
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(scheduleDraw);
      ro.observe(layout); ro.observe(halo); cards.forEach(card => ro.observe(card));
    }
    window.addEventListener('resize', scheduleDraw, { passive:true });
    desktop.addEventListener?.('change', scheduleDraw);
    window.addEventListener('load', scheduleDraw, { once:true });
    document.fonts?.ready?.then(scheduleDraw).catch(() => {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
