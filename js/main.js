/* ============================================
   DMT AUTOGROUP — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLangSwitch();
  initNavScroll();
  initMobileMenu();
  initScrollReveal();
});

/* --- Language Switcher --- */
function initLangSwitch() {
  const defaultLang = localStorage.getItem('dmt-lang') || 'fr';
  setLang(defaultLang);

  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLang(lang);
      localStorage.setItem('dmt-lang', lang);
    });
  });
}

function setLang(lang) {
  // Update buttons
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Toggle content
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active-lang', el.dataset.lang === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang;
}

/* --- Nav Scroll Effect --- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}
