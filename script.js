// ============================================================
// 捷安特 義昌腳踏車店 腳踏車和電動車專賣店
// 共用 JavaScript — 所有頁面通用
// ============================================================

// ------- 1. 手機版選單切換 -------

let menuOpen = false;

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const btn = document.querySelector('.mobile-menu-btn');
  if (!navLinks || !btn) return;

  menuOpen = !menuOpen;
  navLinks.classList.toggle('active', menuOpen);
  btn.innerHTML = menuOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}

// 點選選單連結後自動收起
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && menuOpen) {
        toggleMenu();
      }
    });
  });
});

// ------- 2. Hero 輪播 -------

let currentSlideIndex = 0;
let slideInterval = null;
const SLIDE_DELAY = 5000; // 5 秒

function getSlides() {
  return document.querySelectorAll('.hero-slide');
}

function getDots() {
  return document.querySelectorAll('.dot');
}

function showSlide(index) {
  const slides = getSlides();
  const dots = getDots();
  if (!slides.length) return;

  // 循環處理
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentSlideIndex = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function changeSlide(direction) {
  showSlide(currentSlideIndex + direction);
  resetSlideTimer();
}

function currentSlide(index) {
  showSlide(index);
  resetSlideTimer();
}

function startSlideTimer() {
  stopSlideTimer();
  slideInterval = setInterval(() => {
    showSlide(currentSlideIndex + 1);
  }, SLIDE_DELAY);
}

function stopSlideTimer() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function resetSlideTimer() {
  startSlideTimer();
}

// ------- 3. 導航欄滾動效果 -------

function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ------- 4. 平滑滾動到錨點 -------

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ------- DOMContentLoaded 初始化 -------

document.addEventListener('DOMContentLoaded', () => {
  // 輪播初始化
  const slides = getSlides();
  if (slides.length > 0) {
    // 確保第一張 active
    showSlide(0);
    startSlideTimer();
  }

  // 導航欄狀態初始化
  handleNavbarScroll();

  // 平滑滾動
  initSmoothScroll();
});

// ------- 滾動監聽 -------

window.addEventListener('scroll', handleNavbarScroll);