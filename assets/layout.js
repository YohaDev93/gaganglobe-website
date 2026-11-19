/* Shared header and footer for the GGC static site. Works over Live Server and GitHub Pages. */
(() => {
  async function insertFragment(targetId, url) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
    target.innerHTML = await response.text();
  }

  async function start() {
    try {
      await Promise.all([
        insertFragment('site-header', 'components/header.html'),
        insertFragment('site-footer', 'components/footer.html')
      ]);
      const current = location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('#site-header nav.links a').forEach(link => {
        const linkPage = link.getAttribute('href')?.split('#')[0];
        const isCurrent = linkPage === current;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'page');
      });
      const toggle = document.querySelector('#site-header .menu-toggle');
      const nav = document.querySelector('#site-header nav.links');
      toggle?.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          toggle?.setAttribute('aria-expanded', 'false');
        });
      });
      const year = document.getElementById('year');
      if (year) year.textContent = String(new Date().getFullYear());
    } catch (error) {
      console.error('GGC shared layout could not load. Serve this site via HTTP (VS Code Live Server or GitHub Pages).', error);
      document.querySelectorAll('#site-header, #site-footer').forEach(el => {
        if (!el.innerHTML.trim()) el.textContent = 'Unable to load website navigation. Please refresh the page.';
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
