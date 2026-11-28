/* GGC Zigzag: draw a winding SVG route linking the six editable step cards. */
(()=>{
  function init(){
    const section=document.querySelector('#ggc-zigzag-process');if(!section)return;
    const board=section.querySelector('[data-ggc-zigzag-board]');
    const svg=section.querySelector('.ggc-zigzag-route');
    const cards=[...section.querySelectorAll('.ggc-zigzag-step')];
    const desktop=matchMedia('(min-width:801px)');const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    if(!board||!svg||cards.length!==6)return;
    let pending=false;
    const ns='http://www.w3.org/2000/svg';
    const node=(tag,attrs={})=>{let el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el;};
    function draw(){
      pending=false;svg.replaceChildren();if(!desktop.matches)return;
      const bounds=board.getBoundingClientRect();if(!bounds.width||!bounds.height)return;
      svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
      const rects=cards.map(card=>{const r=card.getBoundingClientRect();return{x:r.left-bounds.left,y:r.top-bounds.top,w:r.width,h:r.height};});
      // Smooth wave through the gaps between 1→2→3, round the right U-turn, then 4→5→6.
      const mid=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
      const anchor=(r,side)=>({x:side==='right'?r.x+r.w+2:r.x-2,y:r.y+r.h*.54});
      const segments=[];
      function wave(a,b,bend){const m=mid(a,b);const dx=b.x-a.x;const dy=b.y-a.y;return `M ${a.x} ${a.y} C ${a.x+dx*.32} ${a.y+bend}, ${m.x-dx*.07} ${m.y-bend}, ${m.x} ${m.y} S ${b.x-dx*.32} ${b.y+bend}, ${b.x} ${b.y}`;}
      segments.push(wave(anchor(rects[0],'right'),anchor(rects[1],'left'),43));
      segments.push(wave(anchor(rects[1],'right'),anchor(rects[2],'left'),-37));
      const t=anchor(rects[2],'right'),b=anchor(rects[3],'right');
      const far=Math.min(bounds.width-6,Math.max(t.x,b.x)+Math.max(34,(bounds.width-Math.max(t.x,b.x))*.62));
      segments.push(`M ${t.x} ${t.y} C ${far} ${t.y-2}, ${far} ${t.y+60}, ${far} ${(t.y+b.y)/2} S ${far} ${b.y}, ${b.x} ${b.y}`);
      segments.push(wave(anchor(rects[3],'left'),anchor(rects[4],'right'),-45));
      segments.push(wave(anchor(rects[4],'left'),anchor(rects[5],'right'),40));
      const defs=node('defs');const grad=node('linearGradient',{id:'ggc-zigzag-gradient',x1:'0%',y1:'0%',x2:'100%',y2:'15%'});
      [['0%','#327de7'],['30%','#00a7d1'],['52%','#17c7a5'],['74%','#9869f0'],['100%','#e7aa36']].forEach(([o,c])=>grad.appendChild(node('stop',{offset:o,'stop-color':c})));
      defs.appendChild(grad);svg.appendChild(defs);
      segments.forEach(d=>{svg.appendChild(node('path',{d,class:'ggc-zigzag-back'}));svg.appendChild(node('path',{d,class:'ggc-zigzag-wire'}));});
      // Mark the circular turning point on the right edge.
      const turning=(t.y+b.y)/2;svg.appendChild(node('circle',{cx:far,cy:turning,r:10,class:'ggc-zigzag-point'}));
    }
    function queue(){if(pending)return;pending=true;requestAnimationFrame(draw);}
    if('IntersectionObserver'in window&&!reduced.matches){
      const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('ggc-zigzag-visible');observer.unobserve(e.target);e.target.addEventListener('transitionend',queue,{once:true});}}},{threshold:.08,rootMargin:'0px 0px 70px 0px'});
      section.classList.add('ggc-zigzag-ready');cards.forEach(el=>observer.observe(el));
    }
    queue();window.addEventListener('resize',queue,{passive:true});window.addEventListener('load',queue,{once:true});
    desktop.addEventListener?.('change',queue);document.fonts?.ready?.then(queue).catch(()=>{});
    if('ResizeObserver'in window){const ro=new ResizeObserver(queue);ro.observe(board);cards.forEach(el=>ro.observe(el));}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
