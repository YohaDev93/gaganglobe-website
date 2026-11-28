/* GGC Industries Showcase: 7 images, autoplay 2000ms, manual selection, accessible controls */
(() => {
  function init() {
    const root = document.querySelector('#ggc-industries-showcase');
    if (!root || root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    const buttons = Array.from(root.querySelectorAll('[data-showcase-index]'));
    const images = Array.from(root.querySelectorAll('[data-showcase-image]'));
    const heading = root.querySelector('#ggc-ind-showcase-heading');
    const description = root.querySelector('#ggc-ind-showcase-description');
    const counter = root.querySelector('.ggc-ind-showcase__nav-title span');
    if (buttons.length !== 7 || images.length !== 7 || !heading || !description || !counter) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0, intervalId = null, pausedByUser = false;
    // The seven local images are already referenced in the HTML; preload to reduce flicker.
    images.forEach(el => {
      const match = /url\(["']?(.+?)["']?\)/.exec(el.style.backgroundImage);
      if (match) { const img = new Image(); img.src = match[1]; }
    });
    function activate(index) {
      current = (index + buttons.length) % buttons.length;
      images.forEach((img,i) => img.classList.toggle('is-active',i===current));
      buttons.forEach((btn,i) => { btn.classList.toggle('is-active',i===current); btn.setAttribute('aria-pressed',String(i===current)); });
      const selected = buttons[current];
      heading.textContent = selected.querySelector('.ggc-ind-showcase__label').textContent.trim();
      description.textContent = selected.dataset.description || '';
      counter.textContent = String(current+1).padStart(2,'0')+' / '+String(buttons.length).padStart(2,'0');
      root.classList.remove('is-playing');
      void root.offsetWidth;
      if (intervalId !== null) root.classList.add('is-playing');
    }
    function stop() { if(intervalId!==null) window.clearInterval(intervalId); intervalId=null; root.classList.remove('is-playing'); }
    function canPlay(){return !pausedByUser && !reducedMotion.matches && !document.hidden;}
    function start(){stop();if(!canPlay())return;intervalId=window.setInterval(()=>activate(current+1),2000);root.classList.add('is-playing');}
    buttons.forEach((button,i)=>button.addEventListener('click',()=>{activate(i);start();}));
    root.addEventListener('mouseenter',()=>{pausedByUser=true;stop()});
    root.addEventListener('mouseleave',()=>{pausedByUser=false;start()});
    root.addEventListener('focusin',()=>{pausedByUser=true;stop()});
    root.addEventListener('focusout',()=>{if(!root.contains(document.activeElement)){pausedByUser=false;start()}});
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
    reducedMotion.addEventListener?.('change',()=>start());
    activate(0);start();
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
