/* GGC shared header/footer: session cache + stable navigation. */
(() => {
  const CACHE_VERSION = 'ggc-shared-layout-v3';
  const fragments = [
    { id: 'site-header', url: 'components/header.html', key: 'header' },
    { id: 'site-footer', url: 'components/footer.html', key: 'footer' }
  ];

  function readCache(key) {
    try { return sessionStorage.getItem(`${CACHE_VERSION}:${key}`); }
    catch (_) { return null; }
  }

  function writeCache(key, html) {
    try { sessionStorage.setItem(`${CACHE_VERSION}:${key}`, html); }
    catch (_) { /* Cache may be unavailable in privacy mode. */ }
  }

  async function insertFragment(part) {
    const target = document.getElementById(part.id);
    if (!target) return;

    // Reuse the fragment immediately on subsequent pages in this tab.
    const cached = readCache(part.key);
    if (cached !== null) {
      target.innerHTML = cached;
      return;
    }

    const response = await fetch(part.url);
    if (!response.ok) throw new Error(`${part.url}: HTTP ${response.status}`);
    const html = await response.text();
    target.innerHTML = html;
    writeCache(part.key, html);
  }

  function setupNavigation() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#site-header nav.links a').forEach(link => {
      const page = link.getAttribute('href')?.split('#')[0];
      const active = page === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const toggle = document.querySelector('#site-header .menu-toggle');
    const nav = document.querySelector('#site-header nav.links');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  async function start() {
    try {
      // Load independently so a footer failure cannot prevent navigation.
      const outcomes = await Promise.allSettled(fragments.map(insertFragment));
      outcomes.forEach((outcome, index) => {
        if (outcome.status === 'rejected') {
          console.error(`GGC failed to load ${fragments[index].url}`, outcome.reason);
        }
      });
      setupNavigation();
    } catch (error) {
      console.error('GGC shared navigation initialization failed', error);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
