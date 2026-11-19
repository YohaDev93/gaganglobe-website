/* GGC static shared navigation: the header/footer are already in the HTML. */
(() => {
  const init = () => {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#site-header nav.links a').forEach(link => {
      const page = (link.getAttribute('href') || '').split(/[?#]/)[0];
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
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }));
    }
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
