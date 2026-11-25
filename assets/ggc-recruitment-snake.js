/* Animated serpentine arrows: 01 → 02 → 03 ↓ 04 → 05 → 06 (returning left). */
(()=>{
 const section=document.querySelector('.ggc-snake');if(!section)return;
 const board=section.querySelector('[data-ggc-snake-board]');
 const svg=section.querySelector('.ggc-snake-route');
 const steps=[...section.querySelectorAll('.ggc-snake-step')];
 const desktop=matchMedia('(min-width:701px)');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const NS='http://www.w3.org/2000/svg';let queued=false;
 const make=(tag,cls,attrs)=>{const el=document.createElementNS(NS,tag);el.setAttribute('class',cls);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));return el;};
 function render(){queued=false;svg.replaceChildren();if(!desktop.matches)return;
   const b=board.getBoundingClientRect();if(!b.width||!b.height)return;
   svg.setAttribute('viewBox',`0 0 ${b.width} ${b.height}`);
   const pts=steps.map(s=>{let r=s.querySelector('.ggc-snake-icon').getBoundingClientRect();return {x:r.left+r.width/2-b.left,y:r.top+r.height/2-b.top,r:r.width/2};});
   // Connecting paths through the six circular icons; one animated snake route.
   const segments=[];
   // Top row, left to right. Then U-turn at the right edge and continue right-to-left.
   for(let i=0;i<2;i++){const a=pts[i],z=pts[i+1];segments.push(`M ${a.x+a.r} ${a.y} L ${z.x-z.r} ${z.y}`);}
   const a=pts[2],z=pts[3];
   const edge=Math.min(b.width-6,Math.max(a.x,z.x)+Math.max(a.r,z.r)+30);
   segments.push(`M ${a.x+a.r} ${a.y} L ${edge-27} ${a.y} Q ${edge} ${a.y} ${edge} ${a.y+27} L ${edge} ${z.y-27} Q ${edge} ${z.y} ${edge-27} ${z.y} L ${z.x+z.r} ${z.y}`);
   for(let i=3;i<5;i++){const a=pts[i],z=pts[i+1];segments.push(`M ${a.x-a.r} ${a.y} L ${z.x+z.r} ${z.y}`);}
   const defs=make('defs','',{});const marker=make('marker','',{id:'ggc-snake-arrow',viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:5,markerHeight:5,orient:'auto-start-reverse'});marker.appendChild(make('path','snake-arrow',{d:'M 0 1 L 9 5 L 0 9 z'}));defs.appendChild(marker);svg.appendChild(defs);
   segments.forEach(d=>{svg.appendChild(make('path','snake-trail-bg',{d}));svg.appendChild(make('path','snake-trail',{d,'marker-end':'url(#ggc-snake-arrow)'}));});
 }
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(render);}
 if('IntersectionObserver' in window&&!reduced.matches){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('snake-visible');obs.unobserve(e.target);e.target.addEventListener('transitionend',schedule,{once:true});}});},{threshold:.12,rootMargin:'0px 0px 50px 0px'});steps.forEach(s=>{s.classList.add('snake-animate');obs.observe(s);});}
 schedule();window.addEventListener('load',schedule,{once:true});window.addEventListener('resize',schedule,{passive:true});desktop.addEventListener?.('change',schedule);document.fonts?.ready?.then(schedule).catch(()=>{});
 if('ResizeObserver'in window){const ro=new ResizeObserver(schedule);ro.observe(board);steps.forEach(s=>ro.observe(s));}
})();
