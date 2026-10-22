const menuButton=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('#nav-menu');
menuButton.addEventListener('click',()=>{
  const expanded=menuButton.getAttribute('aria-expanded')==='true';
  menuButton.setAttribute('aria-expanded',String(!expanded));
  navMenu.classList.toggle('open',!expanded);
});
navMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  menuButton.setAttribute('aria-expanded','false');
  navMenu.classList.remove('open');
}));
document.querySelector('#year').textContent=new Date().getFullYear();
