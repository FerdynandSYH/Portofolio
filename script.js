// Menu mobile (dijalankan jika elemen menunya tersedia)
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// Tahun otomatis di footer (jika elemen tahun tersedia)
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Tombol alih tema gelap/terang
const themeToggleBtn = document.getElementById('theme-toggle');
let transitionTimeout;

function applyTheme(isDark) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    document.documentElement.classList.add('theme-transition');
    clearTimeout(transitionTimeout);
  }

  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }

  if (!prefersReducedMotion) {
    transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 450);
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    applyTheme(!document.documentElement.classList.contains('dark'));
  });
}

// Ikuti tema sistem jika pengguna belum memilih tema sendiri
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (!('theme' in localStorage)) applyTheme(event.matches);
});
