// Simple, in-memory AR/EN toggle shared across TrustBite pages.
// No localStorage (per artifact rules) — defaults to Arabic on each load.
function setLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-ar]').forEach(function (el) {
    var val = lang === 'ar' ? el.getAttribute('data-ar') : (el.getAttribute('data-en') || el.getAttribute('data-ar'));
    el.textContent = val;
  });

  document.querySelectorAll('[data-ar-ph]').forEach(function (el) {
    var val = lang === 'ar' ? el.getAttribute('data-ar-ph') : (el.getAttribute('data-en-ph') || '');
    el.setAttribute('placeholder', val);
  });

  document.querySelectorAll('.lang-toggle [data-lang]').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
  });

  document.body.classList.toggle('font-en', lang === 'en');
  window.__trustbiteLang = lang;
}

document.addEventListener('DOMContentLoaded', function () {
  setLang('ar');
});
